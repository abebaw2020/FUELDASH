import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Save, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApiSettings() {
  const { settings, updateSettings, clearSettings } = useSettings();
  const [formData, setFormData] = useState({
    wialonApiToken: settings.wialonApiToken || '',
    wialonApiKey: settings.wialonApiKey || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    toast.success('API settings saved successfully');
  };

  const handleClear = () => {
    clearSettings();
    setFormData({
      wialonApiToken: '',
      wialonApiKey: ''
    });
    toast.success('API settings cleared');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">API Configuration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wialon API Token
          </label>
          <input
            type="password"
            value={formData.wialonApiToken}
            onChange={(e) => setFormData({ ...formData, wialonApiToken: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Enter your Wialon API token"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wialon API Key
          </label>
          <input
            type="password"
            value={formData.wialonApiKey}
            onChange={(e) => setFormData({ ...formData, wialonApiKey: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Enter your Wialon API key"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
            Clear Settings
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}