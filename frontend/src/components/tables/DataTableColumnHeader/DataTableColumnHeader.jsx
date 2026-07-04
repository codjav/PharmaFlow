import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
} from "lucide-react";

const DataTableColumnHeader = ({
    column,
    title,
}) => {
    const sorted = column.getIsSorted();

    return (
        <button
            className="flex items-center gap-2 font-semibold"
            onClick={() =>
                column.toggleSorting(sorted === "asc")
            }
        >
            {title}

            {sorted === "asc" && (
                <ArrowUp size={16} />
            )}

            {sorted === "desc" && (
                <ArrowDown size={16} />
            )}

            {!sorted && (
                <ArrowUpDown size={16} />
            )}
        </button>
    );
};

export default DataTableColumnHeader;