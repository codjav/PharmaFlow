import { useState } from "react";

import MedicineToolbar from "./components/MedicineToolbar";
import MedicineTable from "./components/MedicineTable";

import useMedicines from "./hooks/useMedicines";


const MedicineFeature = () => {
    const [ page, setPage ] = useState(1);
    const [ limit ] = useState(10);
    const [ search, setSearch ] = useState("");

    const {
        data,
        isLoading,
    } = useMedicines(page, limit);

    return (
        <div className="space-y-6">

            <MedicineToolbar 
                search={search}
                setSearch={setSearch}
            />

            <MedicineTable
                medicines={data?.medicines ?? []}
                pagination={data?.pagination}
                page={page}
                setPage={setPage}
                loading={isLoading}
            />

        </div>
    );
};

export default MedicineFeature;
