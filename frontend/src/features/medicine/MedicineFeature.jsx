import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Search } from "lucide-react";

import api from "@/api/axios";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import DataTable from "@/components/tables/DataTable";

import { medicineColumns } from "./medicine.columns";
import useMedicineMutation from "./useMedicineMutation";
import useMedicines from "./useMedicines";
import categoryService from "../category/category.service";

const FORM_DEFAULTS = {
  name: "",
  batch_number: "",
  category_id: "",
  supplier_id: "",
  company: "",
  barcode: "",
  mrp: "",
  dr_price: "",
  price: "",
  quantity: "",
  minimum_stock: 5,
  expiry_date: "",
};

const getMedicineFormValues = (medicine) => ({
  name: medicine.name ?? "",
  batch_number: medicine.batch_number ?? "",
  category_id: medicine.category_id ?? "",
  supplier_id: medicine.supplier_id ?? "",
  company: medicine.company ?? "",
  barcode: medicine.barcode ?? "",
  mrp: medicine.mrp ?? "",
  dr_price: medicine.dr_price ?? "",
  price: medicine.price ?? "",
  quantity: medicine.quantity ?? "",
  minimum_stock: medicine.minimum_stock ?? 5,
  expiry_date: medicine.expiry_date?.slice(0, 10) ?? "",
});

const getMedicinePayload = (formData) => ({
  name: formData.name.trim(),
  batch_number: formData.batch_number.trim(),
  category_id: formData.category_id ? Number(formData.category_id) : null,
  supplier_id: formData.supplier_id ? Number(formData.supplier_id) : null,
  company: formData.company.trim(),
  barcode: formData.barcode.trim() || null,
  mrp: Number(formData.mrp),
  dr_price: Number(formData.dr_price),
  price: Number(formData.price),
  quantity: Number(formData.quantity),
  minimum_stock: Number(formData.minimum_stock),
  expiry_date: formData.expiry_date,
});

