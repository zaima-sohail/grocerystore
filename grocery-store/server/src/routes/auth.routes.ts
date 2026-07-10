import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import adminMiddleware from "../middleware/admin.middleware";
import {
  register,
  login,
  profile,
  updateProfile,
  verifyEmail,
} from "../controllers/auth.controllers";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
router.get("/verify/:token", verifyEmail);
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin 👑",
    });
  }
);
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);
export default router;