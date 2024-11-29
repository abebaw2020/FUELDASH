import React from 'react';
import { TrendingUp, TrendingDown, Ruler, Fuel, Gauge, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: 'distance' | 'fuel' | 'efficiency' | 'discrepancy';
}

const icons = {
  distance: Ruler,
  fuel: Fuel,
  efficiency: Gauge,
  discrepancy: AlertTriangle,
};

export default function StatCard({ title, value, change, icon }: StatCardProps) {
  const Icon = icons[icon];
  
  return (
    <div className="relative overflow-hidden bg-white rounded-xl border border-gray-200 p-6">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
        <div className="absolute inset-0 bg-primary-500 opacity-5 rounded-full"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-sm text-gray-600">{title}</h3>
        </div>
        
        <div className="flex items-baseline gap-3">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <span className={`inline-flex items-center gap-1 text-sm ${
            change.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {change.trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {change.value}%
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">vs. last month</p>
      </div>
    </div>
  );
}