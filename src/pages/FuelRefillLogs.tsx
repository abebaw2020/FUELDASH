import React, { useState } from 'react';
import Header from '../components/Header';
import { Plus, Search, Pencil, Trash2, FileSpreadsheet } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import RefillModal from '../components/RefillModal';
import toast from 'react-hot-toast';

export default function FuelRefillLogs() {
  const { dashboardData, updateDashboardData } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRefill, setEditingRefill] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const refillLogs = dashboardData.vehicleData
    .filter(item => item.fuelFilledLog > 0)
    .map(item => ({
      date: item.date,
      plateNumber: item.plateNumber,
      fuelFilledLog: item.fuelFilledLog,
      fuelFilled: item.fuelFilled,
      discrepancy: ((item.fuelFilled - item.fuelFilledLog) / item.fuelFilledLog * 100).toFixed(2)
    }));

  const filteredLogs = refillLogs.filter(log =>
    log.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(log.date).toLocaleDateString().includes(searchTerm)
  );

  const handleEdit = (refill: any) => {
    setEditingRefill(refill);
    setIsModalOpen(true);
  };

  const handleDelete = (date: string, plateNumber: string) => {
    const updatedData = dashboardData.vehicleData.map(item => {
      if (item.date === date && item.plateNumber === plateNumber) {
        return { ...item, fuelFilledLog: 0 };
      }
      return item;
    });
    updateDashboardData(updatedData);
    toast.success('Refill log deleted successfully');
  };

  const handleAddNew = () => {
    setEditingRefill(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Fuel Refill Logs</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            Add New Refill Log
          </button>
        </div>

        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by plate number or date..."
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
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Plate Number</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Manual Log (L)</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">System Log (L)</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Discrepancy (%)</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={`${log.date}-${log.plateNumber}`} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">{new Date(log.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{log.plateNumber}</td>
                  <td className="px-6 py-4 text-right">{log.fuelFilledLog.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">{log.fuelFilled.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={Number(log.discrepancy) > 0 ? 'text-red-600' : 'text-emerald-600'}>
                      {log.discrepancy}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(log)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Edit Log"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(log.date, log.plateNumber)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Log"
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

      <RefillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refill={editingRefill}
      />
    </>
  );
}