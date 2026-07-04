import { Database } from "lucide-react";


const DataTableEmpty = ({
    message="No Data Found"
}) => {
  return (
    <tbody>
        <tr>
            <td
                colSpan={100}
                className="py-20"
            >
                <div
                    className="flex flex-col items-center justify-center"
                >
                    <Database
                        size={48}
                        className="text-slate-400"
                    />
                    <h2 className="h-5 animate-pulse rounded bg-slate-200">
                        {message}
                    </h2>
                </div>
            </td>
        </tr>
    </tbody>
  );
};

export default DataTableEmpty;