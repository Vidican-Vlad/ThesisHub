import { MessagesList } from "./MessagesList"
import "../css/messaging.css";
import { Kbd } from '@chakra-ui/react'

export const MessagesPanel = ({conversation, messages, messageBox, sendMessage, chatView}) =>{

    function handleChange(e){
        if(e.keyCode === 13 && e.shiftKey){
            e.preventDefault();
            sendMessage();
        }
    }
    return (
    <div className="messages-panel">
        <MessagesList messages={messages} conversation = {conversation} chatView = {chatView} />
        <textarea id="message" name="message" placeholder= {"press <Shift> + <Enter> to send the message ..."} ref={messageBox} onKeyDown={(e)=>{handleChange(e)}}></textarea>
    </div>
    )
}