import React, { createContext, useContext, useState } from 'react';
import { loginToWialon, fetchVehicleData, WialonVehicleData } from '../services/wialonApi';
import { useSettings } from './SettingsContext';
import toast from 'react-hot-toast';

interface WialonContextType {
  isAuthenticated: boolean;
  sessionId: string | null;
  login: () => Promise<boolean>;
  logout: () => void;
  getVehicleData: (vehicleId: string) => Promise<WialonVehicleData | null>;
}

const WialonContext = createContext<WialonContextType | undefined>(undefined);

export function WialonProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    if (!settings.wialonApiToken) {
      toast.error('Wialon API token not configured');
      return false;
    }

    const sid = await loginToWialon({
      apiToken: settings.wialonApiToken,
      apiKey: settings.wialonApiKey
    });

    if (sid) {
      setSessionId(sid);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setSessionId(null);
    setIsAuthenticated(false);
  };

  const getVehicleData = async (vehicleId: string) => {
    if (!sessionId || !settings.wialonApiKey) {
      toast.error('Not authenticated or API key not configured');
      return null;
    }
    
    return await fetchVehicleData(sessionId, vehicleId, {
      apiToken: settings.wialonApiToken,
      apiKey: settings.wialonApiKey
    });
  };

  return (
    <WialonContext.Provider value={{
      isAuthenticated,
      sessionId,
      login,
      logout,
      getVehicleData
    }}>
      {children}
    </WialonContext.Provider>
  );
}

export function useWialon() {
  const context = useContext(WialonContext);
  if (!context) {
    throw new Error('useWialon must be used within a WialonProvider');
  }
  return context;
}