import api from "@/api/axios";

const medicineApi = {
  getMedicines(page = 1, limit = 10) {
    return api.get("/medicines", {
      params: { page, limit },
    });
  },

  getMedicine(id) {
    return api.get(`/medicines/${id}`);
  },

  createMedicine(data) {
    return api.post("/medicines", data);
  },

  updateMedicine(id, data) {
    return api.put(`/medicines/${id}`, data);
  },

  deleteMedicine(id) {
    return api.delete(`/medicines/${id}`);
  },

  searchMedicines(keyword) {
    return api.get("/medicines/search", {
      params: { keyword },
    });
  },

  adjustStock(id, quantity) {
    return api.patch(`/medicines/${id}/adjust-stock`, { quantity });
  },

  getLowStock() {
    return api.get("/medicines/low-stock");
  },

  getNearExpiry() {
    return api.get("/medicines/near-expiry");
  },

  get90Expiry() {
    return api.get("/medicines/90-expiry");
  },
};

export default medicineApi;
