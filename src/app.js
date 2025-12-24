import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectDB from "./db/index.js";
import limiter from "./middlewares/rateLimit.middleware.js";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(limiter);

//Routes
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import subRouter from "./Routes/subscription.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subRouter);

app.get("/", (_, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(`SubDub is running on http://localhost:${PORT}/`);

  await connectDB();
});
