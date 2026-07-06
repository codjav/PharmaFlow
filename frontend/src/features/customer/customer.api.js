import api from "@/api/axios";

const customerApi = {
    getCustomers(params) {
        return api.get("/customers", { params });
    },

    searchCustomers(keyword) {
        return api.get("/customers/search", {
            params: { keyword }
        });
    },

    getCustomer(id) {
        return api.get(`/customers/${id}`);
    },

    createCustomer(data) {
        return api.post("/customers", data);
    },

    updateCustomer(id, data) {
        return api.put(`/customers/${id}`, data)
    },

    deleteCustomer(id) {
        return api.delete(`/customers/${id}`)
    }
};

export default customerApi;
