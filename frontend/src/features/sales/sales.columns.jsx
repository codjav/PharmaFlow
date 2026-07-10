import Button from "@/components/ui/Button";
import { Eye, Trash2, CheckCircle } from "lucide-react";

const salesColumns = ({ onView, onDelete, onMarkPaid }) => [
  {
    accessorKey: "invoice_number",
    header: "Invoice",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.invoice_number}</span>
    ),
  },

  {
    accessorKey: "customer_name",
    header: "Customer",
  },

  {
    accessorKey: "payment_type",
    header: "Payment",
  },

  {
    accessorKey: "total_amount",
    header: "Total",
    cell: ({ row }) => `₹${Number(row.original.total_amount).toFixed(2)}`,
  },

  {
    accessorKey: "paid_amount",
    header: "Paid",
    cell: ({ row }) => `₹${Number(row.original.paid_amount).toFixed(2)}`,
  },

  {
    accessorKey: "due_amount",
    header: "Due",
    cell: ({ row }) => {
      const due = Number(row.original.due_amount);

      return (
        <span
          className={
            due > 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"
          }
        >
          ₹{due.toFixed(2)}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === "PAID"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "sale_date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.sale_date).toLocaleDateString(),
  },

  {
    id: "actions",
    header: "Actions",

    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onView(row.original)}
        >
          <Eye className="h-4 w-4" />
        </Button>

        {Number(row.original.due_amount) > 0 && (
          <Button
            size="sm"
            variant="success"
            onClick={() => onMarkPaid(row.original)}
          >
            <CheckCircle className="mr-1 h-4 w-4" />
            Mark Paid
          </Button>
        )}

        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete(row.original)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default salesColumns;
