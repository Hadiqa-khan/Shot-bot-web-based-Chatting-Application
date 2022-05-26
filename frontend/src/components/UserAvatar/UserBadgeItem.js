// Author Name : Hadiqa Khan
// Date of generation : 9 May 2022
// Date of last revision : 12-May-2022
// Version number: 1
import { Badge } from "@chakra-ui/layout";
import React from 'react'
import { CloseIcon } from '@chakra-ui/icons'

const UserBadgeItem = ({user,handleFunction}) => {  // purpose: The purpose is to display the user nname
  return (
    <Badge px={2}
    py={2}
    m={1}
    mb={2}
    borderRadius="lg"
    variant="solid"
    fontSize={12}
    backgroundColor="purple"
    color="white"
    cursor="pointer"
    onClick={handleFunction}
    >
        {user.name}

        <CloseIcon p={1}/>
    </Badge>
  )
}

export default UserBadgeItem