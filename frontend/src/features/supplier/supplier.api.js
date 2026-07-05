import api from "@/api/axios";

const supplierApi = {

    getSuppliers(page = 1, limit = 10) {
        return api.get("/suppliers", {
            params: {
                page,
                limit,
            },
        });
    },

    getSupplier(id) {
        return api.get(`/suppliers/${id}`);
    },

    createSupplier(data) {
        return api.post("/suppliers", data);
    },

    updateSupplier(id, data) {
        return api.put(`/suppliers/${id}`, data);
    },

    deleteSupplier(id) {
        return api.delete(`/suppliers/${id}`);
    },

    searchSuppliers(keyword) {
        return api.get("/suppliers/search", {
            params: {
                keyword,
            },
        });
    },

    getSupplierStats() {
        return api.get("/suppliers/stats");
    },

    getTopSuppliers() {
        return api.get("/suppliers/top");
    },

    getSuppliersWithDue() {
        return api.get("/suppliers/with-due");
    },

};

export default supplierApi;