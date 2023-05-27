import express from "express";
import { auth } from "../middleware/auth.js";
import { createConversation, getConversations, getMessages } from "../Controllers/messagingController.js";
import { validateCreateConversation } from "../middleware/validators/messagingValidator.js";

const router = express.Router();

router.get("/", auth, getConversations);
router.post("/", auth, validateCreateConversation, createConversation);
router.get("/:conversationID/", auth, getMessages);

export default router;