import "./Sidebar.scss";
import { formatDate } from "../../../utils/utils.js";
import { useParams } from "react-router";

const Sidebar = ({ reports = [], onSelectReport, onLogout, onNewPlan }) => {
  const { interviewId } = useParams();

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <h2 className="sidebar__logo">PrepAI</h2>

        <button className="newplan-btn" onClick={onNewPlan}>
          + New Plan
        </button>
      </div>

      <div className="sidebar__reports">
        <h3 className="sidebar__heading">Recent Reports</h3>

        {reports.length === 0 ? (
          <p className="empty-text">No reports yet</p>
        ) : (
          <ul>
            {reports.map((report) => (
              <li
                key={report._id}
                className={`report-item ${interviewId === report._id ? "active" : ""}`}
                onClick={() => onSelectReport(report._id)}
              >
                <h4>{report.title || "Untitled"}</h4>
                <p>
                  {formatDate(report.createdAt)}• Match score{" "}
                  {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar__bottom">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
