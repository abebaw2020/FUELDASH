import React from 'react';
import { MoreHorizontal, Download } from 'lucide-react';

interface FuelData {
  vehicle: string;
  icon: string;
  fuelFilled: number;
  percentage: number;
}

const data: FuelData[] = [
  { vehicle: 'Heavy Trucks', icon: '🚛', fuelFilled: 634, percentage: 28 },
  { vehicle: 'Delivery Vans', icon: '🚐', fuelFilled: 589, percentage: 22 },
  { vehicle: 'Passenger Cars', icon: '🚗', fuelFilled: 562, percentage: 16 },
  { vehicle: 'Special Vehicles', icon: '🚛', fuelFilled: 453, percentage: 14 },
];

export default function FuelFilledComparison() {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h2 className="dashboard-card-title">Total Fuel Filled Comparison</h2>
          <p className="dashboard-card-subtitle">By vehicle category</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.vehicle} className="flex items-center gap-3">
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">{item.vehicle}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.fuelFilled}L</span>
                  <span className="text-sm text-gray-500">• {item.percentage}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}