// Author Name : Hadiqa Khan
// Date of generation : 14 May 2022
// Date of last revision : 21-May-2022
// Version number: 3
import React,{useState} from 'react'
import {Box,Button,Tooltip,Text, Menu, MenuButton,Input, MenuList, Avatar, MenuItem, MenuDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,  useToast, Spinner, effect} from '@chakra-ui/react'
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons';
import {ChatState} from "../../Context/ChatProvider";
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import ChatLoading from "../ChatLoading"
import UserListItem from '../UserAvatar/UserListItem';
import axios from 'axios';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { getSender } from '../../config/ChatLogics';
const SideDrawer = () => {
    const[search,setSearch]=useState("");
    const[searchResult,setSearchResult]=useState([]);
    const[loading,setLoading]=useState(false);
    const[loadingChat,setLoadingChat]=useState(false);
    const { user, setSelectedChat,chats,setChats,
    notification,setNotification}= ChatState();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    
  const logoutHandler=()=>{
                          // purpose: The purpose is handle the logout of user
        localStorage.removeItem("userInfo");
        history.push("/");
    };
    const handleSearch=async () =>{
                              // purpose: The purpose is search the user on name or email
        if(!search)
        {
            toast({
                title:"Please enter User Email or Name to Search",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top-left",
            });
            return;
        }
        try{    
            setLoading(true)
            const config={
                headers:{Authorization:`Bearer ${user.token} `,
            },
            };
            const {data} = await axios.get(`/api/user?search=${search}`, config)
            setLoading(false)
            setSearchResult(data);
        }
        catch(error){
            toast({
                title:"Error Occured!",
                description:"Failed to load the search results",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            });
        }
    };
    const accessChat= async(userId)=>{
        try{          // purpose: The purpose is to access the chats to display on side drawer
            setLoadingChat(true);
            const config={
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${user.token} `,
            },
            };
        const {data}= await axios.post('/api/chat',{userId},config);
        if(!chats.find((c)=>c._id)) setChats([data,...chats]);
        setSelectedChat(data);
        setLoadingChat(false)
        onClose();
    }
        catch(error)
        {
            toast({
                title:"Error Occured!",
                description:error.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            });
          
        }

    };
  return (<>
   <Box d="flex"
   justifyContent='space-between'
   alignItems='center'
   bg="white"
   w="100%"
   p="5px 10px 5px 10px"
   borderWidth="5px">
       <Tooltip label="Search Users to chat " hasArrow placement="bottom-end">
           <Button variant="ghost" onClick={onOpen}>
    <i class ='fas fa-search'></i>
    <Text d={{base:'none',md:'flex'}} px='4'>
        Search User
    </Text>
           </Button>
             
       </Tooltip>
       <Text fontSize="2xl" fontFamily="Work sans" >
           Shot-Bot
       </Text>
       <div>
           <Menu>
               <MenuButton p={1}>
                   <NotificationBadge
                   count={notification.length}
                   effect={Effect.SCALE}>

                   </NotificationBadge>
                 {<BellIcon fontSize='2xl' m={1}/>}
               </MenuButton>
               <MenuList>
                   {!notification.length && "No New Messages"}
                   {notification.map((notif) => (
                       <MenuItem key={notif._id}
                        onClick={()=>{
                           setSelectedChat(notif.chat);
                           setNotification(notification.filter((n) => n !== notif));
                       }}>
                           {notif.chat.isgroupChat ? `New Message in ${notif.chat.chatName}`
                           :`New Message from ${getSender(user,notif.chat.users)}`}
                       </MenuItem>
                   ))}
               </MenuList>
           </Menu>
           <Menu>
               <MenuButton as={Button}  rightIcon={<ChevronDownIcon />} >
             
            <Avatar size='sm' cursor='pointer' name={user.name}
            src={user.picture}/>
               </MenuButton>
         <MenuList>
             <ProfileModel user={user}>
             <MenuItem>MyProfile</MenuItem>
             </ProfileModel>
             <MenuDivider />
             <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
         </MenuList>
           </Menu>
           
       </div>
   </Box>
   <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
       <DrawerOverlay>
           <DrawerContent>
               <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
               <DrawerBody>
               <Box d="flex" pb={2} >
                   <Input 
                   placeholder='Search by name or Email'
                   mr={2}
                   value={search}
                   onChange={(e)=> setSearch(e.target.value)}
                   />

                   <Button onClick={handleSearch}>Go</Button>
               </Box>
               {loading? (
                   <ChatLoading/>) : 
                   (searchResult?.map(user=>(
                   <UserListItem
                   key={user._id}
                   user={user}
                   handleFunction={()=>accessChat(user._id)}
                   />
                   ))
                )
}       
          {loadingChat && <Spinner ml="auto" d="flex"/>}
           </DrawerBody>
           </DrawerContent>
        
       </DrawerOverlay>

   </Drawer>
   </>
  )
}

export default SideDrawer