import { type TripSimple } from "./trip";
import { type TravelerSimple } from "./traveler";
import { type RoutineSimple } from "./routine";
import { type ClothingPrefSimple } from "./clothingPrefs";

import { TemperatureUnit } from "../enums/enums";
export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  temperature_unit?: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  is_2fa_enabled?: boolean;
  created_at?: Date;
  is_active?: boolean;
  oauth_provider?: string;
  oauth_provider_id?: string;
  is_oauth_user?: boolean;
}

export interface UserCreate {
  email: string;
  password: string;
  first_name: string;
  is_2fa_enabled: boolean;
  is_active: boolean;
  temperature_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
}

export interface UserPublic {
  id: number;
  first_name: string;
  is_2fa_enabled: boolean;
  is_active: boolean;
  created_at: Date;
  temperature_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
}

// export interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
// }

export interface UserWithRelationships {
  id: number;
  trips?: TripSimple[];
  travelers?: TravelerSimple[];
  routines?: RoutineSimple[];
  preferences?: ClothingPrefSimple[];
}

export interface UserAppState {
  id: number;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  first_name: string;
  is_2fa_enabled: boolean;
  is_active: boolean;
  temperature_unit: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  trips?: TripSimple[];
  travelers?: TravelerSimple[];
  routines?: RoutineSimple[];
  preferences?: ClothingPrefSimple[];
}

export interface LoginResponse {
  requires_2fa?: boolean;
  temp_token?: string;
  access_token?: string;
  refresh_token?: string;
  user_id?: number;
}

export interface User {
  id: number;
  email: string;
  name?: string;
}
