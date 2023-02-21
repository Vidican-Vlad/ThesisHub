import express from "express";
const router = express.Router();

import { createTag, deleteTag, getAllTags } from "../controllers/tagController.js";
import { isAdmin, isAuthorized } from "../middleware/validators/userValidator.js";
import { auth } from "../middleware/auth.js";
import { validateTagCreation } from "../middleware/validators/tagValidator.js";
router.post("/create", auth, isAdmin, isAuthorized, validateTagCreation, createTag);
router.delete("/delete/:tagID", auth, isAdmin, isAuthorized, deleteTag);
router.get("/all", auth, getAllTags);

export default router