import { ChevronRight, Clock3 } from "lucide-react";

import "./MissionCard.css";

function MissionCard({ icon, titre, lieu, heure, statut }) {
  return (
    <div className="mission-card">
      <div className="mission-card__icon">{icon}</div>

      <div className="mission-card__content">
        <div className="mission-card__header">
          <h3 className="mission-card__title">{titre}</h3>

          <span
            className={`mission-card__badge mission-card__badge--${statut}`}
          >
            {statut === "en_cours"
              ? "EN COURS"
              : statut === "en_attente"
                ? "EN ATTENTE"
                : "TERMINÉE"}
          </span>
        </div>

        <p className="mission-card__location">{lieu}</p>

        <div className="mission-card__footer">
          <div className="mission-card__time">
            <Clock3 size={14} />
            <span>{heure}</span>
          </div>

          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}

export default MissionCard;
