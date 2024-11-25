import { connect } from "@/app/utils/dbconnect/dbconnect";
import User from "@/app/utils/schema/userschema";
import { NextResponse } from "next/server";
connect()
export async function GET(request, { params }) {
    const userId = params.entryid

    try {
        const result = await User.findOne({ _id: userId })
        return NextResponse.json({ success: true, data: result })
    } catch {
        return NextResponse.json({ success: false, message: "cant fetch" })
    }
}
export async function PUT(request, { params }) {
    const userId = params.entryid
    console.log(params)
    const { newEntry } = await request.json();
    try {
        await User.findByIdAndUpdate(userId, {
            entry: newEntry,
        })
        return NextResponse.json({ success: true, message: "Record Successfully updated" })
    } catch {
        return NextResponse.json({ success: false, message: "Can't update" })
    }

}