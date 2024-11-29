import React from 'react';
import { 
  LayoutDashboard, 
  GaugeCircle, 
  FileBarChart, 
  Fuel, 
  Truck, 
  Bell, 
  LineChart,
  Settings,
  Map,
  UserCircle,
  Wrench,
  ShieldAlert,
  MapPin
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

const menuItems = [
  { 
    id: 'dashboard',
    icon: LayoutDashboard, 
    label: 'Dashboard'
  },
  { 
    id: 'performance',
    icon: GaugeCircle, 
    label: 'Vehicle Performance'
  },
  { 
    id: 'reports',
    icon: FileBarChart, 
    label: 'Fuel Reports'
  },
  { 
    id: 'refill',
    icon: Fuel, 
    label: 'Fuel Refill Logs'
  },
  { 
    id: 'vehicles',
    icon: Truck, 
    label: 'Vehicles'
  },
  { 
    id: 'alerts',
    icon: Bell, 
    label: 'Alerts'
  },
  { 
    id: 'analytics',
    icon: LineChart, 
    label: 'Fuel Analytics'
  },
  { 
    id: 'drivers',
    icon: UserCircle, 
    label: 'Driver Behavior'
  },
  { 
    id: 'routes',
    icon: Map, 
    label: 'Route Optimization'
  },
  { 
    id: 'maintenance',
    icon: Wrench, 
    label: 'Maintenance Logs'
  },
  { 
    id: 'theft',
    icon: ShieldAlert, 
    label: 'Fuel Theft Detection'
  },
  { 
    id: 'locations',
    icon: MapPin, 
    label: 'Refill Locations'
  },
] as const;

export default function Sidebar() {
  const { currentPage, setCurrentPage } = useNavigation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Fuel className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">FuelTrack</span>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 mb-2 px-3">FUEL MANAGEMENT</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4">
        <button 
          onClick={() => setCurrentPage('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            currentPage === 'settings'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
}