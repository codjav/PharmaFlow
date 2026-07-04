import dashboardApi from "../api/dashboard.api";

const dashboardService = {

    getStats: async () => {

        const response = await dashboardApi.getStats();

        return response.data;

    },

    getRecentSales: async () => {

        const response = await dashboardApi.getRecentSales();

        return response.data;

    },

    getRecentPurchases: async () => {

        const response = await dashboardApi.getRecentPurchases();

        return response.data;

    },

    getTopMedicines: async () => {

        const response = await dashboardApi.getTopMedicines();

        return response.data;

    },

    getTopCustomers: async () => {

        const response = await dashboardApi.getTopCustomers();

        return response.data;

    },

    getLowStock: async () => {

        const response = await dashboardApi.getLowStock();

        return response.data;

    },

    getNearExpiry: async () => {

        const response = await dashboardApi.getNearExpiry();

        return response.data;

    },

    getMonthlySales: async () => {

        const response = await dashboardApi.getMonthlySales();

        return response.data.salesTrend;

    },

    getMonthlyPurchases: async () => {

        const response = await dashboardApi.getMonthlyPurchases();

        return response.data.purchaseTrend;

    }

};

export default dashboardService;