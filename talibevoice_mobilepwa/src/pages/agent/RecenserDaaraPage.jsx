import { useState, useEffect } from "react";
import {
  Building2,
  User,
  MapPinned,
  Info,
  Save,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import FormSection from "../../components/forms/FormSection";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import agentService from "../../services/agentService";
import "./RecenserDaaraPage.css";

const REGIONS = [
  "Sélectionnez la région",
  "Dakar",
  "Thiès",
  "Saint-Louis",
  "Louga",
  "Fatick",
  "Kaolack",
  "Kaffrine",
  "Diourbel",
  "Ziguinchor",
  "Kolda",
  "Sédhiou",
  "Tambacounda",
  "Kédougou",
  "Matam",
];

function RecenserDaaraPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [locating, setLocating] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    region: "",
    capacite_accueil: "",
    nom_responsable: "",
    telephone_responsable: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const detecterPosition = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setLocating(false);
      },
      () => {
        alert("Impossible de détecter la position.");
        setLocating(false);
      },
    );
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.adresse || !form.nom_responsable) {
      alert("Veuillez remplir le nom, l'adresse et le responsable.");
      return;
    }

    try {
      await agentService.createDaara({
        nom: form.nom,
        adresse: form.adresse,
        region: form.region || null,
        capacite_accueil: form.capacite_accueil || 0,
        nom_responsable: form.nom_responsable,
        telephone_responsable: form.telephone_responsable,
        latitude: form.latitude || null,
        longitude: form.longitude || null,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/daaras");
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'enregistrement.");
    }
  };

  if (success) {
    return (
      <div className="daara-success">
        <CheckCircle2 size={64} color="var(--primary)" />
        <h2>Daara enregistré !</h2>
        <p>Le recensement a été soumis avec succès.</p>
      </div>
    );
  }

  return (
    <div className="recenser-daara-page">
      <TopBar title="Recenser un daara" showBack={true} />

      <div className="page-content">
        {/* Informations générales */}
        <FormSection
          icon={<Building2 size={18} />}
          title="Informations générales"
        >
          <TextField
            label="Nom du daara *"
            placeholder="Ex : Daara Serigne Fallou"
            value={form.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
          <TextField
            label="Adresse *"
            placeholder="Ex : Médina Gounass, Kaolack"
            value={form.adresse}
            onChange={(e) => handleChange("adresse", e.target.value)}
          />
          <SelectField
            label="Région"
            options={REGIONS}
            value={form.region || "Sélectionnez la région"}
            onChange={(e) => handleChange("region", e.target.value)}
          />
          <TextField
            label="Capacité d'accueil"
            placeholder="Ex : 50"
            type="number"
            value={form.capacite_accueil}
            onChange={(e) => handleChange("capacite_accueil", e.target.value)}
          />
        </FormSection>

        {/* Responsable */}
        <FormSection icon={<User size={18} />} title="Responsable">
          <TextField
            label="Nom du responsable *"
            placeholder="Ex : Serigne Abdou Fall"
            value={form.nom_responsable}
            onChange={(e) => handleChange("nom_responsable", e.target.value)}
          />
          <TextField
            label="Téléphone du responsable"
            placeholder="Ex : 77 123 45 67"
            value={form.telephone_responsable}
            onChange={(e) =>
              handleChange("telephone_responsable", e.target.value)
            }
          />
        </FormSection>

        {/* Localisation */}
        <FormSection icon={<MapPinned size={18} />} title="Localisation">
          <button
            className="daara-map__btn"
            onClick={detecterPosition}
            disabled={locating}
          >
            <MapPinned size={18} />
            {locating ? "Détection..." : "Détecter ma position"}
          </button>
          <div className="daara-row">
            <TextField
              label="Latitude"
              value={form.latitude}
              placeholder="Auto-détectée"
              onChange={(e) => handleChange("latitude", e.target.value)}
            />
            <TextField
              label="Longitude"
              value={form.longitude}
              placeholder="Auto-détectée"
              onChange={(e) => handleChange("longitude", e.target.value)}
            />
          </div>
          <div className="daara-info">
            <Info size={16} />
            <span>Cliquez sur le bouton pour détecter automatiquement.</span>
          </div>
        </FormSection>

        <button className="save-btn" onClick={handleSubmit}>
          <Save size={18} />
          Enregistrer
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

export default RecenserDaaraPage;
