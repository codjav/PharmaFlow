import salesApi from "./sales.api";

const getSales = async (params = {}) => {
    const response = await salesApi.getSales(params);

    return {
        sales: response.data,
        pagination: response.pagination,
    };
};

const getSale = async (id) => {
    const response = await salesApi.getSale(id);

    return response.data;
};

const getSaleItems = async (id) => {
    const response = await salesApi.getSaleItems(id);

    return response.data;
};

const createSale = async (payload) => {
    const response = await salesApi.createSale(payload);

    return response.data;
};

const deleteSale = async (id) => {
    const response = await salesApi.deleteSale(id);

    return response.data;
};

const updateSalePayment = async (id, amount) => {
    const response = await salesApi.updateSalePayment({
        id,
        amount,
    });

    return response.data;
};

const markSalePaid = async (id) => {
    const response = await salesApi.markSalePaid(id);

    return response.data;
};

const searchSales = async (keyword) => {
    const response = await salesApi.searchSales(keyword);

    return response.data;
};

const getSalesStats = async () => {
    const response = await salesApi.getSalesStats();

    return response.data;
};

const getRecentSales = async () => {
    const response = await salesApi.getRecentSales();

    return response.data;
};

const getTodaySales = async () => {
    const response = await salesApi.getTodaySales();

    return response.data;
};

const getMonthlySales = async () => {
    const response = await salesApi.getMonthlySales();

    return response.data;
};

const getSalesReport = async () => {
    const response = await salesApi.getSalesReport();

    return response.data;
};

const getTopSellingMedicines = async () => {
    const response = await salesApi.getTopSellingMedicines();

    return response.data;
};

export default {
    getSales,
    getSale,
    getSaleItems,
    createSale,
    deleteSale,
    updateSalePayment,
    markSalePaid,
    searchSales,
    getSalesStats,
    getRecentSales,
    getTodaySales,
    getMonthlySales,
    getSalesReport,
    getTopSellingMedicines,
};