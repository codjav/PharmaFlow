import { useQuery } from "@tanstack/react-query";

import medicineService from "./medicine.service";

const useMedicineBatches = (medicineId) => {
  return useQuery({
    queryKey: ["medicine-batches", medicineId],

    queryFn: () => medicineService.getMedicineBatches(medicineId),

    enabled: !!medicineId,
  });
};

export default useMedicineBatches;
