import { Bell } from "lucide-react";

const NotificationButton = () => {
  return (
    <button className="relative rounded-xl border p-2 hover:bg-slate-100">
        <Bell size={20} />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            0
        </span>
    </button>
  )
}

export default NotificationButton;
