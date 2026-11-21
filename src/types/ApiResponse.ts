import { message } from '@/model/user'

export interface ApiResponse {
success:boolean;
messege:string;
isAcceptingMesseges?:boolean;
messeges?: Array<message>
}