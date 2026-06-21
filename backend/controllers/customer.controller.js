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
        const {id} = req.params;
        const result = customerService.getCustomerById(Number(id));
        res.status(200).json({
            success: true,
            data: result
        });
    }
);

// Get active customers
export const getActiveCustomers = asyncHandler(
    async (req, res) => {
        const active = customerService.getActiveCustomers();
        res.status(200).json({
            success: true,
            data: active
        });
    }
);

// Create customer
export const createCustomer = asyncHandler(
    async (req, res) => {
        const newCustomer = customerService.createCustomer(req.body);
        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: newCustomer
        });
    }
);

// Update customer
export const updateCustomer = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        const modified = customerService.updateCustomer(Number(id), req.body);
        res.status(200).json({
            success: true,
            message: 'Customer data updated successfully',
            data: modified
        });
    }
);

// Delete customer
export const deleteCustomer = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        customerService.deleteCustomer(Number(id));
        res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });
    }
);

// Search
export const searchCustomers = asyncHandler(
    async (req, res) => {
        const {keyword=""} = req.query;
        const datas = customerService.searchCustomers(keyword);
        res.status(200).json({
            success: true,
            count: datas.length,
            data: datas
        });
    }
);

// Stats
export const getCustomerStats = asyncHandler(
    async (req, res) => {
        const stats = customerService.getCustomerStats();
        res.status(200).json({
            success: true,
            data: stats
        });
    }
);

// Paginated
export const getPaginatedCustomers = asyncHandler(
    async (req, res) => {
        if(req.query.all === "true") {
            const dump = customerService.getAllCustomers();
            return res.status(200).json({
                success: true,
                count: dump.length,
                data: dump
            });
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = customerService.getPaginatedCustomers(page, limit);

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    }
);

// Top
export const getTopCustomers = asyncHandler(
    async (req, res) => {
        const top = customerService.getTopCustomers();
        res.status(200).json({
            success: true,
            data: top
        });
    }
);

// With due
export const getCustomersWithDue = asyncHandler(
    async (req, res) => {
        const due = customerService.getCustomersWithDue();
        res.status(200).json({
            success: true,
            count: due.length,
            data: due
        });
    }
);

// Summary
export const getCustomerSummary = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        const record = customerService.getCustomerSummary(Number(id));
        res.status(200).json({
            success: true,
            data: record
        });
    }
);

// Report
export const getCustomerReport = asyncHandler(
    async (req, res) => {
        const report = customerService.getCustomerReport();
        res.status(200).json({
            success: true,
            data: report
        });
    }
);
