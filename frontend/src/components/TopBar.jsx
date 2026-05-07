import { Search, Bell } from "lucide-react";

function Topbar() {
  return (
    <div className="w-full h-20 bg-white px-8 flex items-center justify-between ">

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 w-420px">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search medicines..."
          className="bg-transparent outline-none ml-3 w-80 text-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative">
          <Bell size={22} className="text-gray-600" />

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-600 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            // src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Mohammad Javed
            </h3>

            <p className="text-xs text-gray-500">
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;