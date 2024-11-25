import mongoose from "mongoose"
import React from 'react'
export async function connect() {
    try {
        const conn = await mongoose.connect(`mongodb://localhost:27017/ContactForm`
        );
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
