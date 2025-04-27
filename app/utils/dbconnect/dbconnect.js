import mongoose from "mongoose"

// Track connection status
let isConnected = false;

export async function connect() {
    // Return if already connected
    if (isConnected) {
        console.log("Already connected to MongoDB Atlas");
        return;
    }

    try {
        const db = await mongoose.connect(
            "mongodb+srv://pranav:pranav@cluster0.jo7f5.mongodb.net/ContactForm?retryWrites=true&w=majority&appName=Cluster0"
        );

        isConnected = db.connections[0].readyState === 1;
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Throw error instead of exiting the process
        throw new Error("Failed to connect to database");
    }
}