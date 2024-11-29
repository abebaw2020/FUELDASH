import React from 'react';
import { FuelAverage } from './types';

interface AverageCardProps {
  data: FuelAverage;
}

export default function AverageCard({ data }: AverageCardProps) {
  return (
    <div className={`text-center p-2 ${data.color.bg} rounded-lg`}>
      <p className={`text-sm font-medium ${data.color.text}`}>
        {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
      </p>
      <p className={`text-sm ${data.color.text}`}>
        Avg: {data.value.toFixed(1)} Km/Lt
      </p>
    </div>
  );
}