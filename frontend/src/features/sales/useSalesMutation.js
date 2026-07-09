import { useMutation, useQueryClient } from "@tanstack/react-query";

import salesService from "./sales.service";

const useSalesMutation = () => {
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: ["sales"],
        });

        queryClient.invalidateQueries({
            queryKey: ["sale-items"],
        });

        queryClient.invalidateQueries({
            queryKey: ["medicines"],
        });

        queryClient.invalidateQueries({
            queryKey: ["medicine-batches"],
        });

        queryClient.invalidateQueries({
            queryKey: ["customers"],
        });

        queryClient.invalidateQueries({
            queryKey: ["dashboard"],
        });
    };

    const createSale = useMutation({
        mutationFn: salesService.createSale,
        onSuccess,
    });

    const deleteSale = useMutation({
        mutationFn: salesService.deleteSale,
        onSuccess,
    });

    const updateSalePayment = useMutation({
        mutationFn: ({ id, amount }) =>
            salesService.updateSalePayment(id, amount),
        onSuccess,
    });

    const markSalePaid = useMutation({
        mutationFn: salesService.markSalePaid,
        onSuccess,
    });

    return {
        createSale,
        deleteSale,
        updateSalePayment,
        markSalePaid,
    };
};

export default useSalesMutation;