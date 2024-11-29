import React, { useRef } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadButtonProps {
  onUpload: (file: File) => Promise<void>;
  isLoading: boolean;
}

export default function UploadButton({ onUpload, isLoading }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/)) {
      toast.error('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    try {
      await onUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to process file');
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="p-2 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
        title="Upload Excel Data"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
        ) : (
          <Upload className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </>
  );
}