
import { instance, generateHeader } from "./Axios"

const getConversations = async () =>{
    const res = await instance.get("messaging/", generateHeader());
    return res.data;
}

const getMessages = async (conversationID) =>{
    const res = await instance.get(`messaging/${conversationID}`, generateHeader())
    return res.data
}

const createConversation = async(data) =>{
    console.log(data);
    const res = await instance.post("messaging/", data, generateHeader());
    return res.data
}

export { getConversations, getMessages, createConversation };