// Author Name : Hadiqa Khan
// Date of generation : 9 May 2022
// Date of last revision : 12-May-2022
// Version number: 1
import { Box } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain,setFetchAgain}) => {
   // purpose: The purpose is to create a chatBox and display chats
  const {selectedChat}=ChatState();
  return (
    <Box d={{base:selectedChat ? "flex" : "none", md:"Flex"}}
    alignItems="center"
    flexDir="column"
    p={3}
    bg='white'
    w={{base:"100%", md:"68%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /></Box>
  )
}

export default ChatBox