import { utils, read } from 'xlsx';
import { ExcelData, FuelData } from './types';

export async function processExcelFile(file: File): Promise<FuelData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json<ExcelData>(firstSheet);

        const processedData: FuelData[] = jsonData.map(row => ({
          month: new Date(row.Date).toLocaleString('default', { month: 'short' }),
          diesel: Number(row.Diesel) || 0,
          petrol: Number(row.Petrol) || 0,
          cng: Number(row.CNG) || 0
        }));

        resolve(processedData);
      } catch (error) {
        reject(new Error('Failed to process Excel file'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

export function calculateAverages(data: FuelData[]) {
  const sum = data.reduce((acc, curr) => ({
    diesel: acc.diesel + curr.diesel,
    petrol: acc.petrol + curr.petrol,
    cng: acc.cng + curr.cng
  }), { diesel: 0, petrol: 0, cng: 0 });

  const count = data.length;

  return {
    diesel: sum.diesel / count,
    petrol: sum.petrol / count,
    cng: sum.cng / count
  };
}