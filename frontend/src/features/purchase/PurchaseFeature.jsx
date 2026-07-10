import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Plus, Search, Trash2 } from "lucide-react";

import * as purchaseService from "./purchase.service";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import DataTable from "@/components/tables/DataTable";
import SearchSelect from "@/components/ui/SearchSelect";

import usePurchases from "./usePurchases";
import usePurchaseMutation from "./usePurchaseMutation";
import { purchaseColumns } from "./purchase.columns";

import useSuppliers from "../supplier/useSuppliers";
import useMedicines from "../medicine/useMedicines";

const DEFAULT_ITEM = {
  medicine_id: "",

  medicine_name: "",

  batch_number: "",

  expiry_date: "",

  mrp: "",

  purchase_price: "",

  dr_price: "",

  selling_price: "",

  quantity: 1,
};

const FORM_DEFAULTS = {
  invoice_number: "",

  supplier_id: "",

  paid_amount: 0,

  items: [DEFAULT_ITEM],
};

const PurchaseFeature = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [viewPurchase, setViewPurchase] = useState(null);

  const [deletePurchase, setDeletePurchase] = useState(null);

  const [paymentPurchase, setPaymentPurchase] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const limit = 10;

  const {
    data,

    isLoading,

    isError,
  } = usePurchases({
    page,

    limit,

    search: debouncedSearch,
  });

  const { data: supplierData } = useSuppliers({
    page: 1,

    limit: 1000,

    search: "",
  });

  const { data: medicineData } = useMedicines({
    page: 1,

    limit: 1000,

    search: "",
  });

  const {
    createPurchase,
    deletePurchase: deleteMutation,
    updatePurchasePayment,
  } = usePurchaseMutation();

  const {
    register,

    control,

    watch,

    setValue,

    reset,

    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: FORM_DEFAULTS,
  });

  const {
    fields,

    append,

    remove,
  } = useFieldArray({
    control,

    name: "items",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const closeDialog = useCallback(() => {
    if (createPurchase.isPending) return;

    reset(FORM_DEFAULTS);

    setOpenDialog(false);
  }, [createPurchase.isPending, reset]);

  const handleAdd = () => {
    reset(FORM_DEFAULTS);

    setOpenDialog(true);
  };

  const handleView = async (purchase) => {
    try {
      const details = await purchaseService.getPurchase(purchase.id);

      setViewPurchase(details);
    } catch {
      toast.error("Unable to load purchase details");
    }
  };

  const handleDelete = (purchase) => {
    setDeletePurchase(purchase);
  };

  const handlePayment = (purchase) => {
    setPaymentPurchase(purchase);
    setPaymentAmount("");
  };

  const columns = useMemo(
    () => purchaseColumns(handleView, handleDelete, handlePayment),
    [handleView],
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);

    setPage(1);
  };

  const items = watch("items");

  const totalAmount = items.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0) * Number(item.purchase_price || 0),
    0,
  );

  const paidAmount = Number(watch("paid_amount")) || 0;

  const dueAmount = totalAmount - paidAmount;

  const onSubmit = async (formData) => {
    // Validate that at least one item has a medicine selected
    const hasValidItems = formData.items.some((item) => item.medicine_id);

    if (!hasValidItems) {
      toast.error("Please add at least one medicine to the purchase");
      return;
    }

    const payload = {
      invoice_number: formData.invoice_number.trim(),

      supplier_id: Number(formData.supplier_id),

      paid_amount: Number(formData.paid_amount) || 0,

      items: formData.items
        .filter((item) => item.medicine_id) // Only include items with medicine selected
        .map((item) => ({
          medicine_id: Number(item.medicine_id),

          medicine_name: item.medicine_name || "",

          batch_number: (item.batch_number || "").trim(),

          expiry_date: item.expiry_date || null,

          mrp: Number(item.mrp) || 0,

          purchase_price: Number(item.purchase_price) || 0,

          dr_price: Number(item.dr_price) || 0,

          selling_price: Number(item.selling_price) || 0,

          quantity: Number(item.quantity) || 0,
        })),
    };

    // Validate items have required fields
    if (payload.items.some((item) => !item.quantity || !item.purchase_price)) {
      toast.error("Please fill in quantity and purchase price for all items");
      return;
    }

    try {
      await createPurchase.mutateAsync(payload);

      toast.success("Purchase created successfully");

      closeDialog();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleMedicineChange = (index, medicineId) => {
    const medicine = medicineData?.medicines?.find(
      (m) => m.id === Number(medicineId),
    );

    if (!medicine) return;

    setValue(`items.${index}.medicine_id`, medicine.id);

    setValue(`items.${index}.medicine_name`, medicine.name);

    setValue(`items.${index}.batch_number`, "");

    setValue(`items.${index}.expiry_date`, "");

    setValue(`items.${index}.mrp`, "");

    setValue(`items.${index}.purchase_price`, "");

    setValue(`items.${index}.dr_price`, "");

    setValue(`items.${index}.selling_price`, "");
  };

  const submitPayment = async () => {
    if (!paymentPurchase) return;

    if (!paymentAmount || Number(paymentAmount) <= 0) {
      toast.error("Enter a valid payment amount.");
      return;
    }

    if (Number(paymentAmount) > Number(paymentPurchase.due_amount)) {
      toast.error("Payment cannot exceed pending due.");
      return;
    }

    try {
      await updatePurchasePayment.mutateAsync({
        id: paymentPurchase.id,
        amount: Number(paymentAmount),
      });

      toast.success("Payment updated successfully");

      setPaymentPurchase(null);
      setPaymentAmount("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update payment");
    }
  };

  const confirmDelete = async () => {
    if (!deletePurchase) return;

    try {
      await deleteMutation.mutateAsync(deletePurchase.id);

      toast.success("Purchase deleted successfully");

      setDeletePurchase(null);

      if (page > 1 && data?.purchases?.length === 1) {
        setPage((current) => current - 1);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete purchase",
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Purchases</h1>

            <p className="text-gray-500">Manage purchase invoices</p>
          </div>

          <Button onClick={handleAdd}>
            <Plus size={18} className="mr-2" />
            Add Purchase
          </Button>
        </div>
      </Card>

      <Card>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <Input
            className="pl-10"
            placeholder="Search purchase..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </Card>

      <Card>
        {isError && (
          <p className="mb-4 text-red-600">Unable to load purchases.</p>
        )}

        <DataTable
          columns={columns}

          data={debouncedSearch ? (data ?? []) : (data?.purchases ?? [])}

          loading={
            isLoading ||
            createPurchase.isPending ||
            deleteMutation.isPending ||
            updatePurchasePayment.isPending
          }

          emptyMessage="No purchases found"
        />
      </Card>

      {openDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeDialog();
            }
          }}
        >
          <div className="max-h-[95vh] w-full max-w-7xl overflow-y-auto rounded-xl bg-white">
            <div className="border-b p-6">
              <h2 className="text-2xl font-semibold">Create Purchase</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6">
              {/* Purchase Information */}

              <section>
                <h3 className="mb-5 text-lg font-semibold">
                  Purchase Information
                </h3>

                <div className="grid grid-cols-3 gap-5">
                  <Input
                    label="Invoice Number"
                    required
                    {...register("invoice_number", {
                      required: "Invoice number is required",
                    })}
                    error={errors.invoice_number?.message}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Supplier
                    </label>

                    <select
                      className="w-full rounded-xl border border-slate-300 p-3"
                      {...register("supplier_id", {
                        required: true,
                      })}
                    >
                      <option value="">Select Supplier</option>

                      {supplierData?.suppliers?.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Paid Amount"
                    type="number"
                    min={0}
                    {...register("paid_amount")}
                  />
                </div>
              </section>

              {/* Purchase Items */}

              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Purchase Items</h3>

                  <Button type="button" onClick={() => append(DEFAULT_ITEM)}>
                    <Plus size={16} className="mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-3">Medicine</th>

                        <th className="p-3">Batch</th>

                        <th className="p-3">Expiry</th>

                        <th className="p-3">MRP</th>
                        <th className="p-3">Purchase</th>
                        <th className="p-3">DR Price</th>
                        <th className="p-3">Selling</th>
                        <th className="p-3">Qty</th>
                        <th className="p-3">Subtotal</th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {fields.map((field, index) => {
                        const quantity =
                          Number(watch(`items.${index}.quantity`)) || 0;

                        const purchasePrice =
                          Number(watch(`items.${index}.purchase_price`)) || 0;

                        const subtotal = quantity * purchasePrice;

                        return (
                          <tr key={field.id} className="border-t">
                            {/* Medicine */}

                            <td className="p-2">
                              <SearchSelect
                                disabled={!watch("supplier_id")}

                                options={(medicineData?.medicines || []).filter(
                                  (medicine) =>
                                    medicine.supplier_id ===
                                    Number(watch("supplier_id")),
                                )}

                                value={watch(`items.${index}.medicine_id`)}

                                labelKey="name"

                                valueKey="id"

                                placeholder="Search medicine..."

                                onSelect={(medicine) => {
                                  handleMedicineChange(index, medicine.id);
                                }}
                              />
                            </td>

                            <td className="p-2">
                              <Input
                                {...register(`items.${index}.batch_number`)}
                              />
                            </td>

                            <td className="p-2">
                              <Input
                                type="date"
                                {...register(`items.${index}.expiry_date`)}
                              />
                            </td>

                            <td className="p-2">
                              <Input
                                type="number"
                                step="0.01"
                                {...register(`items.${index}.mrp`)}
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                type="number"
                                step="0.01"
                                {...register(`items.${index}.purchase_price`)}
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                type="number"
                                step="0.01"
                                {...register(`items.${index}.dr_price`)}
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                type="number"
                                step="0.01"
                                {...register(`items.${index}.selling_price`)}
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                type="number"
                                min={1}
                                {...register(`items.${index}.quantity`)}
                              />
                            </td>

                            <td className="p-2 font-semibold">
                              ₹{subtotal.toFixed(2)}
                            </td>

                            <td className="p-2">
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={() => remove(index)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Totals */}

              <section className="rounded-xl bg-slate-50 p-6">
                <div className="space-y-3 text-right">
                  <h2 className="text-xl font-bold">
                    Total : ₹{totalAmount.toFixed(2)}
                  </h2>

                  <h2 className="text-lg">Paid : ₹{paidAmount.toFixed(2)}</h2>

                  <h2 className="text-lg font-semibold text-red-600">
                    Due : ₹{dueAmount.toFixed(2)}
                  </h2>
                </div>
              </section>

              {/* Footer */}

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  disabled={updatePurchasePayment.isPending}
                >
                  Cancel
                </Button>

                <Button type="submit" loading={createPurchase.isPending}>
                  Save Purchase
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewPurchase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setViewPurchase(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white">
            <div className="border-b p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Purchase Details</h2>

                <p className="text-gray-500 mt-1">
                  Invoice : {viewPurchase.invoice_number}
                </p>
              </div>

              <Button variant="outline" onClick={() => setViewPurchase(null)}>
                Close
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Supplier</p>

                  <h3 className="font-semibold">
                    {viewPurchase.supplier_name}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Purchase Date</p>

                  <h3 className="font-semibold">
                    {new Date(viewPurchase.purchase_date).toLocaleDateString()}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      viewPurchase.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {viewPurchase.status}
                  </span>
                </div>
              </div>

              <table className="min-w-full border">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3">Medicine</th>

                    <th className="p-3">Batch</th>

                    <th className="p-3">Expiry</th>

                    <th className="p-3">MRP</th>
                    <th className="p-3">Purchase</th>
                    <th className="p-3">DR Price</th>
                    <th className="p-3">Selling</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {viewPurchase.items?.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">{item.medicine_name}</td>
                      <td className="p-3">{item.batch_number}</td>
                      <td className="p-3">{item.expiry_date}</td>
                      <td className="p-3">₹{item.mrp}</td>
                      <td className="p-3">₹{item.purchase_price}</td>
                      <td className="p-3">₹{item.dr_price}</td>
                      <td className="p-3">₹{item.selling_price}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3 font-semibold">₹{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="space-y-2 text-right">
                  <p>
                    Total :<strong>₹{viewPurchase.total_amount}</strong>
                  </p>

                  <p>
                    Paid :<strong>₹{viewPurchase.paid_amount}</strong>
                  </p>

                  <p className="text-red-600">
                    Due :<strong>₹{viewPurchase.due_amount}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentPurchase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget &&
              !updatePurchasePayment.isPending
            ) {
              setPaymentPurchase(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">Mark Purchase Payment</h2>

            <div className="mt-5 space-y-3">
              <p>
                Invoice:
                <strong> {paymentPurchase.invoice_number}</strong>
              </p>

              <p>
                Total:
                <strong> ₹{paymentPurchase.total_amount}</strong>
              </p>

              <p>
                Paid:
                <strong> ₹{paymentPurchase.paid_amount}</strong>
              </p>

              <p className="text-red-600">
                Due:
                <strong> ₹{paymentPurchase.due_amount}</strong>
              </p>

              <Input
                label="Amount Paid"
                type="number"
                min={1}
                max={paymentPurchase.due_amount}
                step="0.01"
                placeholder={`Maximum ₹${paymentPurchase.due_amount}`}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setPaymentPurchase(null)}
              >
                Cancel
              </Button>

              <Button
                loading={updatePurchasePayment.isPending}
                onClick={submitPayment}
              >
                Mark Paid
              </Button>
            </div>
          </div>
        </div>
      )}

      {deletePurchase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleteMutation.isPending) {
              setDeletePurchase(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">Delete Purchase</h2>

            <p className="mt-4 text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {deletePurchase.invoice_number}
              </span>
              ?
            </p>

            <div className="mt-8 flex justify-end gap-4">
              <Button
                variant="outline"
                disabled={deleteMutation.isPending}
                onClick={() => setDeletePurchase(null)}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                loading={deleteMutation.isPending}
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseFeature;
