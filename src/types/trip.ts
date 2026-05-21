export interface DestinationData {
  arrivalDate: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  nights: number;
  id: string;
  label: string;
  destinationID?: string;

  addressData?: {
    latitude: number;
    longitude: number;
    mapboxId: string; // mapbox_id for deduplication / re-lookup
    fullName: string; // human-readable full address
    countryCode: string;
    region?: string;
    district?: string;
    place?: string;
    locality?: string;
    neighborhood?: string;
    street?: string;
    address?: string;
    addressNumber?: string;
    addressID?: string;
  };
}

export interface DestinationCardProps {
  id: string;
  label: string;
  isAutoLabel: boolean;
  onChange: (id: string, updates: Partial<DestinationData>) => void;
  onRemove: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;

  data: DestinationData;

  // drag-and-drop handlers remain the same
}

export type DestinationUpdate = Partial<Omit<DestinationData, "id">>;
