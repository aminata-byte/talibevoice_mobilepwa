import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, AlertTriangle, CheckCircle2 } from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import "./RedigerRapportPage.css";

function RedigerRapportPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    titre: "",
    type: "",
    daara: "",
    contenu: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleBrouillon = () => {
    if (!form.titre) {
      alert("Veuillez au moins saisir un titre.");
      return;
    }
    alert("Brouillon enregistré avec succès.");
  };

  const handleSubmit = () => {
    if (!form.titre || !form.type || !form.daara || !form.contenu) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/dashboard");
    }, 2000);
  };

  if (success) {
    return (
      <div className="rapport-success">
        <CheckCircle2 size={64} color="var(--primary)" />
        <h2>Rapport soumis !</h2>
        <p>Votre rapport a été envoyé pour validation.</p>
      </div>
    );
  }

  return (
    <div className="rapport-page">
      <TopBar title="Rédiger un rapport" showBack={true} />

      <div className="rapport-content">
        <TextField
          label="Titre du rapport *"
          placeholder="Ex : Visite et recensement du Daara Serigne..."
          value={form.titre}
          onChange={(e) => handleChange("titre", e.target.value)}
        />

        <SelectField
          label="Type de rapport *"
          options={[
            "Sélectionner un type",
            "Recensement",
            "Suivi",
            "Distribution",
            "Autre",
          ]}
          value={form.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />

        <SelectField
          label="Daara concerné *"
          options={[
            "Sélectionner un daara",
            "Daara Serigne Fallou",
            "Daara Cheikh Ahmadou",
            "Daara Mame Cheikh Ibra",
          ]}
          value={form.daara}
          onChange={(e) => handleChange("daara", e.target.value)}
        />

        <div className="field">
          <label>Contenu *</label>
          <textarea
            placeholder="Rédigez le contenu de votre rapport ici..."
            rows={8}
            maxLength={2000}
            value={form.contenu}
            onChange={(e) => handleChange("contenu", e.target.value)}
          />
          <span className="rapport-char-count">
            {form.contenu.length} / 2000
          </span>
        </div>

        {/* Boutons */}
        <div className="rapport-actions">
          <button
            className="rapport-btn rapport-btn--outline"
            onClick={handleBrouillon}
          >
            <Save size={18} />
            Enregistrer brouillon
          </button>
          <button
            className="rapport-btn rapport-btn--primary"
            onClick={handleSubmit}
          >
            <AlertTriangle size={18} />
            Soumettre
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default RedigerRapportPage;
