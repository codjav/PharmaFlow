import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { buttonVariants } from "./buttonVariants";

const Button = ({
    children,
    variant,
    size,
    fullWidth,
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className,
    type = "button",
    ...props
}) => {
  return (
    <button
        type={type}
        disabled={disabled || loading}
        className={cn(
            buttonVariants({
                variant,
                size,
                fullWidth
            }),
            className
        )}
        {...props}
    >
        {
            loading
                ? <Loader2
                    size={18}
                    className="animate-spin"
                />
                : leftIcon
        }
        {
            loading
                ? "Loading..."
                : children
        }
        {
            !loading && rightIcon
        }
    </button>
  );
};

export default Button;
