import DashboardSummary from "./components/DashboardSummary";
import DashboardCharts from "./components/DashboardCharts";
import RecentSales from "./components/RecentSales";
import RecentPurchases from "./components/RecentPurchases";
import TopMedicines from "./components/TopMedicines";
import TopCustomers from "./components/TopCustomers";
import LowStock from "./components/LowStock";
import NearExpiry from "./components/NearExpiry";

import LoadingState from "@/components/feedback/LoadingState";
import useDashboard from "./hooks/useDashboard";

const DashboardFeature = () => {

    const {
        stats,
        monthlySales,
        monthlyPurchases,
        recentSales,
        recentPurchases,
        topMedicines,
        topCustomers,
        lowStock,
        nearExpiry,
    } = useDashboard();

    if (stats.isLoading) {
        return <LoadingState />;
    }

    return (
        <div className="space-y-6">

            <DashboardSummary
                stats={stats.data}
            />

            <DashboardCharts
                sales={monthlySales.data ?? []}
                purchases={monthlyPurchases.data ?? []}
                loading={
                    monthlySales.isLoading ||
                    monthlyPurchases.isLoading
                }
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <RecentSales
                    data={recentSales.data ?? []}
                    loading={recentSales.isLoading}
                />

                <RecentPurchases
                    data={recentPurchases.data ?? []}
                    loading={recentPurchases.isLoading}
                />

            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <TopMedicines
                    data={topMedicines.data ?? []}
                    loading={topMedicines.isLoading}
                />

                <TopCustomers
                    data={topCustomers.data ?? []}
                    loading={topCustomers.isLoading}
                />

            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <LowStock
                    data={lowStock.data ?? []}
                    loading={lowStock.isLoading}
                />

                <NearExpiry
                    data={nearExpiry.data ?? []}
                    loading={nearExpiry.isLoading}
                />

            </div>

        </div>
    );

};

export default DashboardFeature;