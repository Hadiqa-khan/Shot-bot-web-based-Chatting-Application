// Author Name : Hadiqa Khan
// Date of generation : 15 May 2022
// Date of last revision : 21-May-2022
// Version number: 2
import React from 'react';
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
  // purpose: The purpose is to get the user and display its info
const ProfileModel = ({user,children}) => {
 
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    {children ? (<span onClick={onOpen}>{children}</span>
    ): ( <IconButton d= {{base:"flex"}} 
    icon={<ViewIcon/>
  }
  onClick={onOpen}
    />
  )}
  
  <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height="400px">
          <ModalHeader 
          fontSize="40px"
          fontFamily="Work sans"
          d="flex"
          justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
                    >
          <Image borderRadius="full" boxSize="150px" 
          src={user.picture}
          alt={user.name}
          />
          <Text fontSize={{base:"28px", md:"30px"}}
          fontFamily="Work sans">
            Email:{user.email}
          </Text>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="purple" mr={3} onClick={onClose}>
              Close
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
</>
  );
};
export default ProfileModel;