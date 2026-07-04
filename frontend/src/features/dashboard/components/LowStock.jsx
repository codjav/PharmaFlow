import DashboardTable from "./DashboardTable";

import {
    lowStockColumns,
} from "../constants/dashboard.columns";

const LowStock = ({
    data,
    loading,
}) => {

    return (

        <DashboardTable

            title="Low Stock Medicines"

            columns={lowStockColumns}

            data={data}

            loading={loading}

        />

    );

};

export default LowStock;