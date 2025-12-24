import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
} = process.env;
