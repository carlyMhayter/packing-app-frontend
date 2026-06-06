import { type CreateDestinationData } from "../../../types/trip";

export function nightsBetween(arrival: string, departure: string): number {
  if (!arrival || !departure) return 0;
  const d1 = new Date(arrival);
  const d2 = new Date(departure);
  const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getDateinYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const validateTrip = (
  destinations: CreateDestinationData[],
): string[] => {
  const errors: string[] = [];

  destinations.forEach((dest, index) => {
    const label = `Destination ${index + 1}`;
    if (!dest.addressData?.full_name)
      errors.push(`${label}: address is required.`);
    if (!dest.arrivalDate) errors.push(`${label}: arrival date is required.`);
    if (!dest.departureDate)
      errors.push(`${label}: departure date is required.`);
  });

  return errors;
};
