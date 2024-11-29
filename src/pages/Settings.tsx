import React from 'react';
import Header from '../components/Header';
import ApiSettings from '../components/settings/ApiSettings';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>

        <div className="max-w-2xl">
          <ApiSettings />
        </div>
      </main>
    </>
  );
}