const alertsColumns = ({ type }) => {
  switch (type) {
    case "LOW_STOCK":
    case "OUT_OF_STOCK":
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
          header: "Current Stock",
        },
        {
          accessorKey: "minimum_stock",
          header: "Minimum Stock",
        },
        {
          id: "status",
          header: "Status",
          cell: ({ row }) => (
            <span
              className={`rounded px-2 py-1 text-xs font-medium ${
                Number(row.original.quantity) === 0
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {Number(row.original.quantity) === 0
                ? "Out of Stock"
                : "Low Stock"}
            </span>
          ),
        },
      ];

    case "NEAR_EXPIRY":
    case "EXPIRY_90":
    case "EXPIRED":
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
          accessorKey: "batch_number",
          header: "Batch",
        },
        {
          accessorKey: "quantity",
          header: "Qty",
        },
        {
          accessorKey: "expiry_date",
          header: "Expiry",
        },
      ];

    case "CUSTOMER_DUE":
      return [
        {
          accessorKey: "name",
          header: "Customer",
        },
        {
          accessorKey: "phone",
          header: "Phone",
        },
        {
          accessorKey: "pending_due",
          header: "Pending Due",
          cell: ({ row }) => (
            <span className="font-semibold text-red-600">
              ₹{Number(row.original.pending_due).toFixed(2)}
            </span>
          ),
        },
      ];

    case "SUPPLIER_DUE":
      return [
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
            <span className="font-semibold text-red-600">
              ₹{Number(row.original.pending_due).toFixed(2)}
            </span>
          ),
        },
      ];

    default:
      return [];
  }
};

export default alertsColumns;