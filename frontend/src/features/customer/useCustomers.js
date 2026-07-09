import { useQuery } from "@tanstack/react-query";

import customerService from "./customer.service";

const useCustomers = ({
  page = 1,
  limit = 1000,
  search = "",
} = {}) => {
  return useQuery({
    queryKey: ["customers", page, limit, search],

    queryFn: async () => {
      if (search) {
        return {
          customers: await customerService.searchCustomers(search),
          pagination: null,
        };
      }

      return customerService.getCustomers(page, limit);
    },
  });
};

export default useCustomers;
