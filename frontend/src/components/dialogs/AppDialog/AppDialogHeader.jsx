import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";


const AppDialogHeader = ({ title, description }) => {
  return (
    <div className="flex items-start justify-between border-b p-6">
      <div>
        <Dialog.Title className="text-xl font-semibold">
            {title}
        </Dialog.Title>
        {
            description && (
                <Dialog.Description className="mt-1 text-sm text-slate-500">
                    {description}
                </Dialog.Description>
            )
        }
      </div>
      <Dialog.Close asChild>
        <button className="rounded-lg p-2 hover:bg-slate-100">
            <X size={20} />
        </button>
      </Dialog.Close>
    </div>
  );
};

export default AppDialogHeader;
