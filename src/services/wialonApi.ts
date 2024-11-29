import axios from 'axios';

const BASE_URL = 'https://hst-api.wialon.com/wialon/ajax.html';

export interface WialonVehicleData {
  plateNumber: string;
  fuelConsumption: number;
  fuelFilled: number;
  fuelDrain: number;
  travelledKM: number;
  engineHours: number;
  ecoDriver: number;
  driverRank: number;
  tripCount: number;
}

export interface WialonCredentials {
  apiToken?: string;
  apiKey?: string;
}

export const loginToWialon = async (credentials: WialonCredentials): Promise<string | null> => {
  try {
    if (!credentials.apiToken) {
      throw new Error('API token is required');
    }

    const response = await axios.get(`${BASE_URL}?svc=core/login`, {
      params: {
        token: credentials.apiToken
      }
    });

    if (response.data.error) {
      throw new Error(`Login failed: ${response.data.error}`);
    }

    return response.data.eid;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

export const fetchVehicleData = async (
  sid: string, 
  vehicleId: string, 
  credentials: WialonCredentials
): Promise<WialonVehicleData | null> => {
  try {
    if (!credentials.apiKey) {
      throw new Error('API key is required');
    }

    const response = await axios.get(`${BASE_URL}?svc=core/search_items`, {
      params: {
        sid,
        key: credentials.apiKey,
        params: JSON.stringify({
          id: vehicleId,
          flags: 1
        })
      }
    });

    if (response.data.error) {
      throw new Error(`Data fetch failed: ${response.data.error}`);
    }

    const vehicle = response.data.items[0];
    return {
      plateNumber: vehicle.nm,
      fuelConsumption: vehicle.prp.fuel_consumption,
      fuelFilled: vehicle.prp.fuel_filled,
      fuelDrain: vehicle.prp.fuel_drain,
      travelledKM: vehicle.prp.mileage,
      engineHours: vehicle.prp.engine_hours,
      ecoDriver: vehicle.prp.eco_driver_score,
      driverRank: vehicle.prp.driver_rank,
      tripCount: vehicle.prp.trip_count
    };
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
    return null;
  }
};