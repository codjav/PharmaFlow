import dayjs from "dayjs";
import { Eye, Trash2, CheckCircle } from "lucide-react";

import Button from "@/components/ui/Button";

export const purchaseColumns = (
    onView,
    onDelete,
    onMarkPaid
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
            dayjs(row.original.purchase_date).format("DD MMM YYYY"),
    },

    {
        accessorKey: "total_amount",
        header: "Total",

        cell: ({ row }) =>
            `₹ ${Number(row.original.total_amount).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }
            )}`,
    },

    {
        accessorKey: "paid_amount",
        header: "Paid",

        cell: ({ row }) =>
            `₹ ${Number(row.original.paid_amount).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }
            )}`,
    },

    {
        accessorKey: "due_amount",
        header: "Due",

        cell: ({ row }) =>
            `₹ ${Number(row.original.due_amount).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }
            )}`,
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

        cell: ({ row }) => {

            const purchase = row.original;

            return (
                <div className="flex items-center gap-2">

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onView(purchase)}
                    >
                        <Eye size={16} />
                    </Button>

                    {Number(purchase.due_amount) > 0 && (
                        <Button
                            variant="success"
                            size="sm"
                            onClick={() => onMarkPaid(purchase)}
                        >
                            <CheckCircle
                                size={16}
                                className="mr-1"
                            />
                            Mark Paid
                        </Button>
                    )}

                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDelete(purchase)}
                    >
                        <Trash2 size={16} />
                    </Button>

                </div>
            );

        },
    },
];