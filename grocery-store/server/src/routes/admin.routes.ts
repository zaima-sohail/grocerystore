import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminMiddleware from "../middleware/admin.middleware";
import { getDashboardStats } from "../controllers/admin.controller";

const router = Router();

// Dashboard Statistics
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboardStats
);

export default router;