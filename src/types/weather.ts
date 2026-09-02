export interface ConditionsMap {
  conditions: Record<string, number>;
  total_hours: number;
}
export type WeatherCondition =
  | "sunny"
  | "partly_cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "clear";

export interface WeatherData {
  highTemp: number;
  lowTemp: number;
  conditions: WeatherCondition[];
}

export interface DailyWeather {
  date: string; // YYYY-MM-DD
  highTemp: number;
  lowTemp: number;
  conditions: WeatherCondition[];
}
