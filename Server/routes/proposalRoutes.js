import express from "express";
import { createComment, deleteComment, updateComment } from "../Controllers/commentController.js";
import { approveApplication, createApplication, createProposal, deleteProposal } from "../Controllers/proposalController.js";
import { auth } from "../middleware/auth.js";
import { addCommentToRequest, isCommentOwner, validateCommentCreation } from "../middleware/validators/commentValidator.js";
import { addProposalToReq, isProposalOwner, validateApplication, validateApproval, validateCreateProposal } from "../middleware/validators/proposalValidator.js";
import { isAdmin, isAuthorized, isProfessor, isStudent } from "../middleware/validators/userValidator.js";
const router = express.Router();

router.post("/create", auth, isStudent, isProfessor, isAuthorized, validateCreateProposal, createProposal);
router.delete("/:proposalID/delete", auth, addProposalToReq, isAdmin, isProposalOwner, isAuthorized, deleteProposal);
router.post("/:proposalID/comment", auth, validateCommentCreation, addProposalToReq, createComment);
router.delete("/:proposalID/comment/:commentID/delete",auth, addProposalToReq, addCommentToRequest, isAdmin, isProposalOwner, isCommentOwner, isAuthorized, deleteComment );
router.put("/:proposalID/apply", auth, addProposalToReq, validateApplication, createApplication );
router.put("/:proposalID/approve", auth, addProposalToReq, isProposalOwner, isAuthorized, validateApproval, approveApplication);
router.put("/:proposalID/comment/:commentID/edit", auth, addCommentToRequest, isCommentOwner, isAuthorized, updateComment);
//router.put("/:proposalID/edit", auth, addCommentToRequest)
export default router;