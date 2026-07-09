import api from "@/api/axios";

export const getSummary = async () => {
    const { data } = await api.get("/alerts/summary");
    return data;
};

export const getLowStock = async () => {
    const { data } = await api.get("/alerts/low-stock");
    return data;
};

export const getOutOfStock = async () => {
    const { data } = await api.get("/alerts/out-of-stock");
    return data;
};

export const getNearExpiry = async () => {
    const { data } = await api.get("/alerts/near-expiry");
    return data;
};

export const get90Expiry = async () => {
    const { data } = await api.get("/alerts/90-expiry");
    return data;
};

export const getExpired = async () => {
    const { data } = await api.get("/alerts/expired");
    return data;
};

export const getCustomerDues = async () => {
    const { data } = await api.get("/alerts/customer-dues");
    return data;
};

export const getSupplierDues = async () => {
    const { data } = await api.get("/alerts/supplier-dues");
    return data;
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
