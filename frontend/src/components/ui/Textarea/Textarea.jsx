import { cn } from "@/lib/cn";

const Textarea = ({
    label,
    error,
    required = false,
    className,
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-slate-700">
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <textarea
                className={cn(
                    "min-h-28 w-full rounded-xl border border-slate-300 p-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                    error &&
                        "border-red-500 focus:border-red-500 focus:ring-red-100",
                    className
                )}
                {...props}
            />

            {error && (
                <p className="text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Textarea;