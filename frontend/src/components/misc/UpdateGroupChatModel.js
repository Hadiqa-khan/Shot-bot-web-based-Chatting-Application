// Author Name :Hadiqa Khan
// Date of generation : 26 April 2022
// Date of last revision : 21-May-2022
// Version number: 2
import { Box, FormControl, IconButton, useDisclosure, useToast,Input, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModel = ({fetchAgain,setFetchAgain,fetchMessage}) => {
    const {isOpen,onOpen,onClose}= useDisclosure();
    const [groupChatName,setGroupChatName]=useState();
    const [search,setSearch]=useState("");
    const[searchResult,setSearchResult]=useState([]);
    const[loading,setLoading]=useState(false);
    const {selectedChat,setSelectedChat,user} = ChatState();
    const [renameLoading,setRenameLoading]=useState(false);
    const toast = useToast();
    const handleRemove = async(user1) =>{
                              // purpose: The purpose is remove the user from the groupchat only admin can do this
            if(selectedChat.groupAdmin._id!==user._id && user1._id !== user._id)
            {
                    toast({
         
                        title:"Only Admins can remove someone! ",
                        status:"error",
                        duration:5000,
                        isClosable:true,
                        position:"bottom",
            
                  });
                  return;
            }
            try {
                setLoading(true);
                const config = {
                    headers: 
                    {
                        Authorization:`Bearer ${user.token}`,
                    },
                }
                const {data} = await axios.put(`/api/chat/groupremove`,{
                  chatId:selectedChat._id,
                  userId: user1._id,
                },config);
                user1._id === user._id ? setSelectedChat():setSelectedChat(data);
                setFetchAgain(!fetchAgain);
                fetchMessage();
                setLoading(false)
                
            } catch (error) {
                toast({
                    title:"Error Occured!",
                    description:error.response.data.message,
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"bottom",
                });
                setLoading(false);   
            }
    }
   
    const handleAddUser = async(user1) => {
                         // purpose: The purpose is add the user from the groupchat only admin can do this
    if(selectedChat.users.find((u) => u._id===user1._id))
    {
        toast({
         
            title:"User Already Added",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"top",

      });
      return;
    }
    if(selectedChat.groupAdmin._id!==user._id)
    {
        toast({
         
            title:"Only Admins xan add someone! ",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"top",

      });
      return;
    };
  try {
      setLoading(true);
      const config = {
          headers: 
          {
              Authorization:`Bearer ${user.token}`,
          },
      }
      const {data} = await axios.put("/api/chat/groupadd",{
        chatId:selectedChat._id,
        userId: user1._id,
      },config)
        setSelectedChat(data)
       setFetchAgain(!fetchAgain)
       setLoading(false)
  } catch (error) {
         
    toast({
        title:"Error Occured!",
        description:error.response.data.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
    });
    setLoading(false);
  }
}
    const handleRename=async()=>{
        if(!groupChatName){  // purpose: The purpose is rename the  groupchat
            return
        }
        try {
            setRenameLoading(true)
            const config={
                headers: {
                    Authorization : `Bearer ${user.token}`,
                },}
                const {data} = await axios.put(`/api/chat/rename`,
                {
                    chatId:selectedChat._id,
                    chatName:groupChatName,
                },
                config
                );
                setSelectedChat(data);
                setFetchAgain(!fetchAgain);
                setRenameLoading(false);
            
        } catch (error) {
            toast({
                title:"Failed to create the Chat!!",
                description:error.response.data,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setRenameLoading(false);
        }
        setGroupChatName(" ");
     }
        const handleSearch=async (query)=>{
            setSearch(query)
            if(!query)
            {
                return;
            }
            try{
                setLoading(true);
                const config = {
                    headers: { Authorization : `Bearer ${user.token}`,
                }
                }
                const {data} = await axios.get(`/api/user?search=${search}`,config);
                setLoading(false)
                setSearchResult(data);
        
            }
            catch(error)
            {
                toast({
                    title:"Error Occured!",
                    description:"Failed to load the search results",
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"bottom-left",
                });
                setLoading(false);
            }
        }
  return (
   <>
   <IconButton d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader
    fontSize="35px"
    fontFamily="Work sans"
    d="flex"
    justifyContent="center">{selectedChat.name}</ModalHeader>
    <ModalCloseButton />
    <ModalBody d="flex" flexDir="column" alignItems="center">
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
            {selectedChat.users.map((u) =>(
                       <UserBadgeItem
                        key={u._id}
                       user={u}
                       handleFunction={()=>handleRemove(u)}
                       />
                   ))}
            </Box>
            <FormControl d="flex">
            <Input placeholder="Chat Name" 
            mb={3}
            value={groupChatName}

        onChange={(e) => setGroupChatName(e.target.value)}/>
        <Button
        variant="solid"
        colorScheme="purple"
        ml={1}
        isLoading={renameLoading}
        onClick={handleRename}>
            Update
        </Button>
             
        </FormControl>
        <FormControl>
        <Input placeholder="Add Users eg:John,Hadiqa,Nemo" mb={1}
                    onChange={(e) => handleSearch(e.target.value)}/>
                     
        </FormControl>
     {loading ? (<Spinner size="lg"/>):(
         searchResult?.map((user) => (
             <UserListItem key={user._id}
             user={user}
             handleFunction={()=> handleAddUser(user)}/>
         ))
     )}
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='red' mr={3} onClick={()=>handleRemove(user)}>
        Leave Group
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

   </>
  )
}

export default UpdateGroupChatModel;