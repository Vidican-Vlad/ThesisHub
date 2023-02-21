import { request } from "express";
import Comment from "../models/Comment.js";
import Proposal from "../models/Proposal.js";
import tag from "../models/Tag.js";
import customError from "../utils/customError.js";

async function createProposal (req, res){
    try {
        const proposal = await Proposal.create({
            title: req.body.title,
            description: req.body.title,
            studyCycle: req.cycle,
            owner: req.user.id,
            applicants: [],
            approved: null,
            attachements: null,
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
        if(!post?.applicants){
            post.applicants = [req.user.id];
        }
        else{
            post.applicants = [...post.applicants, req.user.id];
        }
        await post.save();
        return res.status(200).json({msg: "OK"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
async function getComments (req, res){
    try {
        const comments = await getAllCommentsFromAPost(req.post.id);
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

async function getAllCommentsFromAPost(proposalID){
    try {
        const comments = await Comment.find({parentPost: proposalID});
        return comments;
    } catch (error) {
        throw error;
    }
}

export { createProposal, deleteProposal, createApplication, approveApplication, getComments };