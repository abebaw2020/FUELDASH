import React from 'react';
import { TooltipProps } from './types';

export default function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-black p-3 border border-gray-700 rounded-lg shadow-lg">
      <p className="font-medium mb-1 text-white">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toFixed(1)} Km/Lt
        </p>
      ))}
    </div>
  );
}