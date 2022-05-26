import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

export const SendFilepopUp = ({ sendMessage, newMessage, setnewMessage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileToBeSend, setFile] = useState("");
  const toast = useToast();
  const uploadHandler = async (e) => {
    e.preventDefault();

    if (!fileToBeSend) {
      toast({
        title: "Please Select File",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const data = new FormData();
    data.append("file", fileToBeSend);

    // const { msg } = await axios.post(
    //   "http://localhost:4000/api/v1/metachat/uploadFile",
    //   data,
    //   { withCredentials: true }
    // );

    fetch("http://localhost:5000/api/v1/metachat/uploadFile", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        toast({
          title: "Upload",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "not Upload",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });

    onClose();
  };
  const sendFile = (file) => {
    if (file == undefined) {
      toast({
        title: "Please Select An File",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset","shot-bot");
    data.append("cloud_name","dei6yfwmn");
    console.log(data);
    fetch("https://api.cloudinary.com/v1_1/dei6yfwmn/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setnewMessage(data.url.toString());
      })
      .catch((error) => {
        console.log(error);
      });
      onClose();
  };

  return (
    <>
      <Button colorScheme="blue" p={3} onClick={onOpen}>
        upload Here
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
            fontSize="40px"
          >
            Select File
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            justifyContent={"space-between"}
            flexDirection="column"
            alignItems={"center"}
          >
            <FormControl isRequired id="upload-file">
              <FormLabel>Upload file</FormLabel>
              <Input
                type={"file"}
                p={1.5}
                accept=".gif, .jpg, .png, .doc, .pdf"
                onChange={(e) => {
                  sendFile(e.target.files[0]);
                  setFile(e.target.files[0]);
                }}
              />
              <Input
                type="submit"
                p={1.5}
                mt={1.5}
                value="Get Url In Send Message Field"
                // onClick={uploadHandler}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
