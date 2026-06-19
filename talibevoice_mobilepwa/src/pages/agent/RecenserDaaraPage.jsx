import { useState } from "react";
import {
  Building2,
  MapPin,
  Users,
  Phone,
  User,
  MapPinned,
  Info,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import FormSection from "../../components/forms/FormSection";
import TextField from "../../components/forms/TextField";
import "./RecenserDaaraPage.css";

function RecenserDaaraPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    capacite_accueil: "",
    nombre_talibes: "",
    nom_responsable: "",
    telephone_responsable: "",
    latitude: "14.1414",
    longitude: "-16.6731",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.nom || !form.adresse || !form.nom_responsable) {
      alert("Veuillez remplir au moins le nom, l'adresse et le responsable.");
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/daaras");
    }, 2000);
  };

  if (success) {
    return (
      <div className="daara-success">
        <Save size={64} color="var(--primary)" />
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
            label="Nom du daara"
            placeholder="Ex : Daara Serigne Fallou"
            value={form.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
          <TextField
            label="Adresse"
            placeholder="Ex : Médina Gounass, Kaolack"
            value={form.adresse}
            onChange={(e) => handleChange("adresse", e.target.value)}
          />
          <div className="daara-row">
            <TextField
              label="Capacité d'accueil"
              placeholder="Ex : 50"
              type="number"
              value={form.capacite_accueil}
              onChange={(e) => handleChange("capacite_accueil", e.target.value)}
            />
            <TextField
              label="Nombre de talibés"
              placeholder="Ex : 35"
              type="number"
              value={form.nombre_talibes}
              onChange={(e) => handleChange("nombre_talibes", e.target.value)}
            />
          </div>
        </FormSection>

        {/* Responsable */}
        <FormSection icon={<User size={18} />} title="Responsable">
          <TextField
            label="Nom du responsable"
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
          <div className="daara-map">
            <button className="daara-map__btn">
              <MapPinned size={20} />
            </button>
          </div>
          <div className="daara-row">
            <TextField
              label="Latitude"
              value={form.latitude}
              onChange={(e) => handleChange("latitude", e.target.value)}
            />
            <TextField
              label="Longitude"
              value={form.longitude}
              onChange={(e) => handleChange("longitude", e.target.value)}
            />
          </div>
          <div className="daara-info">
            <Info size={16} />
            <span>La localisation est détectée automatiquement.</span>
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
