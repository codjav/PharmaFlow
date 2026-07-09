import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable from "@/components/tables/DataTable";

import { exportCSV } from "./utils/exportCSV";
import { exportPDF } from "./utils/exportPDF";
import { printReport } from "./utils/printReport";

import reportsColumns from "./reports.columns";

import {
    useDashboardReport,
    useSalesReport,
    usePurchaseReport,
    useCustomerReport,
    useSupplierReport,
    useMedicineReport,
    useProfitReport,
} from "./useReports";

const REPORT_TYPES = [
    { key: "SALES", label: "Sales" },
    { key: "PURCHASE", label: "Purchase" },
    { key: "CUSTOMER", label: "Customers" },
    { key: "SUPPLIER", label: "Suppliers" },
    { key: "MEDICINE", label: "Medicines" },
    { key: "PROFIT", label: "Profit" },
];

const today = new Date().toISOString().slice(0, 10);

const ReportsFeature = () => {

    const [selectedReport, setSelectedReport] = useState("SALES");

    const [startDate, setStartDate] = useState(today);

    const [endDate, setEndDate] = useState(today);

    // Dashboard Summary

    const { data: dashboard } = useDashboardReport();

    // Reports

    const { data: sales } = useSalesReport(startDate, endDate);

    const { data: purchases } = usePurchaseReport(startDate, endDate);

    const { data: customers } = useCustomerReport();

    const { data: suppliers } = useSupplierReport();

    const { data: medicines } = useMedicineReport();

    const { data: profits } = useProfitReport();

    const tableData = useMemo(() => {

        switch (selectedReport) {

            case "SALES":
                return sales || [];

            case "PURCHASE":
                return purchases || [];

            case "CUSTOMER":
                return customers || [];

            case "SUPPLIER":
                return suppliers || [];

            case "MEDICINE":
                return medicines || [];

            case "PROFIT":
                return profits || [];

            default:
                return [];

        }

    }, [
        selectedReport,
        sales,
        purchases,
        customers,
        suppliers,
        medicines,
        profits,
    ]);

    const reportName = selectedReport
    .toLowerCase()
    .replace("_", "-");

    return (

        <div className="space-y-6">

            {/* Summary */}

            <div className="grid grid-cols-5 gap-5">

                <Card title="Total Sales">
                    <p className="text-3xl font-bold text-green-600">
                        ₹{dashboard?.totalSales ?? 0}
                    </p>
                </Card>

                <Card title="Total Purchase">
                    <p className="text-3xl font-bold text-blue-600">
                        ₹{dashboard?.totalPurchases ?? 0}
                    </p>
                </Card>

                <Card title="Customers">
                    <p className="text-3xl font-bold">
                        {dashboard?.totalCustomers ?? 0}
                    </p>
                </Card>

                <Card title="Suppliers">
                    <p className="text-3xl font-bold">
                        {dashboard?.totalSuppliers ?? 0}
                    </p>
                </Card>

                <Card title="Medicines">
                    <p className="text-3xl font-bold">
                        {dashboard?.totalMedicines ?? 0}
                    </p>
                </Card>

            </div>

            {/* Reports */}

            <Card
                title="Reports"
                subtitle="Generate sales, purchase and inventory reports"
            >

                <div className="flex flex-wrap gap-3 mb-5">

                    {
                        REPORT_TYPES.map(report => (

                            <Button
                                key={report.key}
                                variant={
                                    selectedReport === report.key
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() =>
                                    setSelectedReport(report.key)
                                }
                            >
                                {report.label}
                            </Button>

                        ))
                    }

                </div>

                {
                    (selectedReport === "SALES" ||
                        selectedReport === "PURCHASE") && (

                        <div className="flex gap-4 mb-5">

                            <div>

                                <label className="text-sm">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    className="input"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                />

                            </div>

                            <div>

                                <label className="text-sm">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    className="input"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    )
                }

                <div className="flex gap-3 mb-5">

    <Button

        onClick={() =>

            exportCSV(

                tableData,

                `${reportName}.csv`

            )

        }

    >

        Export CSV

    </Button>

    <Button

        variant="outline"

        onClick={() =>

            exportPDF(

                reportName,

                tableData

            )

        }

    >

        Export PDF

    </Button>

    <Button

        variant="outline"

        onClick={() =>

            printReport(

                reportName,

                tableData

            )

        }

    >

        Print

    </Button>

</div>

                <DataTable
                    data={tableData}
                    columns={reportsColumns({
                        type: selectedReport,
                    })}
                />

            </Card>

        </div>

    );

};

export default ReportsFeature;