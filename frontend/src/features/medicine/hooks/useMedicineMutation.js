import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import medicineService from "../services/medicine.service";

const useMedicineMutation = () => {

    const queryClient =
        useQueryClient();

    const createMedicine =
        useMutation({

            mutationFn:
                medicineService.createMedicine,

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: ["medicines"],
                });

            },

        });

    const updateMedicine =
        useMutation({

            mutationFn: ({ id, payload }) =>
                medicineService.updateMedicine(
                    id,
                    payload
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: ["medicines"],
                });

            },

        });

    const deleteMedicine =
        useMutation({

            mutationFn:
                medicineService.deleteMedicine,

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