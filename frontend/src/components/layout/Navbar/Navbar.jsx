import GlobalSearch from "./GlobalSearch";
import NotificationButton from "./NotificationButton";
import PageHeader from "./PageHeader";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
        <PageHeader/>
        <div className="flex items-center gap-4">
          <GlobalSearch />
          <NotificationButton />
          <ThemeToggle />
          <ProfileDropdown />
        </div>
    </header>
  );
};

export default Navbar;
