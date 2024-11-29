import { FuelData, FuelAverage } from './types';

export const fuelData: FuelData[] = [
  { month: 'Jan', diesel: 12.8, petrol: 14.2, cng: 16.5 },
  { month: 'Feb', diesel: 11.9, petrol: 13.8, cng: 15.9 },
  { month: 'Mar', diesel: 12.2, petrol: 14.5, cng: 16.2 },
  { month: 'Apr', diesel: 11.4, petrol: 13.2, cng: 15.7 },
  { month: 'May', diesel: 12.6, petrol: 14.8, cng: 16.8 },
  { month: 'Jun', diesel: 13.1, petrol: 15.1, cng: 17.2 }
];

export const fuelAverages: FuelAverage[] = [
  {
    type: 'diesel',
    value: 12.3,
    color: {
      text: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  },
  {
    type: 'petrol',
    value: 14.3,
    color: {
      text: 'text-sky-600',
      bg: 'bg-sky-50'
    }
  },
  {
    type: 'cng',
    value: 16.4,
    color: {
      text: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  }
];