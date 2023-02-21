import express from "express";
const router = express.Router();

import { registerUser, loginUser, getAllUsers} from "../controllers/userController.js";
import { validateRegister, validateLogin } from "../middleware/validators/userValidator.js";
import { auth } from "../middleware/auth.js";

//userRoutes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
export default router