import { Request, Response } from "express";
import Wishlist from "../models/wishlist";

// Add to Wishlist
export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user.id;
    const { productId } = req.body;

    const exists = await Wishlist.findOne({
      user,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already in wishlist",
      });
    }

    await Wishlist.create({
      user,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Wishlist
export const getWishlist = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user.id;

    const wishlist = await Wishlist.find({ user }).populate("product");

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Remove from Wishlist
export const removeFromWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};