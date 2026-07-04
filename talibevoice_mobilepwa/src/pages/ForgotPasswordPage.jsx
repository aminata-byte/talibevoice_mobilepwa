import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import api from "../services/api";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [etape, setEtape] = useState(1); // 1=email, 2=otp, 3=nouveau mdp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpAffiche, setOtpAffiche] = useState(null);
  const [expireDans, setExpireDans] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleEnvoyerCode = async () => {
    if (!email) {
      setError("Veuillez saisir votre email.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth/forgot-password", { email });
      setOtpAffiche(response.data.otp);
      setExpireDans(response.data.expire_dans);
      setEtape(2);
    } catch (err) {
      setError(
        err.response?.data?.message || "Aucun agent trouvé avec cet email.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifierOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Veuillez saisir le code à 6 chiffres.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/verify-otp", { email, otp });
      setEtape(3);
    } catch (err) {
      setError(err.response?.data?.message || "Code OTP invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password || !passwordConfirm) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/reset-password", {
        email,
        otp,
        password,
        password_confirmation: passwordConfirm,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la réinitialisation.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="forgot-page">
        <div className="forgot-success">
          <ShieldCheck size={64} color="var(--primary)" />
          <h2>Mot de passe réinitialisé !</h2>
          <p>Vous allez être redirigé vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-page">
      <div className="forgot-header">
        <button
          className="forgot-back"
          onClick={() =>
            etape === 1 ? navigate("/login") : setEtape(etape - 1)
          }
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="forgot-title">
          {etape === 1 && "Mot de passe oublié"}
          {etape === 2 && "Vérification OTP"}
          {etape === 3 && "Nouveau mot de passe"}
        </h1>
      </div>

      {/* Indicateur d'étapes */}
      <div className="forgot-steps">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`forgot-step ${etape >= s ? "forgot-step--active" : ""}`}
          >
            <div className="forgot-step__circle">{s}</div>
            <span className="forgot-step__label">
              {s === 1 ? "Email" : s === 2 ? "Code OTP" : "Nouveau mdp"}
            </span>
          </div>
        ))}
      </div>

      <div className="forgot-body">
        {/* Étape 1 — Email */}
        {etape === 1 && (
          <div className="forgot-form">
            <p className="forgot-desc">
              Saisissez votre adresse email pour recevoir un code de
              vérification.
            </p>
            <div className="forgot-field">
              <label>Adresse email</label>
              <div className="forgot-input-wrapper">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnvoyerCode()}
                />
              </div>
            </div>
            {error && <p className="forgot-error">{error}</p>}
            <button
              className="forgot-btn"
              onClick={handleEnvoyerCode}
              disabled={loading}
            >
              {loading ? "Génération..." : "Générer le code OTP"}
            </button>
          </div>
        )}

        {/* Étape 2 — OTP */}
        {etape === 2 && (
          <div className="forgot-form">
            <p className="forgot-desc">
              Un code de vérification a été généré pour <strong>{email}</strong>
              .
            </p>

            {otpAffiche && (
              <div className="forgot-otp-display">
                <KeyRound size={18} color="var(--primary)" />
                <div>
                  <p className="forgot-otp-label">Votre code OTP</p>
                  <p className="forgot-otp-code">{otpAffiche}</p>
                  <p className="forgot-otp-expire">
                    Expire dans : {expireDans}
                  </p>
                </div>
              </div>
            )}

            <div className="forgot-field">
              <label>Saisissez le code OTP</label>
              <input
                type="text"
                placeholder="Ex: 123456"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleVerifierOtp()}
                className="forgot-otp-input"
              />
            </div>

            {error && <p className="forgot-error">{error}</p>}

            <button
              className="forgot-btn"
              onClick={handleVerifierOtp}
              disabled={loading}
            >
              {loading ? "Vérification..." : "Vérifier le code"}
            </button>

            <button
              className="forgot-resend"
              onClick={() => {
                setEtape(1);
                setOtpAffiche(null);
                setOtp("");
                setError(null);
              }}
            >
              Renvoyer un nouveau code
            </button>
          </div>
        )}

        {/* Étape 3 — Nouveau mot de passe */}
        {etape === 3 && (
          <div className="forgot-form">
            <p className="forgot-desc">
              Choisissez un nouveau mot de passe sécurisé (minimum 8
              caractères).
            </p>

            <div className="forgot-field">
              <label>Nouveau mot de passe</label>
              <div className="forgot-input-wrapper">
                <Lock size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="forgot-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="forgot-field">
              <label>Confirmer le mot de passe</label>
              <div className="forgot-input-wrapper">
                <Lock size={16} />
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                />
                <button
                  className="forgot-eye"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="forgot-error">{error}</p>}

            <button
              className="forgot-btn"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading
                ? "Réinitialisation..."
                : "Réinitialiser le mot de passe"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
