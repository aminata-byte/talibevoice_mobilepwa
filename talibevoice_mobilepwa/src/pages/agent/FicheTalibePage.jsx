import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  User,
  MapPin,
  Shield,
  GraduationCap,
  Pencil,
  Building2,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./FicheTalibePage.css";

const couleurs = ["#1B7D4B", "#2D5F8A", "#7B4B9E", "#C0392B", "#E67E22"];

function calculerAge(dateNaissance) {
  if (!dateNaissance) return "—";
  const naissance = new Date(dateNaissance);
  const aujourdHui = new Date();
  let age = aujourdHui.getFullYear() - naissance.getFullYear();
  const moisDiff = aujourdHui.getMonth() - naissance.getMonth();
  if (
    moisDiff < 0 ||
    (moisDiff === 0 && aujourdHui.getDate() < naissance.getDate())
  ) {
    age--;
  }
  return age;
}

function formaterDate(dateString) {
  if (!dateString) return "Non renseignée";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitiales(nom, prenom) {
  return `${prenom?.charAt(0) || ""}${nom?.charAt(0) || ""}`.toUpperCase();
}

function FicheTalibePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [talib, setTalib] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTalib();
  }, [id]);

  const fetchTalib = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentService.getTalibes();
      const found = data.find((t) => t.id === parseInt(id));
      if (found) {
        setTalib(found);
      } else {
        setError("Talibé introuvable.");
      }
    } catch (err) {
      setError("Erreur lors du chargement de la fiche.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fiche-error">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error || !talib) {
    return (
      <div className="fiche-error">
        <p>{error || "Talibé introuvable."}</p>
      </div>
    );
  }

  const infos = [
    {
      icon: <Calendar size={18} />,
      label: "Date de naissance",
      value: formaterDate(talib.date_naissance),
    },
    {
      icon: <Building2 size={18} />,
      label: "Daara",
      value: talib.daara?.nom || "Non renseigné",
    },
    {
      icon: <MapPin size={18} />,
      label: "Lieu de naissance",
      value: talib.lieu_naissance || "Non renseigné",
    },
    {
      icon: <Shield size={18} />,
      label: "État civil",
      value: talib.a_etat_civil ? "A un état civil" : "Sans état civil",
      isTag: true,
    },
    {
      icon: <GraduationCap size={18} />,
      label: "Niveau d'étude",
      value: talib.niveau_etude || "Non renseigné",
    },
  ];

  return (
    <div className="fiche-page">
      <TopBar title={`${talib.prenom} ${talib.nom}`} showBack={true} />

      <div className="fiche-content">
        {/* Badge statut */}
        <div className="fiche-statut">
          <span
            className={`fiche-statut__badge fiche-statut__badge--${talib.statut}`}
          >
            {talib.statut.toUpperCase()}
          </span>
        </div>

        {/* Avatar */}
        <div className="fiche-avatar-container">
          <div
            className="fiche-avatar"
            style={{ backgroundColor: couleurs[talib.id % couleurs.length] }}
          >
            {getInitiales(talib.nom, talib.prenom)}
          </div>
        </div>

        {/* Age + Sexe */}
        <div className="fiche-quick">
          <div className="fiche-quick__item">
            <Calendar size={18} color="var(--primary)" />
            <div>
              <p className="fiche-quick__value">
                {calculerAge(talib.date_naissance)} ans
              </p>
              <p className="fiche-quick__label">Âge</p>
            </div>
          </div>
          <div className="fiche-quick__divider" />
          <div className="fiche-quick__item">
            <User size={18} color="var(--primary)" />
            <div>
              <p className="fiche-quick__value">
                {talib.est_majeur ? "Majeur" : "Mineur"}
              </p>
              <p className="fiche-quick__label">Statut</p>
            </div>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="fiche-infos">
          {infos.map((info, index) => (
            <div key={index} className="fiche-info-item">
              <div className="fiche-info-icon">{info.icon}</div>
              <div className="fiche-info-content">
                <p className="fiche-info-label">{info.label}</p>
                {info.isTag ? (
                  <span className="fiche-info-tag">{info.value}</span>
                ) : (
                  <p className="fiche-info-value">{info.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton modifier */}
      <div className="fiche-footer">
        <button
          className="fiche-edit-btn"
          onClick={() => navigate(`/talibes/${id}/modifier`)}
        >
          <Pencil size={18} />
          Modifier la fiche
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

export default FicheTalibePage;
