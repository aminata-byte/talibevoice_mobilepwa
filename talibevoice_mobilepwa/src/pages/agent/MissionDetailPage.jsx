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
import "./MissionDetailPage.css";

const missionsData = [
  {
    id: 1,
    titre: "Recensement Daara Al Nour",
    description:
      "Visite et recensement des nouveaux talibés inscrits pour le trimestre en cours. Vérification des documents d'état civil et mise à jour des fiches existantes.",
    lieu: "Médina Gounass, Kolda",
    dates: "16 mai 2025 - 18 mai 2025",
    statut: "en_cours",
    type: "Recensement",
  },
  {
    id: 2,
    titre: "Distribution de kits hygiène",
    description:
      "Remise officielle des kits de protection sanitaire et sensibilisation aux gestes barrières dans la zone concernée.",
    lieu: "Bakel Centre, Bakel",
    dates: "20 mai 2025 - 22 mai 2025",
    statut: "en_cours",
    type: "Distribution",
  },
  {
    id: 3,
    titre: "Médiation familiale Touba",
    description:
      "Suivi de deux dossiers de réinsertion familiale. Rencontre avec les tuteurs légaux et évaluation des conditions de vie.",
    lieu: "Touba",
    dates: "25 mai 2025 - 27 mai 2025",
    statut: "en_cours",
    type: "Suivi",
  },
  {
    id: 4,
    titre: "Recensement Daara Kolda",
    description:
      "Premier passage de recensement dans la zone, à planifier avec l'équipe régionale.",
    lieu: "Kolda",
    dates: "2 juin 2025 - 4 juin 2025",
    statut: "en_attente",
    type: "Recensement",
  },
  {
    id: 5,
    titre: "Visite Daara Touba Centre",
    description:
      "Mission de suivi terminée avec succès, rapport soumis à l'administration.",
    lieu: "Touba Centre",
    dates: "1 mai 2025 - 3 mai 2025",
    statut: "cloturee",
    type: "Suivi",
  },
];

function MissionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mission = missionsData.find((m) => m.id === parseInt(id));

  if (!mission) {
    return (
      <div className="mdetail-error">
        <p>Mission introuvable.</p>
      </div>
    );
  }

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

  const handleAction = () => {
    if (mission.statut === "en_attente") {
      alert("Mission acceptée avec succès.");
    } else {
      alert("Mission clôturée avec succès.");
    }
    navigate("/missions");
  };

  return (
    <div className="mdetail-page">
      <TopBar title="Détail de la mission" showBack={true} />

      <div className="mdetail-content">
        {/* Header */}
        <div className="mdetail-header">
          <span className={getBadgeClass(mission.statut)}>
            {getBadgeLabel(mission.statut)}
          </span>
          <h1 className="mdetail-titre">{mission.titre}</h1>
        </div>

        {/* Infos */}
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
              <p className="mdetail-info-label">Lieu</p>
              <p className="mdetail-info-value">{mission.lieu}</p>
            </div>
          </div>
          <div className="mdetail-info-item">
            <Calendar size={18} />
            <div>
              <p className="mdetail-info-label">Période</p>
              <p className="mdetail-info-value">{mission.dates}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mdetail-description">
          <h2 className="mdetail-section-title">
            <FileText size={16} />
            Description
          </h2>
          <p>{mission.description}</p>
        </div>

        {/* Action */}
        {mission.statut !== "cloturee" && (
          <button className="mdetail-action-btn" onClick={handleAction}>
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
