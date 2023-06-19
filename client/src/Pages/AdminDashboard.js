import { Navbar } from "../Components/Navbar";
import { useEffect, useRef, useState } from "react";
import "../css/dashboard.css"
import {
  Button,
  Center,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text
} from "@chakra-ui/react";
import { getTempUsers, validateRegistration } from "../api/auth";
import { getFileFromBackend } from "../api/proposals";
export function AdminDashboard(){
    const [tempUsers, setTempUsers] = useState([]);
    const [selectedUser, setSelectedUser] =useState("");
    const rejectMessageRef = useRef(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    async function getUsers(){
        try{
            const temp = await getTempUsers();
            console.log(temp);
            setTempUsers(temp.data);
        }catch(error){
            console.log(error)
        }
    }

    async function handleClick(fileID, name){
        try {
            const res = await getFileFromBackend(fileID);
            const url = URL.createObjectURL(res);
            const link = document.createElement('a');
            link.href = url;
            link.download = name;
            link.click();
        } catch (err) {
            console.log(err);
        }
    }

    function takeRejectInput(userTempID){
        setSelectedUser(userTempID);
        setShowRejectModal(true);
    }

    function resetRejectModal(){
        setSelectedUser("");
        setShowRejectModal(false);
    }

    async function handleRequestValidation(userTmpID, validationStatus=true, message=""){
        try {
            const answer = await validateRegistration({userTmpID, validationStatus, message});
            console.log(answer);
            if(answer?.data?.msg){
                alert(answer.data.msg);
            }
            resetRejectModal();
            setTempUsers((prevTempUsers) =>{
                return prevTempUsers.filter(el => el._id !== answer.data.removedID)
            });
        } catch (error) {   
            console.log(error);
        }
    }

    function isNonEmptyArray(attr){
        return (Array.isArray(attr) && attr.length > 0)
    }

    useEffect(()=>{
        getUsers();
    }, []);
    useEffect(()=>{
        console.log(tempUsers);
    }, [tempUsers]);

    return(
        <div className="admin-dashboard">
            <Navbar/>
            <Center>
                <Modal isOpen = {showRejectModal} onClose={(e) => {resetRejectModal()}}>
                    <ModalOverlay>
                        <ModalContent>
                            <ModalHeader color={"white"}>Please provide the requester feedback on why their request was rejected</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <Textarea color={"white"} ref = {rejectMessageRef} placeholder="leave your message here"/>
                            </ModalBody>
                            <ModalFooter justifyContent={"space-between"}>
                                <Button onClick={(e) => {handleRequestValidation(selectedUser, false, rejectMessageRef.current.value)}}>Reject request</Button>
                                <Button onClick={(e) => {resetRejectModal()}}>Go back</Button>
                            </ModalFooter>
                        </ModalContent>
                    </ModalOverlay>
                </Modal>
                {isNonEmptyArray(tempUsers)?
                <Accordion color={"white"} border={"2px"} width={"2xl"}>
                    {
                    tempUsers.map(el =>{
                        return <AccordionItem key = {el._id}>
                            <AccordionButton>
                                <Text>{el.email}</Text>
                                <AccordionIcon/>
                            </AccordionButton>
                            <AccordionPanel>
                                <Divider color={"white"} border={"1px"}  margin={"1.5"}/>
                                <VStack align={"start"}>
                                    <Text>name: {el.name}</Text>
                                    <Text>account type: {el.type}</Text>
                                    {(el.type === "Student") && <Text>study cycle: {el.cycle}</Text>}
                                    <HStack wrap={"wrap"}>
                                        {
                                            (Array.isArray(el.proofOfIdentity) && el.proofOfIdentity.length > 0) && el.proofOfIdentity.map(attachement =>{
                                                return <Button color={"white"} border={"1px"} key={attachement._id} onClick = {()=> handleClick(attachement._id, attachement.displayName)} >{attachement.displayName}</Button>
                                            })
                                        }
                                    </HStack> 
                                </VStack>
                                <Divider color={"white"} border={"1px"} margin={"1.5"}/>
                                <HStack justify={"center"}>
                                    <Button color={"white"} variant={"outline"} border={"1px"} onClick={(e) => takeRejectInput(el._id)}>reject</Button>
                                    <Button color={"white"} variant={"outline"} border={"1px"} onClick={(e) => handleRequestValidation(el._id, true, "")}>accept</Button>
                                </HStack>
                            </AccordionPanel>
                        </AccordionItem>
                    })    
                }
                </Accordion>:<Text color={"white"}>Currently no onboarding requests waiting for approval</Text>}

            </Center>
        </div>
    )
}