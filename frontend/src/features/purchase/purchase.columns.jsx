import dayjs from "dayjs";
import { Eye, Trash2 } from "lucide-react";

import Button from "@/components/ui/Button";

export const purchaseColumns = (
    onView,
    onDelete
) => [
    {
        accessorKey: "invoice_number",

        header: "Invoice",
    },

    {
        accessorKey: "supplier_name",

        header: "Supplier",
    },

    {
        accessorKey: "purchase_date",

        header: "Purchase Date",

        cell: ({ row }) =>
            dayjs(row.original.purchase_date).format(
                "DD MMM YYYY"
            ),
    },

    {
        accessorKey: "total_amount",

        header: "Total",

        cell: ({ row }) =>
            `₹ ${Number(
                row.original.total_amount
            ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
    },

    {
        accessorKey: "paid_amount",

        header: "Paid",

        cell: ({ row }) =>
            `₹ ${Number(
                row.original.paid_amount
            ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
    },

    {
        accessorKey: "due_amount",

        header: "Due",

        cell: ({ row }) =>
            `₹ ${Number(
                row.original.due_amount
            ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
    },

    {
        accessorKey: "status",

        header: "Status",

        cell: ({ row }) => {
            const status = row.original.status;

            const color =
                status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700";

            return (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
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
            <div className="flex gap-2">
                <Button
                    variant="outline"

                    size="icon"

                    onClick={() =>
                        onView(row.original)
                    }
                >
                    <Eye size={16} />
                </Button>

                <Button
                    variant="destructive"

                    size="icon"

                    onClick={() =>
                        onDelete(row.original)
                    }
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        ),
    },
];
