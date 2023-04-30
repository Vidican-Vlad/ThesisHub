import express from "express";
import { getAllCategories } from "../Controllers/categoryController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getAllCategories);

export default router