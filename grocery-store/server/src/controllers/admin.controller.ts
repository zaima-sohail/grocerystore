import { Request, Response } from "express";
import User from "../models/user";
import Product from "../models/Product";
import Order from "../models/Order";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await Product.countDocuments();
    const users = await User.countDocuments();
    const orders = await Order.find();

    const revenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.status(200).json({
      success: true,
      products,
      users,
      orders: orders.length,
      revenue,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};