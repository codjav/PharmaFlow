import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
    Search,
    Download,
    Plus
} from "lucide-react";


const DataTableToolbar = (
    search,
    setSearch,
    addLabel,
    onAdd
) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="w-96">
        <Input
            leftIcon={<Search size={18} />}
            placeholder="Search..."
            value={search}
            onChange={
                e=>setSearch(
                    e.target.value
                )
            }
        />
      </div>
      <div className="flex gap-3">
        <Button
            variant="outline"
            leftIcon={<Download size={18} />}
        >
            Export
        </Button>
        <Button
            leftIcon={<Plus size={18} />}
            onClick={onAdd}
        >
            {addLabel}
        </Button>
      </div>
    </div>
  );
};

export default DataTableToolbar;
