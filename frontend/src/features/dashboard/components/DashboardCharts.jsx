import Card from "@/components/ui/Card";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

const monthNames = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
};

const DashboardCharts = ({
    sales = [],
    purchases = [],
    loading,
}) => {

    if (loading) {

        return (

            <Card title="Sales & Purchase Overview">

                <div className="h-80 flex items-center justify-center">

                    Loading...

                </div>

            </Card>

        );

    }

    const months = {};

    sales.forEach((item) => {

        months[item.month] = {

            month: monthNames[item.month],

            sales: item.total,

            purchases: 0,

        };

    });

    purchases.forEach((item) => {

        if (!months[item.month]) {

            months[item.month] = {

                month: monthNames[item.month],

                sales: 0,

                purchases: item.total,

            };

        } else {

            months[item.month].purchases = item.total;

        }

    });

    const chartData = Object.values(months);

    return (

        <Card title="Sales & Purchase Overview">

            <div className="h-96">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={chartData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Line
                            dataKey="sales"
                            stroke="#2563eb"
                            strokeWidth={3}
                            type="monotone"
                        />

                        <Line
                            dataKey="purchases"
                            stroke="#16a34a"
                            strokeWidth={3}
                            type="monotone"
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

};

export default DashboardCharts;