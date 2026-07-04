import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

import { useState } from "react";

import Card from "@/components/ui/Card";
import DataTablePagination from "./DataTablePagination";
import DataTableLoading from "./DataTableLoading";
import DataTableEmpty from "./DataTableEmpty";


const DataTable = ({
    columns,
    data,
    loading=false,
    emptyMessage="No Data Found"
}) => {
    const [sorting, setSorting] = useState([]);
    const table = useReactTable({
        data,
        columns,
        state: {sorting},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    return (
        <Card className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        {
                            table
                            .getHeaderGroups()
                            .map(headerGroup=>(
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map(header=>(
                                            <th
                                                key={header.id}
                                                className="border-b p-4 text-left"
                                            >
                                                {
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    {
                        loading
                        ? <DataTableLoading />
                        : table.getRowModel().rows.length===0
                        ? <DataTableEmpty message={emptyMessage} />
                        : <tbody>
                            {
                                table
                                .getRowModel()
                                .rows
                                .map(row=> (
                                    <tr
                                        key={row.id}
                                        className="border-b hover:bg-slate-50"
                                    >
                                        {
                                            row
                                            .getVisibleCells()
                                            .map(cell=>(
                                                <td
                                                    key={cell.id}
                                                    className="p-4"
                                                >
                                                    {
                                                        flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    }
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    }
                </table>
            </div>
            <DataTablePagination table={table} />
        </Card>
    );
};

export default DataTable;
