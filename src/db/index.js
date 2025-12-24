import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";
import { DB_NAME } from "../constant.js";

if (!MONGODB_URI)
  throw new Error("Please define the MONGODB_URI environment variable!!");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB connected at HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection failed!! : ", error.message);
    process.exit(1);
  }
};

export default connectDB;