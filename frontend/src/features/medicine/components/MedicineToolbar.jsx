import DataTableToolbar from "@/components/tables/DataTableToolbar";

const MedicineToolbar = ({
    search,
    setSearch,
}) => {

    return (

        <DataTableToolbar
            search={search}
            onSearch={setSearch}
            addButtonText="Add Medicine"
            onAdd={() => {}}
        />

    );

};

export default MedicineToolbar;