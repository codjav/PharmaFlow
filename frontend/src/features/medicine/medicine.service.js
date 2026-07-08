import medicineApi from "./medicine.api";

const medicineService = {

    async getMedicines(page = 1, limit = 10) {
        const response = await medicineApi.getMedicines(page, limit);

        return {
            medicines: response.data.data,
            pagination: response.data.pagination
        };
    },

    async getMedicine(id) {
        const response = await medicineApi.getMedicine(id);

        return response.data.data;
    },

    async getMedicineBatches(id) {
        const response = await medicineApi.getMedicineBatches(id);

        return response.data.data;
    },

    async createMedicine(data) {
        const response = await medicineApi.createMedicine(data);

        return response.data.data;
    },

    async updateMedicine(id, data) {
        const response = await medicineApi.updateMedicine(id, data);

        return response.data.data;
    },

    async deleteMedicine(id) {
        await medicineApi.deleteMedicine(id);
    },

    async searchMedicines(keyword) {
        const response = await medicineApi.searchMedicines(keyword);

        return response.data.data;
    },

    async getLowStock() {
        const response = await medicineApi.getLowStock();

        return response.data.data;
    }

};

export default medicineService;