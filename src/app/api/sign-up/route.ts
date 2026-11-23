import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerficationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(req:Request){
    await dbConnect();

    try {
        const { username, email, password }= await req.json();

        
    } catch (error) {
        console.error("Error registering user", error)
        return Response.json({
            success:false,
            messege:"Error registering user"
        },
         {
            status:500
         }
    )
    }
}