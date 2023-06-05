import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea,
    Button
  } from '@chakra-ui/react'
import { useRef } from 'react';

export const ApplyToProposalModal = ({sendApplication, showModal, proposalID, proposalCycle, proposalOwner, handleShowModal, approved}) =>{
    const messageRef = useRef(null);
    function validateApplication(){
        const cycle = localStorage.getItem("cycle");
        const accType = localStorage.getItem("accType");
        const userID = localStorage.getItem("userID");
        if(messageRef.current.value.trim().length <3){
            alert("the message was too short or invalid");
            return null;
        }
        if(proposalOwner._id === userID){
            alert("you can't apply to your own proposal");
            return null;
        }
        if(proposalOwner.type === accType){
            alert("you can't apply to the proposals of users of the same type as yours");
            return null;
        }
        if(accType === "Student" && (cycle !== proposalCycle)){
            alert("this proposal was not meant for your study cycle");
            return null;
        }
        sendApplication(messageRef.current.value);
    }
    return(
        <Modal isOpen = {showModal} onClose={(e) => {handleShowModal(false)}} size={"xl"}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader color={'white'}>leave a message for the proposal owner</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {
                            (approved) ?
                            <Text>"an application was already approved by the owner of this proposal</Text>:
                            <Textarea placeholder='leave your message here...' color={"white"} ref = {messageRef}/>
                        }
                        
                    </ModalBody>
                    <ModalFooter justifyContent={"space-between"}>
                        <Button colorScheme='green' onClick={(e) =>{validateApplication()}} isDisabled = {approved ? true : false} >Send application</Button>
                        <Button onClick = {(e) => {handleShowModal(false)}} colorScheme='red'>cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )

}