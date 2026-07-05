import { useQuery } from "@tanstack/react-query";

import medicineService from "../services/medicine.service";

const useMedicines = (
    page,
    limit
) => {

    return useQuery({

        queryKey: [
            "medicines",
            page,
            limit,
        ],

        queryFn: () =>
            medicineService.getMedicines(
                page,
                limit
            ),

    });

};

export default useMedicines;