import { useQuery } from "@tanstack/react-query";

import dashboardService from "./dashboard.service";

const useDashboard = () => {

    const summary = useQuery({

        queryKey: ["dashboard-summary"],

        queryFn: dashboardService.getSummary

    });

    return {

        summary,

        stats: summary.data?.stats,

        recentSales: summary.data?.recentSales,

        recentPurchases: summary.data?.recentPurchases,

        topMedicines: summary.data?.topMedicines,

        topCustomers: summary.data?.topCustomers,

        lowStock: summary.data?.lowStock,

        expiringBatches: summary.data?.expiringBatches,

        monthlySales: summary.data?.monthlySales,

        monthlyPurchases: summary.data?.monthlyPurchases,

        isLoading: summary.isLoading,

        isError: summary.isError,

        error: summary.error,

        refetch: summary.refetch

    };

};

export default useDashboard;