export interface FuelRecord {
  id: string;
  date: Date;
  liters: number;
  pricePerLiter: number;
  odometer: number;
  totalCost: number;
  fuelType: string;
  vehicleId: string;
}

export const calculateTotalCost = (
  liters: number,
  pricePerLiter: number
): number => {
  return parseFloat((liters * pricePerLiter).toFixed(2));
};

export const calculateFuelConsumption = (
  currentOdometer: number,
  prevOdometer: number,
  liters: number
): number => {
  const distance = currentOdometer - prevOdometer;
  return distance > 0 ? parseFloat(((liters * 100) / distance).toFixed(2)) : 0;
};
