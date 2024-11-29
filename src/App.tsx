import React from 'react';
import Sidebar from './components/Sidebar';
import PageContent from './components/PageContent';
import { DashboardProvider } from './context/DashboardContext';
import { NavigationProvider } from './context/NavigationContext';
import { WialonProvider } from './context/WialonContext';
import { SettingsProvider } from './context/SettingsContext';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <NavigationProvider>
      <SettingsProvider>
        <WialonProvider>
          <DashboardProvider>
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <PageContent />
            </div>
            <Toaster position="top-right" />
          </DashboardProvider>
        </WialonProvider>
      </SettingsProvider>
    </NavigationProvider>
  );
}