import { Home, Users, Building2, FileText, ClipboardList } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { icon: <Home size={20} />, label: "Accueil", path: "/dashboard" },
    { icon: <Users size={20} />, label: "Talibés", path: "/talibes" },
    { icon: <Building2 size={20} />, label: "Daaras", path: "/daaras" },
    { icon: <FileText size={20} />, label: "Rapports", path: "/rapports" },
    { icon: <ClipboardList size={20} />, label: "Missions", path: "/missions" },
  ];

  return (
    <div className="bottomnav">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`bottomnav__btn ${location.pathname.startsWith(tab.path) ? "active" : ""}`}
          onClick={() => navigate(tab.path)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNav;
