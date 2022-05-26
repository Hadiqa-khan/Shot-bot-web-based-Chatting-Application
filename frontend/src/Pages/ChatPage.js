 // Author Name : Hadiqa Khan
// Date of generation : 10 May  2022
// Date of last revision : 11-May-2022
// Version number: 2
//purpose: The purpose of this component is to render the side drawer, Mychats , chatbox on one page
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Box} from "@chakra-ui/layout"
import {ChatState} from "../Context/ChatProvider"
import SideDrawer from '../components/misc/SideDrawer'
import MyChats from '../components/misc/MyChats' 
import ChatBox from '../components/ChatBox'
const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain,setFetchAgain]= useState(false)
  return( <div style={{width: "100%"}}>
     {user && <SideDrawer/>}
    
 <Box
 d="flex" 
 justifyContent='space-between'
 w='100%'
 h='91.5vh'
 p='10px'>

      {user && <MyChats fetchAgain={fetchAgain} />}
       {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
 </Box>

    </div>

)}
export default ChatPage;
