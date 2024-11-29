import React, { createContext, useContext, useState } from 'react';

interface VehicleData {
  date: string;
  fuelFilled: number;
  fuelFilledLog: number;
  distance: number;
  plateNumber: string;
  consumption: number;
  discrepancy: number;
  engineHours: number;
  trips: number;
}

interface DashboardData {
  vehicleData: VehicleData[];
  stats: {
    totalDistance: string;
    totalFuelConsumption: string;
    averageEfficiency: string;
    fuelDiscrepancy: string;
  };
}

interface DashboardContextType {
  dashboardData: DashboardData;
  updateDashboardData: (newData: VehicleData[]) => void;
}

const initialData: DashboardData = {
  vehicleData: [],
  stats: {
    totalDistance: '0 km',
    totalFuelConsumption: '0 L',
    averageEfficiency: '0 km/L',
    fuelDiscrepancy: '0%',
  },
};

// Create context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialData);

  const updateDashboardData = (newData: VehicleData[]) => {
    const totalDistance = newData.reduce((sum, row) => sum + row.distance, 0);
    const totalFuel = newData.reduce((sum, row) => sum + row.fuelFilled, 0);
    const avgEfficiency = totalDistance / totalFuel;
    const avgDiscrepancy = newData.reduce((sum, row) => sum + row.discrepancy, 0) / newData.length;

    setDashboardData({
      vehicleData: newData,
      stats: {
        totalDistance: `${totalDistance.toLocaleString('en-US')} km`,
        totalFuelConsumption: `${totalFuel.toLocaleString('en-US')} L`,
        averageEfficiency: `${avgEfficiency.toFixed(2)} km/L`,
        fuelDiscrepancy: `${Math.abs(avgDiscrepancy).toFixed(1)}%`,
      },
    });
  };

  return (
    <DashboardContext.Provider value={{ dashboardData, updateDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
