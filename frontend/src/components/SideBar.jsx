import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  PillIcon,
  Factory,
  User,
  ReceiptText,
  ClipboardMinus,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", link: "/", icon: LayoutDashboard },
  { name: "Medicine", link: "/medicines", icon: PillIcon },
  { name: "Supplier", link: "/supplier", icon: Factory },
  { name: "Customer", link: "/customer", icon: User },
  { name: "Sale", link: "/sale", icon: ClipboardMinus },
  { name: "Bill", link: "/bill", icon: ReceiptText },
  { name: "Setting", link: "/setting", icon: Settings },
];
const SideBar = () => {
  return (
    <div className="w-65px h-screen flex flex-col bg-[rgb(246,247,249)]">
      {/* Logo */}
      <NavLink to={"/"}>
        <div className="h-20 flex items-center gap-3 px-6 border-r-3 border-r-[rgb(246,247,249)] bg-white">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            P
          </div>

          <h1 className="text-xl font-bold text-gray-800">PharmaFlow</h1>
        </div>
      </NavLink>

      {/* Menu */}
      <div className="mt-1 flex-1 py-6 px-3 space-y-2 bg-white">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                `w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 hover:cursor-pointer
          ${
            isActive
              ? "bg-indigo-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-200"
          }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={20} strokeWidth={1.8} />

                <span className="font-medium text-sm">{item.name}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
