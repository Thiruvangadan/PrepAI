import api from "../../../lib/axios";

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const res = await api.post("/api/interview/", formData, {
    "Content-Type": "multipart/form-data",
  });

  return res.data;
};

/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
  const res = await api.get(`/api/interview/report/${interviewId}`);

  return res.data;
};

/**
 * @description Service to get all interview reports of the user.
 */
export const getAllInterviewReports = async () => {
  const res = await api.get("/api/interview/");

  return res.data;
};

/**
 * @description Service to generate resume in pdf.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  const res = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
    null,
    {
      responseType: "blob",
    },
  );

  return res.data;
};
