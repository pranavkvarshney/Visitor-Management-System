import { connect } from "@/app/utils/dbconnect/dbconnect";
import User from "@/app/utils/schema/userschema";
import { NextResponse } from "next/server";
connect()
export async function GET(request, { params }) {
    const userId = params.userid

    try {
        const result = await User.findOne({ _id: userId })
        return NextResponse.json({ success: true, data: result })
    } catch {
        return NextResponse.json({ success: false, message: "cant fetch" })
    }
}
export async function PUT(request, { params }) {
    const userId = params.userid
    const { newName,
        newPhone,
        newCompany,
        newAddress,
        newType,
        newPurpose,
        newCompname,
        newCompadd } = await request.json();
    try {
        await User.findByIdAndUpdate(userId, {
            name: newName,
            phone: newPhone,
            company: newCompany,
            address: newAddress,
            type: newType,
            purpose: newPurpose,
            compname: newCompname,
            compadd: newCompadd,
        })
        return NextResponse.json({ success: true, message: "Record Successfully updated" })
    } catch {
        return NextResponse.json({ success: false, message: "Can't update" })
    }
}
export async function DELETE(request, { params }) {
    const userId = params.userid
    try {
        await User.findByIdAndDelete(userId)
        return NextResponse.json({ success: true, message: "Record is deleted" })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Can't delete" })
    }
}