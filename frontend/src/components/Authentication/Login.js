// Author Name : Hadiqa khan
// Date of generation : 6 April 2022
// Date of last revision : 21-May-2022
// Version number: 2
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import {useHistory} from "react-router-dom"
import axios from "axios"

const Login = () => {
  // Input: Email and Password
   // purpose: Creating the login Interface 
    const [show,setShow]=useState(false)
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const toast = useToast()
    const history =useHistory()
    const [loading,setLoading]=useState(false)
    const handleClick= ()=> setShow(!show); //handle the show button state
    //handle the user input On submit button and query the database 
    const submitHandler= async()=>{
        setLoading(true);
    if(!email || !password ){
      toast({
        title:"Please fill all fields",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:'bottom'
      });
      setLoading(false);
      return;
    }
   
    try{
      const config= {
        headers:{
          "Content-type":"application/json",
        },
      };
      const { data } = await axios.post("/api/user/login",{email,password},config);
      console.log(data);
      toast({
        title:"Login Successful !",
        status:"success",
        duration:5000,
        isClosable:true,
        position:'bottom'
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      history.push('/chats');
    }
    catch(error)
    {
      toast({
        title:"Error Occured !",
        description: error.response.data.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:'bottom'
      });
      setLoading(false);
    }
    }

    return (
        <VStack spacing="5px" color="black">
            <FormControl isRequired id='email' >
                <FormLabel> Email    </FormLabel>
                <Input placeholder='Enter Your Email' 
                 value={email}
                onChange={(e)=>setEmail(e.target.value)}
                /> 
            </FormControl>
    
            <FormControl isRequired id='password' >
                <FormLabel> Password    </FormLabel>
                <InputGroup>
                <Input 
                type={show ?"text" : 'password'}
                placeholder='Enter Your Password' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                /> 
                <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
                <Button
                 colorScheme="purple"
                 width="100%"
                 style={{marginTop: 15}}
                 onClick={submitHandler}
                 isLoading={loading}>
                Login
                </Button>

                
                <Button
                variant="solid"
                 colorScheme="red"
                 width="100%"
                 style={{marginTop: 15}}
                 onClick={()=>{
                     setEmail("guest@example.com");
                     setPassword("123");
                 }}>
                 Get Guest User Credentials
                </Button>
        </VStack>
      )
}

export default Login