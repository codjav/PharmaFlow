import Card from "@/components/ui/Card";

const colorClasses = {

    blue: {
        bg: "bg-blue-100",
        icon: "text-blue-600",
    },

    green: {
        bg: "bg-green-100",
        icon: "text-green-600",
    },

    amber: {
        bg: "bg-amber-100",
        icon: "text-amber-600",
    },

    purple: {
        bg: "bg-purple-100",
        icon: "text-purple-600",
    },

    rose: {
        bg: "bg-rose-100",
        icon: "text-rose-600",
    }

};

const DashboardCard = ({
    title,
    value,
    icon: Icon,
    color,
}) => {

    const style = colorClasses[color];

    return (

        <Card>

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h2 className="mt-3 text-3xl font-bold">

                        {value}

                    </h2>

                </div>

                <div
                    className={`rounded-xl p-4 ${style.bg}`}
                >

                    <Icon
                        size={30}
                        className={style.icon}
                    />

                </div>

            </div>

        </Card>

    );

};

export default DashboardCard;