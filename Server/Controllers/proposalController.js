import { request } from "express";
import Comment from "../models/Comment.js";
import Proposal from "../models/Proposal.js";
import File from "../models/File.js";
import tag from "../models/Tag.js";
import customError from "../utils/customError.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import {
    ObjectId
  } from 'mongodb';
import user from "../models/User.js";

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
            available:true
        })

        return res.status(200).json({proposal});
        
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
        const userobj = await user.findById(req.user.id);
        post.applications =[...post.applications , {applicant: req.user.id,message: req.body.payload }];
        await post.save();
        const newDoc = post.applications.find(el => el.applicant == req.user.id);
        const returnObj = {
            applicant:{
                _id: newDoc.applicant,
                name: userobj.name,
                email: userobj.email
            },
            message: newDoc.message,
            _id: newDoc._id
        }
        return res.status(200).json(returnObj);
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
        const proposal = await Proposal.findById(req.params.proposalID)
            .populate({path:"tags", select:["_id","name"]})
            .populate({path:"attachements"})
            .populate({path:"owner", select: ["_id","email","type"]})
            .populate({path:"applications.applicant", select: ["_id", "email", "name"]});
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


function buildQuery({ studyCycle, targetUser, title, description, logicalOperator, tagsList }){
    const pipeline = [];
    // Construct the conditions for studyCycle, targetUser, title, and description
    const conditions = [];
    if (studyCycle) conditions.push({ studyCycle });
    if (title) conditions.push({ title: { $regex: title, $options: 'i' } });
    if (description) conditions.push({ description: { $regex: description, $options: 'i' } });
  
    if (conditions.length > 0) {
      // chain all conditions togheter besides tags and targetUser which must be treated individually
        pipeline.push({ $match: { $and: conditions } });
    }
    // Handle logicalOperator
    if(Array.isArray(tagsList) && tagsList.length > 0){
        const taglist2 = tagsList.map(el => new ObjectId(el));
        if (logicalOperator === 'true'){
            pipeline.push({ $match: { tags: { $all: taglist2 } } });
        }else{
            pipeline.push({ $match: { tags: { $in: taglist2 } } });
        }
    }
    pipeline.push({
        $lookup: {
            from: 'users',
            let: { ownerId: '$owner' },
            pipeline: [
            {
                $match: {
                    $expr: { $eq: ['$_id', '$$ownerId'] }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    type: 1
                }
            }],
          as: 'owner'
        }
      });
      pipeline.push({
        $addFields: {
          owner: { $arrayElemAt: ['$owner', 0] }
        }
      });
    if (targetUser) {
        //if targetUser parameter is specified then populate the owner attribute with all of the values and then filter out
        //those proposals who's owner is not of the desired type
        pipeline.push({ $match: { 'owner.type': targetUser } });
    }
    return pipeline;
}

const getProposalsFiltered = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        let pipeline =  buildQuery(req.query);
        const proposals = await Proposal.aggregate([...pipeline,
            {$skip: startIndex},
            {$limit: limit},
            {
                $lookup: {
                    from: "tags",
                    localField: "tags",
                    foreignField: "_id",
                    as: "tags"
                }
            },
    ]);
        const counttemp = await Proposal.aggregate([...pipeline,
        {$count : "total"}]);
        const count = counttemp.length > 0 ? counttemp[0].total : 0
        res.status(200).json({proposals: proposals, total: Math.ceil(count/limit)});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching proposals.' });
    }
  };
  

export { createProposal, getProposalsFiltered, deleteProposal, createApplication, approveApplication, getComments, getProposals, upload, getSpecificProposal };