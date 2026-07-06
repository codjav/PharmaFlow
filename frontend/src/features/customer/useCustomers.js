import { useQuery } from "@tanstack/react-query";

import customerService from "./customer.service";

const useCustomers = ({ page, limit, search }) => {
  return useQuery({
    queryKey: ["customers", page, limit, search],

    queryFn: () => {
      if (search) {
        return customerService.searchCustomers(search);
      }

      return customerService.getCustomers(page, limit);
    },
  });
};

export default useCustomers;
