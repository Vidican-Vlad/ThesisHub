import { useEffect, useState } from "react"
import { getConversations } from "../api/messaging";
import "../css/messaging.css";
import { Conversation } from "./Conversation";
import { AddConversation } from "./AddConversation";
import { Divider } from "@chakra-ui/react";

export const ConversationList = ({resetSuggestedUsers, selectedConversation, conversations, onChange, handleTextInput, handleStartConversation, suggestedUsers})=>{

    const currentUser = localStorage.getItem("userID");
   return(
    <div className="conversation-list">
        <AddConversation handleStartConversation = {handleStartConversation} suggestedUsers={suggestedUsers} handleTextInput = {handleTextInput} resetSuggestedUsers = {resetSuggestedUsers} />
        <Divider orientation='horizontal' borderColor={"black"}/>
        {
            ((conversations?.length ?? 0) === 0) ?
            <p>no active conversations</p> :
            conversations.map(conversation =>{
                return <Conversation Conversation={conversation} selectedConversation={selectedConversation} key={conversation._id} onChange = {onChange} currentUser = {currentUser}/>
            })
        }
    </div>
   )

    
}