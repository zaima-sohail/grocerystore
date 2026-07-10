import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller";

const router = Router();

router.post("/add", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.put(
  "/update/:productId",
  authMiddleware,
  updateCartItem
);

router.delete(
  "/remove/:productId",
  authMiddleware,
  removeCartItem
);

router.delete(
  "/clear",
  authMiddleware,
  clearCart
);

export default router;