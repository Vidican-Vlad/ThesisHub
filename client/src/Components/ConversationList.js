import { useEffect, useState } from "react"
import { getConversations } from "../api/messaging";
import "../css/messaging.css";
import { Conversation } from "./Conversation";
import { AddConversation } from "./AddConversation";


export const ConversationList = ({resetSuggestedUsers, selectedConversation, conversations, onChange, handleTextInput, handleStartConversation, suggestedUsers})=>{

    const currentUser = localStorage.getItem("userID");
//     async function getConversations(){
//         try {
//             let convTemp = await getConversations();
//             setConversations(userTemp);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//    useEffect(()=>{
//     getData();
//    }, []);

   return(
    <div className="conversation-list">
        <AddConversation handleStartConversation = {handleStartConversation} suggestedUsers={suggestedUsers} handleTextInput = {handleTextInput} resetSuggestedUsers = {resetSuggestedUsers} />
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