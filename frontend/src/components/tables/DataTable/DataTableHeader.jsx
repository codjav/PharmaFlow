import { flexRender } from "@tanstack/react-table";

const DataTableHeader = ({ table }) => {
    return (
        <thead className="bg-slate-50">
            {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                    {group.headers.map((header) => (
                        <th
                            key={header.id}
                            className="border-b px-4 py-3 text-left text-sm font-semibold text-slate-700"
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
};

export default DataTableHeader;