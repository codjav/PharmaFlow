import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Plus, Search } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import DataTable from "@/components/tables/DataTable";

import { supplierColumns } from "./supplier.columns";
import useSuppliers from "./useSuppliers";
import useSupplierMutation from "./useSupplierMutation";

const FORM_DEFAULTS = {
  supplier_code: "",

  name: "",

  company_name: "",

  contact_person: "",

  phone: "",

  email: "",

  city: "",

  address: "",

  status: "ACTIVE",
};

const getSupplierFormValues = (supplier) => ({
  supplier_code: supplier.supplier_code ?? "",

  name: supplier.name ?? "",

  company_name: supplier.company_name ?? "",

  contact_person: supplier.contact_person ?? "",

  phone: supplier.phone ?? "",

  email: supplier.email ?? "",

  city: supplier.city ?? "",

  address: supplier.address ?? "",

  status: supplier.status ?? "ACTIVE",
});

const getSupplierPayload = (formData) => ({
  supplier_code: formData.supplier_code.trim(),

  name: formData.name.trim(),

  company_name: formData.company_name.trim(),

  contact_person: formData.contact_person.trim(),

  phone: formData.phone.trim(),

  email: formData.email.trim(),

  city: formData.city.trim(),

  address: formData.address.trim(),

  status: formData.status,
});

const SupplierFeature = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [editingSupplier, setEditingSupplier] = useState(null);

  const [deleteSupplier, setDeleteSupplier] = useState(null);

  const limit = 10;

  const { data, isLoading, isError } = useSuppliers({
    page,
    limit,
    search: debouncedSearch,
  });

  const {
    createSupplier,

    updateSupplier,

    deleteSupplier: deleteMutation,
  } = useSupplierMutation();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm({
    defaultValues: FORM_DEFAULTS,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const closeDialog = useCallback(() => {
    if (createSupplier.isPending || updateSupplier.isPending) return;

    reset(FORM_DEFAULTS);

    setEditingSupplier(null);

    setOpenDialog(false);
  }, [createSupplier.isPending, updateSupplier.isPending, reset]);

  const handleAdd = useCallback(() => {
    reset(FORM_DEFAULTS);

    setEditingSupplier(null);

    setOpenDialog(true);
  }, [reset]);

  const handleEdit = useCallback(
    (supplier) => {
      setEditingSupplier(supplier);

      reset(getSupplierFormValues(supplier));

      setOpenDialog(true);
    },
    [reset],
  );

  const handleDelete = useCallback((supplier) => {
    setDeleteSupplier(supplier);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);

    setPage(1);
  };

  const columns = useMemo(
    () =>
      supplierColumns(
        handleEdit,

        handleDelete,
      ),

    [handleEdit, handleDelete],
  );

  const onSubmit = async (formData) => {
    const payload = getSupplierPayload(formData);

    try {
      if (editingSupplier) {
        await updateSupplier.mutateAsync({
          id: editingSupplier.id,

          data: payload,
        });

        toast.success("Supplier updated successfully");
      } else {
        await createSupplier.mutateAsync(payload);

        toast.success("Supplier created successfully");
      }

      closeDialog();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (!deleteSupplier) return;

    try {
      await deleteMutation.mutateAsync(deleteSupplier.id);

      toast.success("Supplier deleted successfully");

      setDeleteSupplier(null);

      if (page > 1 && data?.suppliers?.length === 1) {
        setPage((current) => current - 1);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete supplier",
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Suppliers</h1>

            <p className="text-gray-500">Manage supplier information</p>
          </div>

          <Button
            onClick={handleAdd}
            disabled={createSupplier.isPending || updateSupplier.isPending}
          >
            <Plus size={18} className="mr-2" />
            Add Supplier
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
            placeholder="Search supplier..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </Card>

      <Card>
        {isError && (
          <p className="mb-4 text-sm text-red-600">Unable to load suppliers.</p>
        )}

        <DataTable
          columns={columns}

          data={data?.suppliers ?? []}

          loading={
            isLoading ||
            createSupplier.isPending ||
            updateSupplier.isPending ||
            deleteMutation.isPending
          }

          emptyMessage={
            debouncedSearch ? "No suppliers found" : "No suppliers available"
          }
        />
      </Card>

      {!debouncedSearch && data?.pagination && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            Page {data.pagination.page} of {data.pagination.totalPages}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"

              disabled={page === 1 || isLoading}

              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"

              disabled={page === data.pagination.totalPages || isLoading}

              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {openDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"

          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeDialog();
            }
          }}
        >
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-4xl overflow-y-auto rounded-xl bg-white">
            <div className="border-b p-6">
              <h2 className="text-2xl font-semibold">
                {editingSupplier ? "Edit Supplier" : "Add Supplier"}
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}

              className="space-y-8 p-6"
            >
              <section>
                <h3 className="mb-4 text-lg font-semibold">
                  General Information
                </h3>

                <div className="grid grid-cols-2 gap-5">
                  <Input
                    label="Supplier Code"

                    {...register("supplier_code")}
                  />

                  <Input
                    label="Supplier Name"

                    required

                    error={errors.name?.message}

                    {...register("name", {
                      required: "Supplier name is required",

                      validate: (value) =>
                        value.trim().length > 0 ||
                        "Supplier name cannot be empty",
                    })}
                  />

                  <Input
                    label="Company Name"

                    {...register("company_name")}
                  />

                  <Input
                    label="Contact Person"

                    {...register("contact_person")}
                  />

                  <Input
                    label="Phone"

                    required

                    error={errors.phone?.message}

                    {...register("phone", {
                      required: "Phone number is required",

                      pattern: {
                        value: /^[0-9]{10}$/,

                        message: "Enter a valid 10-digit phone number",
                      },
                    })}
                  />

                  <Input
                    label="Email"

                    type="email"

                    {...register("email")}
                  />

                  <Input
                    label="City"

                    {...register("city")}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-4 text-lg font-semibold">Address</h3>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Address
                  </label>

                  <textarea
                    rows={4}

                    className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"

                    {...register("address")}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-4 text-lg font-semibold">Status</h3>

                <select
                  className="w-full rounded-xl border border-slate-300 p-3"

                  {...register("status")}
                >
                  <option value="ACTIVE">ACTIVE</option>

                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </section>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"

                  variant="outline"

                  disabled={
                    createSupplier.isPending || updateSupplier.isPending
                  }

                  onClick={closeDialog}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"

                  loading={
                    editingSupplier
                      ? updateSupplier.isPending
                      : createSupplier.isPending
                  }
                >
                  {editingSupplier ? "Update Supplier" : "Save Supplier"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteSupplier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"

          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleteMutation.isPending) {
              setDeleteSupplier(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">Delete Supplier</h2>

            <p className="mt-4 text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold"> {deleteSupplier.name}</span>?
            </p>

            <div className="mt-8 flex justify-end gap-4">
              <Button
                variant="outline"

                disabled={deleteMutation.isPending}

                onClick={() => setDeleteSupplier(null)}
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

export default SupplierFeature;
