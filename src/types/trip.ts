import type { DestinationPublic, DestinationSummary } from "./destinations";
import type { ForecastTripPublic } from "./forecasts";
import type { TravelerPublic, TravelerBase } from "./travelers";

export type { Traveler } from "./travelers";

// Re-export destination types for backward compatibility
export type {
  DestinationCardProps,
  DestinationResponse,
  CreateDestinationData,
  DestinationFormUpdate as DestinationUpdate,
  DestinationSummary,
} from "./destinations";

export interface Trip {
  name: string;
  arrival_date?: string;
  departure_date?: string;
}

export interface TripCreate extends Trip {
  destinations: DestinationPublic[];
}

export interface TripPublic {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  arrival_date?: string;
  departure_date?: string;
  destinations: DestinationPublic[];
  forecast_trip?: ForecastTripPublic | null;
  travelers?: TravelerPublic[];
}

export interface TripUpdate {
  name?: string;
  arrival_date?: string;
  departure_date?: string;
  destinations?: DestinationPublic[];
  forecast_trip?: ForecastTripPublic | null;
}

export interface TripCreateResponse {
  trip_id: number;
  forecast_available: boolean;
  forecast?: ForecastTripPublic | null;
  data?: TripPublic | null;
  error?: string | null;
}

export interface TripPublicState {
  isLoading: boolean;
  error: string | null;
  forecast_trip?: ForecastTripPublic | null;
  id: number;
  name?: string | null;
  updated_at?: string | null;
  departure_date?: string | null;
  arrival_date?: string | null;
  destinations?: DestinationPublic[] | null;
  created_at: string | null;
  travelers?: TravelerPublic[];
}

export interface TripSimple {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}
