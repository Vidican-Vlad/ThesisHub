import {Message} from "./Message";
import "../css/messaging.css";
export const MessagesList = ({messages, chatView})=>{
    return(

        <div className="messages-list" ref={chatView}>
            {
                ((messages.length ?? 0) === 0) ?
                <p> no messages in this conversation or no conversation selected</p>:
                messages.map(message =>{
                    return <Message message = {message} key = {message._id}/>
                })
            }
        </div>
    )
}