import { TemperatureUnit } from "../enums/enums";

export interface User {
  id: number;
  email: string;
  first_name?: string;
  is_2fa_enabled?: boolean;
  temperature_unit?: (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
  is_active?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
