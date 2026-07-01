import { useState, useEffect } from "react";
import { Calendar, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./MissionsPage.css";

function MissionsPage() {
  const [tab, setTab] = useState("en_cours");
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    setLoading(true);
    try {
      const data = await agentService.getMissions();
      setMissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccepter = async (id) => {
    try {
      await agentService.accepterMission(id);
      setMissions((prev) =>
        prev.map((m) => (m.id === id ? { ...m, statut: "en_cours" } : m)),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'acceptation.");
    }
  };

  const handleCloturer = async (id) => {
    try {
      await agentService.cloturerMission(id);
      setMissions((prev) =>
        prev.map((m) => (m.id === id ? { ...m, statut: "cloturee" } : m)),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la clôture.");
    }
  };

  const missionsFiltrees = missions.filter((m) => m.statut === tab);

  const getBadgeClass = (statut) => {
    if (statut === "en_cours")
      return "mission-card__badge mission-card__badge--cours";
    if (statut === "en_attente")
      return "mission-card__badge mission-card__badge--attente";
    return "mission-card__badge mission-card__badge--cloturee";
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

  return (
    <div className="missions-page">
      <TopBar title="Mes missions" showBack={false} titleOnly={true} />

      <div className="missions-content">
        {/* Tabs */}
        <div className="missions-tabs">
          <button
            className={`missions-tab ${tab === "en_attente" ? "active" : ""}`}
            onClick={() => setTab("en_attente")}
          >
            En attente (
            {missions.filter((m) => m.statut === "en_attente").length})
          </button>
          <button
            className={`missions-tab ${tab === "en_cours" ? "active" : ""}`}
            onClick={() => setTab("en_cours")}
          >
            En cours ({missions.filter((m) => m.statut === "en_cours").length})
          </button>
          <button
            className={`missions-tab ${tab === "cloturee" ? "active" : ""}`}
            onClick={() => setTab("cloturee")}
          >
            Clôturées ({missions.filter((m) => m.statut === "cloturee").length})
          </button>
        </div>

        {/* Liste missions */}
        {loading ? (
          <p className="missions-empty">Chargement...</p>
        ) : (
          <div className="missions-list">
            {missionsFiltrees.length === 0 ? (
              <p className="missions-empty">
                Aucune mission dans cette catégorie.
              </p>
            ) : (
              missionsFiltrees.map((mission) => (
                <div key={mission.id} className="mission-card">
                  <div className="mission-card__header">
                    <h3 className="mission-card__titre">
                      {mission.titre || mission.type || "Mission"}
                    </h3>
                    <span className={getBadgeClass(mission.statut)}>
                      {getBadgeLabel(mission.statut)}
                    </span>
                  </div>
                  <p className="mission-card__description">
                    {mission.description || mission.objectif || "—"}
                  </p>
                  <p className="mission-card__dates">
                    <Calendar size={13} />
                    {formatDates(mission)}
                  </p>

                  <div className="mission-card__actions">
                    <button
                      className="mission-card__btn mission-card__btn--details"
                      onClick={() => navigate(`/missions/${mission.id}`)}
                    >
                      <Eye size={15} />
                      Détails
                    </button>
                    {mission.statut === "en_cours" && (
                      <button
                        className="mission-card__btn mission-card__btn--cloturer"
                        onClick={() => handleCloturer(mission.id)}
                      >
                        Clôturer
                      </button>
                    )}
                    {mission.statut === "en_attente" && (
                      <button
                        className="mission-card__btn mission-card__btn--accept"
                        onClick={() => handleAccepter(mission.id)}
                      >
                        Accepter
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default MissionsPage;
