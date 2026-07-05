import { useMemo } from "react";

import DataTable from "@/components/tables/DataTable";
import DataTablePagination from "@/components/tables/DataTablePagination/DataTablePagination";

import { medicineColumns } from "../constants/medicine.columns";


const MedicineTable = ({
    medicines,
    pagination,
    page,
    setPage,
    loading,
}) => {

    const columns = useMemo(
        () =>
            medicineColumns(
                () => {},
                () => {}
            ),
        []
    );

    return (

        <div className="space-y-4">
            
            <DataTable
                columns={columns}
                data={medicines}
                loading={loading}
            />

            <DataTablePagination
                page={page}
                totalPages={pagination?.totalPages ?? 1}
                onPageChange={setPage}
            />

        </div>

    );

};

export default MedicineTable;
