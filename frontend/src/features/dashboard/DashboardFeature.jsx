import {
  Activity,
  AlertTriangle,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

import Card from "@/components/ui/Card";
import DataTable from "@/components/tables/DataTable";
import LoadingState from "@/components/feedback/LoadingState";

import {
  recentSalesColumns,
  recentPurchaseColumns,
  topMedicineColumns,
  topCustomerColumns,
  lowStockColumns,
  expiringBatchColumns,
} from "./dashboard.columns";

import useDashboard from "./useDashboard";

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
  bgColor = "bg-blue-100",
}) => (
  <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="mt-2 text-3xl font-bold">
          {value}
        </h2>
      </div>

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${bgColor}`}
      >
        <Icon className={iconColor} size={28} />
      </div>
    </div>
  </Card>
);

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
    expiringBatches,
    isLoading,
    isError,
  } = useDashboard();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="py-10 text-center text-red-600">
          Failed to load dashboard.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Pharmacy Overview
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Medicines"
          value={stats?.totalMedicines ?? 0}
          icon={Package}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Total Stock"
          value={stats?.totalStock ?? 0}
          icon={Activity}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Customers"
          value={stats?.totalCustomers ?? 0}
          icon={Users}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Suppliers"
          value={stats?.totalSuppliers ?? 0}
          icon={ShoppingCart}
          bgColor="bg-orange-100"
          iconColor="text-orange-600"
        />

      </div>

      {/* Finance Cards */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-green-100 p-3">

              <TrendingUp
                size={28}
                className="text-green-600"
              />

            </div>

            <div>

              <p className="text-gray-500">
                Total Sales
              </p>

              <h2 className="text-3xl font-bold">
                ₹ {(stats?.totalSales ?? 0).toLocaleString("en-IN")}
              </h2>

            </div>

          </div>

        </Card>

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-blue-100 p-3">

              <DollarSign
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="text-gray-500">
                Total Purchases
              </p>

              <h2 className="text-3xl font-bold">
                ₹ {(stats?.totalPurchases ?? 0).toLocaleString("en-IN")}
              </h2>

            </div>

          </div>

        </Card>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <h2 className="mb-5 text-xl font-semibold">
            Monthly Sales
          </h2>

          <div className="h-350px">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={monthlySales ?? []}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="total"
        radius={[6, 6, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>

        </Card>

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <h2 className="mb-5 text-xl font-semibold">
            Monthly Purchases
          </h2>

          <div className="h-350px">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={monthlyPurchases ?? []}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="total"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

        </Card>

      </div>

            {/* Recent Sales & Purchases */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Recent Sales
            </h2>

            <span className="text-sm text-gray-500">
              Last 10 Sales
            </span>

          </div>

          <DataTable
            columns={recentSalesColumns}
            data={recentSales ?? []}
            loading={isLoading}
            emptyMessage="No recent sales"
          />

        </Card>

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Recent Purchases
            </h2>

            <span className="text-sm text-gray-500">
              Last 10 Purchases
            </span>

          </div>

          <DataTable
            columns={recentPurchaseColumns}
            data={recentPurchases ?? []}
            loading={isLoading}
            emptyMessage="No recent purchases"
          />

        </Card>

      </div>

      {/* Top Medicines & Customers */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Top Medicines
            </h2>

            <span className="text-sm text-gray-500">
              Best Selling
            </span>

          </div>

          <DataTable
            columns={topMedicineColumns}
            data={topMedicines ?? []}
            loading={isLoading}
            emptyMessage="No medicine sales"
          />

        </Card>

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Top Customers
            </h2>

            <span className="text-sm text-gray-500">
              Highest Purchases
            </span>

          </div>

          <DataTable
            columns={topCustomerColumns}
            data={topCustomers ?? []}
            loading={isLoading}
            emptyMessage="No customers"
          />

        </Card>

      </div>

            {/* Low Stock & Expiring Batches */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <AlertTriangle
                size={22}
                className="text-yellow-500"
              />

              <h2 className="text-xl font-semibold">
                Low Stock Inventory
              </h2>

            </div>

            <span className="text-sm text-gray-500">
              Needs Refill
            </span>

          </div>

          <DataTable
            columns={lowStockColumns}
            data={lowStock ?? []}
            loading={isLoading}
            emptyMessage="No low stock medicines"
          />

        </Card>

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <AlertTriangle
                size={22}
                className="text-red-500"
              />

              <h2 className="text-xl font-semibold">
                Expiring Batches
              </h2>

            </div>

            <span className="text-sm text-gray-500">
              Next 30 Days
            </span>

          </div>

          <DataTable
            columns={expiringBatchColumns}
            data={expiringBatches ?? []}
            loading={isLoading}
            emptyMessage="No expiring batches"
          />

        </Card>

      </div>

      {/* Quick Actions */}

      <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

        <h2 className="mb-5 text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

          <button className="rounded-xl border p-5 transition hover:bg-blue-50">

            <Package
              size={30}
              className="mx-auto mb-3 text-blue-600"
            />

            <p className="font-medium">
              Add Medicine
            </p>

          </button>

          <button className="rounded-xl border p-5 transition hover:bg-green-50">

            <ShoppingCart
              size={30}
              className="mx-auto mb-3 text-green-600"
            />

            <p className="font-medium">
              New Purchase
            </p>

          </button>

          <button className="rounded-xl border p-5 transition hover:bg-purple-50">

            <DollarSign
              size={30}
              className="mx-auto mb-3 text-purple-600"
            />

            <p className="font-medium">
              New Sale
            </p>

          </button>

          <button className="rounded-xl border p-5 transition hover:bg-orange-50">

            <Users
              size={30}
              className="mx-auto mb-3 text-orange-600"
            />

            <p className="font-medium">
              Customer
            </p>

          </button>

          <button className="rounded-xl border p-5 transition hover:bg-cyan-50">

            <ShoppingCart
              size={30}
              className="mx-auto mb-3 text-cyan-600"
            />

            <p className="font-medium">
              Supplier
            </p>

          </button>

          <button className="rounded-xl border p-5 transition hover:bg-yellow-50">

            <TrendingUp
              size={30}
              className="mx-auto mb-3 text-yellow-600"
            />

            <p className="font-medium">
              Reports
            </p>

          </button>

        </div>

      </Card>

    </div>
  );
};

export default DashboardFeature;