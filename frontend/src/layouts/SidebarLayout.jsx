import "./SidebarLayout.scss";
import Sidebar from "../features/interview/components/SideBar";
import { useInterview } from "../features/interview/hooks/useInterview";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router";

const SidebarLayout = ({ children }) => {
  const { reports } = useInterview();
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    await handleLogout();
    navigate("/login");
  };

  const handleNewPlan = () => {
    navigate("/");
  };

  return (
    <div className="sidebar-layout">
      <Sidebar
        reports={reports}
        onLogout={handleLogoutUser}
        onSelectReport={(id) => navigate(`/interview/${id}`)}
        onNewPlan={handleNewPlan}
      />

      <div className="main-content">{children}</div>
    </div>
  );
};

export default SidebarLayout;
