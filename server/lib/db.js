import mongoose from "mongoose";
import dotenv from "dotenv";

// Function to connect to MongoDB
export const connectDB = async ()=>{
  try {
    mongoose.connection.on('connected', ()=>console.log('database connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)

  } catch (error) {
    console.log(error);
  }
}