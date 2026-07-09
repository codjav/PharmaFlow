const reportsColumns = ({ type }) => {

    switch (type) {

        // SALES REPORT
        case "SALES":
            return [
                {
                    accessorKey: "invoice_number",
                    header: "Invoice",
                },
                {
                    accessorKey: "sale_date",
                    header: "Date",
                },
                {
                    accessorKey: "total_amount",
                    header: "Total",
                    cell: ({ row }) => (
                        <span>
                            ₹{Number(row.original.total_amount).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "paid_amount",
                    header: "Paid",
                    cell: ({ row }) => (
                        <span className="text-green-600">
                            ₹{Number(row.original.paid_amount).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "due_amount",
                    header: "Due",
                    cell: ({ row }) => (
                        <span className="text-red-600">
                            ₹{Number(row.original.due_amount).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "status",
                    header: "Status",
                },
            ];

        // PURCHASE REPORT
        case "PURCHASE":
            return [
                {
                    accessorKey: "invoice_number",
                    header: "Invoice",
                },
                {
                    accessorKey: "purchase_date",
                    header: "Date",
                },
                {
                    accessorKey: "total_amount",
                    header: "Total",
                    cell: ({ row }) => (
                        <span>
                            ₹{Number(row.original.total_amount).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "paid_amount",
                    header: "Paid",
                    cell: ({ row }) => (
                        <span className="text-green-600">
                            ₹{Number(row.original.paid_amount).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "due_amount",
                    header: "Due",
                    cell: ({ row }) => (
                        <span className="text-red-600">
                            ₹{Number(row.original.due_amount).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "status",
                    header: "Status",
                },
            ];

        // CUSTOMER REPORT
        case "CUSTOMER":
            return [
                {
                    accessorKey: "customer_code",
                    header: "Code",
                },
                {
                    accessorKey: "name",
                    header: "Customer",
                },
                {
                    accessorKey: "phone",
                    header: "Phone",
                },
                {
                    accessorKey: "total_purchase",
                    header: "Purchase",
                    cell: ({ row }) => (
                        <span>
                            ₹{Number(row.original.total_purchase).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "pending_due",
                    header: "Due",
                    cell: ({ row }) => (
                        <span className="text-red-600">
                            ₹{Number(row.original.pending_due).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "status",
                    header: "Status",
                },
            ];

        // SUPPLIER REPORT
        case "SUPPLIER":
            return [
                {
                    accessorKey: "supplier_code",
                    header: "Code",
                },
                {
                    accessorKey: "name",
                    header: "Supplier",
                },
                {
                    accessorKey: "phone",
                    header: "Phone",
                },
                {
                    accessorKey: "pending_due",
                    header: "Pending Due",
                    cell: ({ row }) => (
                        <span className="text-red-600">
                            ₹{Number(row.original.pending_due).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "status",
                    header: "Status",
                },
            ];

        // MEDICINE REPORT
        case "MEDICINE":
            return [
                {
                    accessorKey: "name",
                    header: "Medicine",
                },
                {
                    accessorKey: "company",
                    header: "Company",
                },
                {
                    accessorKey: "quantity",
                    header: "Stock",
                },
                {
                    accessorKey: "minimum_stock",
                    header: "Min Stock",
                },
                {
                    accessorKey: "price",
                    header: "Selling Price",
                    cell: ({ row }) => (
                        <span>
                            ₹{Number(row.original.price).toFixed(2)}
                        </span>
                    ),
                },
                {
                    accessorKey: "expiry_date",
                    header: "Expiry",
                },
            ];

        // PROFIT REPORT
        case "PROFIT":
            return [
                {
                    accessorKey: "name",
                    header: "Medicine",
                },
                {
                    accessorKey: "quantitySold",
                    header: "Qty Sold",
                },
                {
                    accessorKey: "profit",
                    header: "Profit",
                    cell: ({ row }) => (
                        <span className="font-semibold text-green-600">
                            ₹{Number(row.original.profit).toFixed(2)}
                        </span>
                    ),
                },
            ];

        default:
            return [];
    }

};

export default reportsColumns;