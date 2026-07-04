import dashboardApi from "../api/dashboard.api";

const dashboardService = {

    getStats: dashboardApi.getStats,

    getRecentSales: dashboardApi.getRecentSales,

    getRecentPurchases: dashboardApi.getRecentPurchases,

    getTopMedicines: dashboardApi.getTopMedicines,

    getTopCustomers: dashboardApi.getTopCustomers,

    getLowStock: dashboardApi.getLowStock,

    getNearExpiry: dashboardApi.getNearExpiry,

    getMonthlySales: dashboardApi.getMonthlySales,

    getMonthlyPurchases: dashboardApi.getMonthlyPurchases,

};

export default dashboardService;