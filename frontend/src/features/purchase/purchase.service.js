import * as purchaseApi from "./purchase.api";

export const getPurchases = async ({
    page,
    limit,
    search,
}) => {
    if (search?.trim()) {
        return purchaseApi.searchPurchases(search);
    }

    const response = await purchaseApi.getPurchases(
        page,
        limit
    );

    return {
        purchases: response.data,
        pagination: response.pagination,
    };
};

export const getPurchase = (id) =>
    purchaseApi.getPurchaseById(id);

export const getPurchaseItems = (id) =>
    purchaseApi.getPurchaseItems(id);

export const createPurchase = (purchase) =>
    purchaseApi.createPurchase(purchase);

export const deletePurchase = (id) =>
    purchaseApi.deletePurchase(id);

export const updatePurchasePayment = (
    id,
    amount
) => purchaseApi.updatePurchasePayment(id, amount);

export const markPurchasePaid = (id) =>
    purchaseApi.markPurchasePaid(id);

export const getPurchaseStats = () =>
    purchaseApi.getPurchaseStats();

export const getPurchaseReport = () =>
    purchaseApi.getPurchaseReport();

export const getRecentPurchases = () =>
    purchaseApi.getRecentPurchases();

export const getSupplierPurchases = (
    supplierId
) => purchaseApi.getSupplierPurchases(supplierId);
