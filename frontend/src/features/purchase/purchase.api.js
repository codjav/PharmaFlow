import api from "@/api/axios";

export const getPurchases = async (page = 1, limit = 10) => {
    const { data } = await api.get("/purchases", {
        params: {
            page,
            limit,
        },
    });

    return data;
};

export const searchPurchases = async (keyword) => {
    const { data } = await api.get("/purchases/search", {
        params: {
            keyword,
        },
    });

    return data.data;
};

export const getPurchaseById = async (id) => {
    const { data } = await api.get(`/purchases/${id}`);

    return data.data;
};

export const getPurchaseItems = async (id) => {
    const { data } = await api.get(`/purchases/${id}/items`);

    return data.data;
};

export const createPurchase = async (purchase) => {
    const { data } = await api.post(
        "/purchases",
        purchase
    );

    return data.data;
};

export const deletePurchase = async (id) => {
    const { data } = await api.delete(
        `/purchases/${id}`
    );

    return data;
};

export const updatePurchasePayment = async (id, amount) => {
    const { data } = await api.patch(
        `/purchases/${id}/payment`,
        { amount }
    );

    return data;
};

export const markPurchasePaid = async (id) => {
    const { data } = await api.patch(
        `/purchases/${id}/mark-paid`
    );

    return data;
};

export const getPurchaseStats = async () => {
    const { data } = await api.get('/purchases/stats');

    return data.data;
};

export const getPurchaseReport = async () => {
    const { data } = await api.get('/purchases/report');

    return data.data;
};

export const getRecentPurchases = async () => {
    const { data } = await api.get('/purchases/recent');

    return data.data;
};

export const getSupplierPurchases = async (supplierId) => {
    const { data } = await api.get(
        `/purchases/supplier/${supplierId}`
    );

    return data.data;
};

