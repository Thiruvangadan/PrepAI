import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [reports, setReports] = useState([]);

  const resetState = () => {
    setCurrentReport(null);
    setReports([]);
  };

  return (
    <InterviewContext.Provider
      value={{
        loading,
        setLoading,
        currentReport,
        setCurrentReport,
        reports,
        setReports,
        resetState,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
