import { useEffect, useRef, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { ConversationList } from "../Components/ConversationList";
import { MessagesPanel } from "../Components/MessagesPanel";
import io from "socket.io-client";
import { SuggestedUserList } from "../Components/SuggestedUserList";
import { createConversation, getConversations, getMessages } from "../api/messaging";
import "../css/messaging.css";
import { BsSearch } from "react-icons/bs";


export function MessagesPage(){

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const  messageBox = useRef(null);
    const chatView = useRef(null);
    const [messages, setMessages] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]); //suggested user list
    const [socket, setSocket] = useState(null);

    async function getMessagesFromDB(){
        if(selectedConversation != null){
            let temp = await getMessages(selectedConversation);
            setMessages(temp);
        }
    }
    function handleConversationChange(id){
        setSelectedConversation(id);
        socket.emit("select_conversation", id)
    }

    function resetSuggestedUsers(){
        setSuggestedUsers([]);
    }
    async function handleStartConversation(userID){
        try {
            let tempconv = await createConversation({userID});
            setConversations((prevConversations) => [...prevConversations, tempconv]);
            socket.emit("new_conversation", tempconv);
        } catch (error) {
            console.log(error);
        }
    }
    function sendMessage(){
        const payload = {
            conversation: selectedConversation,
            content: messageBox.current.value,
            token: localStorage.getItem("token")
        };
        if(payload.content.trim() != "" && selectedConversation != null){
            socket.emit("send_message", payload);
            messageBox.current.value = "";
        }
    }
    useEffect(()=>{
        getMessagesFromDB()
    }, [selectedConversation])
    async function getConversationsfromDB(){
        try {
                let convTemp = await getConversations();
                setConversations(convTemp);
            } catch (err) {
                console.log(err);
            }
    }



    function handleTextInput(text){
        generateSuggestions(text);
    }

    useEffect(()=>{
       const tempSocket = io("http://localhost:3055/", {
            autoConnect: false,
            auth: {
                token: localStorage.getItem("token")
            }
        });
        setSocket(tempSocket);
        getConversationsfromDB();
        console.log("it changed");

    },[]);

    useEffect(()=>{
        if(socket) {
            console.log("socket changed");
            socket.connect();
            socket.on("connect", () =>{
                console.log("ws connection to the server");
            })
            socket.on("new_message", (data)=>{
                setMessages((prevMessages) => [...prevMessages, data]);
               
            })
            socket.on("new_conversation", (tempconv)=>{
                setConversations((prevConversations) => [...prevConversations, tempconv]);
            })
             socket.on("sendSuggestions", (data)=>{
                setSuggestedUsers(data);
                console.log(data);
            });
        }

    }, [socket]);

    useEffect(()=>{
        const container = chatView.current
        if(container){
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    function generateSuggestions(text){
        socket.emit("getSuggestions", text);
    }
    
    return(
        <div className="messages-page">
            <Navbar/>
                <div className="messsages-page-main">
                    <ConversationList handleStartConversation = {handleStartConversation} resetSuggestedUsers = {resetSuggestedUsers}
                        suggestedUsers = {suggestedUsers}  selectedConversation = {selectedConversation}
                        conversations = {conversations} onChange = {handleConversationChange}
                        handleTextInput = {handleTextInput}/>
                    <div className="message-panel-wrapper">
                        <MessagesPanel conversation = { selectedConversation} messages = {messages} messageBox = {messageBox} sendMessage = {sendMessage} chatView = {chatView}/>
                    </div>
                </div>
            {/* <textarea onChange={(e) => generateSuggestions(e)} placeholder="enter the user's name here..." ></textarea>
            <SuggestedUserList users={users}/>
            {/* <div className="messages-page-main">
                <ConversationList conversations = {conversations} selected = {selectedConversation} handleChange = {handleConversationChange}/>
            </div> */}
        </div>
    )

}