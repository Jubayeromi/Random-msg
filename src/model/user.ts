import mongoose,{Schema, Document} from "mongoose";

export interface message extends Document{
    content:string;
    createdAt: Date
}

const msgSchema: Schema<message> = new Schema({
  content:{type:String, required: true},
  createdAt:{ type:Date, required:true, default:Date.now}
})

// user interface
export interface User extends Document{
  userName:string;
  email:string;
  password:string;
  verifyCode:string;
  verifyCodeExpiry:Date;
  isVerified:Boolean;
  isAcceptionMessage:Boolean;
  messages: message[];
} 

const userSchema: Schema< User> = new Schema({
  userName:{type:String, required: [true, "Username is required"], trim:true},
  email:{ type:String, required:[true, "Email is required"], unique:true, match:[/.+\@.+\..+/,"Please use a valid email address"]},
  password:{type:String, required:[true, "Password is required"]},
  verifyCode:{type:String, required : [true, "Verify code is required"]},
  verifyCodeExpiry:{type:Date, required:[true, "Verify code expiry is required"]},
  isVerified:{type:Boolean, default:false},
  isAcceptionMessage:{type:Boolean, default:false},
  messages:[msgSchema]
})