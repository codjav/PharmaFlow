import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable from "@/components/tables/DataTable";

import alertsColumns from "./alerts.columns";

import {
    useAlertSummary,
    useLowStockAlerts,
    useOutOfStockAlerts,
    useNearExpiryAlerts,
    use90ExpiryAlerts,
    useExpiredAlerts,
    useCustomerDueAlerts,
    useSupplierDueAlerts,
} from "./useAlerts";

const ALERT_TYPES = [
    {
        key: "LOW_STOCK",
        label: "Low Stock",
    },
    {
        key: "OUT_OF_STOCK",
        label: "Out Of Stock",
    },
    {
        key: "NEAR_EXPIRY",
        label: "30 Days Expiry",
    },
    {
        key: "EXPIRY_90",
        label: "90 Days Expiry",
    },
    {
        key: "EXPIRED",
        label: "Expired",
    },
    {
        key: "CUSTOMER_DUE",
        label: "Customer Dues",
    },
    {
        key: "SUPPLIER_DUE",
        label: "Supplier Dues",
    },
];

const AlertsFeature = () => {

    const [selectedAlert, setSelectedAlert] = useState("LOW_STOCK");

    const { data: summary } = useAlertSummary();

    const { data: lowStock, isLoading: lowLoading } = useLowStockAlerts();

    const { data: outStock } = useOutOfStockAlerts();

    const { data: nearExpiry } = useNearExpiryAlerts();

    const { data: expiry90 } = use90ExpiryAlerts();

    const { data: expired } = useExpiredAlerts();

    const { data: customerDue } = useCustomerDueAlerts();

    const { data: supplierDue } = useSupplierDueAlerts();

    const tableData = useMemo(() => {

        switch (selectedAlert) {

            case "LOW_STOCK":
                return lowStock || [];

            case "OUT_OF_STOCK":
                return outStock || [];

            case "NEAR_EXPIRY":
                return nearExpiry || [];

            case "EXPIRY_90":
                return expiry90 || [];

            case "EXPIRED":
                return expired || [];

            case "CUSTOMER_DUE":
                return customerDue || [];

            case "SUPPLIER_DUE":
                return supplierDue || [];

            default:
                return [];

        }

    }, [
        selectedAlert,
        lowStock,
        outStock,
        nearExpiry,
        expiry90,
        expired,
        customerDue,
        supplierDue,
    ]);

    console.log("lowStock =", lowStock);
console.log("outStock =", outStock);

    return (
        <div className="space-y-6">

            {/* Summary */}

            <div className="grid grid-cols-4 gap-5">

                <Card title="Low Stock">
                    <p className="text-3xl font-bold">
                        {summary?.lowStockCount || 0}
                    </p>
                </Card>

                <Card title="Out Of Stock">
                    <p className="text-3xl font-bold text-red-600">
                        {summary?.outOfStockCount || 0}
                    </p>
                </Card>

                <Card title="30 Days Expiry">
                    <p className="text-3xl font-bold text-orange-600">
                        {summary?.nearExpiryCount || 0}
                    </p>
                </Card>

                <Card title="90 Days Expiry">
                    <p className="text-3xl font-bold text-yellow-600">
                        {summary?.expiry90Count || 0}
                    </p>
                </Card>

                <Card title="Expired">
                    <p className="text-3xl font-bold text-red-700">
                        {summary?.expiredCount || 0}
                    </p>
                </Card>

                <Card title="Customer Due">
                    <p className="text-3xl font-bold">
                        {summary?.customerDueCount || 0}
                    </p>
                </Card>

                <Card title="Supplier Due">
                    <p className="text-3xl font-bold">
                        {summary?.supplierDueCount || 0}
                    </p>
                </Card>

            </div>

            {/* Alert Buttons */}

            <Card
                title="Alerts"
                subtitle="Monitor inventory and dues"
            >

                <div className="mb-5 flex flex-wrap gap-3">

                    {
                        ALERT_TYPES.map(alert => (

                            <Button
                                key={alert.key}
                                variant={
                                    selectedAlert === alert.key
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setSelectedAlert(alert.key)}
                            >
                                {alert.label}
                            </Button>

                        ))
                    }

                </div>

                <DataTable
                    data={tableData}
                    columns={alertsColumns({
                        type: selectedAlert,
                    })}
                    loading={lowLoading}
                />

            </Card>

        </div>
    );
};

export default AlertsFeature;