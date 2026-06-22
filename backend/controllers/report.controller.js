import * as reportService from '../services/report.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';


export const getSalesReport = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return next(new AppError('Please provide both target startDate and endDate query parameters', 400));
    }

    const report = reportService.getSalesReport(startDate, endDate);

    res.status(200).json({
        success: true,
        count: report.length,
        data: report
    });
});


export const getPurchaseReport = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return next(new AppError('Please provide both target startDate and endDate query parameters', 400));
    }

    const report = reportService.getPurchaseReport(startDate, endDate);

    res.status(200).json({
        success: true,
        count: report.length,
        data: report
    });
});


export const getCustomerReport = asyncHandler(async (req, res) => {
    const report = reportService.getCustomerReport();

    res.status(200).json({
        success: true,
        count: report.length,
        data: report
    });
});


export const getSupplierReport = asyncHandler(async (req, res) => {
    const report = reportService.getSupplierReport();

    res.status(200).json({
        success: true,
        count: report.length,
        data: report
    });
});


export const getMedicineReport = asyncHandler(async (req, res) => {
    const report = reportService.getMedicineReport();

    res.status(200).json({
        success: true,
        count: report.length,
        data: report
    });
});


export const getProfitReport = asyncHandler(async (req, res) => {
    const report = reportService.getProfitReport();

    res.status(200).json({
        success: true,
        count: report.length,
        data: report
    });
});


export const getDashboardReport = asyncHandler(async (req, res) => {
    const report = reportService.getDashboardReport();

    res.status(200).json({
        success: true,
        data: report
    });
});
