import { keepPreviousData, useQuery } from "@tanstack/react-query";
import medicineService from "./medicine.service";

const useMedicines = ({ page, limit, search }) => {
  return useQuery({
    queryKey: ["medicines", page, limit, search],

    queryFn: async () => {
      if (search?.trim()) {
        return {
          medicines: await medicineService.searchMedicines(search),

          pagination: null,
        };
      }

      return medicineService.getMedicines(
        page,

        limit,
      );
    },

    placeholderData: keepPreviousData,
  });
};

export default useMedicines;
