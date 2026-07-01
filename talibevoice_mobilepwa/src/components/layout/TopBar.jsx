import { useState, useEffect } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { useAgentAuth } from "../../context/AgentAuthContext";
import { useNavigate } from "react-router-dom";
import agentService from "../../services/agentService";
import "./TopBar.css";

function TopBar({ title, showBack = false, action = null }) {
  const { agent } = useAgentAuth();
  const navigate = useNavigate();
  const [nonLues, setNonLues] = useState(0);

  useEffect(() => {
    if (!showBack) {
      fetchNonLues();
    }
  }, [showBack]);

  const fetchNonLues = async () => {
    try {
      const data = await agentService.getNotifications();
      const count = Array.isArray(data)
        ? data.filter((n) => !n.est_lue).length
        : 0;
      setNonLues(count);
    } catch (err) {
      console.error(err);
    }
  };

  if (showBack) {
    return (
      <div className="topbar topbar--inner">
        <button className="topbar__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="topbar__title">{title}</h1>
        <div className="topbar__action-slot">
          {action || <div style={{ width: 20 }} />}
        </div>
      </div>
    );
  }

  return (
    <div className="topbar">
      <div className="topbar__left">
        <p className="topbar__greeting">Bonjour,</p>
        <h1 className="topbar__name">{agent?.name || "Agent"}</h1>
        <p className="topbar__role">Agent de terrain</p>
      </div>
      <div className="topbar__right">
        <button
          className="topbar__notif"
          onClick={() => navigate("/notifications")}
        >
          <Bell size={20} />
          {nonLues > 0 && (
            <span className="topbar__notif-badge">{nonLues}</span>
          )}
        </button>
        <button className="topbar__avatar" onClick={() => navigate("/profil")}>
          {agent?.name?.charAt(0) || "A"}
        </button>
      </div>
    </div>
  );
}

export default TopBar;
