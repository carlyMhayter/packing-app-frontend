export interface Address {
  mapbox_id: string;
  full_name: string;
  latitude: number;
  longitude: number;
  country_id: string;
  region?: string;
  district?: string;
  place?: string;
  locality?: string;
  neighborhood?: string;
  street?: string;
  address?: string;
  postcode?: string;
  address_number?: string;
}

export interface AddressPublic extends Address {
  id: number;
  created_at: Date;
}

export interface AddressCreate extends Address {}

export interface AddressUpdate {
  mapbox_id?: string;
  full_name?: string;
  latitude?: number;
  longitude?: number;
  country_id?: string;
  region?: string;
  district?: string;
  place?: string;
  locality?: string;
  neighborhood?: string;
  street?: string;
  address?: string;
  postcode?: string;
  address_number?: string;
}
