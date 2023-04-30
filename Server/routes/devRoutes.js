import express from "express"
import { createCategoriesBulk, createTagsBulk } from "../Controllers/devController.js";

const router = express.Router();
router.post("/createBulkTags", createTagsBulk);
router.post("/createBulkCategories", createCategoriesBulk);

export default router;