import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

const Spinner = ({
    className,
    size = 20
}) => {
    return (
        <Loader2
            size={size}
            className={cn(
                "animate-spin",
                className
            )}
        />
    )
}

export default Spinner;