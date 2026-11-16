import z from "zod";

export const userNameValidation = z.string().min(3, "Username must be atleast 3 charecters").max(20, "Username must be no more then 20 charecter").regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special charecter")


export const signUpSchema = z.object({
    username: userNameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(8, {message:"password must be atleast 8 charecters"})
})