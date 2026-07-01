import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  FileText,
  CheckCircle2,
  Building2,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./MissionDetailPage.css";

function MissionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMission();
  }, [id]);

  const fetchMission = async () => {
    setLoading(true);
    try {
      const data = await agentService.getMission(id);
      setMission(data);
    } catch (err) {
      console.error(err);
      setMission(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAccepter = async () => {
    try {
      await agentService.accepterMission(id);
      setMission((prev) => ({ ...prev, statut: "en_cours" }));
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'acceptation.");
    }
  };

  const handleCloturer = async () => {
    try {
      await agentService.cloturerMission(id);
      setMission((prev) => ({ ...prev, statut: "cloturee" }));
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la clôture.");
    }
  };

  const getBadgeClass = (statut) => {
    if (statut === "en_cours") return "mdetail-badge mdetail-badge--cours";
    if (statut === "en_attente") return "mdetail-badge mdetail-badge--attente";
    return "mdetail-badge mdetail-badge--cloturee";
  };

  const getBadgeLabel = (statut) => {
    if (statut === "en_cours") return "EN COURS";
    if (statut === "en_attente") return "EN ATTENTE";
    return "CLÔTURÉE";
  };

  const formatDates = (mission) => {
    if (mission.date_debut && mission.date_fin) {
      return `${new Date(mission.date_debut).toLocaleDateString("fr-FR")} - ${new Date(mission.date_fin).toLocaleDateString("fr-FR")}`;
    }
    if (mission.date_debut) {
      return new Date(mission.date_debut).toLocaleDateString("fr-FR");
    }
    return "—";
  };

  if (loading) {
    return (
      <div className="mdetail-page">
        <TopBar title="Détail de la mission" showBack={true} />
        <div className="mdetail-content">
          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              padding: "2rem",
            }}
          >
            Chargement...
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="mdetail-page">
        <TopBar title="Détail de la mission" showBack={true} />
        <div className="mdetail-error">
          <p>Mission introuvable.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="mdetail-page">
      <TopBar title="Détail de la mission" showBack={true} />

      <div className="mdetail-content">
        <div className="mdetail-header">
          <span className={getBadgeClass(mission.statut)}>
            {getBadgeLabel(mission.statut)}
          </span>
          <h1 className="mdetail-titre">{mission.titre}</h1>
        </div>

        <div className="mdetail-infos">
          <div className="mdetail-info-item">
            <Building2 size={18} />
            <div>
              <p className="mdetail-info-label">Type de mission</p>
              <p className="mdetail-info-value">{mission.type}</p>
            </div>
          </div>
          <div className="mdetail-info-item">
            <MapPin size={18} />
            <div>
              <p className="mdetail-info-label">Daara</p>
              <p className="mdetail-info-value">{mission.daara?.nom || "—"}</p>
            </div>
          </div>
          <div className="mdetail-info-item">
            <Calendar size={18} />
            <div>
              <p className="mdetail-info-label">Période</p>
              <p className="mdetail-info-value">{formatDates(mission)}</p>
            </div>
          </div>
        </div>

        {mission.description && (
          <div className="mdetail-description">
            <h2 className="mdetail-section-title">
              <FileText size={16} />
              Description
            </h2>
            <p>{mission.description}</p>
          </div>
        )}

        {mission.statut !== "cloturee" && (
          <button
            className="mdetail-action-btn"
            onClick={
              mission.statut === "en_attente" ? handleAccepter : handleCloturer
            }
          >
            <CheckCircle2 size={18} />
            {mission.statut === "en_attente"
              ? "Accepter la mission"
              : "Clôturer la mission"}
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default MissionDetailPage;
