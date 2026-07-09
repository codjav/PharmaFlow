import { useQuery } from "@tanstack/react-query";

import salesService from "./sales.service";

export const useSales = (params = {}) => {
    return useQuery({
        queryKey: ["sales", params],
        queryFn: () => salesService.getSales(params),
    });
};

export const useSale = (id) => {
    return useQuery({
        queryKey: ["sale", id],
        queryFn: () => salesService.getSale(id),
        enabled: !!id,
    });
};

export const useSaleItems = (id) => {
    return useQuery({
        queryKey: ["sale-items", id],
        queryFn: () => salesService.getSaleItems(id),
        enabled: !!id,
    });
};

export const useSalesStats = () => {
    return useQuery({
        queryKey: ["sales-stats"],
        queryFn: salesService.getSalesStats,
    });
};

export const useRecentSales = () => {
    return useQuery({
        queryKey: ["recent-sales"],
        queryFn: salesService.getRecentSales,
    });
};

export const useTodaySales = () => {
    return useQuery({
        queryKey: ["today-sales"],
        queryFn: salesService.getTodaySales,
    });
};

export const useMonthlySales = () => {
    return useQuery({
        queryKey: ["monthly-sales"],
        queryFn: salesService.getMonthlySales,
    });
};

export const useSalesReport = () => {
    return useQuery({
        queryKey: ["sales-report"],
        queryFn: salesService.getSalesReport,
    });
};

export const useTopSellingMedicines = () => {
    return useQuery({
        queryKey: ["top-selling-medicines"],
        queryFn: salesService.getTopSellingMedicines,
    });
};