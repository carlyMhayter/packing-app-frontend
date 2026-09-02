import { TravelerType, TemperatureUnit } from "../enums/enums";
import type { TripTravelerPublic } from "./tripTravelers";
import type { ClothingPref } from "./clothingPrefs";
export interface TravelerTemperaturePreferences {
  cold: number;
  cool: number;
  warm: number;
  hot: number;
  unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
}
export interface Traveler {
  name: string;
  traveler_type: (typeof TravelerType)[keyof typeof TravelerType];
  temp_unit?: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temp_pref?: string;
  is_active: boolean;
  user_id: number;
  clothing_preference?: ClothingPref | null;
  trip_travelers?: TripTravelerPublic[];
}

export interface TravelerSimple {
  id: number;
  name: string;
  traveler_type: typeof TravelerType;
  is_active: boolean;
  is_primary_for_user: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TravelerUpdateForm {
  name?: string;
  traveler_type?: typeof TravelerType;
  is_active?: boolean;
  is_primary_for_user?: boolean;
  updated_at?: Date;
  temp_unit?: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temp_pref?: string;
  trip_ids?: number[];
  isLoading?: boolean;
  error?: boolean;
}

export interface TravelerPublic {
  name: string;
  traveler_type: (typeof TravelerType)[keyof typeof TravelerType];
  temp_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temp_pref: string;
  is_active: boolean;
  user_id: number;
  id: number;
  trip_ids?: number[];
  is_primary_for_user: boolean;
  clothing_preference?: ClothingPref | null;
  trip_travelers?: TripTravelerPublic[];
}

export interface TravelerPublicState extends TravelerPublic {
  isLoading: boolean;
  error: string | null;
}
