import { Building2 } from "lucide-react";

const SidebarFooter = () => {
  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2">
            <Building2
                size={20}
                className="text-blue-600"
            />
        </div>
        <div>
            <h3 className="text-sm font-semibold">
                PharmaFlow
            </h3>
            <p className="text-xs text-slate-500">
                Offline ERP
            </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
