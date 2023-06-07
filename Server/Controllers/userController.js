import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import customError from "../utils/customError.js";

async function registerUser (req, res){
    try {

        const user =  await User.create({
            name: req.body.fullname,
            email: req.body.email,
            type: req.body.accountType,
            password:  await hashpass(req.body.password),
            cycle: req.body.cycle
        })
        return res.status(200).json({msg: "the Account was created successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

async function loginUser (req, res){
    try {
        const userDB = await User.findOne({email:req.body.email.trim().toLowerCase()});
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

async function validateRegistration  (req, res){
    try {
        const user = await User.create({
            email: req.usertmp.email,
            name:req.usertmp.name,
            password: req.usertmp.password,
            type: req.user.type,
            cycle: req.user.cycle
        })
        return res.status(200).json({msg: "account registered successfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function confirmRegister (req, res){
    try {
        const user = req.usertemp;
        if(user.securityKey === req.body.key){
            user.validated = true;
            await user.save();
        }
        return res.status(200).json({msg: "the account confirmation was succesful, please wait for an administrator to validate your request"});
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
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
  
    for (var i = 0; i < 5; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }



export { registerUser, loginUser, getAllUsers };