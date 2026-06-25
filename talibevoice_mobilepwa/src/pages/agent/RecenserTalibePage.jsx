import { useState, useEffect } from "react";
import { User, Users, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import FormSection from "../../components/forms/FormSection";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import ToggleField from "../../components/forms/ToggleField";
import agentService from "../../services/agentService";
import "./RecenserTalibePage.css";

function RecenserTalibePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [success, setSuccess] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [daaras, setDaaras] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    daara_id: "",
    niveau_etude: "",
    est_majeur: false,
    a_etat_civil: false,
  });

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const fetchInitialData = async () => {
    setLoadingData(true);
    try {
      const daarasData = await agentService.getDaaras();
      setDaaras(Array.isArray(daarasData) ? daarasData : []);

      if (isEditMode) {
        const talibe = await agentService.getTalibe(id);
        if (talibe) {
          setForm({
            nom: talibe.nom || "",
            prenom: talibe.prenom || "",
            date_naissance: talibe.date_naissance
              ? talibe.date_naissance.split("T")[0]
              : "",
            lieu_naissance: talibe.lieu_naissance || "",
            daara_id: talibe.daara_id?.toString() || "",
            niveau_etude: talibe.niveau_etude || "",
            est_majeur: talibe.est_majeur || false,
            a_etat_civil: talibe.a_etat_civil || false,
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.prenom) {
      alert("Veuillez remplir au moins le nom et le prénom.");
      return;
    }
    if (!isEditMode && !form.daara_id) {
      alert("Veuillez sélectionner un daara.");
      return;
    }

    try {
      if (isEditMode) {
        await agentService.updateTalibe(id, {
          nom: form.nom,
          prenom: form.prenom,
          date_naissance: form.date_naissance,
          lieu_naissance: form.lieu_naissance,
          niveau_etude: form.niveau_etude,
          est_majeur: form.est_majeur,
          a_etat_civil: form.a_etat_civil,
        });
      } else {
        await agentService.createTalibe({
          daara_id: parseInt(form.daara_id),
          nom: form.nom,
          prenom: form.prenom,
          date_naissance: form.date_naissance,
          lieu_naissance: form.lieu_naissance,
          niveau_etude: form.niveau_etude,
          est_majeur: form.est_majeur,
          a_etat_civil: form.a_etat_civil,
        });
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate(isEditMode ? `/talibes/${id}` : "/talibes");
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'enregistrement.");
    }
  };

  if (loadingData) {
    return (
      <div className="talibe-success">
        <p>Chargement...</p>
      </div>
    );
  }

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
            label="Nom *"
            placeholder="Entrez le nom"
            value={form.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
          <TextField
            label="Prénom *"
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
          {!isEditMode && (
            <SelectField
              label="Daara *"
              options={["Sélectionnez le daara", ...daaras.map((d) => d.nom)]}
              value={
                daaras.find((d) => d.id.toString() === form.daara_id)?.nom ||
                "Sélectionnez le daara"
              }
              onChange={(e) => {
                const selected = daaras.find((d) => d.nom === e.target.value);
                handleChange(
                  "daara_id",
                  selected ? selected.id.toString() : "",
                );
              }}
            />
          )}
          <SelectField
            label="Niveau d'étude"
            options={[
              "Sélectionnez le niveau",
              "Débutant",
              "Intermédiaire",
              "Avancé",
            ]}
            value={form.niveau_etude || "Sélectionnez le niveau"}
            onChange={(e) => handleChange("niveau_etude", e.target.value)}
          />
          <ToggleField
            label="Est majeur ?"
            value={form.est_majeur}
            onChange={(val) => handleChange("est_majeur", val)}
          />
          <ToggleField
            label="A un état civil ?"
            value={form.a_etat_civil}
            onChange={(val) => handleChange("a_etat_civil", val)}
          />
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
