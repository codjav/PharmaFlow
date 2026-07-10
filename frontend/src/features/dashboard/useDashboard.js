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

        recentSales: summary.data?.tables?.recentSales ?? [],

        recentPurchases: summary.data?.tables?.recentPurchases ?? [],

        topMedicines: summary.data?.tables?.topMedicines ?? [],

        topCustomers: summary.data?.tables?.topCustomers ?? [],

        lowStock: summary.data?.tables?.lowStock ?? [],

        expiringBatches: summary.data?.tables?.expiringBatches ?? [],

        monthlySales: summary.data?.charts?.monthlySales ?? [],

        monthlyPurchases: summary.data?.charts?.monthlyPurchases ?? [],

        isLoading: summary.isLoading,

        isError: summary.isError,

        error: summary.error,

        refetch: summary.refetch,
    };

};

export default useDashboard;