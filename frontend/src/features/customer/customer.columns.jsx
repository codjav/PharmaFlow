import { Pencil, Trash2 } from "lucide-react";

export const customerColumns = (onEdit, onDelete) => [
  {
    header: "Code",
    accessorKey: "customer_code",
    cell: ({ row }) => row.original.customer_code || "-",
  },
  {
    header: "Customer Name",
    accessorKey: "name",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => row.original.email || "-",
  },
  {
    header: "City",
    accessorKey: "city",
    cell: ({ row }) => row.original.city || "-",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status === "ACTIVE"
            ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
            : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
        }
      >
        {row.original.status}
      </span>
    ),
  },
  {
    header: "Pending Due",
    accessorKey: "pending_due",
    cell: ({ row }) => `₹ ${Number(row.original.pending_due || 0).toFixed(2)}`,
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(row.original)}
          className="rounded-md bg-yellow-50 p-2 text-yellow-600 hover:bg-yellow-100"
          title="Edit Supplier"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(row.original)}
          className="rounded-md bg-red-50 p-2 text-red-600 hover:bg-red-100"
          title="Delete Supplier"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];
