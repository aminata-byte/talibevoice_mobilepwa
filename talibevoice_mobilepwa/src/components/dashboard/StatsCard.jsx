import { TrendingUp } from "lucide-react";
import "./StatsCard.css";

function StatsCard({ icon, title, value, evolution }) {
  return (
    <div className="stats-card">
      <div className="stats-card__icon">{icon}</div>

      <p className="stats-card__title">{title}</p>

      <h3 className="stats-card__value">{value}</h3>

      <div className="stats-card__evolution">
        <TrendingUp size={14} />
        <span>{evolution}</span>
      </div>
    </div>
  );
}

export default StatsCard;