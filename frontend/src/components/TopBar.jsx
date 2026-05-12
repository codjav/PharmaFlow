import { Search, Bell } from "lucide-react";

function Topbar({name, description}) {
  return (
    <div className="h-20 bg-white px-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold to-gray-800">
              {name}
            </h1>
            <p className="text-gray-500 mt-1">
              {description}
            </p>
          </div>
        </div>
  );
}

export default Topbar;