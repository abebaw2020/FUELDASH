import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import toast from 'react-hot-toast';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: any;
}

export default function VehicleModal({ isOpen, onClose, vehicle }: VehicleModalProps) {
  const { dashboardData, updateDashboardData } = useDashboard();
  const [formData, setFormData] = useState({
    plateNumber: '',
    date: new Date().toISOString().split('T')[0],
    distance: 0,
    fuelFilled: 0,
    consumption: 0,
    discrepancy: 0,
    engineHours: 0,
    trips: 0
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        plateNumber: vehicle.plateNumber,
        date: new Date().toISOString().split('T')[0],
        distance: 0,
        fuelFilled: 0,
        consumption: 0,
        discrepancy: 0,
        engineHours: 0,
        trips: 0
      });
    } else {
      setFormData({
        plateNumber: '',
        date: new Date().toISOString().split('T')[0],
        distance: 0,
        fuelFilled: 0,
        consumption: 0,
        discrepancy: 0,
        engineHours: 0,
        trips: 0
      });
    }
  }, [vehicle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newData = [...dashboardData.vehicleData];
    
    if (vehicle) {
      // Update existing vehicle data
      const index = newData.findIndex(item => item.plateNumber === vehicle.plateNumber);
      if (index !== -1) {
        newData[index] = { ...formData };
      }
    } else {
      // Add new vehicle data
      newData.push({ ...formData });
    }
    
    updateDashboardData(newData);
    toast.success(vehicle ? 'Vehicle updated successfully' : 'Vehicle added successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plate Number
              </label>
              <input
                type="text"
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance (km)
                </label>
                <input
                  type="number"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Filled (L)
                </label>
                <input
                  type="number"
                  value={formData.fuelFilled}
                  onChange={(e) => setFormData({ ...formData, fuelFilled: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engine Hours
                </label>
                <input
                  type="number"
                  value={formData.engineHours}
                  onChange={(e) => setFormData({ ...formData, engineHours: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trips
                </label>
                <input
                  type="number"
                  value={formData.trips}
                  onChange={(e) => setFormData({ ...formData, trips: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
            >
              {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}