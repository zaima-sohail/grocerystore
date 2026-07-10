"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("❌ Database Connection Failed: MONGODB_URI is not defined in the environment.");
        process.exit(1);
    }
    try {
        console.log("Mongo URI:", uri);
        const conn = await mongoose_1.default.connect(uri, {
            family: 4,
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 10000,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("❌ Database Connection Failed:");
        console.error(error);
        if (error instanceof Error && error.message.includes("ECONNREFUSED")) {
            console.error("Possible DNS/network issue. Check your local DNS or use a non-SRV Atlas URI if SRV lookups are blocked.");
        }
        process.exit(1);
    }
};
exports.default = connectDB;
