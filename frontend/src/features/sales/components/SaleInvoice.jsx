import { forwardRef } from "react";

const SaleInvoice = forwardRef(({ sale, items = [] }, ref) => {
    if (!sale) return null;

    return (
        <div
            ref={ref}
            className="mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white p-8 text-black"
        >
            {/* Header */}
            <div className="text-center border-b pb-4 mb-6">
                <h1 className="text-3xl font-bold">
                    PharmaFlow
                </h1>

                <p>Mirzapur, Uttar Pradesh</p>

                <p>Phone : +91-9876543210</p>

                <p>Email : info@pharmaflow.com</p>
            </div>

            {/* Invoice Info */}

            <div className="grid grid-cols-2 gap-6 mb-6 items-start">

                <div>

                    <h2 className="font-semibold mb-2">
                        Customer
                    </h2>

                    <p>{sale.customer_name}</p>

                    <p>{sale.phone}</p>

                </div>

                <div className="text-right">

                    <h2 className="font-semibold mb-2">
                        Invoice
                    </h2>

                    <p>
                        <strong>No :</strong>{" "}
                        {sale.invoice_number}
                    </p>

                    <p>
                        <strong>Date :</strong>{" "}
                        {new Date(
                            sale.sale_date
                        ).toLocaleString()}
                    </p>

                    <p>
                        <strong>Payment :</strong>{" "}
                        {sale.payment_type}
                    </p>

                    <p>
                        <strong>Status :</strong>{" "}
                        {sale.status}
                    </p>

                </div>

            </div>

            {/* Table */}

            <table className="w-full border-collapse border">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="border p-2">
                            Medicine
                        </th>

                        <th className="border p-2">
                            Batch
                        </th>

                        <th className="border p-2">
                            Expiry
                        </th>

                        <th className="border p-2">
                            Qty
                        </th>

                        <th className="border p-2">
                            Price
                        </th>

                        <th className="border p-2">
                            Total
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {items.map((item) => (

                        <tr key={item.id}>

                            <td className="border p-2">
                                {item.medicine_name}
                            </td>

                            <td className="border p-2">
                                {item.batch_number}
                            </td>

                            <td className="border p-2">
                                {item.expiry_date}
                            </td>

                            <td className="border p-2 text-center">
                                {item.quantity}
                            </td>

                            <td className="border p-2 text-right">
                                ₹{Number(item.unit_price).toFixed(2)}
                            </td>

                            <td className="border p-2 text-right">
                                ₹{Number(item.total).toFixed(2)}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {/* Totals */}

            <div className="mt-8 flex justify-end">

                <div className="w-72">

                    <div className="flex justify-between py-1">

                        <span>Subtotal</span>

                        <span>
                            ₹{Number(sale.subtotal).toFixed(2)}
                        </span>

                    </div>

                    <div className="flex justify-between py-1">

                        <span>Discount</span>

                        <span>
                            ₹{Number(sale.discount).toFixed(2)}
                        </span>

                    </div>

                    <div className="flex justify-between py-1 font-bold text-lg border-t mt-2 pt-2">

                        <span>Total</span>

                        <span>
                            ₹{Number(sale.total_amount).toFixed(2)}
                        </span>

                    </div>

                    <div className="flex justify-between py-1">

                        <span>Paid</span>

                        <span>
                            ₹{Number(sale.paid_amount).toFixed(2)}
                        </span>

                    </div>

                    <div className="flex justify-between py-1">

                        <span>Due</span>

                        <span>
                            ₹{Number(sale.due_amount).toFixed(2)}
                        </span>

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="text-center mt-16 border-t pt-4">

                <h3 className="font-semibold">
                    Thank You!
                </h3>

                <p>
                    Thank you for choosing PharmaFlow.
                </p>

            </div>

        </div>
    );
});

SaleInvoice.displayName = "SaleInvoice";

export default SaleInvoice;