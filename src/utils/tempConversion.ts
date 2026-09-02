import { TemperatureUnit } from "../enums/enums";
export const convertTemperatures = (val: number, toUnit: string) =>
  toUnit === TemperatureUnit.CELSIUS
    ? Math.round(((val - 32) * 5) / 9)
    : Math.round((val * 9) / 5 + 32);
