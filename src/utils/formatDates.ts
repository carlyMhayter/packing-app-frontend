export const formatISOtoEasyRead = (dateStr: string, dayIndex: number) => {
  const date = new Date(dateStr);
  return `Day ${dayIndex + 1} — ${date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })}`;
};
