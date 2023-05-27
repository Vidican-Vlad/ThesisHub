import { request } from "express";
import Comment from "../models/Comment.js";
import Proposal from "../models/Proposal.js";
import File from "../models/File.js";
import tag from "../models/Tag.js";
import customError from "../utils/customError.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";


const storage = multer.diskStorage({
    destination: "E:/Programming_stuff/Licenta/Server/images",
    filename:  function(req, file, cb) {
        cb(null, generateFilename(file.originalname));
    }
})


function generateFilename(originalname){

    if(!originalname || typeof originalname != "string"){
        console.log("file type missing");
        throw new customError("missing file type", 500);
    }

    return crypto.randomBytes(20).toString("hex")+Date.now()+path.extname(originalname);
}
const upload = multer({storage:storage}).array("files");


async function createProposal (req, res){
    try {
        console.log(req.files);
        let images = req.files.map(file =>(File.create({
            name: file.filename,
            extension: path.extname(file.filename).slice(1),
            displayName: file.originalname,
            fullPath: path.join(process.env.FULL_PATH, file.filename)
        })))
        let images2 = await Promise.all(images);
        images2 = images2.map(el=>{
            return el._id;
        });
        const proposal = await Proposal.create({
            title: req.body.title,
            description: req.body.description,
            studyCycle: req.cycle,
            owner: req.user.id,
            applicants: [],
            approved: null,
            attachements: images2,
            tags: req.body.tags,
            available:true,
        })
    
        return res.status(200).json(proposal);
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

async function deleteProposal (req, res){
    try {
        if(!req.params.proposalID){
            throw new customError("the proposalID is missing from the request",400);
        }
        const proposal = await Proposal.findByIdAndDelete(req.params.proposalID);
        if(!proposal){
            throw new customError("no proposal was found with that ID",400);
        }
        return res.status(200).json({msg: "the proposal was deleted"});
    } catch (error) {
        if(error instanceof customError)
            return res.status(error.statusCode).json({msg: error.message});
        console.log(err);
        return res.status(500).json(error);
    }
}

async function createApplication (req, res){
    try {
        const post = req.post;
        post.applications =[...post.applications , {applicant: req.user.id,message: req.body.message }];
        await post.save();
        return res.status(200).json({msg: "OK"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
async function getComments (req, res){
    try {
        const comments = await Comment.find({parentPost: req.params.proposalID})
            .populate({path:"owner", select:["name","_id","type"]});
        return res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function approveApplication (req, res){
    try {
        const post = req.post;
        post.approved = req.body.applicantID;
        await post.save()
        return res.status(200).json({msg: "application approved!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function getSpecificProposal(req, res){
    try {
        console.log(req.params);
        const proposal = await Proposal.findById(req.params.proposalID)
            .populate({path:"tags", select:["_id","name"]})
            .populate({path:"attachements"});
        return res.status(200).json(proposal);
        
    } catch (error) {
        console.log(err);
        return res.status(500).json(err);
    }
}

async function getProposals(req, res){
    try {

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const proposals = await Proposal.find({})
            .limit(limit)
            .skip(startIndex)
            .populate({path:"tags", select: ["name", "_id"]})
            .select(["-__v","-attachements"])
        const count = await Proposal.countDocuments();
        return res.status(200).json({msg: "Successful", result:proposals,total:Math.ceil(count/limit)});

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export { createProposal, deleteProposal, createApplication, approveApplication, getComments, getProposals, upload, getSpecificProposal };