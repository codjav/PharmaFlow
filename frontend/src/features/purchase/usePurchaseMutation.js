import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import * as purchaseService from "./purchase.service";

const usePurchaseMutation = () => {
    const queryClient = useQueryClient();

    const createPurchase = useMutation({
        mutationFn: purchaseService.createPurchase,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purchases"],
            });

            queryClient.invalidateQueries({
                queryKey: ["medicines"],
            });

            queryClient.invalidateQueries({
                queryKey: ["suppliers"],
            });
        },
    });

    const deletePurchase = useMutation({
        mutationFn: purchaseService.deletePurchase,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purchases"],
            });

            queryClient.invalidateQueries({
                queryKey: ["medicines"],
            });

            queryClient.invalidateQueries({
                queryKey: ["suppliers"],
            });
        },
    });

    const updatePurchasePayment = useMutation({
        mutationFn: ({ id, amount }) =>
            purchaseService.updatePurchasePayment(
                id,
                amount
            ),

        onSuccess: (response) => {

            toast.success(
                response.message || "Payment updated successfully."
            );

            queryClient.invalidateQueries({
                queryKey: ["purchases"],
            });

            queryClient.invalidateQueries({
                queryKey: ["suppliers"],
            });

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Failed to update payment."
            );

        },
    });

    const markPurchasePaid = useMutation({
        mutationFn: purchaseService.markPurchasePaid,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purchases"],
            });

            queryClient.invalidateQueries({
                queryKey: ["suppliers"],
            });
        },
    });

    return {
        createPurchase,
        deletePurchase,
        updatePurchasePayment,
        markPurchasePaid,
    };
};

export default usePurchaseMutation;
