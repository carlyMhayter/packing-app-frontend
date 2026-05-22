export interface CreateDestinationData {
  arrivalDate: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  nights: number;
  id: string;
  label: string;
  destinationID?: string;
  order: number;

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
