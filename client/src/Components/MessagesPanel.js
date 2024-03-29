import { MessagesList } from "./MessagesList"
import "../css/messaging.css";
import { Kbd, VStack, color } from '@chakra-ui/react'

export const MessagesPanel = ({filePicker, handleFileUpload, handleFileChange, conversation, messages, messageBox, sendMessage, chatView}) =>{

    function handleChange(e){
        if(e.keyCode === 13 ){
            e.preventDefault();
            if(e.shiftKey){
                messageBox.current.value += "\n";
            }
            else if(e.altKey &&  messageBox.current.value.trim() === ""){
                handleFileUpload();
            }
            else{
                sendMessage();
            }
        }
    }
    return (
    <div className="messages-panel">
        <MessagesList messages={messages} conversation = {conversation} chatView = {chatView} />
        <VStack width={"full"}>
            <textarea id="message" name="message" placeholder= {"press <Shift> + <yEnter> to add new line and <Alt> + <Enter> to send just attachements without message"} ref={messageBox} onKeyDown={(e)=>{handleChange(e)}}></textarea>
            <input type="file" multiple onChange={handleFileChange} style={{color: "white"}} ref = {filePicker}/>
        </VStack>
    </div>
    )
}