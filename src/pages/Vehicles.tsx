import React, { useState } from 'react';
import Header from '../components/Header';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import VehicleModal from '../components/VehicleModal';
import toast from 'react-hot-toast';

export default function Vehicles() {
  const { dashboardData, updateDashboardData } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueVehicles = Array.from(
    new Set(dashboardData.vehicleData.map(item => item.plateNumber))
  ).map(plateNumber => {
    const vehicleData = dashboardData.vehicleData.find(item => item.plateNumber === plateNumber);
    return {
      plateNumber,
      lastUpdate: vehicleData?.date,
      totalDistance: dashboardData.vehicleData
        .filter(item => item.plateNumber === plateNumber)
        .reduce((sum, item) => sum + item.distance, 0),
      totalFuel: dashboardData.vehicleData
        .filter(item => item.plateNumber === plateNumber)
        .reduce((sum, item) => sum + item.fuelFilled, 0),
      avgEfficiency: (dashboardData.vehicleData
        .filter(item => item.plateNumber === plateNumber)
        .reduce((sum, item) => sum + item.distance, 0) /
        dashboardData.vehicleData
          .filter(item => item.plateNumber === plateNumber)
          .reduce((sum, item) => sum + item.fuelFilled, 0)).toFixed(2)
    };
  });

  const filteredVehicles = uniqueVehicles.filter(vehicle =>
    vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleDelete = (plateNumber: string) => {
    const updatedData = dashboardData.vehicleData.filter(
      item => item.plateNumber !== plateNumber
    );
    updateDashboardData(updatedData);
    toast.success('Vehicle deleted successfully');
  };

  const handleAddNew = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Vehicle Management</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            Add New Vehicle
          </button>
        </div>

        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Plate Number</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Last Update</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Total Distance</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Total Fuel</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Avg. Efficiency</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.plateNumber} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">{vehicle.plateNumber}</td>
                  <td className="px-6 py-4">{new Date(vehicle.lastUpdate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">{vehicle.totalDistance.toLocaleString()} km</td>
                  <td className="px-6 py-4 text-right">{vehicle.totalFuel.toLocaleString()} L</td>
                  <td className="px-6 py-4 text-right">{vehicle.avgEfficiency} km/L</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.plateNumber)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicle={editingVehicle}
      />
    </>
  );
}