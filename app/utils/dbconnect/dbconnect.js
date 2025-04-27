import mongoose from "mongoose";

// Track connection status
let isConnected = false;

export async function connect() {
    // Return if already connected
    if (isConnected) {
        console.log("Already connected to MongoDB Atlas");
        return;
    }

    // Check if environment variable exists
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is not defined");
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Throw error instead of exiting the process
        throw new Error("Failed to connect to database");
    }
}