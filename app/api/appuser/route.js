import { connect } from "@/app/utils/dbconnect/dbconnect";
import appUser from "@/app/utils/schema/appuserschema";
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server";

connect()

export async function POST(request) {
    try {
        const { name, email, password } = await request.json()

        // Input validation
        if (!name || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields"
            }, { status: 400 })
        }

        const checkUser = await appUser.findOne({ email })
        if (checkUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            }, { status: 409 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password, salt)

        // Create new user with explicit default values
        const user = new appUser({
            name,
            email,
            password: hashedpassword,
            toggle: false,  // Explicitly set default values
            admin: false    // Explicitly set default values
        })

        await user.save()

        return NextResponse.json({
            success: true,
            message: "User has been registered. You can Login Now 😊"
        }, { status: 201 })
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({
            success: false,
            message: "Failed to create user"
        }, { status: 500 })
    }
}