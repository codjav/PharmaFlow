import { Search } from "lucide-react";

const GlobalSearch = () => {
  return (
    <div className="relative w-96">
      <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400"
      />
      <input
        className="h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-4 outline-none focus:border-blue-500"
        placeholder="Search..."
      />
    </div>
  )
}

export default GlobalSearch;
