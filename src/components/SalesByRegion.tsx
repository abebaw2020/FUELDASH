import React, { useState } from 'react';
import { MoreHorizontal, Download, Share2 } from 'lucide-react';
import EfficiencyChart from './FuelEfficiency/EfficiencyChart';
import AverageCard from './FuelEfficiency/AverageCard';
import UploadButton from './FuelEfficiency/UploadButton';
import { processExcelFile, calculateAverages } from './FuelEfficiency/ExcelProcessor';
import { fuelData as initialFuelData, fuelAverages as initialAverages } from './FuelEfficiency/data';
import { FuelData, FuelAverage } from './FuelEfficiency/types';
import toast from 'react-hot-toast';

export default function FuelEfficiencyComparison() {
  const [isExporting, setIsExporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState<FuelData[]>(initialFuelData);
  const [averages, setAverages] = useState<FuelAverage[]>(initialAverages);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulated export delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Data exported successfully!');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const processedData = await processExcelFile(file);
      const newAverages = calculateAverages(processedData);
      
      setData(processedData);
      setAverages([
        {
          type: 'diesel',
          value: newAverages.diesel,
          color: { text: 'text-emerald-600', bg: 'bg-emerald-50' }
        },
        {
          type: 'petrol',
          value: newAverages.petrol,
          color: { text: 'text-sky-600', bg: 'bg-sky-50' }
        },
        {
          type: 'cng',
          value: newAverages.cng,
          color: { text: 'text-purple-600', bg: 'bg-purple-50' }
        }
      ]);
      
      toast.success('Data updated successfully!');
    } catch (error) {
      toast.error('Failed to process Excel file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Fuel Efficiency Comparison</h2>
          <p className="text-sm text-gray-500">Monthly efficiency by fuel type (Km/Lt)</p>
        </div>
        <div className="flex items-center gap-2">
          <UploadButton onUpload={handleUpload} isLoading={isUploading} />
          <button 
            onClick={handleShare}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            title="Share Report"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            title="Export Data"
          >
            <Download className={`w-5 h-5 text-gray-600 ${isExporting ? 'animate-pulse' : ''}`} />
          </button>
          <button 
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            title="More Options"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <EfficiencyChart data={data} />

      <div className="mt-4 grid grid-cols-3 gap-4">
        {averages.map((average) => (
          <AverageCard key={average.type} data={average} />
        ))}
      </div>
    </div>
  );
}