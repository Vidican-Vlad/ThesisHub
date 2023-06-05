import File from "../models/File.js";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import customError from "../utils/customError.js";
import file from "../models/File.js";
async function sendFile(req, res){
    try {
        const file = await File.findById(req.params.fileID);
            // res.setHeader('content-Type', 'application/octet-stream');
            // res.setHeader('Content-Disposition', 'attachement; filename' + req.params.fileID);
            // res.send(data)
            res.status(200).sendFile(file.fullPath);
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
function generateFilename(originalname){
    if(!originalname || typeof originalname != "string"){
        console.log("file type missing");
        throw new customError("missing file type", 500);
    }
    return crypto.randomBytes(20).toString("hex")+Date.now()+path.extname(originalname);
}

async function handleAttachements(payload){
    try {
        if(Array.isArray(payload) && payload.length > 0 ){
            const promises = [];
            const fileDB = [];
            const destination = "E:/Programming_stuff/Licenta/Server/images/";
            for(const index in payload){
                const filename = generateFilename(payload[index].fileName);
                const fullname = destination+filename;
                promises.push(fs.promises.writeFile(fullname, payload[index].file));
                fileDB.push({
                    name: filename,
                    displayName: payload[index].fileName,
                    fullPath: fullname,
                    extension: path.extname(payload[index].fileName)
                })
            }
           await Promise.all(promises);
           return fileDB;
        }
        return [];
    } catch (error) {
        console.log(error)
        return null;
    }

}

export { sendFile, handleAttachements };
