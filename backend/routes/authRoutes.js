import express from "express";
import { login, logout, onboard, signup } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.post("/onboarding",protectRoute,onboard);

router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})

export default router;