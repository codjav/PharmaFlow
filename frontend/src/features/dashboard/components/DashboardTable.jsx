import Card from "@/components/ui/Card";
import DataTable from "@/components/tables/DataTable";

const DashboardTable = ({
    title,
    columns,
    data = [],
    loading = false,
}) => {

    return (

        <Card title={title}>

            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                emptyMessage="No Data Found"
            />

        </Card>

    );

};

export default DashboardTable;