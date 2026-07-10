import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminMiddleware from "../middleware/admin.middleware";

import {
  placeOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/order.controller";
const router = Router();

router.post("/", authMiddleware, placeOrder);

router.get("/my-orders", authMiddleware, getMyOrders);

router.get("/:id", authMiddleware, getOrder);

router.get("/", authMiddleware, adminMiddleware, getAllOrders);

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);
router.put(
  "/cancel/:id",
  authMiddleware,
  cancelOrder
);
export default router;