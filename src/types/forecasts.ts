import { type ConditionsMap } from "./weather";
export interface ForecastDestinationPublic {
  destination_id: number;
  day_conditions: ConditionsMap;
  night_conditions: ConditionsMap;
  day_high: number;
  day_low: number;
  night_high: number;
  night_low: number;
  sunrise: string;
  sunset: string;
}

export interface TripForecastPublic {
  cached_at: string;
  day_conditions: ConditionsMap;
  day_high: number;
  day_low: number;
  forecast_destinations: ForecastDestinationPublic[];
  id: number;
  night_conditions: ConditionsMap;
  night_high: number;
  night_low: number;
  trip_id: number;
}
