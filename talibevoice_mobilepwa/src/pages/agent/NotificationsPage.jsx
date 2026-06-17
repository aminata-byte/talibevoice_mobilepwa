import { useState } from "react";
import { Banknote, AlertTriangle, Truck, GraduationCap } from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import "./NotificationsPage.css";

const notificationsData = {
  "Aujourd'hui": [
    {
      id: 1,
      icon: <Banknote size={18} />,
      type: "don",
      texte: "Un don de 50 000 FCFA a été validé pour votre zone de Dakar",
      temps: "Il y a 2h",
      lue: false,
    },
    {
      id: 2,
      icon: <AlertTriangle size={18} />,
      type: "urgent",
      texte: "Besoin urgent signalé au Daara Al Nour — intervention requise",
      temps: "Il y a 5h",
      lue: false,
    },
  ],
  "Cette semaine": [
    {
      id: 3,
      icon: <Truck size={18} />,
      type: "redistribution",
      texte:
        "Une redistribution est planifiée pour le Daara Touba — préparez la réception",
      temps: "Hier",
      lue: true,
    },
    {
      id: 4,
      icon: <GraduationCap size={18} />,
      type: "insertion",
      texte: "Mamadou Diallo a été accepté pour un stage chez Sonatel",
      temps: "Mercredi",
      lue: true,
    },
  ],
};

function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);

  const marquerToutLu = () => {
    const updated = {};
    Object.keys(notifications).forEach((section) => {
      updated[section] = notifications[section].map((n) => ({
        ...n,
        lue: true,
      }));
    });
    setNotifications(updated);
  };

  const getIconClass = (type) => {
    if (type === "don") return "notif-card__icon notif-card__icon--don";
    if (type === "urgent") return "notif-card__icon notif-card__icon--urgent";
    if (type === "redistribution")
      return "notif-card__icon notif-card__icon--redistribution";
    return "notif-card__icon notif-card__icon--insertion";
  };

  return (
    <div className="notif-page">
      <TopBar
        title="Notifications"
        showBack={true}
        action={
          <button className="notif-marktout" onClick={marquerToutLu}>
            Tout marquer comme lu
          </button>
        }
      />

      <div className="notif-content">
        {Object.entries(notifications).map(([section, items]) => (
          <div key={section} className="notif-section">
            <h2 className="notif-section__title">{section.toUpperCase()}</h2>
            <div className="notif-list">
              {items.map((notif) => (
                <div
                  key={notif.id}
                  className={`notif-card ${!notif.lue ? "notif-card--unread" : ""}`}
                >
                  <div className={getIconClass(notif.type)}>{notif.icon}</div>
                  <div className="notif-card__content">
                    <p className="notif-card__texte">{notif.texte}</p>
                    <p className="notif-card__temps">{notif.temps}</p>
                  </div>
                  {!notif.lue && <span className="notif-card__dot" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default NotificationsPage;
