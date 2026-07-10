"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeCartItem = exports.updateCartItem = exports.getCart = exports.addToCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        // Get logged-in user id
        const userId = req.user.id;
        // Check if product exists
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        // Find user's cart
        let cart = await Cart_1.default.findOne({ user: userId });
        // If cart doesn't exist, create it
        if (!cart) {
            cart = await Cart_1.default.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: quantity || 1,
                    },
                ],
            });
            return res.status(201).json({
                success: true,
                message: "Product added to cart",
                cart,
            });
        }
        // Check if product already exists in cart
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity || 1;
        }
        else {
            cart.items.push({
                product: productId,
                quantity: quantity || 1,
            });
        }
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart,
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
exports.addToCart = addToCart;
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart_1.default.findOne({ user: userId }).populate({
            path: "items.product",
            select: "name price image stock",
        });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty",
            });
        }
        return res.status(200).json({
            success: true,
            cart,
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
exports.getCart = getCart;
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }
        const cart = await Cart_1.default.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        const item = cart.items.find((item) => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }
        item.quantity = quantity;
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart,
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
exports.updateCartItem = updateCartItem;
const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const cart = await Cart_1.default.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart,
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
exports.removeCartItem = removeCartItem;
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart_1.default.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        cart.items.splice(0);
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart,
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
exports.clearCart = clearCart;
