import { useState, useEffect } from "react";
import { Users, Building2, FileText, MapPin } from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import QuickActions from "../../components/dashboard/QuickActions";
import StatsCard from "../../components/dashboard/StatsCard";
import MissionCard from "../../components/dashboard/MissionCard";
import "./DashboardPage.css";

function DashboardPage() {
  const [talibes, setTalibes] = useState([]);
  const [daaras, setDaaras] = useState([]);
  const [rapports, setRapports] = useState([]);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [talibsData, daarasData, rapportsData, missionsData] =
        await Promise.all([
          import("../../services/agentService").then((m) =>
            m.default.getTalibes(),
          ),
          import("../../services/agentService").then((m) =>
            m.default.getDaaras(),
          ),
          import("../../services/agentService").then((m) =>
            m.default.getRapports(),
          ),
          import("../../services/agentService").then((m) =>
            m.default.getMissions(),
          ),
        ]);
      setTalibes(Array.isArray(talibsData) ? talibsData : []);
      setDaaras(Array.isArray(daarasData) ? daarasData : []);
      setRapports(Array.isArray(rapportsData) ? rapportsData : []);
      setMissions(Array.isArray(missionsData) ? missionsData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const missionsActives = missions.filter(
    (m) => m.statut === "en_cours" || m.statut === "acceptee",
  );
  const missionsAujourdhui = missions.filter((m) => {
    if (!m.date_mission) return false;
    const today = new Date().toISOString().split("T")[0];
    return m.date_mission.startsWith(today);
  });

  const getStatutLabel = (statut) => {
    if (statut === "en_cours") return "en_cours";
    if (statut === "acceptee") return "en_cours";
    if (statut === "en_attente") return "en_attente";
    return "en_attente";
  };

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
              value={loading ? "..." : talibes.length.toString()}
              evolution="Total recensés"
            />
            <StatsCard
              icon={<Building2 size={20} />}
              title="Daaras recensés"
              value={loading ? "..." : daaras.length.toString()}
              evolution="Total recensés"
            />
            <StatsCard
              icon={<FileText size={20} />}
              title="Rapports soumis"
              value={loading ? "..." : rapports.length.toString()}
              evolution="Total soumis"
            />
            <StatsCard
              icon={<MapPin size={20} />}
              title="Missions actives"
              value={loading ? "..." : missionsActives.length.toString()}
              evolution="En cours"
            />
          </div>
        </section>

        {/* Missions du jour */}
        <section className="dash__section">
          <h2 className="dash__section-title">Mes missions du jour</h2>
          {loading ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Chargement...
            </p>
          ) : missionsAujourdhui.length === 0 ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Aucune mission aujourd'hui.
            </p>
          ) : (
            <div className="dash__missions">
              {missionsAujourdhui.slice(0, 3).map((mission) => (
                <MissionCard
                  key={mission.id}
                  icon={<MapPin size={20} />}
                  titre={mission.titre || mission.type || "Mission"}
                  lieu={mission.lieu || mission.daara?.nom || "—"}
                  heure={
                    mission.heure_debut ? mission.heure_debut.slice(0, 5) : "—"
                  }
                  statut={getStatutLabel(mission.statut)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default DashboardPage;
