import { useLocation } from "react-router-dom";
import PAGE_META from "@/constants/pageMeta";

const PageHeader = () => {
    const location = useLocation();
    const page = location.pathname.split("/")[1] || "dashboard";
    const meta = PAGE_META[page];

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {meta?.title}
      </h1>
      <p className="text-sm text-slate-500">
        {meta?.description}
      </p>
    </div>
  )
}

export default PageHeader;
