import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AgentAuthContext = createContext(null);

export function AgentAuthProvider({ children }) {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("agent");
    const token = localStorage.getItem("agent_token");
    if (stored && token) {
      setAgent(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      if (user.role !== "agent") {
        return {
          success: false,
          message: "Accès réservé aux agents de terrain.",
        };
      }

      localStorage.setItem("agent_token", token);
      localStorage.setItem("agent", JSON.stringify(user));
      setAgent(user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Identifiants incorrects.";
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem("agent_token");
    localStorage.removeItem("agent");
    setAgent(null);
    window.location.href = "/login";
  };

  const isAuthenticated = () => {
    return !!agent && !!localStorage.getItem("agent_token");
  };

  return (
    <AgentAuthContext.Provider
      value={{
        agent,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AgentAuthContext.Provider>
  );
}

export function useAgentAuth() {
  const context = useContext(AgentAuthContext);
  if (!context) {
    throw new Error("useAgentAuth doit être utilisé dans AgentAuthProvider");
  }
  return context;
}

export default AgentAuthContext;
