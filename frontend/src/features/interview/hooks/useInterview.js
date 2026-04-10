import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdf,
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    currentReport,
    setCurrentReport,
    reports,
    setReports,
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let res = null;
    try {
      res = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setCurrentReport(res.interviewReport);
      setReports((prev) => [res.interviewReport, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    return res.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let res = null;
    try {
      res = await getInterviewReportById(interviewId);
      setCurrentReport(res.interviewReport);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    return res.interviewReport;
  };

  const getReports = async () => {
    setLoading(true);
    let res = null;

    try {
      res = await getAllInterviewReports();
      setReports(res.interviewReports);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    return res.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let res = null;
    try {
      res = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([res], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reports.length === 0) {
      getReports();
    }
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  return {
    loading,
    currentReport,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
