import DashboardTable from "./DashboardTable";

import {
    nearExpiryColumns,
} from "../constants/dashboard.columns";

const NearExpiry = ({
    data,
    loading,
}) => {

    return (

        <DashboardTable

            title="Near Expiry Medicines"

            columns={nearExpiryColumns}

            data={data}

            loading={loading}

        />

    );

};

export default NearExpiry;