import DashboardCard from "./DashboardCard";

import summaryCards from "../constants/summaryCards";

const DashboardSummary = ({ stats }) => {

    return (

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

            {

                summaryCards.map((card) => (

                    <DashboardCard

                        key={card.key}

                        title={card.title}

                        value={`${card.prefix ?? ""}${stats?.[card.key] ?? 0}`}

                        icon={card.icon}

                        color={card.color}

                    />

                ))

            }

        </div>

    );

};

export default DashboardSummary;