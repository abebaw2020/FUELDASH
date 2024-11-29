import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import Dashboard from '../pages/Dashboard';
import Vehicles from '../pages/Vehicles';
import FuelRefillLogs from '../pages/FuelRefillLogs';
import Settings from '../pages/Settings';
import ComingSoon from '../pages/ComingSoon';

export default function PageContent() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'vehicles':
        return <Vehicles />;
      case 'refill':
        return <FuelRefillLogs />;
      case 'settings':
        return <Settings />;
      default:
        return <ComingSoon pageName={currentPage} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderPage()}
    </div>
  );
}