import { type TravelerClothingPreferences } from "./clothingPreferences";
import { TravelerType, TemperatureUnit } from "../enums/enums";
export interface TravelerTemperaturePreferences {
  cold: number;
  cool: number;
  warm: number;
  hot: number;

  unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
}
export interface TravelerProfile {
  id: string;
  name: string;
  avatar?: string;
  type: typeof TravelerType;
  temperaturePreferences?: TravelerTemperaturePreferences;
  medications?: string[];
  routineIds?: string[];
  clothingPreferences: TravelerClothingPreferences;
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
  name: string;
  traveler_type: typeof TravelerType;
  is_active: boolean;
  is_primary_for_user: boolean;
  updated_at: Date;
  temp_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temp_pref: string;
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
}

export interface TravelerPublicState {
  isLoading: boolean;
  error: string | null;
  name: string;
  traveler_type: (typeof TravelerType)[keyof typeof TravelerType];
  temp_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  temp_pref: string;
  is_active: boolean;
  user_id: number;
  id: number;
  trip_ids?: number[];
  is_primary_for_user: boolean;
}
