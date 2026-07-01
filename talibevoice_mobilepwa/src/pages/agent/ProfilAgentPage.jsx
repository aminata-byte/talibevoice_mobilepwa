import { useState } from "react";
import {
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
import agentService from "../../services/agentService";
import "./ProfilAgentPage.css";

function ProfilAgentPage() {
  const { agent, logout } = useAgentAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: agent?.name || "",
    email: agent?.email || "",
    telephone: agent?.telephone || "",
    zone_affectation: agent?.zone_affectation || "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await agentService.updateMe({
        name: form.name,
        email: form.email,
        telephone: form.telephone,
        zone_affectation: form.zone_affectation,
      });
      setEditing(false);
      alert("Profil mis à jour avec succès.");
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la mise à jour.");
    } finally {
      setSaving(false);
    }
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
        <div className="profil-hero">
          <div className="profil-avatar">{agent?.name?.charAt(0) || "A"}</div>
          <h1 className="profil-name">{form.name || "Agent"}</h1>
          <p className="profil-matricule">
            <Badge size={13} />
            Matricule : {agent?.matricule || "—"}
          </p>
          <span className="profil-badge">
            <Shield size={12} />
            Agent de terrain
          </span>
        </div>

        <div className="profil-card">
          <div className="profil-card__header">
            <h2 className="profil-section-title">Informations</h2>
            <button
              className="profil-edit-btn"
              onClick={() => (editing ? handleSave() : setEditing(true))}
              disabled={saving}
            >
              <Pencil size={14} />
              {saving
                ? "Enregistrement..."
                : editing
                  ? "Enregistrer"
                  : "Modifier"}
            </button>
          </div>

          <div className="profil-form">
            {/* Nom — toujours éditable en mode édition */}
            <div className="profil-field">
              <label className="profil-label">Nom</label>
              {editing ? (
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="profil-input"
                />
              ) : (
                <p className="profil-value">{form.name || "—"}</p>
              )}
            </div>

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
                  <p className="profil-value">{form[info.field] || "—"}</p>
                )}
              </div>
            ))}
          </div>
        </div>

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
