import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
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
  };
};
