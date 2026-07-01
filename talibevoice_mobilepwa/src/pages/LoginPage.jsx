import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAgentAuth } from "../context/AgentAuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAgentAuth();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setError(null);

    const result = await login(email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="login">
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

      <div className="login__body">
        <h1 className="login__title">Bienvenue !</h1>
        <p className="login__subtitle">
          Connectez-vous pour accéder à votre espace agent de terrain.
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
              onKeyDown={handleKeyDown}
              className="login__input"
            />
          </div>
        </div>

        <div className="login__form-group">
          <label className="login__label">Mot de passe</label>
          <div className="login__input-wrapper">
            <Lock size={16} className="login__input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="login__input"
            />
            <button
              className="login__eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="login__error">{error}</p>}

        <button className="login__btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <div className="login__security">
          <ShieldCheck size={16} />
          <span>Vos données sont sécurisées</span>
        </div>

        <p className="login__forgot">Mot de passe oublié ?</p>
      </div>
    </div>
  );
}

export default LoginPage;
