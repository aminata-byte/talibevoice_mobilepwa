import { useState, useEffect } from "react";
import { User, Users, FileText, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import FormSection from "../../components/forms/FormSection";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import ToggleField from "../../components/forms/ToggleField";
import agentService from "../../services/agentService";
import "./RecenserTalibePage.css";

// Données mock — utilisées uniquement en mode édition pour l'instant
const talibesData = [
  {
    id: 1,
    nom: "Diop",
    prenom: "Abdou",
    date_naissance: "2013-03-15",
    lieu_naissance: "Médina Gounass, Kolda",
    daara: "Daara Al Nour",
    niveau_etude: "Coran - Niveau 2",
    est_majeur: false,
  },
  {
    id: 2,
    nom: "Sow",
    prenom: "Mamadou",
    date_naissance: "2015-06-20",
    lieu_naissance: "Dakar Plateau",
    daara: "Daara Serigne Fallou",
    niveau_etude: "Coran - Niveau 1",
    est_majeur: false,
  },
];

function RecenserTalibePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    daara: "",
    niveau_etude: "",
    est_majeur: false,
  });

  useEffect(() => {
    if (isEditMode) {
      const talib = talibesData.find((t) => t.id === parseInt(id));
      if (talib) {
        setForm({
          nom: talib.nom,
          prenom: talib.prenom,
          date_naissance: talib.date_naissance,
          lieu_naissance: talib.lieu_naissance,
          daara: talib.daara,
          niveau_etude: talib.niveau_etude,
          est_majeur: talib.est_majeur,
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.prenom) {
      alert("Veuillez remplir au moins le nom et le prénom.");
      return;
    }

    try {
      if (isEditMode) {
        // Mode édition — à connecter plus tard avec une route update
        setSuccess(true);
      } else {
        await agentService.createTalibe({
          daara_id: 2, // temporaire — à remplacer par une vraie sélection de daara
          nom: form.nom,
          prenom: form.prenom,
          date_naissance: form.date_naissance,
          lieu_naissance: form.lieu_naissance,
          niveau_etude: form.niveau_etude,
          est_majeur: form.est_majeur,
        });
        setSuccess(true);
      }

      setTimeout(() => {
        setSuccess(false);
        navigate(isEditMode ? `/talibes/${id}` : "/talibes");
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'enregistrement.");
    }
  };

  if (success) {
    return (
      <div className="talibe-success">
        <CheckCircle2 size={64} color="var(--primary)" />
        <h2>{isEditMode ? "Fiche mise à jour !" : "Talibé enregistré !"}</h2>
        <p>
          {isEditMode
            ? "Les modifications ont été enregistrées avec succès."
            : "Le recensement a été soumis avec succès."}
        </p>
      </div>
    );
  }

  return (
    <div className="talibe-page">
      <TopBar
        title={isEditMode ? "Modifier la fiche" : "Recenser un talibé"}
        showBack={true}
      />

      <div className="page-content">
        <FormSection
          icon={<User size={18} />}
          title="Informations personnelles"
        >
          <TextField
            label="Nom"
            placeholder="Entrez le nom"
            value={form.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
          <TextField
            label="Prénom"
            placeholder="Entrez le prénom"
            value={form.prenom}
            onChange={(e) => handleChange("prenom", e.target.value)}
          />
          <TextField
            label="Date de naissance"
            type="date"
            value={form.date_naissance}
            onChange={(e) => handleChange("date_naissance", e.target.value)}
          />
          <TextField
            label="Lieu de naissance"
            placeholder="Entrez le lieu"
            value={form.lieu_naissance}
            onChange={(e) => handleChange("lieu_naissance", e.target.value)}
          />
        </FormSection>

        <FormSection icon={<Users size={18} />} title="Situation">
          <SelectField
            label="Daara"
            options={[
              "Sélectionnez le daara",
              "Daara Touba",
              "Daara Médina",
              "Daara Kolda",
            ]}
            value={form.daara}
            onChange={(e) => handleChange("daara", e.target.value)}
          />
          <SelectField
            label="Niveau d'étude"
            options={[
              "Sélectionnez le niveau",
              "Débutant",
              "Intermédiaire",
              "Avancé",
            ]}
            value={form.niveau_etude}
            onChange={(e) => handleChange("niveau_etude", e.target.value)}
          />
          <ToggleField
            label="Est majeur ?"
            value={form.est_majeur}
            onChange={(val) => handleChange("est_majeur", val)}
          />
        </FormSection>

        <FormSection icon={<FileText size={18} />} title="Documents">
          <div className="upload-box">
            <FileText size={32} color="var(--primary)" />
            <p>Cliquez pour ajouter un document</p>
            <input type="file" />
          </div>
        </FormSection>

        <button className="save-btn" onClick={handleSubmit}>
          {isEditMode
            ? "Enregistrer les modifications"
            : "Enregistrer le talibé"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

export default RecenserTalibePage;
