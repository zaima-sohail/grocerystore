import { Router } from "express";
import { createCheckoutSession } from "../controllers/payment.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/checkout",
  authMiddleware,
  createCheckoutSession
);

export default router;