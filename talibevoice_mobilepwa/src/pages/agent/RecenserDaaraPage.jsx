import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./RecenserTalibePage.css";

function RecenserTalibePage() {
  const navigate = useNavigate();

  return (
    <div className="talibe-form">
      <div className="talibe-form__header">
        <button className="talibe-form__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>

        <h1>Nouveau Talibé</h1>
      </div>

      <form className="talibe-form__content">
        <div className="form-group">
          <label>Prénom</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Nom</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Âge</label>
          <input type="number" />
        </div>

        <div className="form-group">
          <label>Sexe</label>

          <select>
            <option>Choisir</option>
            <option>Masculin</option>
            <option>Féminin</option>
          </select>
        </div>

        <div className="form-group">
          <label>Daara</label>

          <select>
            <option>Choisir un daara</option>
          </select>
        </div>

        <div className="form-group">
          <label>Téléphone tuteur</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Adresse</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Observations</label>
          <textarea rows="4"></textarea>
        </div>

        <button type="submit" className="btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default RecenserTalibePage;
