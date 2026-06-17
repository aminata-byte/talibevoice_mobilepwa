import { Search, Plus, User } from "lucide-react";
import "./ListeTalibesPage.css";

function ListeTalibesPage() {
  const talibes = [
    {
      id: 1,
      nom: "Mamadou Diallo",
      age: 12,
      daara: "Daara Touba",
    },
    {
      id: 2,
      nom: "Ousmane Ndiaye",
      age: 14,
      daara: "Daara Médina",
    },
    {
      id: 3,
      nom: "Ibrahima Fall",
      age: 10,
      daara: "Daara Kolda",
    },
  ];

  return (
    <div className="talibes-page">
      <header className="talibes-header">
        <h1>Talibés</h1>
      </header>

      <div className="talibes-content">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Rechercher un talibé..." />
        </div>

        <div className="stats-card">
          <h3>Total Talibés</h3>
          <span>{talibes.length}</span>
        </div>

        <div className="talibes-list">
          {talibes.map((talibe) => (
            <div key={talibe.id} className="talibe-card">
              <div className="talibe-avatar">
                <User size={24} />
              </div>

              <div className="talibe-info">
                <h3>{talibe.nom}</h3>
                <p>{talibe.age} ans</p>
                <small>{talibe.daara}</small>
              </div>
            </div>
          ))}
        </div>

        <button className="add-btn">
          <Plus size={20} />
          Ajouter un talibé
        </button>
      </div>
    </div>
  );
}

export default ListeTalibesPage;
