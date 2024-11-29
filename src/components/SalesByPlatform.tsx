import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { distance: 1200, fuelConsumption: 100, name: 'Truck 1' },
  { distance: 800, fuelConsumption: 65, name: 'Van 1' },
  { distance: 1500, fuelConsumption: 120, name: 'Truck 2' },
  { distance: 950, fuelConsumption: 80, name: 'Van 2' },
  { distance: 1100, fuelConsumption: 95, name: 'Truck 3' },
];

export default function DistanceVsFuel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Distance vs Fuel Consumption</h2>
          <p className="text-sm text-gray-500">Vehicle performance analysis</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="distance" 
              name="Distance" 
              unit=" km"
              label={{ value: 'Distance (km)', position: 'bottom' }}
            />
            <YAxis 
              type="number" 
              dataKey="fuelConsumption" 
              name="Fuel" 
              unit=" L"
              label={{ value: 'Fuel (L)', angle: -90, position: 'left' }}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter 
              name="Vehicles" 
              data={data} 
              fill="#059669"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}