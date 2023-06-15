import express from "express";
import { upload } from "../Controllers/proposalController.js";
import { registerUser, loginUser, confirmRegister, handleValidation, generateNewToken, getValidatedTempUsers } from "../Controllers/userController.js";
import { validateRegister, validateLogin, addUserTempToReq } from "../middleware/validators/userValidator.js";
import { auth } from "../middleware/auth.js";
import { isAuthorized, isAdmin } from "../middleware/validators/userValidator.js";
const router = express.Router();

//userRoutes
router.get("/")
router.get("/tempUsers", auth, isAdmin, isAuthorized, getValidatedTempUsers);
router.post("/register", upload, validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.put("/confirm", addUserTempToReq, confirmRegister);
router.put("/validate", auth, isAdmin, isAuthorized, addUserTempToReq, handleValidation);
router.put("/resetToken", addUserTempToReq, generateNewToken);
export default router