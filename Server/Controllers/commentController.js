import { validateString } from "../middleware/validators/validateString.js";
import Comment from "../models/Comment.js";
import customError from "../utils/customError.js";

async function createComment (req, res){
    try {
        const comment = await Comment.create({
            content: req.body.content,
            parentPost: req.post.id,
            owner: req.user.id
        })
        await comment.populate({path:"owner", select:["name","_id","type"]})
        return res.status(200).json(comment);      
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function deleteComment (req, res){
    try {
        if(!req.params.commentID){
            throw new customError("the commentID is missing from the request", 400);
        }
        const tag = await Comment.findByIdAndDelete(req.params.commentID);
        if(!tag){
            throw new customError("no tag was found with that ID",400);
        }
        return res.status(200).json({msg: "the tag was deleted"});
    } catch (error) {
        if(error instanceof customError)
            return res.status(error.statusCode).json({msg: error.message});
        console.log(error);
        return res.status(500).json(error);
    }
}

async function updateComment(req, res){
    try {
        validateString(req.body.content,"content", process.env.COMMENT_MIN_LENGTH);
        const comment = req.comment;
        comment.content = req.body.content;
        await comment.save();
        return res.status(200).json({msg: "the comment was updated successfully!"});
    } catch (error) {
        if(error instanceof customError)
            return res.status(error.statusCode).json({msg: error.message});
        console.log(error);
        return res.status(500).json(error);
    }
}
export { createComment, deleteComment, updateComment };