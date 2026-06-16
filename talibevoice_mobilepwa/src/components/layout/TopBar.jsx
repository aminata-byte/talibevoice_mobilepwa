import { Bell, UserRound } from "lucide-react";
import { useAgentAuth } from "../../context/AgentAuthContext";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

function TopBar() {
  const { agent } = useAgentAuth();
  const navigate = useNavigate();

  const notificationsCount = 3;

  return (
    <header className="topbar">
      <div className="topbar__left">
        <p className="topbar__greeting">Bonjour {agent?.name || "Agent"}</p>

        <p className="topbar__role">Agent de terrain</p>
      </div>

      <div className="topbar__right">
        <button
          className="topbar__notif"
          onClick={() => navigate("/notifications")}
          aria-label="Notifications"
        >
          <Bell size={20} />

          {notificationsCount > 0 && (
            <span className="topbar__notif-badge">{notificationsCount}</span>
          )}
        </button>

        <div className="topbar__avatar">
          <UserRound size={20} />
        </div>
      </div>
    </header>
  );
}

export default TopBar;
