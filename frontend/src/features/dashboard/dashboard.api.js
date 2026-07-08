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

    getLowStockInventory: async () => {
        const { data } = await api.get("/dashboard/low-stock");
        return data.data;
    },

    getExpiringBatches: async () => {
        const { data } = await api.get("/dashboard/expiring-batches");
        return data.data;
    },

    getMonthlySales: async () => {
        const { data } = await api.get("/dashboard/monthly-sales");
        return data.data.salesTrend;
    },

    getMonthlyPurchases: async () => {
        const { data } = await api.get("/dashboard/monthly-purchases");
        return data.data.purchaseTrend;
    },

    getSummary: async () => {
        const { data } = await api.get("/dashboard/summary");
        return data.data;
    },
};

export default dashboardApi;