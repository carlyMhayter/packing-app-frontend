export interface CreateDestinationData {
  arrivalDate: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  nights: number;
  id: string;
  label: string;
  destinationID?: string;
  order: number;
  laundry: "yes" | "no" | "maybe" | null;

  addressData?: {
    latitude: number;
    longitude: number;
    mapbox_id: string; // mapbox_id for deduplication / re-lookup
    full_name: string; // human-readable full address
    country_id: string;
    region?: string;
    district?: string;
    place?: string;
    locality?: string;
    neighborhood?: string;
    street?: string;
    address?: string;
    addressID?: string;
  };
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

export type Trip = {
  id: string;
  name: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  updated_at: string; // ISO 8601 timestamp
  created_at: string; // ISO 8601 timestamp
};

export type WeatherCondition = "sunny" | "partly_cloudy" | "cloudy" | "rainy" | "stormy" | "snowy" | "clear";

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

export interface DestinationSummary {
  id: string;
  name: string;
  location: string;
  arrivalDate: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  dayWeather: WeatherData;
  nightWeather: WeatherData;
  sunrise: string;
  sunset: string;
  dailyWeather: DailyWeather[];
}

export interface Traveler {
  id: string;
  name: string;
  avatar?: string;
}

export interface TripDetailData {
  trip: Trip;
  overallDayWeather: WeatherData;
  overallNightWeather: WeatherData;
  destinations: DestinationSummary[];
  travelers: Traveler[];
}
