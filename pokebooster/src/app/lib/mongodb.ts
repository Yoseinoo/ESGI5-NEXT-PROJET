import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDatabase() {
    if (!MONGODB_URI) {
        throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local");
    }

    const db = await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
}