import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import React from "react";

const Cards = ({
  latestPrice,
  overallChange,
  overallChangePercentage,
  recentChange,
  recentChangePercentage,
}) => {
  const getChangeStyle = (change) => {
    if (change > 0) return { color: "text-green-600", icon: <ArrowUpIcon className="h-4 w-4 text-green-600" /> };
    if (change < 0) return { color: "text-red-600", icon: <ArrowDownIcon className="h-4 w-4 text-red-600" /> };
    return { color: "text-gray-600", icon: <MinusIcon className="h-4 w-4 text-gray-600" /> };
  };

  const overallStyle = getChangeStyle(overallChange);
  const recentStyle = getChangeStyle(recentChange);

  return (
    <div className="flex w-full max-lg:flex-col items-center gap-4 lg:justify-between">
      <div className="w-full h-24 flex flex-col gap-2 rounded-lg p-4 text-base font-bold bg-slate-50">
        <h3>Current Price</h3>
        <span className="font-extrabold text-xl">₹{latestPrice?.toFixed(2)}</span>
      </div>
      <div className="w-full h-24 flex flex-col gap-2 rounded-lg p-4 text-base font-bold bg-slate-50">
        <h3>Overall Change</h3>
        <span className={`font-extrabold flex items-center gap-2 ${overallStyle.color} text-xl`}>
          {overallStyle.icon} ₹{Math.abs(overallChange).toFixed(2)} (
          {Math.abs(overallChangePercentage).toFixed(2)}%)
        </span>
      </div>
      <div className="w-full h-24 flex flex-col gap-2 rounded-lg p-4 text-base font-bold bg-slate-50">
        <h3>Recent Change</h3>
        <span className={`font-extrabold flex items-center gap-2 ${recentStyle.color} text-xl`}>
          {recentStyle.icon} ₹{Math.abs(recentChange).toFixed(2)} (
          {Math.abs(recentChangePercentage).toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};

export default Cards;
