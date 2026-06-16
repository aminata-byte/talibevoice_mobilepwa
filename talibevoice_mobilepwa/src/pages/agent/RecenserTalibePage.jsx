import { User, Users, FileText } from "lucide-react";

import FormSection from "../../components/forms/FormSection";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import ToggleField from "../../components/forms/ToggleField";

import "./RecenserTalibePage.css";

function RecenserTalibePage() {
  return (
    <div className="talibe-page">
      <header className="page-header">Recenser un talibé</header>

      <div className="page-content">
        <FormSection
          icon={<User size={18} />}
          title="Informations personnelles"
        >
          <TextField label="Nom" placeholder="Entrez le nom" />

          <TextField label="Prénom" placeholder="Entrez le prénom" />

          <TextField label="Date de naissance" type="date" />

          <TextField label="Lieu de naissance" placeholder="Entrez le lieu" />
        </FormSection>

        <FormSection icon={<Users size={18} />} title="Situation">
          <SelectField
            label="Daara"
            options={["Sélectionnez le daara", "Daara Touba", "Daara Médina"]}
          />

          <SelectField
            label="Niveau d'étude"
            options={["Débutant", "Intermédiaire", "Avancé"]}
          />

          <ToggleField label="Est majeur ?" />
        </FormSection>

        <FormSection icon={<FileText size={18} />} title="Documents">
          <div className="upload-box">
            <input type="file" />
          </div>
        </FormSection>

        <button className="save-btn">Enregistrer</button>
      </div>
    </div>
  );
}

export default RecenserTalibePage;
