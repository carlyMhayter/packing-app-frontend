import { type ConditionsMap } from "./weather";

export interface ForecastDaySchema {
  date: string;
  day_high: number;
  day_low: number;
  day_conditions: ConditionsMap;
  night_high: number;
  night_low: number;
  night_conditions: ConditionsMap;
  sunrise: string;
  sunset: string;
}

export interface ForecastDestinationSchema {
  destination_id: number;
  start_date: string;
  end_date: string;
  forecast_days: ForecastDaySchema[];
  day_high: number;
  day_low: number;
  night_high: number;
  night_low: number;
  day_conditions: ConditionsMap;
  night_conditions: ConditionsMap;
  sunrise: string;
  sunset: string;
}

export interface ForecastTripSchema {
  trip_id?: number;
  forecast_destinations: ForecastDestinationSchema[];
  day_high: number;
  day_low: number;
  night_high: number;
  night_low: number;
  day_conditions: ConditionsMap;
  night_conditions: ConditionsMap;
}

export interface ForecastDestinationPublic {
  id: number;
  destination_id: number;
  start_date: string;
  end_date: string;
  forecast_days: ForecastDayPublic[];
  day_high: number;
  day_low: number;
  night_high: number;
  night_low: number;
  day_conditions: ConditionsMap;
  night_conditions: ConditionsMap;
  cached_at: Date;
}

export interface ForecastDayPublic {
  id: number;
  date: string;
  day_high: number;
  day_low: number;
  day_conditions: ConditionsMap;
  night_high: number;
  night_low: number;
  night_conditions: ConditionsMap;
  cached_at: Date;
}

export interface ForecastTripPublic {
  id: number;
  trip_id?: number;
  forecast_destinations: ForecastDestinationPublic[];
  day_high: number;
  day_low: number;
  night_high: number;
  night_low: number;
  day_conditions: ConditionsMap;
  night_conditions: ConditionsMap;
  cached_at: Date;
}
