import { useQuery } from "@tanstack/react-query";

import supplierService from "./supplier.service";

const useSuppliers = ({ page, limit, search }) => {
  return useQuery({
    queryKey: ["suppliers", page, limit, search],

    queryFn: async () => {
      if (search?.trim()) {
        return {
          suppliers: await supplierService.searchSuppliers(search),

          pagination: null,
        };
      }

      return supplierService.getSuppliers(
        page,

        limit,
      );
    },

    keepPreviousData: true,
  });
};

export default useSuppliers;
