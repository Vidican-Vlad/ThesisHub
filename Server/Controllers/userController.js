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
};

async function loginUser (req, res){
    try {
        const userDB = await User.findOne({email:req.body.email.trim().toLowerCase()});
        if(!userDB){
            throw new customError("no user account was found with this email",400);
        }
        if(!(await bcrypt.compare(req.body.password, userDB.password))){
            throw new customError("the provided credential pair is incorrect, please try again",400)
        }
        const token = generateToken(userDB._id, userDB.type, userDB.cycle);
        return res.status(200).json({token: token,msg:"the login was successful"});
    } catch (error) {
        if(error instanceof customError)
            return res.status(error.statusCode).json({msg: error.message});
        console.log(error);
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

function generateToken(id, type="Student",cycle){
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

export { registerUser, loginUser, getAllUsers };