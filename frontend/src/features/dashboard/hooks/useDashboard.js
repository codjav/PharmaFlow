import { useQuery } from "@tanstack/react-query";

import dashboardService from "../services/dashboard.service";

const useDashboard = () => {

    const stats = useQuery({

        queryKey: ["dashboard-stats"],

        queryFn: dashboardService.getStats

    });

    const recentSales = useQuery({

        queryKey: ["dashboard-recent-sales"],

        queryFn: dashboardService.getRecentSales

    });

    const recentPurchases = useQuery({

        queryKey: ["dashboard-recent-purchases"],

        queryFn: dashboardService.getRecentPurchases

    });

    const topMedicines = useQuery({

        queryKey: ["dashboard-top-medicines"],

        queryFn: dashboardService.getTopMedicines

    });

    const topCustomers = useQuery({

        queryKey: ["dashboard-top-customers"],

        queryFn: dashboardService.getTopCustomers

    });

    const lowStock = useQuery({

        queryKey: ["dashboard-low-stock"],

        queryFn: dashboardService.getLowStock

    });

    const nearExpiry = useQuery({

        queryKey: ["dashboard-near-expiry"],

        queryFn: dashboardService.getNearExpiry

    });

    const monthlySales = useQuery({

        queryKey: ["dashboard-monthly-sales"],

        queryFn: dashboardService.getMonthlySales

    });

    const monthlyPurchases = useQuery({

        queryKey: ["dashboard-monthly-purchases"],

        queryFn: dashboardService.getMonthlyPurchases

    });

    return {

        stats,

        recentSales,

        recentPurchases,

        topMedicines,

        topCustomers,

        lowStock,

        nearExpiry,

        monthlySales,

        monthlyPurchases

    };

};

export default useDashboard;