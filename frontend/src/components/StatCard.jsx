import React from "react";

const StatCard = ({ title, value, sub, icon: Icon, bg, text }) => {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm">
      <div>
        <p className="mb-2 text-sm text-gray-500">{title}</p>

        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>

        <p className="mt-1 text-sm text-gray-400">{sub}</p>
      </div>

      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${bg}`}
      >
        <Icon className={text} size={28} />
      </div>
    </div>
  );
};

export default StatCard;
