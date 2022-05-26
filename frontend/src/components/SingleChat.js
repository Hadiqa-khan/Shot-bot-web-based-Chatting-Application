// Author Name :Hadiqa Khan
// Date of generation : 11 May 2022
// Date of last revision : 21-May-2022
// Version number: 6
import React, {useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import {Box,FormControl,IconButton,Input,Spinner,Text, useToast} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender,getSenderFull } from '../config/ChatLogics';
import {SendFilepopUp} from '../components/SendFilepopUp';
import ProfileModel from './misc/ProfileModel';
import UpdateGroupChatModel from './misc/UpdateGroupChatModel';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import './style.css';
import io from "socket.io-client";
import Lottie from 'react-lottie'
import animationData from "../animations/typing.json"

const ENDPOINT = "http://localhost:5000";
var socket,selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const[messages,setMessages] = useState([])
    const[loading,setLoading] = useState(false)
    const[newMessage,setNewMessage] = useState()
    const[socketConnected,setSocketConnected]=useState(false)
    const[typing,setTyping]=useState(false)
    const[isTyping,setIsTyping]=useState(false);
    const toast = useToast()
    const defaultOptions = {
        loop:true,
        autoplay:true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio:"xMidYmid slice",
        },
    }
    const {user,selectedChat,setSelectedChat,notification,setNotification} = ChatState();
    useEffect(()=>{
         // purpose: The purpose is to connect to the server socket 
        socket= io(ENDPOINT);
        socket.emit('setup',user);
        socket.on("connected",()=>setSocketConnected(true))
        socket.on('typing',()=>setIsTyping(true))
        socket.on('stop typing',()=>setIsTyping(false))
        console.log("in use Effect");
    
     },[]);
 
 const fetchMessage = async () =>{  // purpose: The purpose is to fetch the messages for the currently selected chat
     if(!selectedChat) return;
    try {
        const config = {
            headers: {
                Authorization:`Bearer ${user.token}`,
            },
        };
        setLoading(true)
        const {data}=await axios.get(`/api/message/${selectedChat._id}`,
        config
        );
        setMessages(data);
        setLoading(false);
        socket.emit('join chat',selectedChat._id); //with id of this chat new room will be created
    } catch (error) {
        toast({
            title : "Error Occured",
            description:"Failed to send the Message",
            status:"error",
            duration:5000,
            isClosable:true,
            position:'bottom'

        })
        
    }
 };
 const sendMessage= async(event)=>{
 // purpose: The purpose is send the message to users
    if(event.key === "Enter" && newMessage)
    {
        socket.emit('stop typing',selectedChat._id)
        try {
            const config = {
                headers : {
                    "Content-type":"application/json"
                    ,
                    Authorization:`Bearer ${user.token}`,
                }
            }
            setNewMessage("");
            const {data} = await axios.post('/api/message',{
                content:newMessage,
                chatId:selectedChat,
            },config)
            
            socket.emit('new message',data);
        
            setMessages([...messages,data]);
                   

        } catch (error) {
            toast({
                title : "Error Occured",
                description:"Failed to send the Message",
                status:"error",
                duration:5000,
                isClosable:true,
                position:'bottom'

            })
            
        }
    }

}

 useEffect (()=>{
        fetchMessage();
        selectedChatCompare = selectedChat;
 },[selectedChat]); //to call the above functions


 useEffect(()=>{
     socket.on('message recieved',(newMessageRecieved)=>{
         if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id)
         {
            if(!notification.includes(newMessageRecieved)) //for notification bar
             {
                 setNotification([newMessageRecieved,...notification]);
                 setFetchAgain(!fetchAgain);
             }
         }
         else {
             setMessages([...messages,newMessageRecieved]);
         }
        });
     });

 

 const typingHandler = (e)=>{
        //to hanlde the typing and stop typing 
    setNewMessage(e.target.value);
    //if(!socketConnected) return;
    if(!typing)
    {
        setTyping(true);
        socket.emit('typing',selectedChat._id);
    }
    //when to stop typing 
    let lastTypingTime=new Date().getTime()
    var timerLength = 3000; //3sec
    setTimeout(()=>{
            var timeNow = new Date().getTime();
            var timeDiff = timeNow- lastTypingTime;
            if(timeDiff >= timerLength && typing)
            {
                socket.emit('stop typing',selectedChat._id);
                setTyping(false);
            }
            },timerLength)
 }
 
    return  (
        <>
  {selectedChat ? (
      <>
      <Text
      fontSize={{base: "28px", md:"30px"}}
      pb={3}
      px={2}
      w="100%"
     fontFamily="Work sans"
     d="flex"
     justifyContent={{base:"space-between"}}
     alignItems="center"
      >
          <IconButton d={{base: "flex" , md: "none"}}
          icon={<ArrowBackIcon/>}
          onClick={()=>setSelectedChat("")}/>
          {messages &&
           (!selectedChat.isgroupChat ? (
           <>
          {getSender(user,selectedChat.users)}
          <ProfileModel 
          user={getSenderFull(user,selectedChat.users)}></ProfileModel>
          </>
          ):(
              <>
              {selectedChat.chatName.toUpperCase()} 
              <UpdateGroupChatModel fetchMessage={fetchMessage}
               fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              />
              </>
          ))}

      </Text>
      <Box d="flex"
      flexDir="column"
      justifyContent="flex-end"
      p={3}
      bg="#E8E8E8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden">
          {loading ? (
              <Spinner
              size="xl"
              w={20}
              h={20}
              alignSelf="center"
              margin="auto"/>
          ):(
              <div className='messages'>
                 <ScrollableChat messages={messages}/>
              </div>
          )}
          <FormControl onKeyDown={sendMessage} 
          isRequired mt= {3} >
              {isTyping ? (
           <div>
        
            <Lottie 
              options={defaultOptions}
              width={70}
              style={{marginBottom:15,marginLeft:0}}
              /> 
              </div>
            )
              :(<></>)}
              <Input variant="filled"
              bg="#E0E0E0"
              placeholder='Write your Message'
              onChange={typingHandler}
              value={newMessage}
              ></Input>
          </FormControl>
          <SendFilepopUp
                sendMessage={sendMessage}
                newMessage={newMessage}
                setnewMessage={setNewMessage}
              />
      </Box>
      </>
  ) : (
      <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
              Click on a user to start Chatting
          </Text>
      </Box>
  )}
  </>
  );
};

export default SingleChat;