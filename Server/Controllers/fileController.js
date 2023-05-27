import File from "../models/File.js";
import fs from "fs";
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

export { sendFile };
