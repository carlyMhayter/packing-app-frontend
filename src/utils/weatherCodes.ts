import weatherConditions from "../data/weatherConditions.json";

const codeToCondition = new Map<number, string>();

// create a map from the JSON entries
Object.entries(weatherConditions as Record<string, number[]>).forEach(
  ([condition, codes]) => {
    codes.forEach((code) => {
      codeToCondition.set(code, condition);
    });
  },
);

export function getWeatherCondition(code: number): string {
  return codeToCondition.get(code) ?? "unknown";
}

export function aggregateConditions(
  entries: [string, number][],
): [string, number][] {
  const hoursByCondition = new Map<string, number>();
  // console.log("1");

  entries.forEach((entry: [string, number]) => {
    const conditionName = getWeatherCondition(Number(entry[0]));
    const current = hoursByCondition.get(conditionName) ?? 0;
    hoursByCondition.set(conditionName, current + entry[1]);
  });

  return Array.from(hoursByCondition.entries());
}
