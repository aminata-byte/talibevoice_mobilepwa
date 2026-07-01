import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, CheckCircle2, Clock, Edit } from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./RapportsPage.css";

function RapportsPage() {
  const navigate = useNavigate();
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("tous");

  useEffect(() => {
    fetchRapports();
  }, []);

  const fetchRapports = async () => {
    setLoading(true);
    try {
      const data = await agentService.getRapports();
      setRapports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const rapportsFiltres = rapports.filter((r) => {
    if (tab === "tous") return true;
    return r.statut === tab;
  });

  const getBadgeClass = (statut) => {
    if (statut === "valide") return "rapport-badge rapport-badge--valide";
    if (statut === "soumis") return "rapport-badge rapport-badge--soumis";
    return "rapport-badge rapport-badge--brouillon";
  };

  const getBadgeLabel = (statut) => {
    if (statut === "valide") return "Validé";
    if (statut === "soumis") return "Soumis";
    return "Brouillon";
  };

  const getBadgeIcon = (statut) => {
    if (statut === "valide") return <CheckCircle2 size={12} />;
    if (statut === "soumis") return <Clock size={12} />;
    return <Edit size={12} />;
  };

  return (
    <div className="rapports-page">
      <TopBar title="Mes rapports" showBack={false} titleOnly={true} />

      <div className="rapports-content">
        <div className="rapports-header">
          <button
            className="rapports-btn-nouveau"
            onClick={() => navigate("/rapports/nouveau")}
          >
            <Plus size={18} />
            Nouveau rapport
          </button>
        </div>

        <div className="rapports-tabs">
          {["tous", "brouillon", "soumis", "valide"].map((t) => (
            <button
              key={t}
              className={`rapports-tab ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t === "tous"
                ? `Tous (${rapports.length})`
                : t === "brouillon"
                  ? `Brouillons (${rapports.filter((r) => r.statut === "brouillon").length})`
                  : t === "soumis"
                    ? `Soumis (${rapports.filter((r) => r.statut === "soumis").length})`
                    : `Validés (${rapports.filter((r) => r.statut === "valide").length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="rapports-empty">Chargement...</p>
        ) : rapportsFiltres.length === 0 ? (
          <div className="rapports-empty-state">
            <FileText size={48} color="var(--text-secondary)" />
            <p>Aucun rapport dans cette catégorie.</p>
            <button
              className="rapports-btn-nouveau"
              onClick={() => navigate("/rapports/nouveau")}
            >
              <Plus size={16} />
              Rédiger un rapport
            </button>
          </div>
        ) : (
          <div className="rapports-list">
            {rapportsFiltres.map((rapport) => (
              <div key={rapport.id} className="rapport-card">
                <div className="rapport-card__header">
                  <h3 className="rapport-card__titre">{rapport.titre}</h3>
                  <span className={getBadgeClass(rapport.statut)}>
                    {getBadgeIcon(rapport.statut)}
                    {getBadgeLabel(rapport.statut)}
                  </span>
                </div>
                <p className="rapport-card__type">{rapport.type}</p>
                <p className="rapport-card__daara">
                  {rapport.daara?.nom || "—"}
                </p>
                <p className="rapport-card__date">
                  {new Date(
                    rapport.date_creation || rapport.created_at,
                  ).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                {rapport.statut === "brouillon" && (
                  <button
                    className="rapport-card__btn"
                    onClick={() =>
                      navigate(
                        `/rapports/nouveau?rapport_id=${rapport.id}&mission_id=${rapport.mission_id || ""}&daara_id=${rapport.daara_id || ""}`,
                      )
                    }
                  >
                    <Edit size={15} />
                    Continuer la rédaction
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default RapportsPage;
