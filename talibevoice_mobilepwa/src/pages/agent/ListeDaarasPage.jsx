import { useState } from "react";
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
import "./ListeDaarasPage.css";

const daarasData = [
  {
    id: 1,
    nom: "Daara Serigne Fallou",
    zone: "Médina Gounass, Kaolack",
    talibes: 35,
    statut: "actif",
  },
  {
    id: 2,
    nom: "Daara Cheikh Ahmadou",
    zone: "Ndofane, Kaolack",
    talibes: 28,
    statut: "actif",
  },
  {
    id: 3,
    nom: "Daara Mame Cheikh Ibra",
    zone: "Keur Socé, Kaolack",
    talibes: 42,
    statut: "actif",
  },
  {
    id: 4,
    nom: "Daara Darou Salam",
    zone: "Kolda",
    talibes: 18,
    statut: "inactif",
  },
  {
    id: 5,
    nom: "Daara Al Khadim",
    zone: "Touba",
    talibes: 56,
    statut: "actif",
  },
];

function ListeDaarasPage() {
  const navigate = useNavigate();
  const [vue, setVue] = useState("liste");
  const [recherche, setRecherche] = useState("");

  const daarasFiltres = daarasData.filter((d) =>
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
                    className={`daara-card__badge daara-card__badge--${daara.statut}`}
                  >
                    {daara.statut === "actif" ? "Actif" : "Inactif"}
                  </span>
                </div>
                <p className="daara-card__zone">
                  <MapPin size={12} />
                  {daara.zone}
                </p>
                <p className="daara-card__talibes">
                  <Users size={12} />
                  {daara.talibes} talibés
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
