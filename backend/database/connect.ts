import mongoose from "mongoose";
import config from "../config/index.ts";
import print from "../utils/console.ts";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.dbUrl);
    print(`MongoDB Connected: ${conn.connection.db?.databaseName}`, "cyan");
  } catch (error) {
    print("MongoDB Connection Error", "red");
    process.exit(1);
  }
};
