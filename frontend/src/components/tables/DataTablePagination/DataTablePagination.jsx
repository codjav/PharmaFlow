import Button from "@/components/ui/Button";

const DataTablePagination = ({ table }) => {
    return (
        <div className="flex items-center justify-between border-t bg-white px-4 py-3">
            <div className="text-sm text-slate-600">
                Showing{" "}
                <span className="font-semibold">
                    {table.getRowModel().rows.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold">
                    {table.getFilteredRowModel().rows.length}
                </span>{" "}
                rows
            </div>

            <div className="flex items-center gap-2">

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    First
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>

                <span className="px-3 text-sm font-medium">
                    Page{" "}
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </span>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Last
                </Button>

            </div>
        </div>
    );
};

export default DataTablePagination;