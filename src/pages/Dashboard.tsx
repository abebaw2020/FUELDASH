import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import FuelFilledComparison from '../components/SessionByCountry';
import FuelEfficiencyComparison from '../components/SalesByRegion';
import DistanceVsFuel from '../components/SalesByPlatform';
import VehicleEfficiency from '../components/RegisteredUsers';
import CustomizeWidgetModal from '../components/CustomizeWidgetModal';
import { LayoutDashboard, Filter, Share2 } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const processMonthlyData = (vehicleData: any[]) => {
  const today = new Date();
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      fuelFilled: 0,
      distance: 0
    };
  }).reverse();

  vehicleData.forEach(entry => {
    const entryDate = new Date(entry.date);
    const monthYear = `${entryDate.toLocaleString('default', { month: 'short' })} ${entryDate.getFullYear()}`;
    
    const monthData = last12Months.find(m => 
      `${m.month} ${m.year}` === monthYear
    );

    if (monthData) {
      monthData.fuelFilled += entry.fuelFilled;
      monthData.distance += entry.distance;
    }
  });

  return last12Months.map(m => ({
    name: `${m.month} ${m.year}`,
    fuelFilled: Math.round(m.fuelFilled),
    distance: Math.round(m.distance)
  }));
};

export default function Dashboard() {
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = React.useState(false);
  const { dashboardData } = useDashboard();

  const monthlyData = React.useMemo(() => 
    processMonthlyData(dashboardData.vehicleData),
    [dashboardData.vehicleData]
  );

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary-600" />
            <h1 className="text-xl font-semibold text-gray-900">Fuel Management Overview</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button 
              onClick={() => setIsCustomizeModalOpen(true)}
              className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Customize Widget
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Distance"
            value={dashboardData.stats.totalDistance}
            change={{ value: 12.95, trend: 'up' }}
            icon="distance"
          />
          <StatCard
            title="Total Fuel Consumption"
            value={dashboardData.stats.totalFuelConsumption}
            change={{ value: 0.33, trend: 'up' }}
            icon="fuel"
          />
          <StatCard
            title="Average Efficiency"
            value={dashboardData.stats.averageEfficiency}
            change={{ value: 0.32, trend: 'up' }}
            icon="efficiency"
          />
          <StatCard
            title="Fuel Discrepancy"
            value={dashboardData.stats.fuelDiscrepancy}
            change={{ value: 8.05, trend: 'down' }}
            icon="discrepancy"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <h2 className="dashboard-card-title">Last 12 Month Fuel Report</h2>
                <p className="dashboard-card-subtitle">Monthly fuel consumption and distance covered</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  <span className="text-sm text-gray-600">Fuel Filled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                  <span className="text-sm text-gray-600">Distance</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="fuelFilled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="distance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="fuelFilled"
                    stroke="#059669"
                    strokeWidth={2}
                    fill="url(#fuelFilled)"
                    name="Fuel Filled (L)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="distance"
                    stroke="#f97316"
                    strokeWidth={2}
                    fill="url(#distance)"
                    name="Distance (km)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <FuelFilledComparison />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <FuelEfficiencyComparison />
          <DistanceVsFuel />
          <VehicleEfficiency />
        </div>

        <CustomizeWidgetModal 
          isOpen={isCustomizeModalOpen}
          onClose={() => setIsCustomizeModalOpen(false)}
        />
      </main>
    </>
  );
}