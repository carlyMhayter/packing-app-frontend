import type { Address } from "./addresses";
import type { WeatherData, DailyWeather } from "./weather";

export interface Destination {
  label: string;
  arrival_date: Date;
  departure_date: Date;
  has_laundry: boolean;
  order: number;
}

export interface DestinationPublic extends Destination {
  id: number;
}
export interface CreateDestinationData {
  arrival_date: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  nights: number;
  id: string;
  label: string;
  destinationID?: string;
  order: number;
  laundry: "yes" | "no" | "maybe" | null;
  addressData?: Address;
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
export type DestinationUpdate = Partial<Omit<CreateDestinationData, "id">>;

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
  arrival_date: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  dayWeather: WeatherData;
  nightWeather: WeatherData;
  sunrise: string;
  sunset: string;
  dailyWeather: DailyWeather[];
}

export interface DestinationCreate extends Destination {
  label: string;
}
