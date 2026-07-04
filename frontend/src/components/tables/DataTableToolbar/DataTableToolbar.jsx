import { Search } from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const DataTableToolbar = ({
    search,
    onSearch,
    addButtonText,
    onAdd,
    actions,
}) => {
    return (
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="w-full lg:w-96">
                <Input
                    value={search}
                    onChange={(e) =>
                        onSearch(e.target.value)
                    }
                    placeholder="Search..."
                    leftIcon={<Search size={18} />}
                />
            </div>

            <div className="flex items-center gap-3">

                {actions}

                {onAdd && (
                    <Button onClick={onAdd}>
                        {addButtonText}
                    </Button>
                )}

            </div>

        </div>
    );
};

export default DataTableToolbar;