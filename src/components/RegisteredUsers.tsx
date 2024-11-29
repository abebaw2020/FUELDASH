import React from 'react';
import { MoreHorizontal, Truck } from 'lucide-react';

const vehicleData = {
  total: 15,
  highEfficiency: 9,
  lowEfficiency: 6,
  avgEfficiency: 11.8
};

export default function VehicleEfficiency() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Vehicle Efficiency Comparison</h2>
          <p className="text-sm text-gray-500">Fleet performance overview</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="16"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#059669"
              strokeWidth="16"
              strokeDasharray="552.92"
              strokeDashoffset={552.92 * (1 - vehicleData.highEfficiency / vehicleData.total)}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Truck className="w-8 h-8 text-emerald-600 mb-2" />
            <span className="text-3xl font-semibold">{vehicleData.total}</span>
            <span className="text-sm text-gray-500">Total Vehicles</span>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          <div className="text-center">
            <p className="text-2xl font-semibold">{vehicleData.highEfficiency}</p>
            <p className="text-sm text-gray-500">High Efficiency</p>
            <p className="text-xs text-emerald-600">&gt; {vehicleData.avgEfficiency} Km/L</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">{vehicleData.lowEfficiency}</p>
            <p className="text-sm text-gray-500">Low Efficiency</p>
            <p className="text-xs text-orange-500">&lt; {vehicleData.avgEfficiency} Km/L</p>
          </div>
        </div>
      </div>
    </div>
  );
}