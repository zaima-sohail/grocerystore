import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller";

import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, addToWishlist);

router.get("/", authMiddleware, getWishlist);

router.delete("/:id", authMiddleware, removeFromWishlist);

export default router;