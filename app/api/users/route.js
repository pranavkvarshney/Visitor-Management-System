import { connect } from "@/app/utils/dbconnect/dbconnect";
import User from "@/app/utils/schema/userschema";
import { NextResponse } from "next/server";

connect()

export async function POST(request) {
    const { name, phone, company, address, type, purpose, compname, compadd, photo } = await request.json();

    try {
        const checkUser = await User.findOne({ phone })
        if (checkUser) {
            return NextResponse.json({ success: false, message: "Your application has already been submitted." })
        }

        const newUser = new User({
            name,
            phone,
            company,
            address,
            type,
            purpose,
            compname,
            compadd,
            photo,    // Add the photo field
            entry: null,
            createdAt: new Date(),
        })

        console.log(newUser)
        await newUser.save()
        return NextResponse.json({ success: true, message: "Your application has been submitted." })

    }
    catch (error) {
        console.error("Error details:", error);  // Add better error logging
        return NextResponse.json({ success: false, message: "There is a wrong input." })
    }
}

export async function GET() {
    try {
        const allusers = await User.find().sort({ createdAt: -1 })
        if (allusers[0] == null) {
            return NextResponse.json({ success: false, message: "NO DATA FOUND" })
        } else {
            return NextResponse.json({ success: true, data: allusers })
        }
    } catch (error) {
        console.error("Error in GET:", error);  // Add better error logging
        return NextResponse.json({ success: false, message: "ERROR CONNECTING" })
    }
}