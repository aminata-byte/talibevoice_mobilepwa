import { useState, useEffect } from "react";
import { Users, Building2, FileText, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import QuickActions from "../../components/dashboard/QuickActions";
import StatsCard from "../../components/dashboard/StatsCard";
import MissionCard from "../../components/dashboard/MissionCard";
import ObjectiveCard from "../../components/dashboard/ObjectiveCard";
import agentService from "../../services/agentService";
import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const [talibes, setTalibes] = useState([]);
  const [daaras, setDaaras] = useState([]);
  const [rapports, setRapports] = useState([]);
  const [missions, setMissions] = useState([]);
  const [objectifs, setObjectifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        talibsData,
        daarasData,
        rapportsData,
        missionsData,
        objectifsData,
      ] = await Promise.all([
        agentService.getTalibes(),
        agentService.getDaaras(),
        agentService.getRapports(),
        agentService.getMissions(),
        agentService.getMesObjectifs(),
      ]);
      setTalibes(Array.isArray(talibsData) ? talibsData : []);
      setDaaras(Array.isArray(daarasData) ? daarasData : []);
      setRapports(Array.isArray(rapportsData) ? rapportsData : []);
      setMissions(Array.isArray(missionsData) ? missionsData : []);
      setObjectifs(Array.isArray(objectifsData) ? objectifsData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const missionsActives = missions.filter(
    (m) => m.statut === "en_cours" || m.statut === "en_attente",
  );

  const missionsAujourdhui = missions.filter((m) => {
    if (!m.date_debut) return false;
    const today = new Date().toISOString().split("T")[0];
    const dateDebut = m.date_debut.split("T")[0];
    return dateDebut === today;
  });

  const rapportsSoumis = rapports.filter(
    (r) => r.statut === "soumis" || r.statut === "valide",
  ).length;

  const getStatutLabel = (statut) => {
    if (statut === "en_cours") return "en_cours";
    if (statut === "en_attente") return "en_attente";
    return "en_attente";
  };

  const getValeurReelle = (type) => {
    if (type === "talibes") return talibes.length;
    if (type === "daaras") return daaras.length;
    if (type === "rapports") return rapportsSoumis;
    return 0;
  };

  const getTypeLabel = (type) => {
    if (type === "talibes") return "Recensement talibés";
    if (type === "daaras") return "Recensement daaras";
    if (type === "rapports") return "Rapports soumis";
    return type;
  };

  const calcProgress = (valeurReelle, valeurCible) =>
    Math.min(Math.round((valeurReelle / valeurCible) * 100), 100);

  return (
    <div className="dash">
      <TopBar />

      <main className="dash__content">
        <section className="dash__section">
          <h2 className="dash__section-title">Actions rapides</h2>
          <QuickActions />
        </section>

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
              value={loading ? "..." : rapportsSoumis.toString()}
              evolution="Soumis et validés"
            />
            <StatsCard
              icon={<MapPin size={20} />}
              title="Missions actives"
              value={loading ? "..." : missionsActives.length.toString()}
              evolution="En cours et en attente"
            />
          </div>
        </section>

        {!loading && objectifs.length > 0 && (
          <section className="dash__section">
            <h2 className="dash__section-title">Mes objectifs</h2>
            <div className="dash__objectives">
              {objectifs.map((objectif) => {
                const valeurReelle = getValeurReelle(objectif.type);
                const progress = calcProgress(
                  valeurReelle,
                  objectif.valeur_cible,
                );
                return (
                  <ObjectiveCard
                    key={objectif.id}
                    title={getTypeLabel(objectif.type)}
                    description={`${valeurReelle} / ${objectif.valeur_cible} ${getTypeLabel(objectif.type).toLowerCase()}`}
                    progress={progress}
                  />
                );
              })}
            </div>
          </section>
        )}

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
                <div
                  key={mission.id}
                  onClick={() => navigate(`/missions/${mission.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <MissionCard
                    icon={<MapPin size={20} />}
                    titre={mission.titre || mission.type || "Mission"}
                    lieu={mission.daara?.nom || "—"}
                    heure={
                      mission.date_debut
                        ? new Date(mission.date_debut).toLocaleDateString(
                            "fr-FR",
                          )
                        : "—"
                    }
                    statut={getStatutLabel(mission.statut)}
                  />
                </div>
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
