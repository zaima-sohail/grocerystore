"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../models/Product"));
const Category_1 = __importDefault(require("../models/Category"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier = __importStar(require("streamifier"));
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder: "grocery-products",
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
};
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image: imageBody, } = req.body;
        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const normalizedCategory = String(category).trim();
        let categoryExists = null;
        if (mongoose_1.default.isValidObjectId(normalizedCategory)) {
            categoryExists = await Category_1.default.findById(normalizedCategory);
        }
        else {
            categoryExists = await Category_1.default.findOne({
                name: {
                    $regex: new RegExp(`^${normalizedCategory.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
                },
            });
        }
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        let image = {
            url: "",
            public_id: "",
        };
        const file = req.file;
        if (file) {
            image = await uploadToCloudinary(file.buffer);
        }
        else if (imageBody?.url) {
            image = {
                url: imageBody.url,
                public_id: "",
            };
        }
        const product = await Product_1.default.create({
            name,
            description,
            price,
            stock,
            category: categoryExists._id,
            image,
        });
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
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
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find()
            .populate("category", "name")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: products.length,
            products,
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
exports.getProducts = getProducts;
const getProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id).populate("category", "name");
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            product,
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
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        const file = req.file;
        if (file) {
            if (product.image.public_id) {
                await cloudinary_1.default.uploader.destroy(product.image.public_id);
            }
            const uploadedImage = await uploadToCloudinary(file.buffer);
            product.image = uploadedImage;
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = category || product.category;
        await product.save();
        const updatedProduct = await Product_1.default.findById(product._id).populate("category", "name");
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
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
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        // Delete image from Cloudinary
        if (product.image?.public_id) {
            await cloudinary_1.default.uploader.destroy(product.image.public_id);
        }
        // Delete product from MongoDB
        await product.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
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
exports.deleteProduct = deleteProduct;
