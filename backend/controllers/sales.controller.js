import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

import * as salesService from "../services/sales.service.js";
import * as salesInvoiceService from "../services/salesInvoice.service.js";

// Get all sale
export const getSales = asyncHandler(
    async (req, res) => {
        const sales = salesService.getSales();

        res.status(200).json({
            success: true,
            count: sales.length,
            data: sales
        });
    }
);

// Get by id
export const getSaleById = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        const saleData = salesService.getSaleById(Number(id));

        res.status(200).json({
            success: true,
            data: saleData
        });
    }
);

// Get sale items
export const getSaleItems = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        const items = salesService.getSaleItems(Number(id));

        res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });
    }
);

// Create sale
export const createSale = asyncHandler(
    async (req, res, next) => {
        const sale = salesService.createSale(req.body);

        res.status(201).json({
            success: true,
            message: 'Sales invoice successfully generated and inventory stocks adjusted.',
            data: sale
        });
    }
);

// Delete sale
export const deleteSale = asyncHandler(
    async (req, res, next) => {
        const {id} = req.params;
        salesService.deleteSale(Number(id));

        res.status(200).json({
            success: true,
            message: "Sale successfully deleted"
        });
    }
);

// Paginated sales
export const getPaginatedSales = asyncHandler(
    async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const sale = salesService.getPaginatedSales(page, limit);

        res.status(200).json({
            success: true,
            data: sale.sales,
            pagination: sale.pagination
        });
    }
);

// Search Sales
export const searchSales = asyncHandler(
    async (req, res) => {
        const { keyword = "" } = req.query;
        const records = salesService.searchSales(keyword);

        res.status(200).json({
            success: true,
            count: records.length,
            data: records
        });
    }
);

// Sales Stats
export const getSalesStats = asyncHandler(
    async (req, res) => {
        const stats = salesService.getSalesStats();

        res.status(200).json({
            success: true,
            data: stats
        });
    }
);

// Today sales
export const getTodaySales = asyncHandler(
    async (req, res) => {
        const todayData = salesService.getTodaySales();

        res.status(200).json({
            success: true,
            data: todayData
        });
    }
);

// Recent sales
export const getRecentSales = asyncHandler(
    async (req, res) => {
        const recentLogs = salesService.getRecentSales();

        res.status(200).json({
            success: true,
            count: recentLogs.length,
            data: recentLogs
        });
    }
);

// Get customer sales
export const getCustomerSales = asyncHandler(
    async (req, res) => {
        const { customerId } = req.params;
        const history = salesService.getCustomerSales(Number(customerId));

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });
    }
);

// Update payment
export const updateSalePayment = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const amount = Number(req.body.amount);

        if (isNaN(amount) || amount <= 0) {
            return next(new AppError('Please provide a valid, positive incoming amount currency value', 400));
        }

        salesService.updateSalePayment(Number(id), amount);

        res.status(200).json({
            success: true,
            message: 'Payment received successfully and customer ledger adjusted.'
        });
    }
);

// Mark paid
export const markSalePaid = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        
        salesService.markSalePaid(Number(id));

        res.status(200).json({
            success: true,
            message: 'Invoice balance fully collected and marked settled.'
        });
    }
);

// Get monthly sales
export const getMonthlySales = asyncHandler(
    async (req, res) => {
        const trend = salesService.getMonthlySales();
        res.status(200).json({
            success: true,
            data: trend
        });
    }
);

// Get sale report 
export const getSalesReport = asyncHandler(
    async (req, res) => {
        const report = salesService.getSalesReport();
        res.status(200).json({
            success: true,
            data: report
        });
    }
);

// Get top medicines
export const getTopSellingMedicines = asyncHandler(
    async (req, res) => {
        const chartsData = salesService.getTopSellingMedicines();
        res.status(200).json({
            success: true,
            count: chartsData.length,
            data: chartsData
        });
    }
);

// Invoice generator
export const getInvoice = asyncHandler(
    async (req, res) => {
        const invoice = salesInvoiceService.getInvoiceBySaleId(Number(req.params.id));

        res.status(200).json({
            success:true,
            data:invoice
        });
    }
);

// PDF controller
export const downloadInvoicePDF = asyncHandler(
    async (req, res) => {
        salesInvoiceService.generatePDF(Number(req.params.id), res);
    }
);
