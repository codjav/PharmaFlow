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
            <>₹{Number(row.original.total_amount ?? 0).toLocaleString("en-IN")}</>
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

        cell: ({ row }) => {
    console.log("Purchase Row:", row.original);

    return (
        <>₹{Number(row.original.total_amount ?? 0).toLocaleString("en-IN")}</>
    );
},
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
        accessorKey: "medicine_name",
        header: "Medicine",
    },

    {
        accessorKey: "quantity_sold",
        header: "Quantity Sold",
        cell: ({ row }) => (
            <span className="font-semibold">
                {row.original.quantity_sold}
            </span>
        ),
    },

];

export const topCustomerColumns = [

    {
        accessorKey: "name",
        header: "Customer",
    },

    {
        accessorKey: "total_orders",
        header: "Orders",
    },

    {
        accessorKey: "total_sales",

        header: "Total Sales",

        cell: ({ row }) => (

            <>₹{Number(row.original.total_sales ?? 0).toLocaleString("en-IN")}</>

        ),
    },

];

export const lowStockColumns = [

    {
        accessorKey: "medicine_name",
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

export const expiringBatchColumns = [

    {
        accessorKey: "medicine_name",
        header: "Medicine",
    },

    {
        accessorKey: "batch_number",
        header: "Batch",
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