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
import "./FicheTalibePage.css";

const talibesData = [
  {
    id: 1,
    nom: "Abdou Diop",
    initiales: "AD",
    daara: "Daara Al Nour",
    age: 12,
    couleur: "#1B7D4B",
    sexe: "Masculin",
    date_naissance: "15 mars 2013",
    zone: "Médina Gounass, Kolda",
    etat_civil: "A un état civil",
    niveau_etude: "Coran - Niveau 2",
    statut: "actif",
  },
  {
    id: 2,
    nom: "Mamadou Sow",
    initiales: "MS",
    daara: "Daara Serigne Fallou",
    age: 10,
    couleur: "#2D5F8A",
    sexe: "Masculin",
    date_naissance: "20 juin 2015",
    zone: "Dakar Plateau",
    etat_civil: "Sans état civil",
    niveau_etude: "Coran - Niveau 1",
    statut: "actif",
  },
  {
    id: 3,
    nom: "Ibrahima Aw",
    initiales: "IA",
    daara: "Daara Hikmatoul Islam",
    age: 14,
    couleur: "#7B4B9E",
    sexe: "Masculin",
    date_naissance: "5 janvier 2011",
    zone: "Thiès",
    etat_civil: "A un état civil",
    niveau_etude: "Coran - Niveau 3",
    statut: "actif",
  },
  {
    id: 4,
    nom: "Bocar Samb",
    initiales: "BS",
    daara: "Daara Al Falah",
    age: 11,
    couleur: "#C0392B",
    sexe: "Masculin",
    date_naissance: "12 avril 2014",
    zone: "Louga",
    etat_civil: "Sans état civil",
    niveau_etude: "Coran - Niveau 1",
    statut: "inactif",
  },
  {
    id: 5,
    nom: "Fatoumata Sy",
    initiales: "FS",
    daara: "Daara Mame Cheikh",
    age: 13,
    couleur: "#E67E22",
    sexe: "Féminin",
    date_naissance: "8 août 2012",
    zone: "Saint-Louis",
    etat_civil: "A un état civil",
    niveau_etude: "Coran - Niveau 2",
    statut: "actif",
  },
  {
    id: 6,
    nom: "Moustapha Diagne",
    initiales: "MD",
    daara: "Daara Khadim Rassoul",
    age: 9,
    couleur: "#1B7D4B",
    sexe: "Masculin",
    date_naissance: "3 novembre 2016",
    zone: "Kolda",
    etat_civil: "Sans état civil",
    niveau_etude: "Coran - Niveau 1",
    statut: "actif",
  },
];

function FicheTalibePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const talib = talibesData.find((t) => t.id === parseInt(id));

  if (!talib) {
    return (
      <div className="fiche-error">
        <p>Talibé introuvable.</p>
      </div>
    );
  }

  const infos = [
    {
      icon: <Calendar size={18} />,
      label: "Date de naissance",
      value: talib.date_naissance,
    },
    { icon: <Building2 size={18} />, label: "Daara", value: talib.daara },
    { icon: <MapPin size={18} />, label: "Zone", value: talib.zone },
    {
      icon: <Shield size={18} />,
      label: "État civil",
      value: talib.etat_civil,
      isTag: true,
    },
    {
      icon: <GraduationCap size={18} />,
      label: "Niveau d'étude",
      value: talib.niveau_etude,
    },
  ];

  return (
    <div className="fiche-page">
      <TopBar title={talib.nom} showBack={true} />

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
            style={{ backgroundColor: talib.couleur }}
          >
            {talib.initiales}
          </div>
        </div>

        {/* Age + Sexe */}
        <div className="fiche-quick">
          <div className="fiche-quick__item">
            <Calendar size={18} color="var(--primary)" />
            <div>
              <p className="fiche-quick__value">{talib.age} ans</p>
              <p className="fiche-quick__label">Âge</p>
            </div>
          </div>
          <div className="fiche-quick__divider" />
          <div className="fiche-quick__item">
            <User size={18} color="var(--primary)" />
            <div>
              <p className="fiche-quick__value">{talib.sexe}</p>
              <p className="fiche-quick__label">Sexe</p>
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