const MedicineFeature = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [deleteMedicine, setDeleteMedicine] = useState(null);
  const [stockMedicine, setStockMedicine] = useState(null);
  const [stockQuantity, setStockQuantity] = useState("");

  const limit = 10;

  const { data, isLoading, isError } = useMedicines({
    page,
    limit,
    search: debouncedSearch,
  });

  const {
    createMedicine,
    updateMedicine,
    deleteMedicine: deleteMutation,
    adjustStock,
  } = useMedicineMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: FORM_DEFAULTS,
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const loadCategories = async () => {
    try {
      const categories = await categoryService.getCategories();

      setCategories(categories);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to load categories",
      );
    }
  };

  useEffect(() => {
    let active = true;

    const loadDropdowns = async () => {
      try {
        await loadCategories();

        const supplierRes = await api.get("/suppliers", {
          params: {
            all: true,
          },
        });

        if (active) {
          setSuppliers(supplierRes.data.data ?? []);
        }
      } catch (error) {
        if (active) {
          toast.error(
            error?.response?.data?.message ||
              "Could not load categories and suppliers",
          );
        }
      }
    };

    loadDropdowns();

    return () => {
      active = false;
    };
  }, []);

  const closeFormDialog = useCallback(() => {
    if (createMedicine.isPending || updateMedicine.isPending) return;

    setOpenDialog(false);
    setEditingMedicine(null);
    reset(FORM_DEFAULTS);
  }, [createMedicine.isPending, reset, updateMedicine.isPending]);

  const handleAdd = useCallback(() => {
    setEditingMedicine(null);
    reset(FORM_DEFAULTS);
    setOpenDialog(true);
  }, [reset]);

  const handleEdit = useCallback(
    (medicine) => {
      setEditingMedicine(medicine);
      reset(getMedicineFormValues(medicine));
      setOpenDialog(true);
    },
    [reset],
  );

  const handleDelete = useCallback((medicine) => {
    setDeleteMedicine(medicine);
  }, []);

  const handleAdjustStock = useCallback((medicine) => {
    setStockMedicine(medicine);
    setStockQuantity("");
  }, []);

  const columns = useMemo(
    () => medicineColumns(handleEdit, handleDelete, handleAdjustStock),
    [handleAdjustStock, handleDelete, handleEdit],
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const createCategory = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");

      return;
    }

    try {
      setCreatingCategory(true);

      const category = await categoryService.createCategory(
        categoryName.trim(),
      );

      await loadCategories();

      setValue("category_id", String(category.id));

      setCategoryName("");

      setOpenCategoryDialog(false);

      toast.success("Category created successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to create category",
      );
    } finally {
      setCreatingCategory(false);
    }
  };

  const onSubmit = async (formData) => {
    const payload = getMedicinePayload(formData);

    try {
      if (editingMedicine) {
        await updateMedicine.mutateAsync({
          id: editingMedicine.id,
          data: payload,
        });
        toast.success("Medicine updated successfully");
      } else {
        await createMedicine.mutateAsync(payload);
        toast.success("Medicine created successfully");
      }

      setOpenDialog(false);
      setEditingMedicine(null);
      reset(FORM_DEFAULTS);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (!deleteMedicine) return;

    try {
      await deleteMutation.mutateAsync(deleteMedicine.id);
      toast.success("Medicine deleted successfully");
      setDeleteMedicine(null);

      if (page > 1 && data?.medicines?.length === 1) {
        setPage((current) => current - 1);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not delete medicine",
      );
    }
  };

  const confirmStockAdjustment = async () => {
    if (!stockMedicine) return;

    const quantity = Number(stockQuantity);

    if (!Number.isInteger(quantity) || quantity === 0) {
      toast.error("Enter a non-zero whole number");
      return;
    }

    if (Number(stockMedicine.quantity) + quantity < 0) {
      toast.error("This adjustment would make the stock negative");
      return;
    }

    try {
      await adjustStock.mutateAsync({
        id: stockMedicine.id,
        quantity,
      });
      toast.success("Stock updated successfully");
      setStockMedicine(null);
      setStockQuantity("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update stock");
    }
  };

  const formIsPending = editingMedicine
    ? updateMedicine.isPending
    : createMedicine.isPending;

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Medicines</h1>
            <p className="text-gray-500">Manage medicines inventory</p>
          </div>

          <Button onClick={handleAdd}>
            <Plus size={18} className="mr-2" />
            Add Medicine
          </Button>
        </div>
      </Card>

      <Card>
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-3 text-gray-400"
          />
          <Input
            className="pl-10"
            placeholder="Search medicine..."
            aria-label="Search medicines"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </Card>

      <Card>
        {isError && (
          <p className="mb-4 text-sm text-red-600">
            Medicines could not be loaded. Please try again.
          </p>
        )}
        <DataTable
          columns={columns}
          data={data?.medicines ?? []}
          loading={isLoading}
          emptyMessage={
            debouncedSearch
              ? "No medicines match your search"
              : "No medicines found"
          }
        />
      </Card>

      {!search.trim() && data?.pagination && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            Page {data.pagination.page} of {data.pagination.totalPages}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page >= data.pagination.totalPages || isLoading}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {openDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="medicine-dialog-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeFormDialog();
          }}
        >
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto rounded-xl bg-white">
            <div className="border-b p-5 sm:p-6">
              <h2
                id="medicine-dialog-title"
                className="text-xl font-semibold sm:text-2xl"
              >
                {editingMedicine ? "Edit Medicine" : "Add Medicine"}
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 p-5 sm:p-6"
            >
              <section>
                <h3 className="mb-4 text-lg font-semibold">
                  General Information
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label="Medicine Name"
                    required
                    error={errors.name?.message}
                    {...register("name", {
                      required: "Medicine name is required",
                      validate: (value) =>
                        value.trim().length > 0 ||
                        "Medicine name cannot be blank",
                    })}
                  />

                  <Input
                    label="Batch Number"
                    required
                    error={errors.batch_number?.message}
                    {...register("batch_number", {
                      required: "Batch number is required",
                      validate: (value) =>
                        value.trim().length > 0 ||
                        "Batch number cannot be blank",
                    })}
                  />

                  <Input
                    label="Company"
                    required
                    error={errors.company?.message}
                    {...register("company", {
                      required: "Company is required",
                      validate: (value) =>
                        value.trim().length > 0 || "Company cannot be blank",
                    })}
                  />

                  <Input label="Barcode" {...register("barcode")} />

                  <div className="space-y-2">
                    <label
                      htmlFor="medicine-category"
                      className="text-sm font-medium text-slate-700"
                    >
                      Category
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="medicine-category"
                        className="flex-1 h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        {...register("category_id")}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0 h-10 rounded-xl border border-slate-300 bg-white px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-blue-600 hover:text-blue-700 hover:cursor-pointer"
                        onClick={() => setOpenCategoryDialog(true)}
                      >
                        Add Category
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="medicine-supplier"
                      className="text-sm font-medium text-slate-700"
                    >
                      Supplier
                    </label>
                    <select
                      id="medicine-supplier"
                      className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      {...register("supplier_id")}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-4 text-lg font-semibold">Pricing</h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <Input
                    label="MRP"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    error={errors.mrp?.message}
                    {...register("mrp", {
                      required: "MRP is required",
                      min: {
                        value: 0.01,
                        message: "MRP must be greater than zero",
                      },
                    })}
                  />

                  <Input
                    label="Wholesale Price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    error={errors.dr_price?.message}
                    {...register("dr_price", {
                      required: "Wholesale price is required",
                      min: {
                        value: 0.01,
                        message: "Wholesale price must be greater than zero",
                      },
                    })}
                  />

                  <Input
                    label="Selling Price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    error={errors.price?.message}
                    {...register("price", {
                      required: "Selling price is required",
                      min: {
                        value: 0.01,
                        message: "Selling price must be greater than zero",
                      },
                    })}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-4 text-lg font-semibold">Inventory</h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <Input
                    label="Stock"
                    type="number"
                    step="1"
                    min="0"
                    required
                    error={errors.quantity?.message}
                    {...register("quantity", {
                      required: "Stock is required",
                      min: {
                        value: 0,
                        message: "Stock cannot be negative",
                      },
                      validate: (value) =>
                        Number.isInteger(Number(value)) ||
                        "Stock must be a whole number",
                    })}
                  />

                  <Input
                    label="Minimum Stock"
                    type="number"
                    step="1"
                    min="0"
                    required
                    error={errors.minimum_stock?.message}
                    {...register("minimum_stock", {
                      required: "Minimum stock is required",
                      min: {
                        value: 0,
                        message: "Minimum stock cannot be negative",
                      },
                      validate: (value) =>
                        Number.isInteger(Number(value)) ||
                        "Minimum stock must be a whole number",
                    })}
                  />

                  <Input
                    label="Expiry Date"
                    type="date"
                    required
                    error={errors.expiry_date?.message}
                    {...register("expiry_date", {
                      required: "Expiry date is required",
                    })}
                  />
                </div>
              </section>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="hover:cursor-pointer"
                  disabled={formIsPending}
                  onClick={closeFormDialog}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={formIsPending}
                  className="hover:cursor-pointer"
                >
                  {editingMedicine ? "Update Medicine" : "Save Medicine"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openCategoryDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"

          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !creatingCategory) {
              setOpenCategoryDialog(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">Add Category</h2>

            <div className="mt-6">
              <Input
                label="Category Name"

                placeholder="Enter category"

                value={categoryName}

                onChange={(e) => setCategoryName(e.target.value)}

                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    createCategory();
                  }
                }}
              />
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <Button
                variant="outline"

                disabled={creatingCategory}

                onClick={() => {
                  setOpenCategoryDialog(false);

                  setCategoryName("");
                }}
              >
                Cancel
              </Button>

              <Button
                loading={creatingCategory}

                onClick={createCategory}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {deleteMedicine && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-medicine-title"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !deleteMutation.isPending
            ) {
              setDeleteMedicine(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 id="delete-medicine-title" className="text-xl font-semibold">
              Delete Medicine
            </h2>
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold"> {deleteMedicine.name}</span>?
            </p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                disabled={deleteMutation.isPending}
                onClick={() => setDeleteMedicine(null)}
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

      {stockMedicine && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stock-dialog-title"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !adjustStock.isPending
            ) {
              setStockMedicine(null);
              setStockQuantity("");
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 id="stock-dialog-title" className="text-xl font-semibold">
              Adjust Stock
            </h2>
            <p className="mb-1 mt-2 text-gray-600">{stockMedicine.name}</p>
            <p className="mb-6 text-sm text-gray-500">
              Current stock: {stockMedicine.quantity}. Use a positive number to
              add stock or a negative number to remove it.
            </p>

            <Input
              label="Adjustment quantity"
              type="number"
              step="1"
              placeholder="For example, 10 or -5"
              value={stockQuantity}
              onChange={(event) => setStockQuantity(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !adjustStock.isPending) {
                  confirmStockAdjustment();
                }
              }}
            />

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                disabled={adjustStock.isPending}
                onClick={() => {
                  setStockMedicine(null);
                  setStockQuantity("");
                }}
              >
                Cancel
              </Button>
              <Button
                loading={adjustStock.isPending}
                disabled={!stockQuantity}
                onClick={confirmStockAdjustment}
              >
                Update Stock
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineFeature;
