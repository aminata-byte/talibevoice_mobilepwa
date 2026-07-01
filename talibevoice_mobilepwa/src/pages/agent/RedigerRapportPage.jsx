import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Save, AlertTriangle, CheckCircle2 } from "lucide-react";
import TopBar from "../../components/layout/TopBar";
import BottomNav from "../../components/layout/BottomNav";
import agentService from "../../services/agentService";
import "./RedigerRapportPage.css";

function RedigerRapportPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const missionId = searchParams.get("mission_id");
  const daaraIdParam = searchParams.get("daara_id");
  const rapportId = searchParams.get("rapport_id");

  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [daaras, setDaaras] = useState([]);
  const [form, setForm] = useState({
    titre: "",
    type: "",
    daara_id: daaraIdParam || "",
    contenu: "",
  });

  useEffect(() => {
    fetchDaaras();
    if (rapportId) fetchRapport();
  }, []);

  const fetchDaaras = async () => {
    try {
      const data = await agentService.getDaaras();
      setDaaras(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRapport = async () => {
    try {
      const data = await agentService.getRapports();
      const rapport = Array.isArray(data)
        ? data.find((r) => r.id === parseInt(rapportId))
        : null;
      if (rapport) {
        setForm({
          titre: rapport.titre || "",
          type: rapport.type || "",
          daara_id: rapport.daara_id || "",
          contenu: rapport.contenu || "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const soumettre = async (statut) => {
    if (
      statut === "soumis" &&
      (!form.titre || !form.type || !form.daara_id || !form.contenu)
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (statut === "brouillon" && !form.titre) {
      alert("Veuillez au moins saisir un titre.");
      return;
    }

    setSubmitting(true);
    try {
      if (rapportId) {
        // Modifier le brouillon existant
        await agentService.updateRapport(rapportId, {
          titre: form.titre,
          type: form.type,
          daara_id: form.daara_id || null,
          contenu: form.contenu,
          statut: statut,
        });
      } else {
        // Créer un nouveau rapport
        await agentService.createRapport({
          titre: form.titre,
          type: form.type,
          daara_id: form.daara_id || null,
          contenu: form.contenu,
          statut: statut,
          mission_id: missionId || null,
        });
      }

      if (statut === "soumis") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(missionId ? `/missions/${missionId}` : "/rapports");
        }, 2000);
      } else {
        alert("Brouillon enregistré avec succès.");
        navigate("/rapports");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rapport-success">
        <CheckCircle2 size={64} color="var(--primary)" />
        <h2>Rapport soumis !</h2>
        <p>Votre rapport a été envoyé pour validation.</p>
      </div>
    );
  }

  return (
    <div className="rapport-page">
      <TopBar title="Rédiger un rapport" showBack={true} />

      <div className="rapport-content">
        {missionId && (
          <div className="rapport-mission-badge">
            Rapport lié à la mission #{missionId}
          </div>
        )}

        {rapportId && (
          <div
            className="rapport-mission-badge"
            style={{
              background: "rgba(234,179,8,0.1)",
              color: "#b45309",
              borderColor: "#b45309",
            }}
          >
            Modification d'un brouillon
          </div>
        )}

        <div className="field">
          <label>Titre du rapport *</label>
          <input
            type="text"
            placeholder="Ex : Visite et recensement du Daara Serigne..."
            value={form.titre}
            onChange={(e) => handleChange("titre", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Type de rapport *</label>
          <select
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="">Sélectionner un type</option>
            <option value="recensement">Recensement</option>
            <option value="suivi">Suivi</option>
            <option value="distribution">Distribution</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="field">
          <label>Daara concerné *</label>
          <select
            value={form.daara_id}
            onChange={(e) => handleChange("daara_id", e.target.value)}
          >
            <option value="">Sélectionner un daara</option>
            {daaras.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Contenu *</label>
          <textarea
            placeholder="Rédigez le contenu de votre rapport ici..."
            rows={8}
            maxLength={2000}
            value={form.contenu}
            onChange={(e) => handleChange("contenu", e.target.value)}
          />
          <span className="rapport-char-count">
            {form.contenu.length} / 2000
          </span>
        </div>

        <div className="rapport-actions">
          <button
            className="rapport-btn rapport-btn--outline"
            onClick={() => soumettre("brouillon")}
            disabled={submitting}
          >
            <Save size={18} />
            Enregistrer brouillon
          </button>
          <button
            className="rapport-btn rapport-btn--primary"
            onClick={() => soumettre("soumis")}
            disabled={submitting}
          >
            <AlertTriangle size={18} />
            {submitting ? "Envoi..." : "Soumettre"}
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default RedigerRapportPage;
