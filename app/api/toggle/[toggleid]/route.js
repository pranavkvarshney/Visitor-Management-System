import { connect } from "@/app/utils/dbconnect/dbconnect";
import appUser from "@/app/utils/schema/appuserschema";
import { NextResponse } from "next/server";
connect()
export async function GET(request, { params }) {
    const email = params.toggleid

    try {
        const result = await appUser.findOne({ email: email })
        return NextResponse.json({ success: true, data: result })
    } catch {
        return NextResponse.json({ success: false, message: "cant fetch" })
    }
}