import tag from "../../models/Tag.js";
import customError from "../../utils/customError.js";
import { config } from "dotenv";
import { validateString } from "./validateString.js";

async function validateTagCreation (req, res, next){
    try {
        let categories = ["Computer Sciences","Social and Political Sciences","Mathematics","Natural Sciences","Medicine","Humanities","Economy","Arhitecture","Sport","Chemistry","Physics","Arts","Law","Agricultural Sciences","Others"]
        validateString(req.body.name);
        validateString(req.body.category);
        if(!categories.includes(req.body.category)){
            throw new customError("category does not exist!", 400);
        }
        const existingTag = await tag.findOne({name: req.body.name});
        if(existingTag){
            throw new customError("Tag already exists, please check your spelling and try again", 400);
        }
        next();
    } catch (error) {
        if(error instanceof customError){
            return res.status(error.statusCode).json({msg: error.message});
        }
    }
}

export { validateTagCreation };