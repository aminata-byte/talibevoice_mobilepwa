import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/agent/DashboardPage";
import MissionsPage from "./pages/agent/MissionsPage";
import RecenserTalibePage from "./pages/agent/RecenserTalibePage";
import ListeTalibesPage from "./pages/agent/ListeTalibesPage";
import FicheTalibePage from "./pages/agent/FicheTalibePage";
import RecenserDaaraPage from "./pages/agent/RecenserDaaraPage";
import ListeDaarasPage from "./pages/agent/ListeDaarasPage";
import BesoinsDaaraPage from "./pages/agent/BesoinsDaaraPage";
import RedigerRapportPage from "./pages/agent/RedigerRapportPage";
import NotificationsPage from "./pages/agent/NotificationsPage";
import { useAgentAuth } from "./context/AgentAuthContext";
import ProfilAgentPage from "./pages/agent/ProfilAgentPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAgentAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "var(--primary)",
          fontSize: "16px",
        }}
      >
        Chargement...
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Pages protégées */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/missions"
          element={
            <ProtectedRoute>
              <MissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recenser-talibe"
          element={
            <ProtectedRoute>
              <RecenserTalibePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/talibes"
          element={
            <ProtectedRoute>
              <ListeTalibesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/talibes/:id"
          element={
            <ProtectedRoute>
              <FicheTalibePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recenser-daara"
          element={
            <ProtectedRoute>
              <RecenserDaaraPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daaras"
          element={
            <ProtectedRoute>
              <ListeDaarasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daaras/:id/besoins"
          element={
            <ProtectedRoute>
              <BesoinsDaaraPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rapports/nouveau"
          element={
            <ProtectedRoute>
              <RedigerRapportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/talibes/:id/modifier"
          element={
            <ProtectedRoute>
              <RecenserTalibePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <ProfilAgentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
