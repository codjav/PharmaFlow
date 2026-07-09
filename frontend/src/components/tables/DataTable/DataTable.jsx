import {
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import DataTableBody from "./DataTableBody";
import DataTableHeader from "./DataTableHeader";

const DataTable = ({
    data = [],
    columns = [],
    sorting,
    onSortingChange,
    loading = false,
    emptyMessage = "No Data Found",
}) => {
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: onSortingChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="overflow-x-auto rounded-xl border">
            <table className="w-full">
                <DataTableHeader table={table} />

                <DataTableBody
                    table={table}
                    loading={loading}
                    emptyMessage={emptyMessage}
                />
            </table>
        </div>
    );
};

export default DataTable;