import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Users,
  User,
  Plus,
  Wheat,
  Pill,
  BookOpen,
  Shirt,
  Building,
  Package,
  ChevronRight,
  Shield,
  CheckCircle2,
} from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import SelectField from "../../components/forms/SelectField";
import agentService from "../../services/agentService";
import "./BesoinsDaaraPage.css";

function BesoinsDaaraPage() {
  const { id } = useParams();
  const [daara, setDaara] = useState(null);
  const [besoins, setBesoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    type: "",
    description: "",
    priorite: "urgent",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [daarasData, besoinsData] = await Promise.all([
        agentService.getDaaras(),
        agentService.getBesoins(id),
      ]);
      const found = Array.isArray(daarasData)
        ? daarasData.find((d) => d.id === parseInt(id))
        : null;
      setDaara(found || null);
      setBesoins(Array.isArray(besoinsData) ? besoinsData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.type || form.type === "Sélectionner le type de besoin") {
      alert("Veuillez sélectionner un type de besoin.");
      return;
    }
    if (!form.description) {
      alert("Veuillez remplir la description.");
      return;
    }
    try {
      const newBesoin = await agentService.createBesoin({
        daara_id: parseInt(id),
        type: form.type,
        description: form.description,
        priorite: form.priorite,
        date_signalement: new Date().toISOString().split("T")[0],
      });
      setBesoins((prev) => [newBesoin, ...prev]);
      setSuccess(true);
      setForm({ type: "", description: "", priorite: "urgent" });
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'ajout.");
    }
  };

  const getTypeIcon = (type) => {
    const t = type?.toLowerCase();
    if (t === "alimentaire") return <Wheat size={18} />;
    if (t === "médical" || t === "medical") return <Pill size={18} />;
    if (t === "éducatif" || t === "educatif") return <BookOpen size={18} />;
    if (t === "infrastructure") return <Building size={18} />;
    if (t === "vêtements" || t === "vetements") return <Shirt size={18} />;
    return <Package size={18} />;
  };

  const getPrioriteBadgeClass = (priorite) => {
    if (priorite === "urgent")
      return "besoin-card__badge besoin-card__badge--urgent";
    if (priorite === "normal")
      return "besoin-card__badge besoin-card__badge--normal";
    return "besoin-card__badge besoin-card__badge--faible";
  };

  const getPrioriteLabel = (priorite) => {
    if (priorite === "urgent") return "Urgent";
    if (priorite === "normal") return "Normal";
    return "Faible";
  };

  return (
    <div className="besoins-page">
      <TopBar title="Besoins du daara" showBack={true} />

      <div className="besoins-content">
        {loading ? (
          <p style={{ color: "var(--text-secondary)", padding: "1rem" }}>
            Chargement...
          </p>
        ) : daara ? (
          <div className="besoins-daara-card">
            <div className="besoins-daara-card__icon">
              <Shield size={24} />
            </div>
            <div className="besoins-daara-card__info">
              <h3>{daara.nom}</h3>
              <p className="besoins-daara-card__zone">
                <MapPin size={12} /> {daara.adresse || "—"}
              </p>
              <div className="besoins-daara-card__meta">
                <span>
                  <Users size={12} />{" "}
                  {daara.talibes_count ?? daara.nombre_talibes ?? 0} talibés
                </span>
                <span>
                  <User size={12} /> Responsable :{" "}
                  {daara.nom_responsable || "—"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: "var(--text-secondary)", padding: "1rem" }}>
            Daara introuvable.
          </p>
        )}

        <div className="besoins-form">
          <h2 className="besoins-form__title">Ajouter un besoin</h2>

          {success && (
            <div className="besoins-success">
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Besoin ajouté avec succès !</span>
            </div>
          )}

          <SelectField
            label="Type de besoin *"
            options={[
              "Sélectionner le type de besoin",
              "Alimentaire",
              "Médical",
              "Éducatif",
              "Infrastructure",
              "Vêtements",
              "Autre",
            ]}
            value={form.type || "Sélectionner le type de besoin"}
            onChange={(e) => handleChange("type", e.target.value)}
          />

          <div className="field">
            <label>Description du besoin *</label>
            <textarea
              placeholder="Décrivez le besoin en détail..."
              rows={4}
              maxLength={300}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <span className="besoins-char-count">
              {form.description.length}/300
            </span>
          </div>

          <div className="field">
            <label>Priorité *</label>
            <div className="besoins-priorite">
              {["urgent", "normal", "faible"].map((p) => (
                <button
                  key={p}
                  className={`besoins-priorite__btn besoins-priorite__btn--${p} ${form.priorite === p ? "active" : ""}`}
                  onClick={() => handleChange("priorite", p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Date de signalement</label>
            <input
              type="text"
              value={new Date().toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              disabled
            />
          </div>

          <button className="besoins-submit-btn" onClick={handleSubmit}>
            <Plus size={18} />
            Ajouter le besoin
          </button>
        </div>

        <div className="besoins-existants">
          <h2 className="besoins-existants__title">
            Besoins existants ({besoins.length})
          </h2>
          <div className="besoins-list">
            {besoins.length === 0 ? (
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                Aucun besoin signalé pour ce daara.
              </p>
            ) : (
              besoins.map((besoin) => (
                <div key={besoin.id} className="besoin-card">
                  <div className="besoin-card__icon">
                    {getTypeIcon(besoin.type)}
                  </div>
                  <div className="besoin-card__content">
                    <div className="besoin-card__header">
                      <h3>{besoin.type}</h3>
                      <span className={getPrioriteBadgeClass(besoin.priorite)}>
                        {getPrioriteLabel(besoin.priorite)}
                      </span>
                    </div>
                    <p className="besoin-card__description">
                      {besoin.description}
                    </p>
                    <p className="besoin-card__date">
                      {besoin.date_signalement
                        ? new Date(besoin.date_signalement).toLocaleDateString(
                            "fr-FR",
                            { day: "numeric", month: "long", year: "numeric" },
                          )
                        : "—"}
                    </p>
                  </div>
                  <ChevronRight size={16} className="besoin-card__arrow" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default BesoinsDaaraPage;
