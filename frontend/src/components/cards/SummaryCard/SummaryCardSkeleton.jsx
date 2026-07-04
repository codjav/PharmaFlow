const SummaryCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl border bg-white p-6">
      <div className="mb-6 flex justify-between">
        <div>
            <div className="mb-2 h-4 w-28 rounded bg-slate-200" />
            <div className="h-8 w-20 rounded bg-slate-200" />
        </div>
        <div className="h-14 w-14 rounded-xl bg-slate-200" />
      </div>
      <div className="h-4 w-40 rounded bg-slate-200" />
    </div>
  );
};

export default SummaryCardSkeleton;
