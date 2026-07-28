import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  User,
  MapPin,
  Shield,
  GraduationCap,
  Pencil,
  Building2,
  FileText,
  Upload,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./FicheTalibePage.css";

const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:8000/api"
).replace(/\/api\/?$/, "");

const couleurs = ["#1B7D4B", "#2D5F8A", "#7B4B9E", "#C0392B", "#E67E22"];

function calculerAge(dateNaissance) {
  if (!dateNaissance) return "—";
  const naissance = new Date(dateNaissance);
  if (isNaN(naissance.getTime())) return "—";
  const aujourdHui = new Date();
  let age = aujourdHui.getFullYear() - naissance.getFullYear();
  const moisDiff = aujourdHui.getMonth() - naissance.getMonth();
  if (
    moisDiff < 0 ||
    (moisDiff === 0 && aujourdHui.getDate() < naissance.getDate())
  ) {
    age--;
  }
  if (age < 0 || age > 120) return "—";
  return age;
}

function formaterDate(dateString) {
  if (!dateString) return "Non renseignée";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Non renseignée";
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTalib();
  }, [id]);

  const handleFileSelected = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const res = await agentService.uploadDocument(id, file);
      setTalib(res.talibe);
    } catch (err) {
      setUploadError(
        err.response?.data?.message || "Erreur lors de l'envoi du document.",
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const fetchTalib = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentService.getTalibe(id);
      setTalib(data);
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
        <div className="fiche-statut">
          <span
            className={`fiche-statut__badge fiche-statut__badge--${talib.statut || "inconnu"}`}
          >
            {talib.statut?.toUpperCase() || "—"}
          </span>
        </div>

        <div className="fiche-avatar-container">
          <div
            className="fiche-avatar"
            style={{ backgroundColor: couleurs[talib.id % couleurs.length] }}
          >
            {getInitiales(talib.nom, talib.prenom)}
          </div>
        </div>

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

        <div className="fiche-document">
          <div className="fiche-document__header">
            <FileText size={18} color="var(--primary)" />
            <span>Document</span>
          </div>

          {talib.document_path ? (
            <a
              href={`${API_ORIGIN}/storage/${talib.document_path}`}
              target="_blank"
              rel="noreferrer"
              className="fiche-document__view-link"
            >
              Voir le document
            </a>
          ) : (
            <p className="fiche-document__empty">Aucun document ajouté.</p>
          )}

          {uploadError && (
            <p className="fiche-document__error">{uploadError}</p>
          )}

          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelected}
            style={{ display: "none" }}
          />
          <button
            className="fiche-document__upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload size={16} />
            {uploading
              ? "Envoi..."
              : talib.document_path
                ? "Remplacer le document"
                : "Ajouter un document"}
          </button>
        </div>
      </div>

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
