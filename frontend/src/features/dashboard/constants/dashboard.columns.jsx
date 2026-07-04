import Badge from "@/components/ui/Badge";

export const recentSalesColumns = [

    {
        accessorKey: "invoice_number",
        header: "Invoice",
    },

    {
        accessorKey: "customer_name",
        header: "Customer",
    },

    {
        accessorKey: "total_amount",
        header: "Amount",

        cell: ({ row }) => (

            <>₹{row.original.total_amount}</>

        ),
    },

    {
        accessorKey: "status",

        header: "Status",

        cell: ({ row }) => (

            <Badge
                variant={
                    row.original.status === "PAID"
                        ? "success"
                        : "warning"
                }
            >
                {row.original.status}
            </Badge>

        ),
    },

    {
        accessorKey: "sale_date",
        header: "Date",
    },

];

export const recentPurchaseColumns = [

    {
        accessorKey: "invoice_number",
        header: "Invoice",
    },

    {
        accessorKey: "supplier_name",
        header: "Supplier",
    },

    {
        accessorKey: "total_amount",
        header: "Amount",

        cell: ({ row }) => (

            <>₹{row.original.total_amount}</>

        ),
    },

    {
        accessorKey: "status",

        header: "Status",

        cell: ({ row }) => (

            <Badge
                variant={
                    row.original.status === "PAID"
                        ? "success"
                        : "warning"
                }
            >
                {row.original.status}
            </Badge>

        ),
    },

    {
        accessorKey: "purchase_date",
        header: "Date",
    },

];

export const topMedicineColumns = [

    {
        accessorKey: "name",
        header: "Medicine",
    },

    {
        accessorKey: "quantitySold",
        header: "Sold",
    },

];

export const topCustomerColumns = [

    {
        accessorKey: "name",
        header: "Customer",
    },

    {
        accessorKey: "ordersCount",
        header: "Orders",
    },

    {
        accessorKey: "totalSales",

        header: "Total Sales",

        cell: ({ row }) => (

            <>₹{row.original.totalSales ?? 0}</>

        ),
    },

];

export const lowStockColumns = [

    {
        accessorKey: "name",
        header: "Medicine",
    },

    {
        accessorKey: "quantity",
        header: "Stock",
    },

    {
        accessorKey: "minimum_stock",
        header: "Minimum",
    },

];

export const nearExpiryColumns = [

    {
        accessorKey: "name",
        header: "Medicine",
    },

    {
        accessorKey: "expiry_date",
        header: "Expiry",
    },

    {
        accessorKey: "quantity",
        header: "Qty",
    },

];