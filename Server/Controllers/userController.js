import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import customError from "../utils/customError.js";
import userTmp from "../models/UserTmp.js";
import file from "../models/File.js";
import path from "path"
import { sendWelcomeEmail, accountRejected, accountValidated, sendTokenReset } from "../config/nodemailer.js";

async function registerUser (req, res){
    try {
        console.log(req.body);
        const files = req.files.map((el)=>{
            return file.create({
                name:el.filename,
                displayName: el.originalname,
                extension:path.extname(el.filename).slice(1),
                fullPath: path.join(process.env.FULL_PATH, el.filename)
            })
        })
        const result = await Promise.all(files);
        const token = generateRandomString(5)
        const user =  await userTmp.create({
            name: req.body.fullname,
            email: req.body.email,
            type: req.body.accountType,
            password:  await hashpass(req.body.password),
            cycle: req.body.cycle,
            securityKey:token,
            validated:false,
            proofOfIdentity:result.map(el => el._id)
        });
        sendWelcomeEmail(req.body.email, req.body.fullname, token);
        return res.status(200).json({msg: "the onboarding request was created, a mail with a secret key was sent to you, please use it to confirm your registration ", tmpId: user._id});
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

async function loginUser (req, res){
    try {
        const userDB = await User.findOne({email:req.body.email});
        if(!userDB){
            throw new customError("no user account was found with this email",400);
        }
        if(!(await bcrypt.compare(req.body.password, userDB.password))){
            throw new customError("the provided credential pair is incorrect, please try again",400)
        }
        const token = generateToken(userDB._id, userDB.cycle, userDB.type);
        return res.status(200).json({token: token, msg:"the login was successful", cycle: userDB.cycle, accType:userDB.type, userID: userDB._id});
    } catch (error) {
        if(error instanceof customError)
            return res.status(error.statusCode).json({msg: error.message});
        console.log(error);
        return res.status(500).json(error);
    }
}

async function handleValidation  (req, res){
    try {
        console.log(req.body);
        console.log(req.userTmp)
        if(req.body.validationStatus){
            console.log("da")
            await User.create({
                email: req.userTmp.email,
                name:req.userTmp.name,
                password: req.userTmp.password,
                type: req.userTmp.type,
                cycle: req.userTmp.cycle
            })
            accountValidated(req.userTmp.email, req.userTmp.name);
            await userTmp.findByIdAndDelete(req.userTmp._id);
            return res.status(200).json({msg: "account registered successfully", removedID: req.userTmp._id});
        }else{
            accountRejected(req.userTmp.email, req.userTmp.name, req.body.message);
            await userTmp.findByIdAndDelete(req.userTmp._id);
            return res.status(201).json({msg: "the onboarding request was deleted and the user was informed", removedID: req.userTmp._id});
        }
        //userTmp.findByIdAndDelete(req.userTmp._id)
      
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
        
    }
}

async function generateNewToken(req, res){
    try {
        
        const user = req.userTmp;
        if(user.validated === true){
            return res.status(401).json({msg:"your register request was already validated, please wait for an administrator to review your request"});
        }
        const token = generateRandomString(5);
        user.securityKey = token;
        user.save();
        sendTokenReset(user.email, user.name, token);
        return res.status(200).json({msg:"your new security ket has been set, please check your email"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
async function confirmRegister (req, res){
    try {
        console.log(req.body);
        const user = req.userTmp;
        if(user.validated === true)
            return res.status(401).json({msg:"your register request was already validated, please wait for an administrator to review your request"});
        if(user.securityKey === req.body.securityKey){
            user.validated = true;
            await user.save();
            return res.status(200).json({msg: "the account confirmation was succesful, please wait for an administrator to validate your request"});
        }else{
            return res.status(400).json({msg: "the account confirmation was unsuccessful, the provided securityKey was invalid, please try again"});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function hashpass (pass){

    const hash = bcrypt.hash(pass, 10);
    return hash

}

async function getAllUsers(req, res){
    try {
        const users = await User.find({});
        return res.status(200).json({users});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

async function getValidatedTempUsers(req, res){
    try {
        const tempUsers = await userTmp.find({validated: true})
            .select(["email", "name", "type", "cycle", "_id","proofOfIdentity"])
            .populate("proofOfIdentity");
        return res.status(200).json(tempUsers)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

function generateToken(id, cycle, type="Student"){
    try {
        const token = jwt.sign(
            {id: id, type:type, cycle:cycle},
            process.env.AUTH_SECRET
            )
        return token
    } catch (err) {
        console.log(err);
    }
}

function generateRandomString(length) {
    if (typeof length !== 'number' || length <= 0) {
        throw new Error('Length must be a positive number.');
    }
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }


export {getValidatedTempUsers, generateNewToken, handleValidation, confirmRegister, registerUser, loginUser, getAllUsers };