import { Request, Response } from "express";
import Review from "../models/Review";

export const createReview = async (
  req: Request,
  res: Response
) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.create({
      user: req.user.id,
      product: req.params.id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added",
      review,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};export const getReviews = async (
  req: Request,
  res: Response
) => {
  try {
    const reviews = await Review.find({
      product: req.params.id,
    }).populate("user", "name");

    res.json({
      success: true,
      reviews,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};