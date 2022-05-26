// Author Name : Hadiqa khan
// Date of generation : 6 April 2022
// Date of last revision : 20-May-2022
// Version number: 2
import React, { useState } from 'react'
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import {useHistory} from "react-router-dom"
import axios from "axios"
// purpose: Creating the login Interface
const Signup = () => {
  const [show,setShow]=useState(false)
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [confirmpassword,setConfirmpassword]=useState()
  const [password,setPassword]=useState()
  const [picture,setPic]=useState()
  const [loading,setLoading]=useState(false)
  const toast = useToast()
  const history =useHistory()
  const handleClick= ()=> setShow(!show); //handle the show button state
   const postDetails=(pics)=>{ // Input: Image file uploaded by a user
                             // Output: check the format 
                            // purpose: The purpose is to check the format of image uploaded by the user and verify
                            // expected output: Data posted or error
    setLoading(true);
    if (pics === undefined)
    {
      toast( 
        {
          title:"Please Select an Image ! ",
          staus:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",

        }
      )
      return;
    }
    if (pics.type==="image/jpeg" || pics.type==="image/png")
    {
      const data = new FormData();
      data.append("file",pics);
      data.append("upload_preset","shot-bot");
      data.append("cloud_name","dei6yfwmn");
      fetch("https://api.cloudinary.com/v1_1/dei6yfwmn/image/upload",
      {
        method:"post",
        body:data,
      })
      .then((res)=>res.json())
      .then((data) =>{
        setPic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false);})
        .catch((err) => {
          console.log(err);
         setLoading(false);
        });
    }
    else{
      toast( 
        {
          title:"Please Select an Image ! ",
          staus:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",

        }
      );
      setLoading(false);
      return;
    }

   };
   const submitHandler = async()=>{ // Input: Handle the input of user on sign Up button
                                    // Output: Toasts on the basis of fields
                                  // purpose: The purpose is to check the fields and post the request to Database
                                  // expected output: Registration Successful or Error Occured
    setLoading(true);
    if(!name || !email || !password || !confirmpassword){
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
    if (password !== confirmpassword)
    {
      toast({
        title:"Passwords Donot Match !",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:'bottom'
      });
      return;
    }
    try{
      const config= {
        headers:{
          "Content-type":"application/json",
        },
      };
      const { data } = await axios.post("/api/user",{name,email,password,picture},config);
      console.log(data);
      toast({
        title:"Registration Successful !",
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

    };
    
    
    return (
    <VStack spacing="5px" color="black">
        <FormControl isRequired id='first-name' >
            <FormLabel> Name    </FormLabel>
            <Input placeholder='Enter Your Name' 
            onChange={(e)=>setName(e.target.value)}
            /> 
        </FormControl>
        <FormControl isRequired id='email' >
            <FormLabel> Email    </FormLabel>
            <Input placeholder='Enter Your Email' 
            onChange={(e)=>setEmail(e.target.value)}
            /> 
        </FormControl>

        <FormControl isRequired id='password' >
            <FormLabel> Password    </FormLabel>
            <InputGroup>
            <Input 
            type={show ?"text" : 'password'}
            placeholder='Enter Your Password' 
            onChange={(e)=>setPassword(e.target.value)}
            /> 
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
            </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl isRequired id='password' >
            <FormLabel> Confirm Password    </FormLabel>
            <InputGroup size="md">
            <Input 
            type={show ?"text" : 'password'}
            placeholder='Confirm Password' 
            onChange={(e)=>setConfirmpassword(e.target.value)}
            /> 
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
            </Button>
            </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired id="pic"> 
          <FormLabel>Upload Your Picture</FormLabel>
            <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e)=> postDetails(e.target.files[0])}
            />
          </FormControl>

            <Button
             colorScheme="purple"
             width="100%"
             style={{marginTop: 15}}
             onClick={submitHandler}
             isLoading={loading}>

             Sign Up
            </Button>
    </VStack>
  )
}

export default Signup