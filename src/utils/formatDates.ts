export const formatISOtoEasyRead = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
};
