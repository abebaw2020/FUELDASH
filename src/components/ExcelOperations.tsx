import React, { useRef, useState } from 'react';
import { Download, Upload, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { useDashboard } from '../context/DashboardContext';

const TEMPLATE_DATA = [
  {
    Date: '2024-03-01',
    'Plate Number': 'ET-3-A03011',
    Distance: 1096,
    'Consumption (KM/L)': 1.55,
    'Fuel Filled': 680,
    'Fuel Filled log': 675,
    'Discrepancy %': 0.7,
    'Discrepancy (L)': 5,
    'Consumption (L)': 7101,
    'Engine Hr': 23,
    Trip: 3
  }
];

export default function ExcelOperations() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { updateDashboardData } = useDashboard();

  const downloadTemplate = () => {
    toast.promise(
      new Promise((resolve) => {
        const ws = XLSX.utils.json_to_sheet(TEMPLATE_DATA);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Vehicle Data");
        XLSX.writeFile(wb, "vehicle-data-template.xlsx");
        setTimeout(resolve, 500);
      }),
      {
        loading: 'Preparing template for download...',
        success: 'Template downloaded successfully!',
        error: 'Failed to download template',
      }
    );
  };

  const processExcelData = (data: any[]) => {
    return data.map(row => ({
      date: row.Date,
      fuelFilled: row['Fuel Filled'],
      distance: row.Distance,
      plateNumber: row['Plate Number'],
      consumption: row['Consumption (KM/L)'],
      discrepancy: row['Discrepancy %'],
      engineHours: row['Engine Hr'],
      trips: row.Trip
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const processedData = processExcelData(jsonData);
        updateDashboardData(processedData);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        setTimeout(() => {
          toast.success('Vehicle data imported successfully!');
          setIsUploading(false);
        }, 1500);

      } catch (error) {
        toast.error('Error importing file. Please check the file format.');
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file. Please try again.');
      setIsUploading(false);
    };

    toast.promise(
      new Promise((resolve) => {
        reader.readAsArrayBuffer(file);
        setTimeout(resolve, 1500);
      }),
      {
        loading: 'Uploading and processing vehicle data...',
        success: 'File processed successfully!',
        error: 'Error processing file',
      }
    );
  };

  return (
    <>
      <button
        onClick={downloadTemplate}
        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg relative"
        title="Download Vehicle Data Template"
      >
        <Download className="w-5 h-5" />
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls"
        className="hidden"
        disabled={isUploading}
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg relative"
        title="Upload Vehicle Data"
        disabled={isUploading}
      >
        {isUploading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Upload className="w-5 h-5" />
        )}
      </button>
    </>
  );
}