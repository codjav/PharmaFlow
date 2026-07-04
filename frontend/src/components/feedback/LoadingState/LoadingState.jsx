import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (

    <div className="flex h-80 items-center justify-center">

      <Loader2 size={40} className="animate-spin text-indigo-600" />
    </div>
  );
};

export default LoadingState;
