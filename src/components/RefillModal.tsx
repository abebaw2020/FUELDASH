import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import toast from 'react-hot-toast';

interface RefillModalProps {
  isOpen: boolean;
  onClose: () => void;
  refill?: any;
}

export default function RefillModal({ isOpen, onClose, refill }: RefillModalProps) {
  const { dashboardData, updateDashboardData } = useDashboard();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    plateNumber: '',
    fuelFilledLog: 0
  });

  const [availableVehicles, setAvailableVehicles] = useState<string[]>([]);

  useEffect(() => {
    // Get unique plate numbers from vehicle data
    const vehicles = Array.from(new Set(dashboardData.vehicleData.map(item => item.plateNumber)));
    setAvailableVehicles(vehicles);

    if (refill) {
      setFormData({
        date: refill.date,
        plateNumber: refill.plateNumber,
        fuelFilledLog: refill.fuelFilledLog
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        plateNumber: vehicles[0] || '',
        fuelFilledLog: 0
      });
    }
  }, [refill, dashboardData.vehicleData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData = dashboardData.vehicleData.map(item => {
      if (item.date === formData.date && item.plateNumber === formData.plateNumber) {
        return { ...item, fuelFilledLog: formData.fuelFilledLog };
      }
      return item;
    });
    
    updateDashboardData(updatedData);
    toast.success(refill ? 'Refill log updated successfully' : 'Refill log added successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {refill ? 'Edit Refill Log' : 'Add New Refill Log'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Plate Number
              </label>
              <select
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              >
                <option value="">Select a vehicle</option>
                {availableVehicles.map(plate => (
                  <option key={plate} value={plate}>{plate}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Filled (L)
              </label>
              <input
                type="number"
                value={formData.fuelFilledLog}
                onChange={(e) => setFormData({ ...formData, fuelFilledLog: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
                min="0"
                step="0.1"
              />
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
              {refill ? 'Update Refill Log' : 'Add Refill Log'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}