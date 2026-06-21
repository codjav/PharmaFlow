import asyncHandler from "../utils/asyncHandler.js";
import * as customerService from "../services/customer.service.js"
import AppError from "../utils/AppError.js";

// Get all
export const getAllCustomers = asyncHandler(
    async (req, res) => {
        const customers = customerService.getAllCustomers();
        
        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });
    }
);

// Get by id
export const getCustomerById = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Create customer
export const createCustomer = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Update customer
export const updateCustomer = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Delete customer
export const deleteCustomer = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Search
export const searchCustomers = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Stats
export const getCustomerStats = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Paginated
export const getPaginatedCustomers = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Top
export const getTopCustomers = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// With due
export const getCustomersWithDue = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Summary
export const getCustomerSummary = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);

// Report
export const getCustomerReport = asyncHandler(
    async (req, res) => {
        res.status(200).json({
            success: true,
        });
    }
);
