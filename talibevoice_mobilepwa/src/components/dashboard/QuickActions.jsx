import { UserPlus, Building2, ClipboardPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./QuickActions.css";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">
      <button
        className="quick-actions__card"
        onClick={() => navigate("/recenser-talibe")}
      >
        <UserPlus size={24} />
        <span>Nouveau Talibé</span>
      </button>

      <button
        className="quick-actions__card"
        onClick={() => navigate("/recenser-daara")}
      >
        <Building2 size={24} />
        <span>Nouveau Daara</span>
      </button>

      <button
        className="quick-actions__card"
        onClick={() => navigate("/rapports/nouveau")}
      >
        <ClipboardPen size={24} />
        <span>Rapport</span>
      </button>
    </div>
  );
}

export default QuickActions;
