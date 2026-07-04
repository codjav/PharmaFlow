import api from "@/api/axios";

const dashboardApi = {

    getStats: async () => {
        const { data } = await api.get("/dashboard/stats");
        return data.data;
    },

    getRecentSales: async () => {
        const { data } = await api.get("/dashboard/recent-sales");
        return data.data;
    },

    getRecentPurchases: async () => {
        const { data } = await api.get("/dashboard/recent-purchases");
        return data.data;
    },

    getTopMedicines: async () => {
        const { data } = await api.get("/dashboard/top-medicines");
        return data.data;
    },

    getTopCustomers: async () => {
        const { data } = await api.get("/dashboard/top-customers");
        return data.data;
    },

    getLowStock: async () => {
        const { data } = await api.get("/dashboard/low-stock");
        return data.data;
    },

    getNearExpiry: async () => {
        const { data } = await api.get("/dashboard/near-expiry");
        return data.data;
    },

    getMonthlySales: async () => {
        const { data } = await api.get("/dashboard/monthly-sales");
        return data.data.salesTrend;
    },

    getMonthlyPurchases: async () => {
        const { data } = await api.get("/dashboard/monthly-purchases");
        return data.data.purchaseTrend;
    }

};

export default dashboardApi;