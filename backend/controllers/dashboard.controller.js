import * as dashboardService from '../services/dashboard.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
    const stats = dashboardService.getDashboardStats();
    res.status(200).json({
        success: true,
        data: stats
    });
});


export const getMonthlySalesChart = asyncHandler(async (req, res) => {
    const salesChart = dashboardService.getMonthlySalesChart();

    res.status(200).json({
        success: true,
        data: {
            salesTrend: salesChart,
        }
    });
});

export const getMonthlyPurchaseChart = asyncHandler(async (req, res) => {
    const purchaseChart = dashboardService.getMonthlyPurchaseChart();

    res.status(200).json({
        success: true,
        data: {
            purchaseTrend: purchaseChart
        }
    });
});


export const getRecentSales = asyncHandler(async (req, res) => {
    const feed = dashboardService.getRecentSales();
    res.status(200).json({
        success: true,
        count: feed.length,
        data: feed
    });
});


export const getRecentPurchases = asyncHandler(async (req, res) => {
    const feed = dashboardService.getRecentPurchases();
    res.status(200).json({
        success: true,
        count: feed.length,
        data: feed
    });
});


export const getTopMedicines = asyncHandler(async (req, res) => {
    const products = dashboardService.getTopMedicines();
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});


export const getTopCustomers = asyncHandler(async (req, res) => {
    const clients = dashboardService.getTopCustomers();
    res.status(200).json({
        success: true,
        count: clients.length,
        data: clients
    });
});


export const getLowStockMedicines = asyncHandler(async (req, res) => {
    const alerts = dashboardService.getLowStockMedicines();
    res.status(200).json({
        success: true,
        count: alerts.length,
        data: alerts
    });
});


export const getNearExpiryMedicines = asyncHandler(async (req, res) => {
    const alerts = dashboardService.getNearExpiryMedicines();
    res.status(200).json({
        success: true,
        count: alerts.length,
        data: alerts
    });
});
