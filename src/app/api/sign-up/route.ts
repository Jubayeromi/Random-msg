import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerficationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(req:Request){
    await dbConnect();

    try {
        const { username, email, password }= await req.json();
const existingUserVerifiedByUserName = await userModel.findOne({
    userName: username,
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

    if(existingUserByEmail.isVerified){
        return Response.json({
 success:false,
    messege: "User already exist with this email"
},{status:400})
    } else{
        const hashedPassword = await bcrypt.hash(password, 10)
        
     

        // existingUserByEmail.userName = username
        existingUserByEmail.password = hashedPassword
        existingUserByEmail.verifyCode = verifyCode
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() +3600000)
        await existingUserByEmail.save()
    }
} else{
    const hashedPassword = await bcrypt.hash(password, 10)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours()+1)

  const newUser =   new userModel({
        userName: username,
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

// send verification email

 const emailResponse = await sendVerficationEmail(
    email,
    username,
    verifyCode
)
if(!emailResponse.success){
return Response.json({
    success:false,
    messege: emailResponse.messege,
},{status:500})
}

return Response.json({
 success:true,
    messege: "User registered successfully. please Verify your email"
},{status:500})
        
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