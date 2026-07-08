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

  getMedicineBatches(id) {
    return api.get(`/medicines/${id}/batches`);
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

  getLowStock() {
    return api.get("/medicines/low-stock");
  },
};

export default medicineApi;