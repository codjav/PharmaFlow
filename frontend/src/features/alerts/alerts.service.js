import alertsApi from "./alerts.api";

const getSummary = async () => {
    const response = await alertsApi.getSummary();
    return response.data;
};

const getLowStock = async () => {
    const response = await alertsApi.getLowStock();
    return response.data;
};

const getOutOfStock = async () => {
    const response = await alertsApi.getOutOfStock();
    return response.data;
};

const getNearExpiry = async () => {
    const response = await alertsApi.getNearExpiry();
    return response.data;
};

const get90Expiry = async () => {
    const response = await alertsApi.get90Expiry();
    return response.data;
};

const getExpired = async () => {
    const response = await alertsApi.getExpired();
    return response.data;
};

const getCustomerDues = async () => {
    const response = await alertsApi.getCustomerDues();
    return response.data;
};

const getSupplierDues = async () => {
    const response = await alertsApi.getSupplierDues();
    return response.data;
};

export default {
    getSummary,
    getLowStock,
    getOutOfStock,
    getNearExpiry,
    get90Expiry,
    getExpired,
    getCustomerDues,
    getSupplierDues,
};
