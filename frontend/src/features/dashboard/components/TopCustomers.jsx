import DashboardTable from "./DashboardTable";

import {
    topCustomerColumns,
} from "../constants/dashboard.columns";

const TopCustomers = ({
    data,
    loading,
}) => {

    return (

        <DashboardTable

            title="Top Customers"

            columns={topCustomerColumns}

            data={data}

            loading={loading}

        />

    );

};

export default TopCustomers;