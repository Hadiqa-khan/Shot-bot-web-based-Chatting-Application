// Author Name : Hadiqa Khan
// Date of generation : 9 May 2022
// Date of last revision : 12-May-2022
// Version number: 1
import { Avatar, Box ,Text} from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../Context/ChatProvider';
const UserListItem = ({user,handleFunction}) => {
 // purpose: The purpose is display the user name and email

    return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    bg="#E8E8E8"
    _hover={{
        background:"#38B2AC",
        color:"white",
    }}
    
    width="100%"
    d="flex"
    alignItems="center"
    color="black"
    px={3}
    py={2}
    mb={2}
    borderRadius="lg">
        <Avatar mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.picture}/>

        <Box>
            <Text>{user.name}</Text>
            <Text fontSize="xs"><b>Email: </b>
            {user.email}
            </Text>
        </Box>
        </Box>
  )
}

export default UserListItem