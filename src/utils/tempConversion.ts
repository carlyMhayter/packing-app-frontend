export const convertTempsForNumber = (toUnit: "F" | "C", val: number) => {
  const converted =
    toUnit === "C"
      ? Math.round(((val - 32) * 5) / 9)
      : Math.round((val * 9) / 5 + 32);

  return converted;
};
