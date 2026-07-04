import { flexRender } from "@tanstack/react-table";

const DataTableRow = ({ row }) => {
    return (
        <tr className="border-b transition-colors hover:bg-slate-50">
            {row.getVisibleCells().map((cell) => (
                <td
                    key={cell.id}
                    className="px-4 py-3 align-middle"
                >
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </td>
            ))}
        </tr>
    );
};

export default DataTableRow;