export interface FuelData {
  month: string;
  diesel: number;
  petrol: number;
  cng: number;
}

export interface FuelAverage {
  type: 'diesel' | 'petrol' | 'cng';
  value: number;
  color: {
    text: string;
    bg: string;
  };
}

export interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export interface ExcelData {
  Date: string;
  Diesel: number;
  Petrol: number;
  CNG: number;
}