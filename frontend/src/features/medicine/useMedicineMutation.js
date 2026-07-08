import { useMutation, useQueryClient } from "@tanstack/react-query";

import medicineService from "./medicine.service";

const useMedicineMutation = () => {

    const queryClient = useQueryClient();

    const createMedicine = useMutation({

        mutationFn: medicineService.createMedicine,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["medicines"],
            });

        },

    });

    const updateMedicine = useMutation({

        mutationFn: ({ id, data }) =>
            medicineService.updateMedicine(
                id,
                data
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["medicines"],
            });

        },

    });

    const deleteMedicine = useMutation({

        mutationFn: medicineService.deleteMedicine,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["medicines"],
            });

        },

    });

    return {

        createMedicine,

        updateMedicine,

        deleteMedicine,

    };

};

export default useMedicineMutation;