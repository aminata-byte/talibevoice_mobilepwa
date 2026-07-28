import api from "./api";

const agentService = {
  // Talibés
  createTalibe: async (data) => {
    const response = await api.post("/agent/talibes", data);
    return response.data;
  },

  getTalibes: async () => {
    const response = await api.get("/agent/talibes");
    return response.data;
  },

  // Daaras
  createDaara: async (data) => {
    const response = await api.post("/agent/daaras", data);
    return response.data;
  },

  getDaaras: async () => {
    const response = await api.get("/agent/daaras");
    return response.data;
  },

  // Besoins
  createBesoin: async (data) => {
    const response = await api.post("/agent/besoins", data);
    return response.data;
  },

  // Missions
  getMissions: async () => {
    const response = await api.get("/agent/missions");
    return response.data;
  },

  accepterMission: async (id) => {
    const response = await api.post(`/agent/missions/${id}/accepter`);
    return response.data;
  },

  cloturerMission: async (id) => {
    const response = await api.post(`/agent/missions/${id}/cloturer`);
    return response.data;
  },

  getMission: async (id) => {
    const response = await api.get(`/agent/missions/${id}`);
    return response.data;
  },

  // Rapports
  createRapport: async (data) => {
    const response = await api.post("/agent/rapports", data);
    return response.data;
  },

  getRapports: async () => {
    const response = await api.get("/agent/rapports");
    return response.data;
  },

  // Notifications
  getNotifications: async () => {
    const response = await api.get("/agent/notifications");
    return response.data;
  },

  marquerNotificationLue: async (id) => {
    const response = await api.post(`/agent/notifications/${id}/lue`);
    return response.data;
  },

  getTalibe: async (id) => {
    const response = await api.get(`/agent/talibes/${id}`);
    return response.data;
  },

  updateTalibe: async (id, data) => {
    const response = await api.put(`/agent/talibes/${id}`, data);
    return response.data;
  },

  updateRapport: async (id, data) => {
    const response = await api.put(`/agent/rapports/${id}`, data);
    return response.data;
  },

  updateMe: async (data) => {
    const response = await api.put("/auth/me", data);
    return response.data;
  },

  getBesoins: async (daaraId) => {
    const response = await api.get(`/daaras/${daaraId}/besoins`);
    return response.data;
  },

  // Objectifs
  getMesObjectifs: async () => {
    const response = await api.get("/agent/objectifs");
    return response.data;
  },

  // Document talibé
  uploadDocument: async (talibeId, file) => {
    const formData = new FormData();
    formData.append("document", file);
    const response = await api.post(
      `/agent/talibes/${talibeId}/document`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  },

  // Mot de passe oublié (OTP)
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },
  verifyOtp: async (email, otp) => {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
  },
  resetPassword: async (data) => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },
};

export default agentService;
