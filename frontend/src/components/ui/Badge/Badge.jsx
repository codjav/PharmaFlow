import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
    {
        variants: {
            variant: {
                primary:
                    "bg-blue-100 text-blue-700",
                success:
                    "bg-green-100 text-green-700",
                warning:
                    "bg-amber-100 text-amber-700",
                danger:
                    "bg-red-100 text-red-700",
                secondary:
                    "bg-slate-100 text-slate-700"
            }
        },
        defaultVariants: {
            variant: "secondary"
        }
    }
);

const Badge = ({
    children,
    variant,
    className
}) => {
    return (
        <span
            className={cn(
                badgeVariants({
                    variant
                }),
                className)}
        >
            {children}
        </span>
    )
}

export default Badge;
