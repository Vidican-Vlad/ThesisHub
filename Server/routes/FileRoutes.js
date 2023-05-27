import { auth } from "../middleware/auth.js";
import { sendFile } from "../Controllers/fileController.js";
import express from "express";

const router = express.Router();

router.get("/:fileID", auth, sendFile);


export default router;