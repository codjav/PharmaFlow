import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const colors = {
    blue: {
        icon: "bg-blue-100 text-blue-600",
        trend: "text-blue-600"
    },
    green: {
        icon: "bg-green-100 text-green-600",
        trend: "text-green-600"
    },
    red: {
        icon: "bg-red-100 text-red-600",
        trend: "text-red-600"
    },
    amber: {
        icon: "bg-amber-100 text-amber-600",
        trend: "text-amber-600"
    },
    purple: {
        icon: "bg-purple-100 text-purple-600",
        trend: "text-purple-600"
    }
};


const SummaryCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color= "blue",
    trend,
    trendLabel,
    onClick
}) => {
  return (
    <Card
        className={cn(
                "cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                onClick && "hover:border-blue-500"
            )}
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-slate-500">
                    {title}
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                    {value}
                </h2>
            </div>
            {
                Icon && (
                    <div className={cn(
                        "rounded-xl p-3",
                        colors[color].icon
                    )}>
                        <Icon size={28} />
                    </div>
                )
            }
        </div>
        {
            subtitle && (
                <p className="mt-5 text-sm text-slate-500">
                    {subtitle}
                </p>
            )
        }
        {
            trend != undefined && (
                <div className="mt-5 flex items-center gap-2">
                    {
                        trend >=0
                        ? <TrendingUp size={18} className="text-green-600" />
                        : <TrendingDown size={18} className="text-red-600" />
                    }
                    <span className={cn(
                        "font-medium",
                        trend >= 0
                            ? "text-green-600"
                            : "text-red-600"
                    )}>
                        {Math.abs(trend)}%
                    </span>
                    <span className="text-sm text-slate-500">
                        {trendLabel}
                    </span>
                </div>
            )
        }
    </Card>
  );
};

export default SummaryCard;
