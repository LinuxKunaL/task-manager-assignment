import dotenv from "dotenv";

dotenv.config();

type TConfig = {
  port: number | string;
  dbUrl: string;
  jwt: string;
};

const config: TConfig = {
  port: process.env.PORT || "3000",
  dbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017/task-manager",
  jwt: process.env.JWT_SECRET || "secret",
};

export default config;
