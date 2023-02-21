import User from "../../models/User.js";
import customError from "../../utils/customError.js";
import { config } from "dotenv";
import { validateString } from "./validateString.js";



async function validateRegister(req, res, next) {
    try {  

        const {fullname, email, password, accountType, cycle} = req.body;
        validateEmail(email);
        validatePassword(password);
        validateAccountType(accountType);
        validateString(fullname, "full name", process.env.MIN_FNAME_LENGTH);
        validateCycle(cycle, accountType);
        
        if(fullname.trim().split(" ").length != 2){
            throw new customError("invalid format for the fullname, the fullname should be formated as <firstName> <lastName>",400);
        }
        const existingAccount = await User.findOne({email: email.trim().toLowerCase()});
        if(existingAccount){
            throw new customError("an account with registered with this email address already exists, please try again", 400);
        }

        next();

    } catch (error) {
        if(error instanceof customError){
            return res.status(error.statusCode).json({msg: error.message});
        }
        console.log(error);
        return res.status(500).json(error);
    }
}


async function validateLogin(req, res, next){
        const {email, password} = req.body;
        try {
            validateEmail(email);
            validatePassword(password);
            next();
        } catch (error) {
            if(error instanceof customError)
                return res.status(error.statusCode).json({msg: error.message});
            console.log(error);
            return res.status(500).json({msg: error});
        }

}

function validateCycle(cycle, accType){
    try {
        if(accType == "Student"){
            if(!cycle)
                throw new customError("the study cycle field is mandatory for students",400);
            if(cycle !== "Licenta" && cycle !== "Master")
                throw new customError("The study cycle field only accepts <Student> or <Profesor> as a value",400);
        }
        if((accType == "Profesor" || accType == "Admin") && cycle){
            throw new customError("The study cycle field is not valid for " + accType + " type users",400);
        }
    } catch (error) {
        throw error;
    }
}

function validateEmail(email){
    try {
        validateString(email, "email", process.env.MIN_EMAIL_LENGTH);
        if(email.trim().split("@").length != 2 || email.trim().split("@")[1].split(".").length != 2){
            throw new customError("email sent does not respect the email format, please try again",400);
        }
    } catch (error) {
        throw error
    }
}

function validateAccountType(accType){
    try {
        validateString(accType, "Account type");
        if(!process.env.ACC_TYPES.split(",").includes(accType)){
            throw new customError("provided account type is not amongst the accepted values",400);
        }
    } catch (error) {
        throw error;
    }
}

async function isAuthorized(req, res, next){
    try {
        if(!req.auth)
            return res.status(400).json({msg: "Insufficient permissions to proceed with this request"});
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});
        
    }
}

async function isAdmin(req, res, next){
    try {
        if(req.user.type =="Admin"){
                req.auth = true;
        }
        next();
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}
async function isStudent(req, res, next){
    try {
        if(req.user.type =="Student"){
                req.auth = true;
        }
        next();
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}
async function isProfessor(req, res, next){
    try {
        if(req.user.type =="Profesor"){
                req.auth = true;
        }
        next();
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}
function validatePassword(pwd){
    let spChar = /[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]+/;
    let nmb = /[01234567890]/;
    let bgL = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    let smL = /[abcdefghijklmnopqrstuvwxyz]/;
    try {

        validateString(pwd, "password", process.env.MIN_PASS_LENGTH);
        if(!spChar.test(pwd) || !nmb.test(pwd)  || !bgL.test(pwd) || !smL.test(pwd)){
            throw new customError("Password does not meet the complexity criteria", 400)
        }
        
    } catch (err) {
        throw err
    }
}
export { validateRegister, validateLogin, isAdmin, isStudent, isProfessor, isAuthorized };