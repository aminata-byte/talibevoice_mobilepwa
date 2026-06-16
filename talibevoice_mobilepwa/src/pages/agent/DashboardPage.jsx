import { Users, Building2, FileText, Briefcase, MapPin } from "lucide-react";

import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";

import QuickActions from "../../components/dashboard/QuickActions";
import StatsCard from "../../components/dashboard/StatsCard";
import MissionCard from "../../components/dashboard/MissionCard";
import ObjectiveCard from "../../components/dashboard/ObjectiveCard";

import "./DashboardPage.css";

function DashboardPage() {
  return (
    <div className="dash">
      <TopBar />

      <main className="dash__content">
        {/* Actions rapides */}
        <section className="dash__section">
          <h2 className="dash__section-title">Actions rapides</h2>

          <QuickActions />
        </section>

        {/* Statistiques */}
        <section className="dash__section">
          <h2 className="dash__section-title">Mes statistiques</h2>

          <div className="dash__stats-grid">
            <StatsCard
              icon={<Users size={20} />}
              title="Talibés recensés"
              value="128"
              evolution="+12 cette semaine"
            />

            <StatsCard
              icon={<Building2 size={20} />}
              title="Daaras recensés"
              value="24"
              evolution="+3 cette semaine"
            />

            <StatsCard
              icon={<FileText size={20} />}
              title="Rapports soumis"
              value="15"
              evolution="+5 cette semaine"
            />

            <StatsCard
              icon={<Briefcase size={20} />}
              title="Missions actives"
              value="3"
              evolution="Aujourd'hui"
            />
          </div>
        </section>

        {/* Missions */}
        <section className="dash__section">
          <h2 className="dash__section-title">Mes missions du jour</h2>

          <div className="dash__missions">
            <MissionCard
              icon={<MapPin size={20} />}
              titre="Recensement Talibés"
              lieu="Médina Gounass, Kolda"
              heure="08:00"
              statut="en_cours"
            />

            <MissionCard
              icon={<Building2 size={20} />}
              titre="Visite Daara"
              lieu="Bakel Centre"
              heure="14:00"
              statut="en_attente"
            />
          </div>
        </section>

        {/* Objectif */}
        <section className="dash__section">
          <h2 className="dash__section-title">Objectif du jour</h2>

          <ObjectiveCard
            title="Objectif quotidien"
            description="Recenser 20 talibés et visiter 2 daaras"
            progress={65}
          />
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default DashboardPage;
