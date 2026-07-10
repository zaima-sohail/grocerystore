import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  next();
};

export default adminMiddleware;