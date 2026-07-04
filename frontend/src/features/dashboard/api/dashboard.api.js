import api from "@/api/axios";

const dashboardApi = {

    getStats: async () => {

        const response = await api.get("/dashboard/stats");

        return response.data;

    },

    getRecentSales: async () => {

        const response = await api.get("/dashboard/recent-sales");

        return response.data;

    },

    getRecentPurchases: async () => {

        const response = await api.get("/dashboard/recent-purchases");

        return response.data;

    },

    getTopMedicines: async () => {

        const response = await api.get("/dashboard/top-medicines");

        return response.data;

    },

    getTopCustomers: async () => {

        const response = await api.get("/dashboard/top-customers");

        return response.data;

    },

    getLowStock: async () => {

        const response = await api.get("/dashboard/low-stock");

        return response.data;

    },

    getNearExpiry: async () => {

        const response = await api.get("/dashboard/near-expiry");

        return response.data;

    },

    getMonthlySales: async () => {

        const response = await api.get("/dashboard/monthly-sales");

        return response.data;

    },

    getMonthlyPurchases: async () => {

        const response = await api.get("/dashboard/monthly-purchases");

        return response.data;

    }

};

export default dashboardApi;