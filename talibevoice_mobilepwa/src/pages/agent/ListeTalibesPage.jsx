import { useState } from "react";
import { Search, SlidersHorizontal, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import "./ListeTalibesPage.css";

const talibesData = [
  {
    id: 1,
    nom: "Abdou Diop",
    initiales: "AD",
    daara: "Daara Al Nour",
    age: 12,
    couleur: "#1B7D4B",
  },
  {
    id: 2,
    nom: "Mamadou Sow",
    initiales: "MS",
    daara: "Daara Serigne Fallou",
    age: 10,
    couleur: "#2D5F8A",
  },
  {
    id: 3,
    nom: "Ibrahima Aw",
    initiales: "IA",
    daara: "Daara Hikmatoul Islam",
    age: 14,
    couleur: "#7B4B9E",
  },
  {
    id: 4,
    nom: "Bocar Samb",
    initiales: "BS",
    daara: "Daara Al Falah",
    age: 11,
    couleur: "#C0392B",
  },
  {
    id: 5,
    nom: "Fatoumata Sy",
    initiales: "FS",
    daara: "Daara Mame Cheikh",
    age: 13,
    couleur: "#E67E22",
  },
  {
    id: 6,
    nom: "Moustapha Diagne",
    initiales: "MD",
    daara: "Daara Khadim Rassoul",
    age: 9,
    couleur: "#1B7D4B",
  },
];

function ListeTalibesPage() {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");

  const talibsFiltres = talibesData.filter((t) =>
    t.nom.toLowerCase().includes(recherche.toLowerCase()),
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

        {/* Liste */}
        <div className="talibes-list">
          {talibsFiltres.map((talib) => (
            <div
              key={talib.id}
              className="talib-card"
              onClick={() => navigate(`/talibes/${talib.id}`)}
            >
              <div
                className="talib-card__avatar"
                style={{ backgroundColor: talib.couleur }}
              >
                {talib.initiales}
              </div>
              <div className="talib-card__content">
                <h3 className="talib-card__nom">{talib.nom}</h3>
                <p className="talib-card__daara">{talib.daara}</p>
              </div>
              <div className="talib-card__right">
                <span className="talib-card__age">{talib.age} ans</span>
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
