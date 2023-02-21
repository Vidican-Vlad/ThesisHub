import tag from "../../models/Tag.js";
import customError from "../../utils/customError.js";
import { config } from "dotenv";
import { validateString } from "./validateString.js";

async function validateTagCreation (req, res, next){
    try {
        validateString(req.body.name);
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