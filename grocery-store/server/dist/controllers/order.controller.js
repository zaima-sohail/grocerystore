"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.updateOrderStatus = exports.getAllOrders = exports.getOrder = exports.getMyOrders = exports.placeOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Cart_1 = __importDefault(require("../models/Cart"));
const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shippingAddress, paymentMethod } = req.body;
        const cart = await Cart_1.default.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }
        let totalAmount = 0;
        const items = cart.items.map((item) => {
            totalAmount += item.product.price * item.quantity;
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            };
        });
        const order = await Order_1.default.create({
            user: userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
        });
        cart.items.splice(0);
        await cart.save();
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.placeOrder = placeOrder;
const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order_1.default.find({ user: userId })
            .populate("items.product")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getMyOrders = getMyOrders;
const getOrder = async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id)
            .populate("user", "name email")
            .populate("items.product");
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            order,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getOrder = getOrder;
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find()
            .populate("user", "name email")
            .populate("items.product")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getAllOrders = getAllOrders;
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const cancelOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const order = await Order_1.default.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        // Check that the order belongs to the logged-in user
        if (order.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }
        // 👇 ADD THIS HERE
        if (order.status === "Shipped" ||
            order.status === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "Order cannot be cancelled",
            });
        }
        // Cancel the order
        order.status = "Cancelled";
        await order.save();
        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.cancelOrder = cancelOrder;
