import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {token} = body;
        console.log(token);

        const user = await User.findOne({
            verifyToken: token, 
            verifyTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({error: "Invalid Token"}, {status: 400})
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email Verified Successfully",
            success: true
        }, {status: 200});

    } catch (error: any) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}