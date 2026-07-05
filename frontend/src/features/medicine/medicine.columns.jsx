import { Pencil, Trash2, PackagePlus } from "lucide-react";

export const medicineColumns = (
    onEdit,
    onDelete,
    onAdjustStock
) => [

    {
        accessorKey: "name",
        header: "Medicine",
    },

    {
        accessorKey: "batch_number",
        header: "Batch",
    },

    {
        accessorKey: "category_name",
        header: "Category",
        cell: ({ row }) =>
            row.original.category_name || "-",
    },

    {
        accessorKey: "company",
        header: "Company",
    },

    {
        accessorKey: "supplier_name",
        header: "Supplier",
        cell: ({ row }) =>
            row.original.supplier_name || "-",
    },

    {
        accessorKey: "barcode",
        header: "Barcode",
    },

    {
        accessorKey: "mrp",
        header: "MRP",
        cell: ({ row }) =>
            `₹${Number(row.original.mrp).toFixed(2)}`,
    },

    {
        accessorKey: "dr_price",
        header: "Wholesale",
        cell: ({ row }) =>
            `₹${Number(row.original.dr_price).toFixed(2)}`,
    },

    {
        accessorKey: "price",
        header: "Selling",
        cell: ({ row }) =>
            `₹${Number(row.original.price).toFixed(2)}`,
    },

    {
        accessorKey: "quantity",

        header: "Stock",

        cell: ({ row }) => {

            const stock = row.original.quantity;
            const minimum = row.original.minimum_stock;

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
        accessorKey: "expiry_date",
        header: "Expiry",
    },

    {
        id: "actions",

        header: "Actions",

        cell: ({ row }) => (

            <div className="flex items-center gap-2">

                <button
                    onClick={() => onAdjustStock(row.original)}
                    className="rounded-md bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                    title="Adjust Stock"
                >
                    <PackagePlus size={16} />
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

        )

    }

];