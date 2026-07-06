import { useMutation, useQueryClient } from "@tanstack/react-query";

import customerService from "./customer.service";

const useCustomerMutation = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ["customers"],
    });
  };

  const createCustomer = useMutation({
    mutationFn: customerService.createCustomer,
    onSuccess: invalidate,
  });

  const updateCustomer = useMutation({
    mutationFn: ({ id, data }) => customerService.updateCustomer(id, data),
    onSuccess: invalidate,
  });

  const deleteCustomer = useMutation({
    mutationFn: customerService.deleteCustomer,
    onSuccess: invalidate,
  });

  return {
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomerMutation;
