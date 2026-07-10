import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import SearchSelect from "@/components/ui/SearchSelect";

import AppDialog from "@/components/dialogs/AppDialog";
import AppDialogFooter from "@/components/dialogs/AppDialog/AppDialogFooter";

import DataTable from "@/components/tables/DataTable";

import SaleInvoice from "./components/SaleInvoice";
import salesColumns from "./sales.columns";

import { useSales, useSaleItems } from "./useSales";
import useSalesMutation from "./useSalesMutation";

import useCustomers from "@/features/customer/useCustomers";
import useMedicines from "@/features/medicine/useMedicines";
import useMedicineBatches from "../medicine/useMedicineBatches";

const SalesFeature = () => {
  const invoiceRef = useRef(null);

  const { register, watch, reset, setValue, handleSubmit } = useForm({
    defaultValues: {
      customer_id: "",
      payment_type: "CASH",
      sale_type: "RETAIL",
      discount: 0,
      paid_amount: 0,
    },
  });

  /* -----------------------------
       Form Values
    ------------------------------ */

  const paymentType = watch("payment_type");

  const saleType = watch("sale_type");

  const discount = Number(watch("discount")) || 0;

  const paidAmount = Number(watch("paid_amount")) || 0;

  /* -----------------------------
       Local State
    ------------------------------ */

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [selectedBatch, setSelectedBatch] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [saleItems, setSaleItems] = useState([]);

  const [viewSale, setViewSale] = useState(null);

  const [deleteSale, setDeleteSale] = useState(null);

  const [markPaidSale, setMarkPaidSale] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  /* -----------------------------
       Queries
    ------------------------------ */

  const { data: salesData, isLoading } = useSales({
    page,
    limit,
  });

  const { data: customersData, isLoading: customersLoading } = useCustomers({
    page: 1,
    limit: 1000,
  });

  const { data: medicinesData, isLoading: medicinesLoading } = useMedicines({
    page: 1,
    limit: 1000,
  });

  const { data: batchesData, isLoading: batchesLoading } = useMedicineBatches(
    selectedMedicine?.id,
  );

  const { data: saleItemsData } = useSaleItems(viewSale?.id);

  /* -----------------------------
       Mutations
    ------------------------------ */

  const {
    createSale,
    deleteSale: deleteMutation,
    updateSalePayment,
} = useSalesMutation();

  /* -----------------------------
       Data
    ------------------------------ */

  const sales = salesData?.sales || [];

  const pagination = salesData?.pagination;

  const customers = customersData?.customers || [];

  const medicines = medicinesData?.medicines || [];

  const batches = (batchesData || []).filter((batch) => batch.quantity > 0);

  const paymentOptions = [
    {
      label: "Cash",
      value: "CASH",
    },

    {
      label: "UPI",
      value: "UPI",
    },

    {
      label: "Card",
      value: "CARD",
    },
  ];

  const saleTypeOptions = [
    {
      label: "Retail",
      value: "RETAIL",
    },

    {
      label: "Wholesale",
      value: "WHOLESALE",
    },
  ];

  /* -----------------------------
   Helper Values
------------------------------ */

  const availableQuantity = selectedBatch?.quantity || 0;

  const unitPrice =
    saleType === "WHOLESALE"
      ? Number(selectedBatch?.dr_price || 0)
      : Number(selectedBatch?.selling_price || 0);

  const subtotal = useMemo(() => {
    return saleItems.reduce((sum, item) => sum + item.total, 0);
  }, [saleItems]);

  const totalAmount = Math.max(0, subtotal - discount);

  const dueAmount = Math.max(0, totalAmount - paidAmount);

  const canAddItem =
    !!selectedCustomer &&
    !!selectedMedicine &&
    !!selectedBatch &&
    availableQuantity > 0 &&
    quantity >= 1 &&
    quantity <= availableQuantity;

  const addItem = () => {
    if (!selectedCustomer) {
      toast.error("Select customer");
      return;
    }

    if (!selectedMedicine) {
      toast.error("Select medicine");
      return;
    }

    if (!selectedBatch) {
      toast.error("Select batch");
      return;
    }

    if (quantity <= 0) {
      toast.error("Enter quantity");
      return;
    }

    if (quantity > availableQuantity) {
      toast.error("Insufficient stock");
      return;
    }

    const exists = saleItems.find((item) => item.batch_id === selectedBatch.id);

    if (exists) {
      toast.error("Batch already added");
      return;
    }

    const item = {
      medicine_id: selectedMedicine.id,

      medicine_name: selectedMedicine.name,

      batch_id: selectedBatch.id,

      batch_number: selectedBatch.batch_number,

      expiry_date: selectedBatch.expiry_date,

      quantity,

      unit_price: unitPrice,

      total: quantity * unitPrice,
    };

    setSaleItems((prev) => [...prev, item]);

    setSelectedMedicine(null);

    setSelectedBatch(null);

    setQuantity(1);
  };
  const removeItem = (batchId) => {
    setSaleItems((prev) => prev.filter((item) => item.batch_id !== batchId));
  };

  const onSubmit = async (values) => {
    if (createSale.isPending) {
      return;
    }
    if (saleItems.length === 0) {
      toast.error("Add at least one medicine.");
      return;
    }

    try {
      await createSale.mutateAsync({
        customer_id: values.customer_id,

        payment_type: values.payment_type,

        sale_type: values.sale_type,

        discount,

        paid_amount: paidAmount,

        items: saleItems.map((item) => ({
          medicine_id: item.medicine_id,

          batch_id: item.batch_id,

          quantity: item.quantity,
        })),
      });

      toast.success("Sale created");

      setPage(1);

      reset({
        customer_id: "",
        payment_type: "CASH",
        sale_type: "RETAIL",
        discount: 0,
        paid_amount: 0,
      });

      setSelectedCustomer(null);
      setSelectedMedicine(null);
      setSelectedBatch(null);
      setSaleItems([]);
      setQuantity(1);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create sale.");
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: viewSale?.invoice_number ?? "Invoice",
  });

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const width = 210;

    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(image, "PNG", 0, 0, width, height);

    pdf.save(`${viewSale.invoice_number}.pdf`);
  };

  const submitPayment = async () => {

  if (!markPaidSale) return;

  if (!paymentAmount || Number(paymentAmount) <= 0) {
    toast.error("Enter a valid payment amount.");
    return;
  }

  if (Number(paymentAmount) > Number(markPaidSale.due_amount)) {
    toast.error("Payment cannot exceed pending due.");
    return;
  }

  try {

    await updateSalePayment.mutateAsync({
    id: markPaidSale.id,
    amount: Number(paymentAmount),
});

    toast.success("Payment updated successfully.");

    setMarkPaidSale(null);
    setPaymentAmount("");

  } catch (error) {

    toast.error(
      error?.response?.data?.message ||
      "Unable to update payment."
    );

  }

};

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Card title="Invoice Details" subtitle="Customer and payment information">
            <SearchSelect
            options={customers}
            value={selectedCustomer?.id}
            labelKey="name"
            valueKey="id"
            disabled={customersLoading || saleItems.length > 0}
            placeholder="Search Customer..."
            onSelect={(customer) => {
              setSelectedCustomer(customer);

              setValue("customer_id", customer.id);

              // Reset current sale
              setSelectedMedicine(null);

              setSelectedBatch(null);

              setQuantity(1);

              setSaleItems([]);
            }}
          />
            <Select
            label="Payment Type"
            value={paymentType}
            disabled={saleItems.length > 0}
            onValueChange={(value) => setValue("payment_type", value)}
            options={paymentOptions}
          />

          <Select
            label="Sale Type"
            value={saleType}
            disabled={saleItems.length > 0}
            onValueChange={(value) => setValue("sale_type", value)}
            options={saleTypeOptions}
          />
        </Card>
        <Card
            title="Add Medicine"
            subtitle="Add medicines to this invoice"
        >
        <div className="grid grid-cols-2 gap-5">

          <SearchSelect
            options={medicines}
            value={selectedMedicine?.id}
            labelKey="name"
            disabled={medicinesLoading}
            valueKey="id"
            placeholder="Search Medicine..."
            onSelect={(medicine) => {
              setSelectedMedicine(medicine);

              setSelectedBatch(null);

              setQuantity(1);
            }}
          />

        <SearchSelect
          options={batches}
          value={selectedBatch?.id}
          labelKey="batch_number"
          valueKey="id"
          placeholder="Search Batch..."
          disabled={!selectedMedicine || batchesLoading}
          renderSelected={(batch) =>
            `${batch.batch_number} (Qty: ${batch.quantity})`
          }
          renderOption={(batch) => (
            <div>
              <div className="flex justify-between">
                <span className="font-semibold">{batch.batch_number}</span>
                <span className="text-green-600">Qty {batch.quantity}</span>
              </div>
              <div className="text-xs text-slate-500">
                Exp: {batch.expiry_date}
              </div>
              <div className="text-xs">Selling: ₹{batch.selling_price}</div>
            </div>
          )}
          onSelect={setSelectedBatch}
        />

        <Input
          label="Available Stock"
          value={selectedBatch?.quantity ?? ""}
          disabled
        />

        <Input
          label="Expiry Date"
          value={selectedBatch?.expiry_date ?? ""}
          disabled
        />

        <Input
          label={saleType === "WHOLESALE" ? "Wholesale Price" : "Selling Price"}
          value={unitPrice}
          disabled
        />

        <Input
  label="Quantity"
  type="number"
  min={1}
  max={Math.max(1, availableQuantity)}
  value={quantity === "" ? "" : quantity}
  disabled={!selectedBatch}
  onChange={(e) => {
    const input = e.target.value;

    // Allow the user to clear the field while typing
    if (input === "") {
      setQuantity("");
      return;
    }

    const value = Number(input);

    if (Number.isNaN(value)) return;

    const max = Math.max(1, availableQuantity);

    setQuantity(Math.max(1, Math.min(value, max)));
  }}
