import { useMutation, useQueryClient } from "@tanstack/react-query";

import supplierService from "./supplier.service";

const useSupplierMutation = () => {
  const queryClient = useQueryClient();

  const createSupplier = useMutation({
    mutationFn: supplierService.createSupplier,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });

  const updateSupplier = useMutation({
    mutationFn: ({ id, data }) => supplierService.updateSupplier(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });

  const deleteSupplier = useMutation({
    mutationFn: supplierService.deleteSupplier,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });

  return {
    createSupplier,

    updateSupplier,

    deleteSupplier,
  };
};

export default useSupplierMutation;
