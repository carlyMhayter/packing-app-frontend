import { type TravelerClothingPreferences } from "./clothingPreferences";
import { TravelerType, TemperatureUnit } from "../enums/enums";
export interface TravelerTemperaturePreferences {
  cold: number;
  cool: number;
  warm: number;
  hot: number;
  unit: typeof TemperatureUnit;
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
