import { Router } from "express";
import authUser from "../middlewares/auth.middleware.js";
import {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
} from "../controllers/interview.controller.js";
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

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report by interviewId.
 * @access Private
 */

interviewRouter.get(
  "/report/:interviewId",
  authUser,
  getInterviewReportByIdController,
);

/**
 * @route GET /api/interview/
 * @description Get all interview report of logged in user.
 * @access Private
 */

interviewRouter.get("/", authUser, getAllInterviewReportsController);

/**
 * @route POST /api/resume/pdf
 * @description Generate resume pdf on the basis of user description, resume content and job description.
 * @access Private
 */

interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authUser,
  generateResumePdfController,
);

export default interviewRouter;