/>
</div>
        <div className="flex items-end mt-5">
          <Button
            fullWidth
            leftIcon={<Plus size={18} />}
            onClick={addItem}
            disabled={!canAddItem}
          >
            Add Medicine
          </Button>
        </div>

      </Card>

      <Card
        title="Sale Items"
        subtitle={`${saleItems.length} medicine(s) added`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 rounded-xl">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Medicine</th>

                <th className="p-3 text-left">Batch</th>

                <th className="p-3 text-center">Expiry</th>

                <th className="p-3 text-center">Price</th>

                <th className="p-3 text-center">Qty</th>

                <th className="p-3 text-center">Total</th>

                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {saleItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No medicines added.
                  </td>
                </tr>
              ) : (
                saleItems.map((item) => (
                  <tr key={item.batch_id} className="border-t">
                    <td className="p-3">{item.medicine_name}</td>

                    <td className="p-3">{item.batch_number}</td>

                    <td className="p-3 text-center">{item.expiry_date}</td>

                    <td className="p-3 text-center">
                      ₹{item.unit_price.toFixed(2)}
                    </td>

                    <td className="p-3 text-center">{item.quantity}</td>

                    <td className="p-3 text-center font-semibold">
                      ₹{item.total.toFixed(2)}
                    </td>

                    <td className="p-3 text-center">
                      <Button
                        variant="destructive"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => removeItem(item.batch_id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <Card
        title="Payment Summary"
        footer={
          <Button
            type="submit"
            fullWidth
            loading={createSale.isPending}
            disabled={saleItems.length === 0}
          >
            Create Sale
          </Button>
        }
      >
        <div className="grid grid-cols-4 gap-5">
          <Input label="Subtotal" value={subtotal.toFixed(2)} disabled />

          <Input label="Discount" type="number" {...register("discount")} />

          <Input
            label="Paid Amount"
            type="number"
            {...register("paid_amount")}
          />

          <Input label="Due Amount" value={dueAmount.toFixed(2)} disabled />
        </div>
      </Card>
      <Card title="Sales History" subtitle="Manage all sales">
        <DataTable
          data={sales}
          columns={salesColumns({
            onView: setViewSale,
            onDelete: setDeleteSale,
            onMarkPaid: (sale) => {
              setMarkPaidSale(sale);
              setPaymentAmount("");
            },
          })}
          loading={isLoading}
        />
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="text-sm text-slate-600">
            Showing page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{pagination?.totalPages || 1}</span>{" "}
            ({pagination?.totalRecords || 0} records)
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              disabled={page >= (pagination?.totalPages || 1)}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
      {/* ----------------------------- Invoice ------------------------------ */}
      <AppDialog
        open={!!viewSale}
        onOpenChange={() => setViewSale(null)}
        title="Invoice"
        size="xl"
        footer={
          <AppDialogFooter>
            <Button onClick={handlePrint}>Print</Button>

            <Button variant="secondary" onClick={handleDownloadPDF}>
              Download PDF
            </Button>

            <Button variant="outline" onClick={() => setViewSale(null)}>
              Close
            </Button>
          </AppDialogFooter>
        }
      >
        <div className="max-h-[75vh] overflow-auto">
          <SaleInvoice
            ref={invoiceRef}
            sale={viewSale}
            items={saleItemsData || []}
          />
        </div>
      </AppDialog>
      <AppDialog
        open={!!deleteSale}
        onOpenChange={() => setDeleteSale(null)}
        title="Delete Sale"
        footer={
          <AppDialogFooter>
            <Button variant="outline" onClick={() => setDeleteSale(null)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              loading={deleteMutation.isPending}
              onClick={async () => {
                await deleteMutation.mutateAsync(deleteSale.id);

                toast.success("Sale deleted.");

                setDeleteSale(null);

                setPage(1);
              }}
            >
              Delete
            </Button>
          </AppDialogFooter>
        }
      >
        <p>
          Are you sure you want to delete
          <strong> {deleteSale?.invoice_number}</strong>?
        </p>
      </AppDialog>
      <AppDialog
  open={!!markPaidSale}
  onOpenChange={() => {
    setMarkPaidSale(null);
    setPaymentAmount("");
  }}
  title="Mark Payment"
  footer={
    <AppDialogFooter>
      <Button
        variant="outline"
        disabled={updateSalePayment.isPending}
        onClick={() => {
          setMarkPaidSale(null);
          setPaymentAmount("");
        }}
      >
        Cancel
      </Button>

      <Button
        loading={updateSalePayment.isPending}
        disabled={
          !paymentAmount ||
          Number(paymentAmount) <= 0 ||
          Number(paymentAmount) > Number(markPaidSale?.due_amount)
        }
        onClick={submitPayment}
      >
        Mark Paid
      </Button>
    </AppDialogFooter>
  }
>
  <div className="space-y-4">

    <div>
      Invoice:
      <strong> {markPaidSale?.invoice_number}</strong>
    </div>

    <div>
      Total:
      <strong> ₹{markPaidSale?.total_amount}</strong>
    </div>

    <div>
      Paid:
      <strong> ₹{markPaidSale?.paid_amount}</strong>
    </div>

    <div className="text-red-600">
      Due:
      <strong> ₹{markPaidSale?.due_amount}</strong>
    </div>

    <Input
      label="Amount Paid"
      type="number"
      min={1}
      max={markPaidSale?.due_amount}
      step="0.01"
      value={paymentAmount}
      onChange={(e) => setPaymentAmount(e.target.value)}
    />

    {paymentAmount && (
      <p className="text-sm text-slate-600">
        Remaining Due:{" "}
        <strong>
          ₹
          {(
            Number(markPaidSale?.due_amount) -
            Number(paymentAmount || 0)
          ).toFixed(2)}
        </strong>
      </p>
    )}

  </div>
</AppDialog>
    </form>
  );
};

export default SalesFeature;
