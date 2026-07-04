import Button from "@/components/ui/Button";


const DataTablePagination = ({table}) => {
  return (
    <div className="flex items-center justify-between border-t p-4">
      <div>
        Page
        {" "}
        {
            table.getState().pagination.pageIndex+1
        }
        {" "}
        of
        {" "}
        {
            table.getPageCount()
        }
      </div>
      <div className="flex gap-2">
        <Button
            variant="outline"
            disabled={
                !table.getCanPreviousPage()
            }
            onClick={()=>table.previousPage()}
        >
            Previous
        </Button>
        <Button
            variant="outline"
            disabled={
                !table.getCanNextPage()
            }
            onClick={()=>table.nextPage()}
        >
            Next
        </Button>
      </div>
    </div>
  );
};

export default DataTablePagination;
