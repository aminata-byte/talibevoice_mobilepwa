import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Plus,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./ListeTalibesPage.css";

const couleurs = ["#1B7D4B", "#2D5F8A", "#7B4B9E", "#C0392B", "#E67E22"];

function calculerAge(dateNaissance) {
  if (!dateNaissance) return "—";
  const naissance = new Date(dateNaissance);
  const aujourdHui = new Date();
  let age = aujourdHui.getFullYear() - naissance.getFullYear();
  const moisDiff = aujourdHui.getMonth() - naissance.getMonth();
  if (
    moisDiff < 0 ||
    (moisDiff === 0 && aujourdHui.getDate() < naissance.getDate())
  ) {
    age--;
  }
  return age;
}

function getInitiales(nom, prenom) {
  return `${prenom?.charAt(0) || ""}${nom?.charAt(0) || ""}`.toUpperCase();
}

function ListeTalibesPage() {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");
  const [talibes, setTalibes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTalibes();
  }, []);

  const fetchTalibes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentService.getTalibes();
      setTalibes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Erreur lors du chargement des talibés.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const talibsFiltres = talibes.filter((t) =>
    `${t.prenom} ${t.nom}`.toLowerCase().includes(recherche.toLowerCase()),
  );

  return (
    <div className="talibes-page">
      <TopBar title="Talibés" showBack={false} titleOnly={true} />

      <div className="talibes-content">
        {/* Recherche */}
        <div className="talibes-search">
          <div className="talibes-search__input">
            <Search size={16} />
            <input
              type="text"
              placeholder="Rechercher un talibé..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>
          <button className="talibes-search__filter">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Compteur */}
        <div className="talibes-meta">
          <p>
            Total : <strong>{talibsFiltres.length} talibés</strong>
          </p>
          <p className="talibes-sort">
            Trier par : <span>Plus récent</span>
          </p>
        </div>

        {/* Chargement / Erreur */}
        {loading && <p className="talibes-empty">Chargement des talibés...</p>}
        {error && <p className="talibes-empty">{error}</p>}
        {!loading && !error && talibsFiltres.length === 0 && (
          <p className="talibes-empty">Aucun talibé recensé pour le moment.</p>
        )}

        {/* Liste */}
        <div className="talibes-list">
          {talibsFiltres.map((talib, index) => (
            <div
              key={talib.id}
              className="talib-card"
              onClick={() => navigate(`/talibes/${talib.id}`)}
            >
              <div
                className="talib-card__avatar"
                style={{ backgroundColor: couleurs[index % couleurs.length] }}
              >
                {getInitiales(talib.nom, talib.prenom)}
              </div>
              <div className="talib-card__content">
                <h3 className="talib-card__nom">
                  {talib.prenom} {talib.nom}
                </h3>
                <p className="talib-card__daara">
                  <Building2 size={12} />
                  {talib.daara?.nom || "Daara non renseigné"}
                </p>
              </div>
              <div className="talib-card__right">
                <span className="talib-card__age">
                  {calculerAge(talib.date_naissance)} ans
                </span>
                <ChevronRight size={16} className="talib-card__arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        className="talibes-fab"
        onClick={() => navigate("/recenser-talibe")}
      >
        <Plus size={24} />
      </button>

      <BottomNav />
    </div>
  );
}

export default ListeTalibesPage;
