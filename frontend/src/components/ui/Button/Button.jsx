import { cn } from "../../../lib/cn";

const variants = {
    primary:
        "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
        "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger:
        "bg-red-600 text-white hover:bg-red-700",
    success:
        "bg-green-600 text-white hover:bg-green-700",
    outline:
        "border border-gray-300 bg-white hover:bg-gray-50"
};

const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6"
};

const Button = ({
    children,
    className,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    type = "button",
    ...props
}) => {
  return (
    <button
        type={type}
        disabled={disabled || loading}
        className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
            variants[variant],
            sizes[size],
            disabled &&
                "cursor-not-allowed opacity-50",
            className
        )}
        {...props}
    >
        {leftIcon}
        {loading? "Loading..." : children}
        {rightIcon}
    </button>
  )
}

export default Button;
