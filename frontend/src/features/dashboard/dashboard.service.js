import dashboardApi from "./dashboard.api";

const dashboardService = {

    getSummary: dashboardApi.getSummary,

    getStats: dashboardApi.getStats,

    getRecentSales: dashboardApi.getRecentSales,

    getRecentPurchases: dashboardApi.getRecentPurchases,

    getTopMedicines: dashboardApi.getTopMedicines,

    getTopCustomers: dashboardApi.getTopCustomers,

    getLowStockInventory: dashboardApi.getLowStockInventory,

    getExpiringBatches: dashboardApi.getExpiringBatches,

    getMonthlySales: dashboardApi.getMonthlySales,

    getMonthlyPurchases: dashboardApi.getMonthlyPurchases,

};

export default dashboardService;