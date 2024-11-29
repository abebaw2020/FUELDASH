import React from 'react';
import { Search, Settings, User } from 'lucide-react';
import ExcelOperations from './ExcelOperations';

export default function Header() {
  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search anything here..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ExcelOperations />
        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <Settings className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}