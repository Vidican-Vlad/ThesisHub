import Proposal from "../../models/Proposal.js"
import tag from "../../models/Tag.js";
import Tag from "../../models/Tag.js";
import User from "../../models/User.js";
import customError from "../../utils/customError.js"
import { validateString } from "./validateString.js"



async function validateCreateProposal(req, res, next){
    try {
        console.log(req.body);
        if(typeof req.body.tags === "string"){
            req.body.tags = req.body.tags.split(",");
        }
        const { title, description, cycle, tags} = req.body;
        if(req.user.type == "Admin"){
            throw new customError("Administrators aren't allowed to create proposals", 400);
        }
        validateString(title, "title");
        validateString(description, "description");
        validateCycle(cycle, req.user.type);
        await validateTags(tags);
        if(req.user.type == "Student")
            req.cycle = req.user.cycle
        else
            req.cycle = req.body.cycle
        next();
    } catch (err) {
        if(err instanceof customError)
            return res.status(err.statusCode).json({msg: err.message});
        console.log(err);
        return res.status(500).json(err);
    }
}

async function validateApplication(req, res, next){

    try {
        if(req.user.type === "Admin"){
            throw new customError("Administrators aren't allowed to apply to proposals", 400);
        }
        if(req.post.owner._id === req.user.id){
            throw new customError("You can't apply to your own proposal", 400);
        }
        if(req.post.owner.cycle === req.user.cycle){
            throw new customError ("you can't apply to the proposals of the same type of users as yourself", 400);
        }
        if(req.user.type === "Student" && req.post.studyCycle !== req.user.cycle){
            throw new customError ("this proposal was not published for your study cycle", 400);
        }
        if(req.post.applications.some(el => el.applicant.toString() === req.user.id)){
            throw new customError("You have already applied for this proposal", 400);
        }
        next();
    } catch (error) {
        if(error instanceof customError){
            return res.status(error.statusCode).json({msg: error.message})
        }
        console.log(error);
        return res.status(500).json(error);   
    }
}

async function validateApproval(req, res, next){
    try {
        if(req.post.approved){
            throw new customError("you have already approved an application for this particular proposal", 400);
        }
        const user = await User.findById(req.body.applicantID);
        if(!user){
            throw new customError("the provided applicant ID does not exist", 400);
        }
        next();
    } catch (error) {
        if(error instanceof customError){
            return res.status(error.statusCode).json({msg: error.message})
        }
        console.log(error);
        return res.status(500).json(error);   
    }
}

async function addProposalToReq(req, res, next){
    try {
        validateString(req.params.proposalID);
        const proposal = await Proposal
            .findById(req.params.proposalID)
            .populate({
                path: "owner",
                model: "User"
        })
        if(!proposal){
            throw new customError("the proposal ID provided does not exist", 400);
        }
        req.post = proposal;
        next();
    } catch (error) {
        if(error instanceof customError){
            return res.status(error.statusCode).json({msg: error.message})
        }
        console.log(error);
        return res.status(500).json(error);   
    }
}


function validateCycle(cycle, accType) {

    const accInput = ["Licenta", "Master"];
    if(accType == "Student" && cycle){
        throw new customError("cycle field is not available for Student proposals",400);
    }  
    if(accType == "Profesor")
    {
        console.log(cycle);
        if(!cycle)
            throw new customError("cycle field is mandatory for Professor proposals",400);
        if(!accInput || !accInput.includes(cycle))
            throw new customError("wrong value for the cycle field",400);
    }
}

async function validateTags(tags){

    if(!tags || !Array.isArray(tags)){
        throw new customError("tag list was missing from the request or it was provided with an invalid format", 400);
    }
    if(tags.length <1 || tags.length > process.env.TAG_LIMIT){
        throw new customError("proposal must contain atleast 1 tag and at most " + process.env.TAG_LIMIT + " tags", 400);
    }
    let tagTemp = tags.map(el =>{
        return Tag.find({name:el});
    })
    tagTemp = await Promise.all(tagTemp);
    if(tagTemp.some(el =>el === null)){
        throw new customError("at least one of the tag id's provided do not exist", 400);
    }
}
async function isProposalOwner (req, res, next){
    try {
        if(req.user.id == req.post.owner._id){
            req.auth = true;
        }
        next();
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}
export { validateCreateProposal, addProposalToReq, isProposalOwner, validateApplication, validateApproval };