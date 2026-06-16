import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AgentAuthProvider } from "./context/AgentAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AgentAuthProvider>
      <App />
    </AgentAuthProvider>
  </StrictMode>,
);
