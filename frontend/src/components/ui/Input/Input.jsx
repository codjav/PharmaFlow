import { cn } from "@/lib/cn";

const input = ({
    label,
    error,
    required = false,
    leftIcon,
    rightIcon,
    className,
    ...props
}) => {
    return (
        <div className="space-y-2">
            {
                label && (
                    <label className="text-sm font-medium text-slate-700">
                        {label}
                        {
                            required && (
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            )
                        }
                    </label>
                )
            }
            <div className="relative">
                {
                    leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {leftIcon}
                        </div>
                    )
                }
                <input 
                    className={cn(
                        `
                        h-10
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        bg-white
                        px-4
                        text-sm
                        outline-none
                        transition-all
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                        `,
                        leftIcon && "pl-10",
                        rightIcon && "pr-10",
                        error &&
                        "border-red-500 focus:border-red-500 focus:ring-red-100",
                        className
                    )}
                    {...props}
                />
                {
                    rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {rightIcon}
                        </div>
                    )
                }
            </div>
            {
                error && (
                    <p className="text-xs text-red-500">
                        {error}
                    </p>
                )
            }
        </div>
    )
}

export default input;
