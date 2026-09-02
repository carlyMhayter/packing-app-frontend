export interface Address {
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
}

export interface AddressPublic extends Address {
  id: number;
}
