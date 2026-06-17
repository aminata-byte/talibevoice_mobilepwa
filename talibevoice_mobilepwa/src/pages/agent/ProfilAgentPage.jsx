import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Badge,
  LogOut,
  Pencil,
  Shield,
} from "lucide-react";
import { useAgentAuth } from "../../context/AgentAuthContext";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import "./ProfilAgentPage.css";

function ProfilAgentPage() {
  const { agent, logout } = useAgentAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: agent?.name || "",
    email: agent?.email || "",
    telephone: agent?.telephone || "+221 77 000 00 01",
    zone_affectation: agent?.zone_affectation || "Dakar",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    setEditing(false);
    alert("Profil mis à jour avec succès.");
  };

  const infos = [
    { icon: <Mail size={16} />, label: "Email", field: "email", type: "email" },
    {
      icon: <Phone size={16} />,
      label: "Téléphone",
      field: "telephone",
      type: "tel",
    },
    {
      icon: <MapPin size={16} />,
      label: "Zone d'affectation",
      field: "zone_affectation",
      type: "text",
    },
  ];

  return (
    <div className="profil-page">
      <TopBar title="Mon profil" showBack={true} />

      <div className="profil-content">
        {/* Hero */}
        <div className="profil-hero">
          <div className="profil-avatar">{agent?.name?.charAt(0) || "A"}</div>
          <h1 className="profil-name">{agent?.name || "Agent"}</h1>
          <p className="profil-matricule">
            <Badge size={13} />
            Matricule : {agent?.matricule || "AGT001"}
          </p>
          <span className="profil-badge">
            <Shield size={12} />
            Agent de terrain
          </span>
        </div>

        {/* Informations */}
        <div className="profil-card">
          <div className="profil-card__header">
            <h2 className="profil-section-title">Informations</h2>
            <button
              className="profil-edit-btn"
              onClick={() => (editing ? handleSave() : setEditing(true))}
            >
              <Pencil size={14} />
              {editing ? "Enregistrer" : "Modifier"}
            </button>
          </div>

          <div className="profil-form">
            {infos.map((info, index) => (
              <div key={index} className="profil-field">
                <label className="profil-label">
                  {info.icon}
                  {info.label}
                </label>
                {editing ? (
                  <input
                    type={info.type}
                    value={form[info.field]}
                    onChange={(e) => handleChange(info.field, e.target.value)}
                    className="profil-input"
                  />
                ) : (
                  <p className="profil-value">{form[info.field]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Déconnexion */}
        <button className="profil-logout-btn" onClick={logout}>
          <LogOut size={18} />
          Se déconnecter
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

export default ProfilAgentPage;
