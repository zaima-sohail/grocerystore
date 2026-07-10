import express = require("express");
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import cors = require("cors");
import cookieParser = require("cookie-parser");
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";
import adminRoutes from "./routes/admin.routes";
const reviewRoutes = require("./routes/review.routes").default;
import wishlistRoutes from "./routes/wishlist.routes";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.get("/", (req, res) => {
  res.send("🚀 Grocery API is Running...");
});

export default app;
