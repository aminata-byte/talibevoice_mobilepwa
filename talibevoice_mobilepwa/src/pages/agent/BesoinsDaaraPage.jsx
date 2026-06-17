import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Users,
  User,
  Plus,
  Wheat,
  Pill,
  BookOpen,
  MoreHorizontal,
  ChevronRight,
  Shield,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import FormSection from "../../components/forms/FormSection";
import SelectField from "../../components/forms/SelectField";
import "./BesoinsDaaraPage.css";

const daarasData = {
  1: {
    nom: "Daara Serigne Fallou",
    zone: "Médina Gounass, Kaolack",
    talibes: 35,
    responsable: "Serigne Abdou Fall",
  },
  2: {
    nom: "Daara Cheikh Ahmadou",
    zone: "Ndofane, Kaolack",
    talibes: 28,
    responsable: "Serigne Modou Diop",
  },
};

const besoinsExistants = [
  {
    id: 1,
    type: "Alimentaire",
    icon: <Wheat size={18} />,
    titre: "Riz et huile",
    description: "Besoin en vivres pour la cuisine",
    priorite: "urgent",
    date: "15 mai 2025",
  },
  {
    id: 2,
    type: "Médical",
    icon: <Pill size={18} />,
    titre: "Médicaments",
    description: "Besoin en médicaments de première nécessité",
    priorite: "normal",
    date: "14 mai 2025",
  },
  {
    id: 3,
    type: "Éducatif",
    icon: <BookOpen size={18} />,
    titre: "Fournitures scolaires",
    description: "Cahiers, stylos, ardoises",
    priorite: "faible",
    date: "13 mai 2025",
  },
  {
    id: 4,
    type: "Autre",
    icon: <MoreHorizontal size={18} />,
    titre: "Autres besoins",
    description: "Matelas pour dortoir",
    priorite: "normal",
    date: "12 mai 2025",
  },
];

function BesoinsDaaraPage() {
  const { id } = useParams();
  const daara = daarasData[id] || daarasData[1];

  const [form, setForm] = useState({
    type: "",
    description: "",
    priorite: "urgent",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.type || !form.description) {
      alert("Veuillez remplir le type et la description.");
      return;
    }
    alert("Besoin ajouté avec succès !");
    setForm({ type: "", description: "", priorite: "urgent" });
  };

  const getPrioriteBadgeClass = (priorite) => {
    if (priorite === "urgent")
      return "besoin-card__badge besoin-card__badge--urgent";
    if (priorite === "normal")
      return "besoin-card__badge besoin-card__badge--normal";
    return "besoin-card__badge besoin-card__badge--faible";
  };

  const getPrioriteLabel = (priorite) => {
    if (priorite === "urgent") return "Urgent";
    if (priorite === "normal") return "Normal";
    return "Faible";
  };

  return (
    <div className="besoins-page">
      <TopBar title="Besoins du daara" showBack={true} />

      <div className="besoins-content">
        {/* Card daara */}
        <div className="besoins-daara-card">
          <div className="besoins-daara-card__icon">
            <Shield size={24} />
          </div>
          <div className="besoins-daara-card__info">
            <h3>{daara.nom}</h3>
            <p className="besoins-daara-card__zone">
              <MapPin size={12} />
              {daara.zone}
            </p>
            <div className="besoins-daara-card__meta">
              <span>
                <Users size={12} />
                {daara.talibes} talibés
              </span>
              <span>
                <User size={12} />
                Responsable : {daara.responsable}
              </span>
            </div>
          </div>
        </div>

        {/* Formulaire ajout */}
        <div className="besoins-form">
          <h2 className="besoins-form__title">Ajouter un besoin</h2>

          <SelectField
            label="Type de besoin *"
            options={[
              "Sélectionner le type de besoin",
              "Alimentaire",
              "Médical",
              "Éducatif",
              "Infrastructure",
              "Vêtements",
              "Autre",
            ]}
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />

          <div className="field">
            <label>Description du besoin *</label>
            <textarea
              placeholder="Décrivez le besoin en détail..."
              rows={4}
              maxLength={300}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <span className="besoins-char-count">
              {form.description.length}/300
            </span>
          </div>

          <div className="field">
            <label>Priorité *</label>
            <div className="besoins-priorite">
              <button
                className={`besoins-priorite__btn besoins-priorite__btn--urgent ${form.priorite === "urgent" ? "active" : ""}`}
                onClick={() => handleChange("priorite", "urgent")}
              >
                Urgent
              </button>
              <button
                className={`besoins-priorite__btn besoins-priorite__btn--normal ${form.priorite === "normal" ? "active" : ""}`}
                onClick={() => handleChange("priorite", "normal")}
              >
                Normal
              </button>
              <button
                className={`besoins-priorite__btn besoins-priorite__btn--faible ${form.priorite === "faible" ? "active" : ""}`}
                onClick={() => handleChange("priorite", "faible")}
              >
                Faible
              </button>
            </div>
          </div>

          <div className="field">
            <label>Date de signalement</label>
            <input type="text" value="16 mai 2025" disabled />
          </div>

          <button className="besoins-submit-btn" onClick={handleSubmit}>
            <Plus size={18} />
            Ajouter le besoin
          </button>
        </div>

        {/* Besoins existants */}
        <div className="besoins-existants">
          <h2 className="besoins-existants__title">Besoins existants</h2>
          <div className="besoins-list">
            {besoinsExistants.map((besoin) => (
              <div key={besoin.id} className="besoin-card">
                <div className="besoin-card__icon">{besoin.icon}</div>
                <div className="besoin-card__content">
                  <div className="besoin-card__header">
                    <h3>{besoin.titre}</h3>
                    <span className={getPrioriteBadgeClass(besoin.priorite)}>
                      {getPrioriteLabel(besoin.priorite)}
                    </span>
                  </div>
                  <p className="besoin-card__description">
                    {besoin.description}
                  </p>
                  <p className="besoin-card__date">{besoin.date}</p>
                </div>
                <ChevronRight size={16} className="besoin-card__arrow" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default BesoinsDaaraPage;
