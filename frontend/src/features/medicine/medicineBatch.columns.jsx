import dayjs from "dayjs";

export const medicineBatchColumns = [
  {
    accessorKey: "batch_number",
    header: "Batch Number",
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry",
    cell: ({ row }) =>
      dayjs(row.original.expiry_date).format("DD MMM YYYY"),
  },
  {
    accessorKey: "mrp",
    header: "MRP",
    cell: ({ row }) => `₹ ${row.original.mrp}`,
  },
  {
    accessorKey: "purchase_price",
    header: "Purchase Price",
    cell: ({ row }) => `₹ ${row.original.purchase_price}`,
  },
  {
    accessorKey: "dr_price",
    header: "DR Price",
    cell: ({ row }) => `₹ ${row.original.dr_price}`,
  },
  {
    accessorKey: "selling_price",
    header: "Selling Price",
    cell: ({ row }) => `₹ ${row.original.selling_price}`,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          row.original.status === "ACTIVE"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
];