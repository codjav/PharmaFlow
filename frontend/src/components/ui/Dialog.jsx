import { X } from "lucide-react";

const Dialog = ({
    open,
    onOpenChange,
    children,
}) => {

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => onOpenChange(false)}
        >
            <div
                className="relative w-full max-w-4xl rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export const DialogHeader = ({ children }) => (
    <div className="border-b px-6 py-4">
        {children}
    </div>
);

export const DialogTitle = ({ children }) => (
    <h2 className="text-xl font-semibold">
        {children}
    </h2>
);

export const DialogContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const DialogFooter = ({ children }) => (
    <div className="flex justify-end gap-3 border-t px-6 py-4">
        {children}
    </div>
);

export const DialogCloseButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-4 top-4 rounded-md p-1 hover:bg-gray-100"
    >
        <X size={20} />
    </button>
);

export default Dialog;