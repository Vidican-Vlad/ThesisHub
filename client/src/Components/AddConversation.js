import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Stack,
    color
  } from '@chakra-ui/react'
import { SuggestedUser } from './SuggestedUser';

  import { useState } from 'react';

  export function AddConversation({suggestedUsers, handleTextInput, handleStartConversation, resetSuggestedUsers}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    //const [value, setValue] = useState("");

    function searchBoxChange(e){
        handleTextInput(e.target.value);
    }

    function handleClose(){
        resetSuggestedUsers()
        onClose()
    }

    function handleuserClick(e){
       console.log(e.target)
    }

    return (
      <>
       <Button onClick={onOpen} textColor={"black"} borderColor={"black"} variant="outline">Add users</Button>
        <Modal isOpen={isOpen} onClose={handleClose}  scrollBehavior='inside' colorScheme = "red">
          <ModalOverlay />
          <ModalContent bg="gray.800" color={"white"}>
            <ModalHeader>Search for users to chat with</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input variant = "filled" placeholder='search for users' _placeholder= {{ opacity: 1, color: 'white' }} onChange = {(e)=>{searchBoxChange(e)}} color={"white"}/>
                <Stack direction={['column']} spacing='10px'>{
                    suggestedUsers.map(user =>{
                        return <SuggestedUser user={user} key={user._id} handleStartConversation = {handleStartConversation}/>
                    })
                }
                </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }