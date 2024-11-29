import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FuelData } from './types';
import CustomTooltip from './CustomTooltip';

interface EfficiencyChartProps {
  data: FuelData[];
}

export default function EfficiencyChart({ data }: EfficiencyChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis 
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="diesel" 
            name="Diesel"
            stroke="#059669" 
            strokeWidth={2}
            dot={{ fill: '#059669', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="petrol" 
            name="Petrol"
            stroke="#0284c7" 
            strokeWidth={2}
            dot={{ fill: '#0284c7', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="cng" 
            name="CNG"
            stroke="#7c3aed" 
            strokeWidth={2}
            dot={{ fill: '#7c3aed', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}