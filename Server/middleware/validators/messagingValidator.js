
import customError from "../../utils/customError.js";
import Conversation from "../../models/Conversation.js";
import User from "../../models/User.js";
import { isValidObjectId } from "mongoose";


async function validateCreateConversation (req, res, next){
    try {
        if(!req.body.userID){
            throw new customError("missing user ID from request", 400);
        }

        if(req.body.userID === req.user.id){
            throw new customError("you can't create a conversation with yourself", 400);
        }
        if (!isValidObjectId(req.body.userID)) {
            throw new customError("invalid userID provided", 400);
        }
        const existingUser = await User.findById(req.body.userID);
        if(!existingUser){
            throw new customError("the provided userID was not found, please try again", 400);
        }
        const existingConversation = await Conversation.find({
            $or:[
                {$and: [{user1: req.user.id}, {user2: req.body.userID}]},
                {$and: [{user1: req.body.userID}, {user2: req.user.id}]}
            ]
        }).exec();
        console.log(existingConversation);
        if(existingConversation.length > 0){
            throw new customError("a conversation with  the selected user already exists", 400);
        }
           
        next();
    } catch (error) {
        if(error instanceof customError){
            return res.status(error.statusCode).json({msg: error.message});
        }
        console.log(error);
        return res.status(500).json({error})
        
    }
}


export { validateCreateConversation };