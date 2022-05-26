// Author Name : Hadiqa khan
// Date of generation : 17 April 2022
// Date of last revision : 21-May-2022
// Version number: 4
import {createContext,useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext= createContext ();
const ChatProvider = ({children }) => {
    const [user,setUser] = useState();
    const [selectedChat,setSelectedChat]= useState();
    const [chats,setChats] =useState([])
    const [notification,setNotification] = useState([]);
    const history =useHistory();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        // if(!userInfo){
        //     history.push("/"); 
        // }
    },[history]);
    return <ChatContext.Provider value={{user,setUser,
        selectedChat,setSelectedChat,chats,
        setChats,
        notification,
        setNotification, 
    }}>{children}</ChatContext.Provider>;

};
export const ChatState= () =>{
    return useContext(ChatContext);
};

export default ChatProvider;

//Context provides a way to pass data through the component tree without having to pass props down manually at every level.