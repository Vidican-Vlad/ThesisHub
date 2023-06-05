import Conversation from "../models/Conversation.js";
import User from "../models/User.js";
import Message from "../models/Message.js";
import { authWS } from "../middleware/auth.js";
import file from "../models/File.js";


async function getConversations (req, res){
    try {
        const conversations = await Conversation.find({
            $or:[
                { user1: req.user.id},
                { user2: req.user.id}
            ]})
            .populate({path: "user1", select:["_id", "name", "email", "type"]})
            .populate({path: "user2", select:["_id", "name", "email", "type"]})
            .select(["-__v"])
            .exec();
        return res.status(200).json(conversations);   

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// async function generateSuggestions(req, res, next){
//     try {
//         if(!req.params.name){
//             return res.status(200).json([]);
//         }
//         const suggestions = await User.find({
//             name: {$regex: req.params.name, $options: "i"}
//         })
//         .limit(3)
//         .select(["_id","email","name","type","cycle"])
//         .exec();
//         return res.status(200).json()
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// }

async function createConversation (req, res){
    try {
        let tempconversation = await Conversation.create({
            user1: req.user.id,
            user2: req.body.userID
        })
        await tempconversation.populate([
            {path: "user2", select:["_id", "name", "email", "type"]},
            {path: "user1", select:["_id", "name", "email", "type"]}
        ])
        return res.status(200).json(tempconversation);        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

async function getMessages (req, res){
    try {
        if(!req.params.conversationID){
            return res.status(400).json({msg: "missing conversation ID from the request"});
        }
        let messages =  await Message.find({conversation: req.params.conversationID}).populate([
            {path:"sender", select:["_id", "email", "name", "type"]},
            {path:"attachements", select: ["_id", "extension", "displayName"]}
        ]);
        return res.status(200).json(messages);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const socketIoHandler = (io) =>{
    io.on('connection', (socket) =>{
        console.log(`a client connected to the websocket:${socket}`);
    })
    socket.on("disconnect", ()=>{
        console.log("A client disconnected from the websocket");
    })
}

async function getUserSugestions(input){
    try {
        const users = await User.find({ email: { $regex: `^${input}`, $options: "i" } })
            .limit(3)
            .select(["_id","name","email","type","cycle"])
            .exec();
        return users;
    } catch (error) {
        console.log(error);
    }
}

async function createMessage(input, userID){
    try {
        console.log(input);
        let fileIDs;
        if(Array.isArray(input.attachements) && input.attachements.length > 0){
            let files = input.attachements.map((el) =>file.create(el));
            fileIDs = (await Promise.all(files)).map(el => el._id);
        }else{
            fileIDs = [];
        }
        console.log(fileIDs)
        let message = await Message.create({
            content: input.content,
            sender: userID,
            conversation: input.conversation,
            attachements:fileIDs
        })
        await message.populate([
            {path:"sender", select:["_id", "email", "name", "type"]},
            {path:"attachements", select: ["_id", "extension", "displayName"]}
        ]);
        return message;
    } catch (error) {
        console.log(error);
    }
} 

export { createMessage, getConversations, getMessages, createConversation, getUserSugestions, socketIoHandler };