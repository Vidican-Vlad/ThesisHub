import "../css/messaging.css";
import { Divider } from '@chakra-ui/react'

export const Message = ({message}) =>{
    const authUser = localStorage.getItem("userID")
    return(
        <div className={message.sender._id === authUser ? "message message-own" : "message message-other" }>
            <div className="message-header">
                <p>{message.sender.name}</p>
                <p>{new Date(message.createdAt).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric"})}</p>
            </div>
            <Divider/>
            <div className="nessage-content">
                <pre>
                    {message.content}
                </pre>
            </div>
            <div className="messages-attachements">
                {/* <p>tbd</p> */}
            </div>
        </div>
    )
}