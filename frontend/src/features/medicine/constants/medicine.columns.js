import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import {
    Pencil,
    Trash2,
} from "lucide-react";

export const medicineColumns = (
    onEdit,
    onDelete
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
    },

    {
        accessorKey: "company",
        header: "Company",
    },

    {
        accessorKey: "supplier_name",
        header: "Supplier",
    },

    {
        accessorKey: "barcode",
        header: "Barcode",
    },

    {
        accessorKey: "mrp",
        header: "MRP",

        cell: ({ row }) => (
            <>₹{row.original.mrp}</>
        ),
    },

    {
        accessorKey: "dr_price",
        header: "Wholesale",

        cell: ({ row }) => (
            <>₹{row.original.dr_price}</>
        ),
    },

    {
        accessorKey: "price",
        header: "Selling",

        cell: ({ row }) => (
            <>₹{row.original.price}</>
        ),
    },

    {
        accessorKey: "quantity",
        header: "Stock",

        cell: ({ row }) => (

            <Badge
                variant={
                    row.original.quantity <= row.original.minimum_stock
                        ? "danger"
                        : "success"
                }
            >
                {row.original.quantity}
            </Badge>
        ),
    },

    {
        accessorKey: "expiry_date",
        header: "Expiry",
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (

            <div className="flex gap-2">

                <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                        onEdit(row.original)
                    }
                >
                    <Pencil size={16} />
                </Button>

                <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                        onDelete(row.original)
                    }
                >
                    <Trash2 size={16} />
                </Button>

            </div>
        )
    }
];