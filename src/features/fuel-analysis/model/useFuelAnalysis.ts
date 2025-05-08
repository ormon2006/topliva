import { FuelRecord, calculateFuelConsumption } from "~entities/FuelRecord";

export const useFuelAnalysis = (records: FuelRecord[]) => {
  // Средний расход топлива
  const averageConsumption =
    records.length > 1
      ? records.reduce((sum, record, index) => {
          if (index === 0) return sum;
          const prevRecord = records[index - 1];
          const consumption = calculateFuelConsumption(
            record.odometer,
            prevRecord.odometer,
            record.liters
          );
          return sum + consumption;
        }, 0) /
        (records.length - 1)
      : 0;

  // Общие затраты
  const totalSpent = records.reduce((sum, record) => sum + record.totalCost, 0);

  // Стоимость 1 км пробега
  const costPerKm =
    records.length > 1
      ? totalSpent /
        (records[records.length - 1].odometer - records[0].odometer)
      : 0;

  return {
    averageConsumption: parseFloat(averageConsumption.toFixed(2)),
    totalSpent: parseFloat(totalSpent.toFixed(2)),
    costPerKm: parseFloat(costPerKm.toFixed(2)),
  };
};
