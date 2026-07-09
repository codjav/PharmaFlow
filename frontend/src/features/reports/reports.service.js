import reportsApi from "./reports.api";

const getDashboardReport = async () => {
    const response = await reportsApi.getDashboardReport();
    return response.data;
};

const getSalesReport = async (startDate, endDate) => {
    const response = await reportsApi.getSalesReport(startDate, endDate);
    return response.data;
};

const getPurchaseReport = async (startDate, endDate) => {
    const response = await reportsApi.getPurchaseReport(startDate, endDate);
    return response.data;
};

const getCustomerReport = async () => {
    const response = await reportsApi.getCustomerReport();
    return response.data;
};

const getSupplierReport = async () => {
    const response = await reportsApi.getSupplierReport();
    return response.data;
};

const getMedicineReport = async () => {
    const response = await reportsApi.getMedicineReport();
    return response.data;
};

const getProfitReport = async () => {
    const response = await reportsApi.getProfitReport();
    return response.data;
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