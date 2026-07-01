import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            transition-all
            duration-200
            ${
                isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }
        `
      }
    >
      <Icon size={20} />
      <span>{item.title}</span>
    </NavLink>
  );
};

export default SidebarItem;
