import express from "express";
import authRoute from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/interview", interviewRouter);

export default app;
