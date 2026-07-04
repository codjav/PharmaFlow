import medicineApi from "../api/medicine.api";

const medicineService = {

    getMedicines: async (page, limit) => {
        const response =
            await medicineApi.getMedicines(page, limit);

        return {
            medicines: response.data,
            pagination: response.pagination,
        };
    },

    getMedicineById: async (id) => {
        const response =
            await medicineApi.getMedicineById(id);

        return response.data;
    },

    createMedicine: async (payload) => {
        const response =
            await medicineApi.createMedicine(payload);

        return response.data;
    },

    updateMedicine: async (id, payload) => {
        const response =
            await medicineApi.updateMedicine(id, payload);

        return response.data;
    },

    deleteMedicine: async (id) => {
        await medicineApi.deleteMedicine(id);
    },

    searchMedicines: async (keyword) => {
        const response =
            await medicineApi.searchMedicines(keyword);

        return response.data;
    },

    getLowStock: async () => {
        const response =
            await medicineApi.getLowStock();

        return response.data;
    },

    getNearExpiry: async () => {
        const response =
            await medicineApi.getNearExpiry();

        return response.data;
    },

    get90Expiry: async () => {
        const response =
            await medicineApi.get90Expiry();

        return response.data;
    },

    adjustStock: async (id, quantity) => {
        const response =
            await medicineApi.adjustStock(id, quantity);

        return response.data;
    }

};

export default medicineService;