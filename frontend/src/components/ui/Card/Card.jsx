import { cn } from "@/lib/cn";

const Card = ({
    children,
    className,
    title,
    subtitle,
    headerAction,
    footer
}) => {
    return (
        <div 
            className={cn(
                "rounded-2xl border border-slate-200 bg-white shadow-sm",
                className
            )}
        >
            {(title || subtitle || headerAction) && (
                <div className="flex items-center justify-between border-b p-5">
                    <div>
                        {title && (
                            <h2 className="text-lg font-semibold text-slate-800">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="mt-1 text-sm text-slate-500">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {headerAction && (
                        <div>{headerAction}</div>
                    )}
                </div>
            )}
            <div className="p-5">
                {children}
            </div>
            {footer && (
                <div className="border-t p-5">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;