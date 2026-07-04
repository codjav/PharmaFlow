import api from "@/api/axios";

const medicineApi = {

    getMedicines: async (page = 1, limit = 10) => {
        const { data } = await api.get(
            `/medicines?page=${page}&limit=${limit}`
        );
        return data;
    },

    getMedicineById: async (id) => {
        const { data } = await api.get(`/medicines/${id}`);
        return data;
    },

    createMedicine: async (payload) => {
        const { data } = await api.post(
            "/medicines",
            payload
        );
        return data;
    },

    updateMedicine: async (id, payload) => {
        const { data } = await api.put(
            `/medicines/${id}`,
            payload
        );
        return data;
    },

    deleteMedicine: async (id) => {
        const { data } = await api.delete(
            `/medicines/${id}`
        );
        return data;
    },

    searchMedicines: async (keyword) => {
        const { data } = await api.get(
            `/medicines/search?keyword=${keyword}`
        );
        return data;
    },

    getLowStock: async () => {
        const { data } = await api.get(
            "/medicines/low-stock"
        );
        return data;
    },

    getNearExpiry: async () => {
        const { data } = await api.get(
            "/medicines/near-expiry"
        );
        return data;
    },

    get90Expiry: async () => {
        const { data } = await api.get(
            "/medicines/90-expiry"
        );
        return data;
    },

    adjustStock: async (id, quantity) => {
        const { data } = await api.patch(
            `/medicines/${id}/adjust-stock`,
            { quantity }
        );
        return data;
    }

};

export default medicineApi;