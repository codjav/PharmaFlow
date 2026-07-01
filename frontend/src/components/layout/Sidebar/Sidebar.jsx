import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEMS } from "../../../constants/sidebar";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">
        <Logo />
        <div className="flex-1 space-y-2 p-4">
            {
                SIDEBAR_ITEMS.map(
                    (item) => (
                        <SidebarItem
                            key={item.path}
                            item={item}
                        />
                    )
                )
            }
        </div>
    </aside>
  );
};

export default Sidebar;
