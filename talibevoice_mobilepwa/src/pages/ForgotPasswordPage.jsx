import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, KeyRound, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import agentService from "../services/agentService";
import "./LoginPage.css";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendCode = async () => {
    if (!email) {
      setError("Veuillez saisir votre email.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await agentService.forgotPassword(email);
      setDevOtp(res.otp || null);
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message || "Aucun agent trouvé avec cet email.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Veuillez saisir le code à 6 chiffres.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await agentService.verifyOtp(email, otp);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Code OTP invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password || password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await agentService.resetPassword({
        email,
        otp,
        password,
        password_confirmation: passwordConfirmation,
      });
      setStep(4);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Impossible de réinitialiser le mot de passe.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__body">
        <div className="login__header">
          <div className="login__logo">
            <img
              src="/src/assets/logo.jpg"
              alt="TalibeVoice"
              className="login__logo-img"
            />
          </div>
          <h2 className="login__logo-text">TalibeVoice</h2>
        </div>

        {step === 1 && (
          <>
            <h1 className="login__title">Mot de passe oublié</h1>
            <p className="login__subtitle">
              Saisissez l'email associé à votre compte agent, un code de
              vérification vous sera envoyé.
            </p>

            <div className="login__form-group">
              <label className="login__label">Email</label>
              <div className="login__input-wrapper">
                <Mail size={16} className="login__input-icon" />
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                  className="login__input"
                />
              </div>
            </div>

            {error && <p className="login__error">{error}</p>}

            <button
              className="login__btn"
              onClick={handleSendCode}
              disabled={loading}
            >
              {loading ? "Envoi..." : "Envoyer le code"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="login__title">Code de vérification</h1>
            <p className="login__subtitle">
              Saisissez le code à 6 chiffres envoyé à {email}.
            </p>

            {devOtp && (
              <p className="forgot__dev-hint">
                Mode démo — code : <strong>{devOtp}</strong>
              </p>
            )}

            <div className="login__form-group">
              <label className="login__label">Code OTP</label>
              <div className="login__input-wrapper">
                <KeyRound size={16} className="login__input-icon" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                  className="login__input forgot__otp-input"
                />
              </div>
            </div>

            {error && <p className="login__error">{error}</p>}

            <button
              className="login__btn"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Vérification..." : "Vérifier le code"}
            </button>

            <p className="login__forgot" onClick={handleSendCode}>
              Renvoyer le code
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="login__title">Nouveau mot de passe</h1>
            <p className="login__subtitle">
              Choisissez un nouveau mot de passe pour votre compte.
            </p>

            <div className="login__form-group">
              <label className="login__label">Nouveau mot de passe</label>
              <div className="login__input-wrapper">
                <Lock size={16} className="login__input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Au moins 8 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login__input"
                />
                <button
                  className="login__eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="login__form-group">
              <label className="login__label">Confirmer le mot de passe</label>
              <div className="login__input-wrapper">
                <Lock size={16} className="login__input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmez le mot de passe"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleResetPassword()
                  }
                  className="login__input"
                />
              </div>
            </div>

            {error && <p className="login__error">{error}</p>}

            <button
              className="login__btn"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Réinitialiser le mot de passe"}
            </button>
          </>
        )}

        {step === 4 && (
          <div className="forgot__success">
            <CheckCircle2 size={56} color="var(--primary)" />
            <h1 className="login__title">Mot de passe réinitialisé !</h1>
            <p className="login__subtitle">
              Vous pouvez maintenant vous connecter avec votre nouveau mot de
              passe.
            </p>
            <Link to="/login" className="login__btn forgot__link-btn">
              Se connecter
            </Link>
          </div>
        )}

        {step < 4 && (
          <p className="login__forgot">
            <Link to="/login" className="forgot__back-link">
              Retour à la connexion
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
