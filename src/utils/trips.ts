export const formatShortDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
};

// TODO: specifiy what kind of date string must be passed to this function
export function calculateNights(start: string, end: string): number {
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}
