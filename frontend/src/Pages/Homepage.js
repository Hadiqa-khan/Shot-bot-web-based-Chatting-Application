// Author Name : Hadiqa Khan
// Date of generation : 10 May 2022
// Date of last revision : 11-May-2022
// Version number: 2
//purpose: The purpose of this component is to return the user to correct pages
import React, { useEffect } from 'react'
import {Container,Box,Text,Tabs, TabList, TabPanels, TabPanel, Tab,TabPane} from '@chakra-ui/react'
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useHistory } from 'react-router-dom';
const Homepage = () => {
  const history= useHistory();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) history.push("/chats");
  },[history]);
  return (
    <Container maxW="xl" centerContent>
      <Box d='flex'
      justifyContent='center'
      p={3}
      bg={'white'}
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
      <Text fontSize='3xl' fontFamily="Work sans" color="black">Shot-bot
      </Text>
      </Box>
      <Box bg={"white"} 
       w="100%" color="black"
       p={4} borderRadius="lg"  
      borderWidth="1px">
      <Tabs variant='soft-rounded' colorScheme='purple'>
        <TabList mb='1em'>
          <Tab width="50%">Login</Tab>
          <Tab  width="50%">Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {<Login/>}
          </TabPanel>
          <TabPanel>
             {<Signup/>}
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage