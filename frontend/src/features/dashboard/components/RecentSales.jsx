import DashboardTable from "./DashboardTable";

import {
    recentSalesColumns,
} from "../constants/dashboard.columns.jsx";

const RecentSales = ({
    data,
    loading,
}) => {

    return (

        <DashboardTable

            title="Recent Sales"

            columns={recentSalesColumns}

            data={data}

            loading={loading}

        />

    );

};

export default RecentSales;