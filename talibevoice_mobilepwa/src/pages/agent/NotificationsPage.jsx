import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Banknote,
  AlertTriangle,
  Truck,
  GraduationCap,
  Bell,
  ClipboardList,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./NotificationsPage.css";

function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await agentService.getNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIconClass = (type) => {
    if (type === "don_valide") return "notif-card__icon notif-card__icon--don";
    if (type === "besoin_urgent")
      return "notif-card__icon notif-card__icon--urgent";
    if (type === "redistribution")
      return "notif-card__icon notif-card__icon--redistribution";
    if (type === "mission_assignee")
      return "notif-card__icon notif-card__icon--mission";
    return "notif-card__icon notif-card__icon--insertion";
  };

  const getIcon = (type) => {
    if (type === "don_valide") return <Banknote size={18} />;
    if (type === "besoin_urgent") return <AlertTriangle size={18} />;
    if (type === "redistribution") return <Truck size={18} />;
    if (type === "insertion_talibe") return <GraduationCap size={18} />;
    if (type === "mission_assignee") return <ClipboardList size={18} />;
    return <Bell size={18} />;
  };

  const getTemps = (dateStr) => {
    if (!dateStr) return "—";
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffH = Math.floor(diffMs / 3600000);
    const diffJ = Math.floor(diffMs / 86400000);
    if (diffH < 1) return "À l'instant";
    if (diffH < 24) return `Il y a ${diffH}h`;
    if (diffJ === 1) return "Hier";
    if (diffJ < 7) return `Il y a ${diffJ} jours`;
    return date.toLocaleDateString("fr-FR");
  };

  const handleClick = async (notif) => {
    if (!notif.est_lue) {
      try {
        await agentService.marquerNotificationLue(notif.id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, est_lue: true } : n)),
        );
      } catch (err) {
        console.error(err);
      }
    }
    if (notif.type === "mission_assignee" && notif.mission_id) {
      navigate(`/missions/${notif.mission_id}`);
    }
  };

  const grouper = (notifs) => {
    const aujourd_hui = [];
    const cette_semaine = [];
    const plus_ancien = [];
    const now = new Date();

    notifs.forEach((n) => {
      const date = new Date(n.created_at);
      const diffJ = Math.floor((now - date) / 86400000);
      if (diffJ === 0) aujourd_hui.push(n);
      else if (diffJ < 7) cette_semaine.push(n);
      else plus_ancien.push(n);
    });

    return {
      "Aujourd'hui": aujourd_hui,
      "Cette semaine": cette_semaine,
      "Plus ancien": plus_ancien,
    };
  };

  const groupes = grouper(notifications);

  return (
    <div className="notif-page">
      <TopBar title="Notifications" showBack={true} />

      <div className="notif-content">
        {loading ? (
          <p
            style={{
              color: "var(--text-secondary)",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            Chargement...
          </p>
        ) : notifications.length === 0 ? (
          <p
            style={{
              color: "var(--text-secondary)",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            Aucune notification.
          </p>
        ) : (
          Object.entries(groupes).map(([section, items]) => {
            if (items.length === 0) return null;
            return (
              <div key={section} className="notif-section">
                <h2 className="notif-section__title">
                  {section.toUpperCase()}
                </h2>
                <div className="notif-list">
                  {items.map((notif) => (
                    <div
                      key={notif.id}
                      className={`notif-card ${!notif.est_lue ? "notif-card--unread" : ""} ${notif.type === "mission_assignee" ? "notif-card--clickable" : ""}`}
                      onClick={() => handleClick(notif)}
                    >
                      <div className={getIconClass(notif.type)}>
                        {getIcon(notif.type)}
                      </div>
                      <div className="notif-card__content">
                        <p className="notif-card__texte">{notif.message}</p>
                        <p className="notif-card__temps">
                          {getTemps(notif.created_at)}
                        </p>
                      </div>
                      {!notif.est_lue && <span className="notif-card__dot" />}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default NotificationsPage;
