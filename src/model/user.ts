import mongoose,{Schema, Document} from "mongoose";

export interface message extends Document{
    content:string;
    createdAt: Date
}

const msgSchema: Schema< message> = new Schema({
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
  isAcceptionMessage:Boolean;
} 