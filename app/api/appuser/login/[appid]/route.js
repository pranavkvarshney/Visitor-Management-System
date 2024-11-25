import { connect } from "@/app/utils/dbconnect/dbconnect";
import appUser from "@/app/utils/schema/appuserschema";
import { NextResponse } from "next/server";
connect()
export async function GET(request, { params }) {
    const email = params.appid

    try {
        const result = await appUser.findOne({ email: email })
        return NextResponse.json({ success: true, data: result })
    } catch {
        return NextResponse.json({ success: false, message: "cant fetch" })
    }
}
export async function PUT(request, { params }) {
    const email = params.appid
    const { toggle } = await request.json();
    try {
        await appUser.findOneAndUpdate({ email: email }, {
            toggle: toggle,
        })
        return NextResponse.json({ success: true, message: "lets go" })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }) // Use error.message to get the error description
    }
}