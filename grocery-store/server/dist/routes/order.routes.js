"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, order_controller_1.placeOrder);
router.get("/my-orders", auth_middleware_1.default, order_controller_1.getMyOrders);
router.get("/:id", auth_middleware_1.default, order_controller_1.getOrder);
router.get("/", auth_middleware_1.default, admin_middleware_1.default, order_controller_1.getAllOrders);
router.put("/:id/status", auth_middleware_1.default, admin_middleware_1.default, order_controller_1.updateOrderStatus);
router.put("/cancel/:id", auth_middleware_1.default, order_controller_1.cancelOrder);
exports.default = router;
