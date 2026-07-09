import api from "@/api/axios";

export const getDashboardReport = async () => {
    const { data } = await api.get("/report/dashboard");
    return data;
};

export const getSalesReport = async (startDate, endDate) => {
    const { data } = await api.get("/report/sales", {
        params: { startDate, endDate },
    });
    return data;
};

export const getPurchaseReport = async (startDate, endDate) => {
    const { data } = await api.get("/report/purchases", {
        params: { startDate, endDate },
    });
    return data;
};

export const getCustomerReport = async () => {
    const { data } = await api.get("/report/customers");
    return data;
};

export const getSupplierReport = async () => {
    const { data } = await api.get("/report/suppliers");
    return data;
};

export const getMedicineReport = async () => {
    const { data } = await api.get("/report/medicines");
    return data;
};

export const getProfitReport = async () => {
    const { data } = await api.get("/report/profit");
    return data;
};

export default {
    getDashboardReport,
    getSalesReport,
    getPurchaseReport,
    getCustomerReport,
    getSupplierReport,
    getMedicineReport,
    getProfitReport,
};