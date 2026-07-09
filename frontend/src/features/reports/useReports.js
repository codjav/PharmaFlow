import { useQuery } from "@tanstack/react-query";

import reportsService from "./reports.service";

export const useDashboardReport = () =>
    useQuery({
        queryKey: ["dashboard-report"],
        queryFn: reportsService.getDashboardReport,
    });

export const useSalesReport = (startDate, endDate) =>
    useQuery({
        queryKey: ["sales-report", startDate, endDate],
        queryFn: () =>
            reportsService.getSalesReport(startDate, endDate),
        enabled: !!startDate && !!endDate,
    });

export const usePurchaseReport = (startDate, endDate) =>
    useQuery({
        queryKey: ["purchase-report", startDate, endDate],
        queryFn: () =>
            reportsService.getPurchaseReport(startDate, endDate),
        enabled: !!startDate && !!endDate,
    });

export const useCustomerReport = () =>
    useQuery({
        queryKey: ["customer-report"],
        queryFn: reportsService.getCustomerReport,
    });

export const useSupplierReport = () =>
    useQuery({
        queryKey: ["supplier-report"],
        queryFn: reportsService.getSupplierReport,
    });

export const useMedicineReport = () =>
    useQuery({
        queryKey: ["medicine-report"],
        queryFn: reportsService.getMedicineReport,
    });

export const useProfitReport = () =>
    useQuery({
        queryKey: ["profit-report"],
        queryFn: reportsService.getProfitReport,
    });