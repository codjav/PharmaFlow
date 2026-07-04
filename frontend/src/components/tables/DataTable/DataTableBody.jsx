import DataTableLoading from "./DataTableLoading";
import DataTableEmpty from "./DataTableEmpty";
import DataTableRow from "./DataTableRow";

const DataTableBody = ({
    table,
    loading,
    emptyMessage,
}) => {
    if (loading) {
        return <DataTableLoading />;
    }

    if (table.getRowModel().rows.length === 0) {
        return (
            <DataTableEmpty
                message={emptyMessage}
            />
        );
    }

    return (
        <tbody>
            {table
                .getRowModel()
                .rows
                .map((row) => (
                    <DataTableRow
                        key={row.id}
                        row={row}
                    />
                ))}
        </tbody>
    );
};

export default DataTableBody;