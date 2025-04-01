import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const {email, password} = reqBody;
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User not Found"}, {status: 400});
        }

        const check = await bcrypt.compare(password, user.password);

        if(!check){
            return NextResponse.json({error: "Invalid Password"}, {status: 400});
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d"
            },
        );

        const response = NextResponse.json({
            message: "Login Success",
            success: true,
        }, {status: 200});

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}   