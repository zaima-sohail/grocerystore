import { Request, Response } from "express";
import stripe from "../config/stripe";
import Order from "../models/Order";

export const createCheckoutSession = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const lineItems = order.items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: lineItems,

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/payment-success?orderId=${order._id}`,

      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,

      metadata: {
        orderId: order._id.toString(),
      },
    });

    return res.status(200).json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};