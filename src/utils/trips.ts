/**
 * @param dateStr YYYY-MM-DD or ISO 8601 date string. Returns "" for falsy or invalid input.
 */
export const formatShortDate = (dateStr: string | undefined | null): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
};

/**
 * @param start YYYY-MM-DD or ISO 8601 date string.
 * @param end YYYY-MM-DD or ISO 8601 date string.
 */
export function calculateNights(start: string | undefined | null, end: string | undefined | null): number {
  if (!start || !end) return 0;
  const d1 = new Date(start);
  const d2 = new Date(end);
  if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return 0;
  const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}
