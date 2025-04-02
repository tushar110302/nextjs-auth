import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDatafromToken } from "@/helpers/getDatafromToken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        
        const userId = await getDatafromToken(request);
        const user = await User.findById(userId).select("-password");

        if(!user){
            return NextResponse.json({error: "User not Found"}, {status: 400});
        }

        return NextResponse.json({
            message: "User Found Successfully",
            success: true,
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}   