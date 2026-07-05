import { useQuery } from "@tanstack/react-query";

import medicineService from "../services/medicine.service";

const useMedicine = (id) => {

    return useQuery({

        queryKey: [
            "medicine",
            id,
        ],

        queryFn: () =>
            medicineService.getMedicineById(id),

        enabled: !!id,

    });

};

export default useMedicine;