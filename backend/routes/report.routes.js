import express from "express";
import {
    getSalesReport,
    getPurchaseReport,
    getCustomerReport,
    getSupplierReport,
    getMedicineReport,
    getProfitReport,
    getDashboardReport
} from "../controllers/report.controller.js"

const router = express.Router();

router.get("/sales", getSalesReport);

router.get("/purchases", getPurchaseReport);

router.get("/customers", getCustomerReport);

router.get("/suppliers", getSupplierReport);

router.get("/medicines", getMedicineReport);

router.get("/profit", getProfitReport);

router.get("/dashboard", getDashboardReport);

export default router;