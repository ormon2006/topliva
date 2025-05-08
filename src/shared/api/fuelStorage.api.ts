import { FuelRecord } from "~entities/FuelRecord";
const STORAGE_KEY = "fuel-records";

export const saveFuelRecord = (record: FuelRecord) => {
  const records = getFuelRecords();
  records.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const getFuelRecords = (): FuelRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  return JSON.parse(data).map((r: any) => ({
    ...r,
    date: new Date(r.date),
  }));
};

export const getRecordsByVehicle = (vehicleId: string) => {
  return getFuelRecords().filter((r) => r.vehicleId === vehicleId);
};
