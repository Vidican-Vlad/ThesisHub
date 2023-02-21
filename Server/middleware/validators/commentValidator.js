import Comment from "../../models/Comment.js";
import customError from "../../utils/customError.js";
import { validateString } from "./validateString.js";


async function validateCommentCreation(req, res, next){
    try {
        if(req.user.type == "Admin"){
            throw new customError("Administrators aren't allowed to create comments", 400);
        }
        validateString(req.body.content,"content", process.env.COMMENT_MIN_LENGTH);
        next();
    } catch (error) {
        if(error instanceof customError){
            return res.status(error.statusCode).json({msg: error.message});
        }
        console.log(error);
        return res.status(500).json(error);
    }
}

async function addCommentToRequest(req, res, next){
    try {
        validateString(req.params.commentID, "commentID");
        const comment = await Comment.findById(req.params.commentID);
        if(!comment){
            throw new customError("the comment ID provided does not exist", 400);
        }
        req.comment = comment;
        next();
    } catch (error) {
        if(error instanceof customError){
            return res.status(error.statusCode).json({msg: error.message});
        }
        console.log(error);
        return res.status(500).json(error);
    }
}

async function isCommentOwner(req, res, next){
    try {
        if(req.user.id == req.comment.owner._id){
            req.auth = true;
        }
        next();
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

export { validateCommentCreation, addCommentToRequest, isCommentOwner };