import { useQuery } from "@tanstack/react-query";

import alertsService from "./alerts.service";

export const useAlertSummary = () =>
    useQuery({
        queryKey: ["alert-summary"],
        queryFn: alertsService.getSummary,
    });

export const useLowStockAlerts = () =>
    useQuery({
        queryKey: ["low-stock-alerts"],
        queryFn: alertsService.getLowStock,
    });

export const useOutOfStockAlerts = () =>
    useQuery({
        queryKey: ["out-of-stock-alerts"],
        queryFn: alertsService.getOutOfStock,
    });

export const useNearExpiryAlerts = () =>
    useQuery({
        queryKey: ["near-expiry-alerts"],
        queryFn: alertsService.getNearExpiry,
    });

export const use90ExpiryAlerts = () =>
    useQuery({
        queryKey: ["90-expiry-alerts"],
        queryFn: alertsService.get90Expiry,
    });

export const useExpiredAlerts = () =>
    useQuery({
        queryKey: ["expired-alerts"],
        queryFn: alertsService.getExpired,
    });

export const useCustomerDueAlerts = () =>
    useQuery({
        queryKey: ["customer-due-alerts"],
        queryFn: alertsService.getCustomerDues,
    });

export const useSupplierDueAlerts = () =>
    useQuery({
        queryKey: ["supplier-due-alerts"],
        queryFn: alertsService.getSupplierDues,
    });
