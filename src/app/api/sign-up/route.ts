import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerficationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(req:Request){
    await dbConnect();

    try {
        const { username, email, password }= await req.json();
const existingUserVerifiedByUserName = await userModel.findOne({
    username,
    isVerified:true
})

if (existingUserVerifiedByUserName){
    return Response.json({
        success:false,
        message:"Username is already taken"
    }, {status:400})
}

const existingUserByEmail = await userModel.findOne({
    email
})

const verifyCode = Math.floor(100000 +Math.random() * 900000).toString()

if(existingUserByEmail){

} else{
    const hashedPassword = await bcrypt.hash(password, 10)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours()+1)

  const newUser =   new userModel({
        username,
        email,
        password:hashedPassword,
        verifyCode,
        verifyCodeExpiry:expiryDate,
        isVerified:false,
        isAcceptionMessage:true,
        messege:[],

    })
    await newUser.save()
}
        
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