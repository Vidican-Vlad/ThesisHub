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
    const filePicker = useRef(null);
    const [messages, setMessages] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]); //suggested user list
    const [socket, setSocket] = useState(io("http://localhost:3055/", {
            autoConnect: false,
            auth: {
                token: localStorage.getItem("token")
            },
        }));
    const [files, setFiles] =  useState([]);

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
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
      };

      
      useEffect(() => {
        if (socket && selectedConversation) {
          socket.on("file_uploaded", (data) => {
            sendMessage(data);
          });
      
          return () => {
            socket.off("file_uploaded");
          };
        }
      }, [socket, selectedConversation]);
    async function handleStartConversation(userID){
        try {
            let tempconv = await createConversation({userID});
            setConversations((prevConversations) => [...prevConversations, tempconv]);
            socket.emit("new_conversation", tempconv);
        } catch (error) {
            console.log(error);
        }
    }
    function sendMessage(attachements){
        const payload = {
            conversation: selectedConversation,
            content: messageBox.current.value,
            token: localStorage.getItem("token"),
            attachements: attachements
        }
        socket.emit("send_message", payload);
        messageBox.current.value = null;
        filePicker.current.value = null;
        setFiles([]);
    }
        
    function handleMessageLogic(){
        if(messageBox.current.value.trim() != "" && selectedConversation != null){
            if(Array.isArray(files) && files.length > 0){
                handleFileUpload();
            }else{
                sendMessage([]);
            }
        }
    }
    const handleFileUpload = () => {
        try {
            const data = [];
            const promises = files.map((file) => {
                return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const fileData = new Uint8Array(event.target.result);
                    const payload = { file: fileData, fileName: file.name };
                    data.push(payload);
                    resolve();
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsArrayBuffer(file);
                });
            });
        
            Promise.all(promises)
                .then(() => {
                    socket.emit('file_upload', data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }catch(error){
            console.log(error);
        }
      };
    
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

        getConversationsfromDB();
    },[]);

    useEffect(()=>{
        if(socket) {
            socket.connect();
            socket.on("connect", () =>{
                console.log("ws connection to the server");
            })
            socket.on("new_message", (data)=>{
                console.log(data);
                setMessages((prevMessages) => [...prevMessages, data]);
               
            })
            socket.on("new_conversation", (tempconv)=>{
                setConversations((prevConversations) => [...prevConversations, tempconv]);
            })
             socket.on("sendSuggestions", (data)=>{
                setSuggestedUsers(data);
            });

            return () => {
                // Clean up the event listeners and disconnect the socket
                socket.off("connect");
                socket.off("new_message");
                socket.off("new_conversation");
                socket.off("sendSuggestions");
                socket.off("file_uploaded");
                socket.disconnect();
              };
        }

    }, []);

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
                        <MessagesPanel filePicker = {filePicker} handleFileUpload = {handleFileUpload} handleFileChange = {handleFileChange} conversation = { selectedConversation} messages = {messages} messageBox = {messageBox} sendMessage = {handleMessageLogic} chatView = {chatView}/>
                    </div>
                </div>
        </div>
    )

}