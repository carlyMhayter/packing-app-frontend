import type { Address, AddressPublic } from "./addresses";
import type { WeatherData, DailyWeather } from "./weather";

export interface Destination {
  label: string;
  arrival_date: string;
  departure_date: string;
  has_laundry: boolean;
  order: number;
  is_archived?: boolean;
}

export interface DestinationPublic extends Destination {
  id: number;
  created_at: string;
  updated_at: string;
  address?: AddressPublic | null;
}

export interface DestinationCreate extends Destination {
  address_id?: number;
  trip_id?: number;
  address?: Address;
}

export interface DestinationUpdate {
  label?: string;
  arrival_date?: string;
  departure_date?: string;
  has_laundry?: boolean;
  order?: number;
  is_archived?: boolean;
  address?: AddressPublic;
}

export interface CreateDestinationData {
  arrival_date: string;
  departureDate: string; // Kept camelCase for tripPlanner compatibility
  nights: number;
  id: string;
  label: string;
  destinationID?: string;
  order: number;
  laundry: "yes" | "no" | "maybe" | null;
  addressData?: Address; // Kept camelCase for tripPlanner compatibility
}

export interface DestinationCardProps {
  id: string;
  label: string;
  isAutoLabel: boolean;
  data: CreateDestinationData;
  onChange: (id: string, updates: Partial<CreateDestinationData>) => void;
  onRemove: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
}

export type DestinationFormUpdate = Partial<Omit<CreateDestinationData, "id">>;

export type DestinationContext = {
  country?: { country_code_alpha_3: string; name: string };
  region?: { name: string };
  locality?: { name: string };
  neighborhood?: { name: string };
  place?: { name: string };
  district?: { name: string };
  street?: { name: string };
  address?: { name: string };
  postcode?: { name: string };
};

export type DestinationResponseFeature = {
  properties: {
    name: string;
    address: string;
    full_address: string;
    mapbox_id: string;
    context: DestinationContext;
    coordinates: { latitude: number; longitude: number };
  };
};

export type DestinationResponse = {
  features: DestinationResponseFeature[];
};

export interface DestinationSummary {
  id: string;
  name: string;
  location: string;
  arrival_date: string;
  departure_date: string;
  dayWeather: WeatherData;
  nightWeather: WeatherData;
  sunrise: string;
  sunset: string;
  dailyWeather: DailyWeather[];
}
