export interface TravelerProfile {
  id: string;
  name: string;
  avatar?: string;
  type: "adult" | "child" | "infant" | "pet";
  temperaturePreferences?: {
    cold: number;
    cool: number;
    warm: number;
    hot: number;
    unit: "F" | "C";
  };
  medications?: string[];
  routineIds?: string[];
}
