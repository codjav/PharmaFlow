import api from "@/api/axios";

export const getSales = async (params = {}) => {
    const { data } = await api.get("/sales", {
        params,
    });

    return data;
};

export const getSale = async (id) => {
    const { data } = await api.get(`/sales/${id}`);

    return data;
};

export const createSale = async (payload) => {
    const { data } = await api.post(
        "/sales",
        payload
    );

    return data;
};

export const deleteSale = async (id) => {
    const { data } = await api.delete(
        `/sales/${id}`
    );

    return data;
};

export const updateSalePayment = async ({
    id,
    amount,
}) => {
    const { data } = await api.patch(
        `/sales/${id}/payment`,
        {
            amount,
        }
    );

    return data;
};

export const searchSales = async (keyword) => {
    const { data } = await api.get(
        "/sales/search",
        {
            params: {
                keyword,
            },
        }
    );

    return data;
};

export const getSalesStats = async () => {
    const { data } = await api.get(
        "/sales/stats"
    );

    return data;
};

export const getRecentSales = async () => {
    const { data } = await api.get(
        "/sales/recent"
    );

    return data;
};

export const getTodaySales = async () => {
    const { data } = await api.get(
        "/sales/today"
    );

    return data;
};

export const getMonthlySales = async () => {
    const { data } = await api.get(
        "/sales/monthly"
    );

    return data;
};

export const getSalesReport = async () => {
    const { data } = await api.get(
        "/sales/report"
    );

    return data;
};

export const getTopSellingMedicines = async () => {
    const { data } = await api.get(
        "/sales/top-medicines"
    );

    return data;
};

export const getSaleItems = async (id) => {
    const { data } = await api.get(
        `/sales/${id}/items`
    );

    return data;
};

export default {
    getSales,
    getSale,
    createSale,
    deleteSale,
    updateSalePayment,
    searchSales,
    getSalesStats,
    getRecentSales,
    getTodaySales,
    getMonthlySales,
    getSalesReport,
    getTopSellingMedicines,
    getSaleItems,
};