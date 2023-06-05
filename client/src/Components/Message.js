import "../css/messaging.css";
import { Button, Divider, HStack,  Wrap, WrapItem } from '@chakra-ui/react'

import { getFileFromBackend } from "../api/proposals";
export const Message = ({message}) =>{
    const authUser = localStorage.getItem("userID")

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
            {
                (Array.isArray(message.attachements) && message.attachements.length > 0) &&
                <div className="messages-attachements">

                    <Divider borderColor={"black"} marginBottom={"5px"}/>
                    <Wrap spacing={"0px"}>
                        {message.attachements.map(el => {

                            return <WrapItem key={el._id}>
                                        <Button onClick={(e)=>{handleClick(el._id, el.displayName)}} colorScheme = {"facebook"} border= {"2px"}variant={"outline"}>{el.displayName}</Button>
                                    </WrapItem>
                        })}
                    </Wrap>
                
                </div>
            }
            
        </div>
    )
}