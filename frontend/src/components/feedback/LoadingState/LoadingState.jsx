import { Spinner } from "lucide-react";

const LoadingState = () => {
  return (
    <div>
      <div className="flex h-80 items-center justify-center">

            <Spinner size={40}/>

        </div>
    </div>
  );
};

export default LoadingState;
