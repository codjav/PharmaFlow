import { Pencil, Trash2, Boxes } from "lucide-react";

export const medicineColumns = (onEdit, onDelete, onViewBatches) => [
  {
    accessorKey: "name",
    header: "Medicine",
  },

  {
    accessorKey: "category_name",
    header: "Category",
    cell: ({ row }) => row.original.category_name || "-",
  },

  {
    accessorKey: "company",
    header: "Company",
  },

  {
    accessorKey: "supplier_name",
    header: "Supplier",
    cell: ({ row }) => row.original.supplier_name || "-",
  },

  {
    accessorKey: "barcode",
    header: "Barcode",
  },

  {
    accessorKey: "total_stock",

    header: "Total Stock",

    cell: ({ row }) => {
      const stock = row.original.total_stock ?? 0;
      const minimum = row.original.minimum_stock ?? 0;

      return (
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${
            stock <= minimum
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {stock}
        </span>
      );
    },
  },

  {
    accessorKey: "minimum_stock",
    header: "Minimum Stock",
  },

  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewBatches(row.original)}
          className="rounded-md bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
          title="View Batches"
        >
          <Boxes size={16} />
        </button>

        <button
          onClick={() => onEdit(row.original)}
          className="rounded-md bg-yellow-50 p-2 text-yellow-600 hover:bg-yellow-100"
          title="Edit"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(row.original)}
          className="rounded-md bg-red-50 p-2 text-red-600 hover:bg-red-100"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];
