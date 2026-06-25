import { useState, useEffect } from "react";
import {
  List,
  Map,
  Search,
  SlidersHorizontal,
  MapPin,
  Users,
  Plus,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./ListeDaarasPage.css";

function ListeDaarasPage() {
  const navigate = useNavigate();
  const [vue, setVue] = useState("liste");
  const [recherche, setRecherche] = useState("");
  const [daaras, setDaaras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDaaras();
  }, []);

  const fetchDaaras = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentService.getDaaras();
      setDaaras(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Erreur lors du chargement des daaras.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const daarasFiltres = daaras.filter((d) =>
    d.nom.toLowerCase().includes(recherche.toLowerCase()),
  );

  return (
    <div className="daaras-page">
      <TopBar title="Liste des daaras" showBack={false} titleOnly={true} />

      <div className="daaras-content">
        {/* Toggle */}
        <div className="daaras-toggle">
          <button
            className={`daaras-toggle__btn ${vue === "liste" ? "active" : ""}`}
            onClick={() => setVue("liste")}
          >
            <List size={16} />
            Liste
          </button>
          <button
            className={`daaras-toggle__btn ${vue === "carte" ? "active" : ""}`}
            onClick={() => setVue("carte")}
          >
            <Map size={16} />
            Carte
          </button>
        </div>

        {/* Recherche */}
        <div className="daaras-search">
          <div className="daaras-search__input">
            <Search size={16} />
            <input
              type="text"
              placeholder="Rechercher un daara, une zone..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>
          <button className="daaras-search__filter">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Chargement / Erreur */}
        {loading && <p className="daaras-empty">Chargement des daaras...</p>}
        {error && <p className="daaras-empty">{error}</p>}
        {!loading && !error && daarasFiltres.length === 0 && (
          <p className="daaras-empty">Aucun daara recensé pour le moment.</p>
        )}

        {/* Liste */}
        <div className="daaras-list">
          {daarasFiltres.map((daara) => (
            <div
              key={daara.id}
              className="daara-card"
              onClick={() => navigate(`/daaras/${daara.id}/besoins`)}
            >
              <div className="daara-card__icon">
                <Building2 size={24} />
              </div>
              <div className="daara-card__content">
                <div className="daara-card__header">
                  <h3 className="daara-card__nom">{daara.nom}</h3>
                  <span
                    className={`daara-card__badge daara-card__badge--${daara.statut === "actif" ? "actif" : "inactif"}`}
                  >
                    {daara.statut === "actif"
                      ? "Actif"
                      : daara.statut === "en_attente"
                        ? "En attente"
                        : "Inactif"}
                  </span>
                </div>
                <p className="daara-card__zone">
                  <MapPin size={12} />
                  {daara.commune || daara.region || daara.adresse}
                </p>
                <p className="daara-card__talibes">
                  <Users size={12} />
                  {daara.talibes_count ?? daara.nombre_talibes ?? 0} talibés
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        className="daaras-fab"
        onClick={() => navigate("/recenser-daara")}
      >
        <Plus size={24} />
      </button>

      <BottomNav />
    </div>
  );
}

export default ListeDaarasPage;
