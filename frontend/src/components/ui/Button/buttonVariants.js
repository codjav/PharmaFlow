import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    font-medium
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    disabled:pointer-events-none
    disabled:opacity-50
    `,
    {
        variants: {
            variant: {
                primary:
                    "bg-blue-600 text-white hover:bg-blue-700",
                secondary:
                    "bg-slate-100 text-slate-800 hover:bg-slate-200",
                outline:
                    "border border-slate-300 bg-white hover:bg-slate-50",
                success:
                    "bg-green-600 text-white hover:bg-green-700",
                danger:
                    "bg-red-600 text-white hover:bg-red-700",
                warning:
                    "bg-amber-500 text-white hover:bg-amber-600",
                ghost:
                    "hover:bg-slate-100"
            },
            size: {
                sm:
                    "h-9 px-3 text-sm",
                md:
                    "h-10 px-4",
                lg:
                    "h-11 px-6 text-base",
                icon:
                    "h-10 w-10"
            },
            fullWidth: {
                true:
                    "w-full"
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md"
        }
    }
);