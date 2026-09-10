export interface Conditions {
  [condition: string]: number;
}
export interface ConditionsSummary {
  conditions: Conditions[];
  total_hours: number;
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
  day_conditions: ConditionsSummary;
  night_conditions: ConditionsSummary;
  cached_at: Date;
}

export interface ForecastDayPublic {
  id: number;
  date: string;
  day_high: number;
  day_low: number;
  day_conditions: ConditionsSummary;
  night_high: number;
  night_low: number;
  night_conditions: ConditionsSummary;
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
  day_conditions: ConditionsSummary;
  night_conditions: ConditionsSummary;
  cached_at: Date;
}
