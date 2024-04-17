import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
})

export async function GET(request: Request) {

    await dbConnect();

    try {
        const {searchParams} = new URL(request.url);
        const queryParams = {
            username: searchParams.get('username'),
        }
        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParams);
        if(!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(', '):'Invalid query parameter',
            },{
                status: 400,
            })
        }

        const {username} = result.data;

        const ExistingVerifiedUser = await UserModel.findOne({username, isVerified: true});

        if(ExistingVerifiedUser) {
            return Response.json({
                success: false,
                message: 'Username is taken',
            },{
                status: 400,
            })
        }

        return Response.json({
            success: true,
            message: 'Username Avaliable',
        },{
            status: 200,
        })

    } catch(error) {
        console.log('Error checking username', error)
        return Response.json({
            success: false,
            message: 'Error checking name'
        },
        {
            status: 500
        })
    }
}