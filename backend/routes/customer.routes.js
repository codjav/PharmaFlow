import express from "express";
import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    getCustomerStats,
    getPaginatedCustomers,
    getTopCustomers,
    getCustomersWithDue,
    getCustomerSummary,
    getCustomerReport
} from "../controllers/customer.controller.js"

const router = express.Router();


router.get("/", getPaginatedCustomers);
router.post("/", createCustomer);
router.get("/search", searchCustomers);
router.get("/stats", getCustomerStats);
router.get("/top", getTopCustomers);
router.get("/with-due", getCustomersWithDue);
router.get("/report", getCustomerReport);
router.get("/:id/summary", getCustomerSummary);

router.route("/:id")
    .get(getCustomerById)
    .put(updateCustomer)
    .delete(deleteCustomer);

export default router;