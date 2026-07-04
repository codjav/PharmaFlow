import DashboardTable from "./DashboardTable";

import {
    recentPurchaseColumns,
} from "../constants/dashboard.columns";

const RecentPurchases = ({
    data,
    loading,
}) => {

    return (

        <DashboardTable

            title="Recent Purchases"

            columns={recentPurchaseColumns}

            data={data}

            loading={loading}

        />

    );

};

export default RecentPurchases;