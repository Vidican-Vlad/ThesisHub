import Tag from "../models/Tag.js";
import customError from "../utils/customError.js";

async function createTag (req, res){
    try {
        const tag = await Tag.create({
            name:req.body.name
        })
        return res.status(200).json(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function deleteTag (req, res){
    try {
        if(!req.params.tagID){
            throw new customError("the tagID is missing from the request", 400);
        }
        const tag = await Tag.findByIdAndDelete(req.params.tagID);
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

async function getAllTags (req, res){
    try {
        const tags = await Tag.find({});
        return res.status(200).json(tags)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export { createTag, deleteTag, getAllTags };