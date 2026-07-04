import DashboardTable from "./DashboardTable";

import {
    topMedicineColumns,
} from "../constants/dashboard.columns";

const TopMedicines = ({
    data,
    loading,
}) => {

    return (

        <DashboardTable

            title="Top Selling Medicines"

            columns={topMedicineColumns}

            data={data}

            loading={loading}

        />

    );

};

export default TopMedicines;