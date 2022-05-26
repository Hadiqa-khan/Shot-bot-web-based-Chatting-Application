// Author Name : Hadiqa Khan
// Date of generation : 9 May 2022
// Date of last revision : 12-May-2022
// Version number: 1
import { Stack } from '@chakra-ui/react'
import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
const ChatLoading = () => {
   // purpose: The purpose is show the loading stack till the program is searching for the users
  return (
   <Stack>
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
  <Skeleton height='45px' />
    </Stack>
  )
}

export default ChatLoading