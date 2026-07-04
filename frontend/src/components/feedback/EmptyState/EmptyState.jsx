import Button from "@/components/ui/Button";


const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border bg-white py-20">
      {
        Icon && (
            <Icon size={60} className="text-slate-300" />
        )
      }
      <h2 className="mt-5 text-xl font-semibold">
        {title}
      </h2>
      <p className="mt-2 text-slate-500">
        {description}
      </p>
      {
        actionLabel && (
            <Button
                className="mt-6"
                onClick={onAction}
            >
                {actionLabel}
            </Button>
        )
      }
    </div>
  );
};

export default EmptyState;
