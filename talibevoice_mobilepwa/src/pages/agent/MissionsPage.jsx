import { useState } from "react";
import { Calendar } from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import "./MissionsPage.css";

const missionsData = [
  {
    id: 1,
    titre: "Recensement Daara Al Nour",
    description:
      "Visite et recensement des nouveaux talibés inscrits pour le trimestre en cours. Vérification...",
    dates: "16 mai 2025 - 18 mai 2025",
    statut: "en_cours",
  },
  {
    id: 2,
    titre: "Distribution de kits hygiène",
    description:
      "Remise officielle des kits de protection sanitaire et sensibilisation aux gestes barrières dans la...",
    dates: "20 mai 2025 - 22 mai 2025",
    statut: "en_cours",
  },
  {
    id: 3,
    titre: "Médiation familiale Touba",
    description:
      "Suivi de deux dossiers de réinsertion familiale. Rencontre avec les tuteurs légaux et évaluation...",
    dates: "25 mai 2025 - 27 mai 2025",
    statut: "en_cours",
  },
  {
    id: 4,
    titre: "Recensement Daara Kolda",
    description:
      "Premier passage de recensement dans la zone, à planifier avec l'équipe régionale.",
    dates: "2 juin 2025 - 4 juin 2025",
    statut: "en_attente",
  },
  {
    id: 5,
    titre: "Visite Daara Touba Centre",
    description:
      "Mission de suivi terminée avec succès, rapport soumis à l'administration.",
    dates: "1 mai 2025 - 3 mai 2025",
    statut: "cloturee",
  },
];

function MissionsPage() {
  const [tab, setTab] = useState("en_cours");

  const missionsFiltrees = missionsData.filter((m) => m.statut === tab);

  const handleCloturer = (id) => {
    alert(`Mission #${id} clôturée avec succès.`);
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
            En attente
          </button>
          <button
            className={`missions-tab ${tab === "en_cours" ? "active" : ""}`}
            onClick={() => setTab("en_cours")}
          >
            En cours
          </button>
          <button
            className={`missions-tab ${tab === "cloturee" ? "active" : ""}`}
            onClick={() => setTab("cloturee")}
          >
            Clôturées
          </button>
        </div>

        {/* Liste missions */}
        <div className="missions-list">
          {missionsFiltrees.length === 0 ? (
            <p className="missions-empty">
              Aucune mission dans cette catégorie.
            </p>
          ) : (
            missionsFiltrees.map((mission) => (
              <div key={mission.id} className="mission-card">
                <div className="mission-card__header">
                  <h3 className="mission-card__titre">{mission.titre}</h3>
                  {mission.statut === "en_cours" && (
                    <span className="mission-card__badge mission-card__badge--cours">
                      EN COURS
                    </span>
                  )}
                  {mission.statut === "en_attente" && (
                    <span className="mission-card__badge mission-card__badge--attente">
                      EN ATTENTE
                    </span>
                  )}
                  {mission.statut === "cloturee" && (
                    <span className="mission-card__badge mission-card__badge--cloturee">
                      CLÔTURÉE
                    </span>
                  )}
                </div>
                <p className="mission-card__description">
                  {mission.description}
                </p>
                <p className="mission-card__dates">
                  <Calendar size={13} />
                  {mission.dates}
                </p>
                {mission.statut === "en_cours" && (
                  <button
                    className="mission-card__btn"
                    onClick={() => handleCloturer(mission.id)}
                  >
                    Clôturer la mission
                  </button>
                )}
                {mission.statut === "en_attente" && (
                  <button
                    className="mission-card__btn mission-card__btn--accept"
                    onClick={() => handleCloturer(mission.id)}
                  >
                    Accepter la mission
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default MissionsPage;
