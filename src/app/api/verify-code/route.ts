import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
// import {z} from "zod";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {username, code} = await request.json();

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({
            username:decodedUsername,
        });

        if(!user) {
            return Response.json({
                success: false,
                message:'User not found',
            },{
                status: 500,
            })
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeNotExpired && isCodeValid) {
            user.isVerified = true;
            await user.save();
            return Response.json({
                success: true,
                message:'User Verified Successfully !!!',
            },{
                status: 200,
            })
        } else if(!isCodeNotExpired && isCodeValid) {
            return Response.json({
                success: false,
                message:'Code Expired ... Signup Again ...',
            },{
                status: 400,
            })
        } else if(isCodeNotExpired && !isCodeValid) {
            return Response.json({
                success: false,
                message:'Code Incorrect ...',
            },{
                status: 400,
            })
        }



    } catch (err) {

        console.log('Error verifying User',err)
        NextResponse.json({
            success: false,
            message: 'Error verifying User',
        },{
            status: 500,
        })
    }
}