import mongoose from "mongoose";

type connectionObject = {
    isConnected?:number;
}

const connection:connectionObject= {}

async function dbConnect(): Promise<void>  {
    if(connection.isConnected){
console.log("db connected")
return
    }

    try {
      const db = await mongoose.connect(process.env.MONGODB_URL || '', {})

      connection.isConnected = db.connections[0].readyState

      console.log("db is connected")
    } catch (error) {
        console.log("db connection failed", error)
        process.exit(1)
    }
}

export default dbConnect;