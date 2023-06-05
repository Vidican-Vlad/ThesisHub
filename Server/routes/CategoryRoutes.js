import express from "express";
import { getAllCategories } from "../Controllers/categoryController.js";
import { auth } from "../middleware/auth.js";
import { getTagsGroupedByCategory } from "../Controllers/tagController.js";
const router = express.Router();

router.get("/", auth, getAllCategories);
router.get("/tags", auth, getTagsGroupedByCategory);


export default router