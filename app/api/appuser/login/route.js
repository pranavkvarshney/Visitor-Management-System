import { connect } from "@/app/utils/dbconnect/dbconnect";
import appUser from "@/app/utils/schema/appuserschema";
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect()

export async function POST(request) {
    const { email, password } = await request.json()
    try {
        console.log(email)
        const checkUser = await appUser.findOne({ email })
        if (!checkUser) {
            return NextResponse.json({ success: false, message: "This email is not registered yet!Please register first!" })
        }
        const checkpass = await bcryptjs.compare(password, checkUser.password)
        if (!checkpass) {
            return NextResponse.json({ success: false, message: "Incorrect Password!! Please check your password and try again!" })
        }

        // Return user role along with success message
        return NextResponse.json({
            success: true,
            message: "You are logged in.",
            isAdmin: checkUser.admin  // Include admin status in response
        })
    } catch (error) {
        return NextResponse.json({ success: false, message: `${error}` })
    }
}