// Author Name : Hadiqa Khan
// Date of generation :  25 April 2022
// Date of last revision : 15-May-2022
// Version number: 2
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, useToast, Stack,Text } from '@chakra-ui/react';
import axios from 'axios';
import { useState , useEffect} from 'react'
import { ChatState } from '../../Context/ChatProvider'
import ChatLoading from '../ChatLoading'
import {getSender} from '../../config/ChatLogics'
import GroupChatModel from './GroupChatModel';
const MyChats = ({fetchAgain}) => {
  const [loggedUser,setLoggedUser]=useState();
  const toast =useToast();
  const { selectedChat,setSelectedChat,user,chats,setChats} = ChatState();
  const fetchChats= async()=>{ 
                        // purpose: The purpose is to fetch the chats from the data base
    try{
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      };
    
    const {data} = await axios.get("/api/chat",config);
    setChats(data);
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
  }
}
useEffect(() => {
    // purpose: The purpose is to fetch the user info from the localstorage of browser
  setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  fetchChats();
}, [fetchAgain]);

  return (

<Box d={{base: selectedChat ? "none":"flex", md:"flex"}}
flexDir="column"
alignItems="center"
p={3}
bg="white"
w={{base:"100%",md:"31%"}}
borderRadius="lg"
borderWidth="1px"
 >
<Box pb={3}
px={3}
fontSize={{base:"28px", md:"30px"}}
fontFamily="Work Sans"
d="flex"
w="100%"
justifyContent="space-between"
alignItems="center">
  My chats
  <GroupChatModel>
  <Button d="flex"
  fontSize={{base:"17px", md:"10px", lg:"17px"}}
  rightIcon={<AddIcon/>}
  >
    New Group Chat
  </Button>
  </GroupChatModel>
</Box>
<Box d="flex"
flexDir="column"
p={3}
bg="#F8F8F8"
w="100%"
h="100%"
borderRadius="lg"
overflowY="hidden" >
{chats?(
<Stack overflowY="scroll">
{chats.map((chat)=>(
  <Box 
  onClick={() => setSelectedChat(chat)}
  cursor="pointer"
  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
  color={selectedChat === chat ? "white" : "black"}
  px={3}
  py={2}
  borderRadius="lg"
  key={chat._id}
>
  <Text>
    {!chat.isgroupChat?
      getSender(loggedUser,chat.users)
    :chat.chatName}
  </Text>
  </Box>
 
))}
</Stack>):(<ChatLoading/>)}
</Box>
</Box>  );
}

export default MyChats;