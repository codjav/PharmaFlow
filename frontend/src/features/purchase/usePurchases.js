import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import * as purchaseService from "./purchase.service";

const usePurchases = ({
    page,
    limit,
    search,
}) => {
    return useQuery({
        queryKey: [
            "purchases",
            page,
            limit,
            search,
        ],

        queryFn: () =>
            purchaseService.getPurchases({
                page,
                limit,
                search,
            }),

        placeholderData: keepPreviousData,
        enabled: page > 0 && limit > 0,
    });
};

export default usePurchases;
