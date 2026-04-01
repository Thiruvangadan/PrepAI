import { Router } from "express";
import authUser from "../middlewares/auth.middleware.js";
import { generateInterviewReportController } from "../controllers/interview.controller.js";
import upload from "../middlewares/file.middleware.js";

const interviewRouter = Router();

/**
 * @route POST /api/interview
 * @description Generate new interview report on the basis of user self description, resume pdf and job description.
 * @access Private
 */

interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterviewReportController,
);

export default interviewRouter;
