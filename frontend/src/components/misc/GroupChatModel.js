// Author Name : Hadiqa Khan
// Date of generation : 4 May 2022
// Date of last revision : 21-May-2022
// Version number: 3
import React, { useState } from 'react';
import {   Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    ModalBody,
    ModalCloseButton,
    useToast,
    FormControl,
    Input,
    Box, } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks'
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

import axios from 'axios';
const GroupChatModel = ({children}) => {
    const[groupChatName,setGroupChatName]=useState();
    const[selectedUsers,setSelectedUsers]=useState([]);
    const[search,setSearch]=useState("");
    const[searchResult,setSearchResult]=useState([]);
    const[loading,setLoading]=useState(false)
    const toast= useToast();
    const {isOpen,onOpen,onClose}= useDisclosure();
    const {user,chats,setChats}= ChatState();
                        
    const handleSearch = async(query) =>{  // Input: User query to search user
                                        // Output: Search the user 
                                        // purpose: The purpose is to search the user by using current user authorization and get the request
                                        // expected output: User search results
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
    const handleSubmit = async() =>{     // Input: Chat and Selected Users
                                        // purpose: The purpose is to create the group chat for greater and equal to 3 users
                                        // expected output: Group Chat Created
        if(!groupChatName || !selectedUsers)
        {toast({
            title:"Please fill all the fields",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"top",
        });
        return;
        }
    try {
        const config = {
            headers: { Authorization : `Bearer ${user.token}`,
        }};
        const {data} = await axios.post(`/api/chat/group`,{
            name:groupChatName,
            users:JSON.stringify(selectedUsers.map((u)=>u._id)),
            mail:JSON.stringify(selectedUsers.map((u)=>u.email)),
        },
        config
        );
        setChats([data,...chats]);
        onClose();
        console.log("show toast")
        toast({
            title:"New Group Chat Created!",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"bottom",

        })
        
    } catch (error) {
        
        toast({
            title:"Failed to create the Chat!!",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom",
        });
    }

    };

  const handleGroup=(userToAdd)=>{      // Input: User to add in groupchat
                                        // purpose: The purpose is to check if the user already exists in group if yes then toast the error
                        
      if(selectedUsers.includes(userToAdd)){
          toast({
         
                title:"User Already Added",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top",
    
          });
          return;
      }
      setSelectedUsers([...selectedUsers,userToAdd])
  };
  const handleDelete = (delUser) =>{
   setSelectedUsers(selectedUsers.filter((sel)=>sel._id !== delUser._id))   
} 

    return (

        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center">
                  Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody d="flex" flexDir="column" alignItems="center ">
                    <FormControl >
                    <Input placeholder="Chat Name" mb={3}
                    onChange={(e) => setGroupChatName(e.target.value)}/>
             
                    </FormControl>
                    <FormControl >
                    <Input placeholder="Add Users eg:John,Hadiqa,Nemo" mb={1}
                    onChange={(e) => handleSearch(e.target.value)}/>
                     
                    </FormControl>
                    <Box w="100%" d="flex" flexWrap="wrap">
                   {selectedUsers.map((u) =>(
                       <UserBadgeItem
                        key={u._id}
                       user={u}
                       handleFunction={()=>handleDelete(u)}
                       />
                   ))}
                   </Box>
           {loading ? ( <div>Loading...</div>):(
               searchResult?.slice(0,4).map((user)=>(
                   <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
               ))
           )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModel