import express from "express";

import {

    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,

    searchSuppliers,

    getSupplierStats,
    getPaginatedSuppliers,
    getSupplierSummary,

    getTopSuppliers,

    getSuppliersWithDue,

} from "../controllers/supplier.controller.js";

const router = express.Router();


// Search and stats routes first
router.get("/search", searchSuppliers);
router.get("/stats", getSupplierStats);
router.get("/top", getTopSuppliers);
router.get("/with-due", getSuppliersWithDue);
router.get("/:id/summary", getSupplierSummary);

// CRUD routes
router.get("/", getPaginatedSuppliers);
router.post("/", createSupplier);

router.route("/:id")
    .get(getSupplierById)
    .put(updateSupplier)
    .delete(deleteSupplier);


export default router;