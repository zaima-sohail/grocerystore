import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";

import {
  createReview,
  getReviews,
} from "../controllers/review.controller";

const router = Router();

router.get(
  "/:id",
  getReviews
);

router.post(
  "/:id",
  authMiddleware,
  createReview
);

export default router;