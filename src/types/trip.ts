import { type Traveler } from "./traveler";
import type { WeatherData } from "./weather";
import type { DestinationPublic, DestinationCreate } from "./destinations";
import type { DestinationSummary } from "./destinations";
import type { TripForecastPublic } from "./forecasts";

export interface Trip {
  name: string;
}

export interface TripCreate extends Trip {
  destinations: DestinationCreate[];
}

export interface TripDetailData {
  trip: Trip;
  overallDayWeather: WeatherData;
  overallNightWeather: WeatherData;
  destinations: DestinationSummary[];
  travelers: Traveler[];
}

export interface TripPublic {
  forecastTrip: TripForecastPublic;
  id: number;
  name: string;
  updated_at: string;
  departure_date: string;
  arrival_date: string;
  destinations: DestinationPublic[];
  created_at: string;
}
export interface TripPublicState {
  isLoading: boolean;
  error: string | null;
  forecastTrip?: TripForecastPublic | null;
  id: number;
  name?: string | null;
  updated_at?: string | null;
  departure_date?: string | null;
  arrival_date?: string | null;
  destinations?: DestinationPublic[] | null;
  created_at: string | null;
}

export interface TripSimple {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
}
