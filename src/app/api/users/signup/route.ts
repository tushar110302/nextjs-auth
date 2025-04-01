import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/sendMail";

connectDB();

export async function POST(request :NextRequest) {
    try {
        const reqBody = await request.json();

        const {username, email, password} = reqBody;
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash
        })

        const savedUser = await newUser.save();
        console.log("SAVED USER")
        console.log(savedUser);

        await sendMail({email, emailType:"VERIFY", userId: newUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser: newUser
        }, {status: 200})

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}