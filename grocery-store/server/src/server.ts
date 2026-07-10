import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath, override: true });
console.log("Loading environment from", envPath);

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();