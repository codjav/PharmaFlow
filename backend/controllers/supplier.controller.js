// src/controllers/supplier.controller.js

import asyncHandler from "../utils/asyncHandler.js";

import * as supplierService from "../services/supplier.service.js";

// GET ALL 
export const getAllSuppliers = asyncHandler(
    async (req, res) => {
        const suppliers = supplierService.getAllSuppliers();
        res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers
        });
    }
);

// GET SUPPLIER BY ID
export const getSupplierById = asyncHandler(
    async (req, res) => {
        const supplier = supplierService.getSupplierById(
            req.params.id
        );
        res.status(200).json({
            success: true,
            data: supplier
        });
    }
);

// CREATE SUPPLIER
export const createSupplier = asyncHandler(
    async (req, res) => {
        const supplier = supplierService.createSupplier(
            req.body
        );
        res.status(201).json({
            success: true,
            message: "Supplier created successfully",
            data: supplier
        });
    }
);

// UPDATE SUPPLIER
export const updateSupplier = asyncHandler(
    async (req, res) => {
        const supplier = supplierService.updateSupplier(
            req.params.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: "Supplier updated successfully",
            data: supplier
        });
    }
);

// DELETE SUPPLIER
export const deleteSupplier = asyncHandler(
    async (req, res) => {
        supplierService.deleteSupplier(
            req.params.id
        );
        res.status(200).json({
            success: true,
            message: "Supplier deleted successfully"
        });
    }
);

// SEARCH SUPPLIERS
export const searchSuppliers = asyncHandler(
    async (req, res) => {
        const keyword = req.query.keyword || "";
        const suppliers = supplierService.searchSuppliers(
            keyword
        );
        res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers
        });
    }
);

// GET SUPPLIER STATS
export const getSupplierStats = asyncHandler(
    async (req, res) => {
        const stats = supplierService.getSupplierStats();
        res.status(200).json({
            success: true,
            data: stats
        });
    }
);

// GET paginated supplier
export const getPaginatedSuppliers = asyncHandler(
    async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const all = req.query.all === 'true'; // Checks if ?all=true is in the URL

        const result = supplierService.getPaginatedSuppliers(page, limit, all);
        
        res.status(200).json({
            success: true,
            data: result.suppliers,
            pagination: result.pagination
        });
    }
);


// GET supplier summary
export const getSupplierSummary = asyncHandler(
    async (req, res) => {
        const summary =
            supplierStatsService.getSupplierSummary(
                req.params.id
            );
        res.status(200).json({
            success: true,
            data: summary
        });
    }
);

// GET supplier with due
export const getSuppliersWithDue = asyncHandler(
    async (req, res) => {
        const suppliers =
            supplierStatsService.getSuppliersWithDue();
        res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers
        });
    }
);

// GET TOP SUPPLIERS
export const getTopSuppliers = asyncHandler(
    async (req, res) => {
        const suppliers = supplierService.getTopSuppliers();
        res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers
        });
    }
);
