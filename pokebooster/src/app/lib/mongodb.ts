import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) return;

    if (!MONGODB_URI) {
        throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local");
    }

    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    
    console.log("✅ MongoDB connected");
}