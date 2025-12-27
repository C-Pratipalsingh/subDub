import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  SERVER_URL,
  NODE_ENV,
  MONGODB_URI,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  ARCJET_ENV,
  ARCJET_KEY,
  QSTASH_URL,
  QSTASH_TOKEN,
} = process.env;