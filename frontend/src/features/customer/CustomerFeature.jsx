import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Search } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import DataTable from "@/components/tables/DataTable";

import useCustomers from "./useCustomers";
import useCustomerMutation from "./useCustomerMutation";
import { customerColumns } from "./customer.columns";

const FORM_DEFAULTS = {
  customer_code: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  status: "ACTIVE",
};

const getCustomerFormValues = (customer) => ({
  customer_code: customer.customer_code ?? "",

  name: customer.name ?? "",

  phone: customer.phone ?? "",

  email: customer.email ?? "",

  city: customer.city ?? "",

  address: customer.address ?? "",

  status: customer.status ?? "ACTIVE",
});

const getCustomerPayload = (formData) => ({
  customer_code: formData.customer_code.trim() || null,

  name: formData.name.trim(),

  phone: formData.phone.trim(),

  email: formData.email.trim(),

  city: formData.city.trim(),

  address: formData.address.trim(),

  status: formData.status,
});

const CustomerFeature = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);

  const [deleteCustomer, setDeleteCustomer] = useState(null);

  const limit = 10;

  const {
    data,

    isLoading,

    isError,
  } = useCustomers({
    page,

    limit,

    search: debouncedSearch,
  });

  const {
    createCustomer,

    updateCustomer,

    deleteCustomer: deleteMutation,
  } = useCustomerMutation();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm({
    defaultValues: FORM_DEFAULTS,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);

    return () => clearTimeout(timeout);
  }, [search]);

  const closeDialog = useCallback(() => {
    if (createCustomer.isPending || updateCustomer.isPending) return;

    setOpenDialog(false);

    setEditingCustomer(null);

    reset(FORM_DEFAULTS);
  }, [createCustomer.isPending, updateCustomer.isPending, reset]);

  const handleAdd = useCallback(() => {
    setEditingCustomer(null);

    reset(FORM_DEFAULTS);

    setOpenDialog(true);
  }, [reset]);

  const handleEdit = useCallback(
    (customer) => {
      setEditingCustomer(customer);

      reset(getCustomerFormValues(customer));

      setOpenDialog(true);
    },

    [reset],
  );

  const handleDelete = useCallback(
    (customer) => {
      setDeleteCustomer(customer);
    },

    [],
  );

  const columns = useMemo(
    () =>
      customerColumns(
        handleEdit,

        handleDelete,
      ),

    [handleEdit, handleDelete],
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);

    setPage(1);
  };

  const onSubmit = async (formData) => {
    const payload = getCustomerPayload(formData);

    try {
      if (editingCustomer) {
        await updateCustomer.mutateAsync({
          id: editingCustomer.id,

          data: payload,
        });

        toast.success("Customer updated successfully");
      } else {
        await createCustomer.mutateAsync(payload);

        toast.success("Customer created successfully");
      }

      closeDialog();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (!deleteCustomer) return;

    try {
      await deleteMutation.mutateAsync(deleteCustomer.id);

      toast.success("Customer deleted successfully");

      setDeleteCustomer(null);

      if (page > 1 && data?.customers?.length === 1) {
        setPage((current) => current - 1);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete customer",
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Customers</h1>

            <p className="text-gray-500">Manage customer information</p>
          </div>

          <Button
            onClick={handleAdd}
            disabled={createCustomer.isPending || updateCustomer.isPending}
          >
            <Plus size={18} className="mr-2" />
            Add Customer
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

            placeholder="Search customer..."

            value={search}

            onChange={handleSearch}
          />
        </div>
      </Card>

      <Card>
        {isError && (
          <p className="mb-4 text-sm text-red-600">Unable to load customers.</p>
        )}

        <DataTable
          columns={columns}

          data={data?.customers ?? []}

          loading={
            isLoading ||
            createCustomer.isPending ||
            updateCustomer.isPending ||
            deleteMutation.isPending
          }

          emptyMessage={
            debouncedSearch ? "No customers found" : "No customers available"
          }
        />
      </Card>

      {!debouncedSearch &&
        data?.pagination &&
        data.pagination.totalPages > 0 && (
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

                disabled={page >= data.pagination.totalPages || isLoading}

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
                {editingCustomer ? "Edit Customer" : "Add Customer"}
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}

              className="space-y-8 p-6"
            >
              <section>
                <h3 className="mb-4 text-lg font-semibold">
                  Customer Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Customer Code"

                    {...register("customer_code")}
                  />

                  <Input
                    label="Customer Name"

                    required

                    error={errors.name?.message}

                    {...register("name", {
                      required: "Customer name is required",

                      validate: (value) =>
                        value.trim().length > 0 ||
                        "Customer name cannot be empty",
                    })}
                  />

                  <Input
                    label="Phone"

                    required

                    error={errors.phone?.message}

                    {...register("phone", {
                      required: "Phone number is required",

                      pattern: {
                        value: /^[0-9]{10}$/,

                        message: "Enter valid phone number",
                      },
                    })}
                  />

                  <Input
                    label="Email"

                    type="email"

                    error={errors.email?.message}

                    {...register("email", {
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,

                        message: "Invalid email",
                      },
                    })}
                  />

                  <Input
                    label="City"

                    {...register("city")}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-4 text-lg font-semibold">Address</h3>

                <textarea
                  rows={4}

                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"

                  {...register("address")}
                />
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
                    createCustomer.isPending || updateCustomer.isPending
                  }

                  onClick={closeDialog}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"

                  loading={
                    editingCustomer
                      ? updateCustomer.isPending
                      : createCustomer.isPending
                  }
                >
                  {editingCustomer ? "Update Customer" : "Save Customer"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"

          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleteMutation.isPending) {
              setDeleteCustomer(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">Delete Customer</h2>

            <p className="mt-4 text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold"> {deleteCustomer.name}</span>?
            </p>

            <div className="mt-8 flex justify-end gap-4">
              <Button
                variant="outline"

                disabled={deleteMutation.isPending}

                onClick={() => setDeleteCustomer(null)}
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

export default CustomerFeature;
