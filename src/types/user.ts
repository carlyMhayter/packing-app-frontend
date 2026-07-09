export interface User {
  id: number;
  email: string;
  name?: string;
  username?: string;
  language?: string;
  timezone?: string;
  unit?: "imperial" | "metric";
  notifications?: {
    email: boolean;
    weather: boolean;
    packing: boolean;
  };
}
