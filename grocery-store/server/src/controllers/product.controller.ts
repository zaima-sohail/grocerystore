import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import Category from "../models/Category";
import cloudinary from "../config/cloudinary";
import * as streamifier from "streamifier";
import Review from "../models/Review";

const uploadToCloudinary = (
  buffer: Buffer
): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "grocery-products",
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve({
          url: result!.secure_url,
          public_id: result!.public_id,
        });
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}; 

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      image: imageBody,
    } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedCategory = String(category).trim();

    let categoryExists: any = null;

    if (mongoose.isValidObjectId(normalizedCategory)) {
      categoryExists = await Category.findById(normalizedCategory);
    } else {
      categoryExists = await Category.findOne({
        name: {
          $regex: new RegExp(
            `^${normalizedCategory.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}$`,
            "i"
          ),
        },
      });
    }

    if (!categoryExists) {
      categoryExists = await Category.create({
        name: normalizedCategory,
      });
    }

    let image = {
      url: "",
      public_id: "",
    };

    const file = req.file as Express.Multer.File | undefined;

    if (file) {
      image = await uploadToCloudinary(file.buffer);
    } else if (imageBody?.url) {
      image = {
        url: imageBody.url,
        public_id: "",
      };
    }

    const product = await Product.create({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;
    const category = req.query.category as string;

    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (keyword) {
      filter.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const updatedProducts = await Promise.all(
      products.map(async (product: any) => {
        const reviews = await Review.find({ product: product._id });

        const averageRating =
          reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            : 0;

        return {
          ...product.toObject(),
          averageRating,
          totalReviews: reviews.length,
        };
      })
    );

    return res.status(200).json({
      success: true,
      products: updatedProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = await Review.find({ product: product._id });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    return res.status(200).json({
      success: true,
      product: {
        ...product.toObject(),
        averageRating,
        totalReviews: reviews.length,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const file = req.file as Express.Multer.File | undefined;

    if (file) {
      if ((product.image as any)?.public_id) {
        await cloudinary.uploader.destroy((product.image as any).public_id);
      }

      const uploadedImage = await uploadToCloudinary(file.buffer);
      product.image = uploadedImage as any;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || (product.category as any);

    await product.save();

    const updatedProduct = await Product.findById(product._id).populate(
      "category",
      "name"
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if ((product.image as any)?.public_id) {
      await cloudinary.uploader.destroy((product.image as any).public_id);
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

