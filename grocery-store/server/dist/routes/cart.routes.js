"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const cart_controller_1 = require("../controllers/cart.controller");
const router = (0, express_1.Router)();
router.post("/add", auth_middleware_1.default, cart_controller_1.addToCart);
router.get("/", auth_middleware_1.default, cart_controller_1.getCart);
router.put("/update/:productId", auth_middleware_1.default, cart_controller_1.updateCartItem);
router.delete("/remove/:productId", auth_middleware_1.default, cart_controller_1.removeCartItem);
router.delete("/clear", auth_middleware_1.default, cart_controller_1.clearCart);
exports.default = router;
