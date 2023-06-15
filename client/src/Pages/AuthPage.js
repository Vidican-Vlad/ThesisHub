import { Register } from "../Components/Register";
import { Login } from "../Components/Login";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo2.png"
import { register, login, resetToken, confirmRegistration, validateRegistration } from "../api/auth";
import "../css/auth.css";
import { Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    PinInput,
    PinInputField,
    HStack, 
    VStack,
    Button,
    ModalContent,
    ModalFooter} from "@chakra-ui/react";
export function AuthPage(){
    const [currentForm, setCurrentForm] = useState("login");
    const [files, setFiles] = useState([]);
    const [showRegModal, setShowRegModal] = useState(false);
    const [pin, setPin] = useState("");
    const navigate = useNavigate("");


    function onChangeFile(files){
        setFiles(files);
     }

    async function registerSubmit(payload){
        try {
            const data = new FormData();
            for (const key in payload) {
                data.append(key, payload[key]);
              }
            files.forEach(el =>{
                data.append("files", el);
            });
            const response = await register(data)
            alert(response.data.msg);
            if(response.status == 201)
                setCurrentForm("login");
            if(response.status == 200 && response?.data?.tmpId){
                localStorage.setItem("userTempID", response.data.tmpId);
                setShowRegModal(true);
            }

        } catch (error) {
            if(error?.response?.data?.msg){
                console.log("error on register request:" + error?.response?.data?.msg);
                alert(error?.response?.data?.msg);
                if(error.response.status === 300)
                    localStorage.setItem("userTempID", error.response.data.id);
                    setShowRegModal(true);
            }
        }
    }
    async function loginSubmit(payload){
        try {
            const response = await login(payload);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("accType", response.data.accType);
            localStorage.setItem("cycle", response.data.cycle);
            localStorage.setItem("userID", response.data.userID);
            navigate("/");
            console.log(response);
        } catch (error) {
            alert(error.response.data.msg);
            if(error?.response?.status === 403){
                console.log("error on login request:" + error?.response?.data?.msg);
                if(error?.response?.data?.id){
                    localStorage.setItem("userTempID", error.response.data.id);
                    setShowRegModal(true);
                }
            }
        }
    }
    async function handleRegisterConfirmation(){
        try {
            const res = await confirmRegistration(localStorage.getItem("userTempID"), pin);
            alert(res.data.msg);
            setShowRegModal(false);
            setCurrentForm("login");
        } catch (error) {
            if(error?.response?.data?.msg){
                alert(error?.response?.data?.msg);
                console.log("error on confirm register:" + error?.response?.data?.msg);
                if(error?.response?.status === 401){
                    setShowRegModal(false);
                }
            }
        }
    }

    async function handleResetToken(){
        try {
            const res = await resetToken(localStorage.getItem("userTempID"));
            alert(res.data.msg);
        } catch (error) {
            alert(error?.response?.data?.msg);
            console.log("error on reset security key:" +error?.response?.data?.msg);
            if(error?.response?.status === 401){
                setShowRegModal(false);
            }
        }
    }

    const toggleForm = (formName) =>{
        setCurrentForm(formName);
    }

        return (
        
            <div className="AuthPage">
                <Modal isOpen = {showRegModal} onClose={(e) => {setShowRegModal(false)}}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader color = {"white"}>Confirm your registration!</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <VStack>
                                <Text color={"white"}>Please enter the secret key to confirm your registration request</Text>
                                <HStack>
                                    <PinInput type='alphanumeric' size={"lg"} onChange={(value) => setPin(value)}>
                                        <PinInputField color={"white"}/>
                                        <PinInputField color={"white"}/>
                                        <PinInputField color={"white"}/>
                                        <PinInputField color={"white"}/>
                                        <PinInputField color={"white"}/>
                                    </PinInput>
                                </HStack>
                            </VStack>
                        </ModalBody>
                        <ModalFooter justifyContent={"space-between"}>
                            <Button colorScheme="green" onClick={(e) => {handleRegisterConfirmation()}}>Continue!</Button>
                            <Button colorScheme="red" onClick={(e) => {handleResetToken()}}>send secret key again</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <img src={logo} id = "logo"/>
                {
                    currentForm == "login" ?
                    <Login onFormSwitch = {toggleForm} setShowRegModal = {setShowRegModal} loginSubmit = {loginSubmit}/>:
                    <Register onFormSwitch = {toggleForm} onChangeFile = {onChangeFile} setShowRegModal = {setShowRegModal} registerSubmit = {registerSubmit}/>
                }
            </div>
        )
  }

