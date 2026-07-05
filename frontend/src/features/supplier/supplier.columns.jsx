import { Pencil, Trash2 } from "lucide-react";

export const supplierColumns = (onEdit, onDelete) => [
  {
    accessorKey: "supplier_code",
    header: "Code",
    cell: ({ row }) => row.original.supplier_code || "-",
  },

  {
    accessorKey: "name",
    header: "Supplier",
  },

  {
    accessorKey: "company_name",
    header: "Company",
    cell: ({ row }) => row.original.company_name || "-",
  },

  {
    accessorKey: "contact_person",
    header: "Contact Person",
    cell: ({ row }) => row.original.contact_person || "-",
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email || "-",
  },

  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => row.original.city || "-",
  },

  {
    accessorKey: "pending_due",

    header: "Pending Due",

    cell: ({ row }) => <>₹{Number(row.original.pending_due || 0).toFixed(2)}</>,
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },

  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
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
