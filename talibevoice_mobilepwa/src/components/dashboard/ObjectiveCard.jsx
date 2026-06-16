import { Target, ChevronRight } from "lucide-react";
import "./ObjectiveCard.css";

function ObjectiveCard({ title, description, progress }) {
  return (
    <div className="objective-card">
      <div className="objective-card__icon">
        <Target size={22} />
      </div>

      <div className="objective-card__content">
        <h3 className="objective-card__title">{title}</h3>

        <p className="objective-card__description">{description}</p>

        <div className="objective-card__progress">
          <div
            className="objective-card__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="objective-card__percent">{progress}% atteint</span>
      </div>

      <ChevronRight size={18} />
    </div>
  );
}

export default ObjectiveCard;
