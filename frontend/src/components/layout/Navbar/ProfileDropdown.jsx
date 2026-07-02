import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-xl border px-4 py-2 hover:bg-slate-100"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                    A
                </div>
                <div className="text-left">
                    <p className="text-sm font-semibold">
                        Admin
                    </p>
                    <p className="text-xs text-slate-500">
                        Administrator
                    </p>
                </div>
                <ChevronDown size={18} />
            </button>
            {
                open && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg">
                        <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-100">
                            <User size={18} />
                            Profile
                        </button>
                        <button
                            onClick={() => navigate("/settings")}
                            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-100"
                        >
                            <Settings size={18} />
                            Settings
                        </button>
                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileDropdown;
