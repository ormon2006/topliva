// features/fuel-input/model/useFuelForm.ts
import { useState } from "react";
import { FuelRecord, calculateTotalCost } from "~entities/FuelRecord";

export const useFuelForm = (vehicleId: string) => {
  const [record, setRecord] = useState<Omit<FuelRecord, "id">>({
    date: new Date(),
    liters: 0,
    pricePerLiter: 0,
    odometer: 0,
    totalCost: 0,
    fuelType: "95",
    vehicleId,
  });

  const updateField = (field: keyof typeof record, value: any) => {
    const newRecord = { ...record, [field]: value };

    if (field === "liters" || field === "pricePerLiter") {
      newRecord.totalCost = calculateTotalCost(
        field === "liters" ? value : record.liters,
        field === "pricePerLiter" ? value : record.pricePerLiter
      );
    }

    setRecord(newRecord);
  };

  const resetForm = () => {
    setRecord({
      id: "",
      date: new Date(),
      liters: 0,
      pricePerLiter: 0,
      odometer: 0,
      totalCost: 0,
      vehicleId,
    });
  };

  return { record, updateField, resetForm };
};
