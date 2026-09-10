import { TravelerType, TemperatureUnit } from "../enums/enums";
import type { ClothingPrefPublic, ClothingPref } from "./clothingPrefs";
import type { TripTravelerPublic } from "./tripTravelers";

export interface TravelerBase {
  name: string;
  traveler_type: (typeof TravelerType)[keyof typeof TravelerType];
  temp_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temp_pref: string;
  is_active: boolean;
  user_id: number;
}

export interface TravelerCreate extends Omit<TravelerBase, "traveler_type"> {
  traveler_type?: string;
  trip_ids?: number[];
  is_primary_for_user?: boolean;
  clothing_preference?: string;
  parent_id?: number;
}

export interface TravelerPublic extends TravelerBase {
  id: number;
  trip_ids?: number[];
  is_primary_for_user?: boolean;
  clothing_preference?: ClothingPrefPublic | ClothingPref | null;
  trip_travelers?: TripTravelerPublic[];
  parent_id?: number;
}

export interface TravelerUpdate {
  name?: string;
  traveler_type?: (typeof TravelerType)[keyof typeof TravelerType];
  temp_unit?: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temp_pref?: string;
  is_active?: boolean;
  trip_ids?: number[];
}

export interface TravelerSimple extends Omit<TravelerBase, "traveler_type"> {
  id: number;
  name: string;
  traveler_type?: (typeof TravelerType)[keyof typeof TravelerType];
  is_active: boolean;
  is_primary_for_user?: boolean;
  parent_id?: number;

  created_at: Date;
  updated_at: Date;
}

export interface TravelerPublicState extends TravelerPublic {
  isLoading: boolean;
  error: string | null;
}

// Form-friendly draft state for creating a new traveler (not yet serialized)
export interface TravelerCreateDraft {
  name: string;
  traveler_type: (typeof TravelerType)[keyof typeof TravelerType];
  temp_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temps: { cold: number; cool: number; warm: number; hot: number };
}

// Backward-compatible alias for components that import "Traveler" from the old file
export type Traveler = TravelerBase;
