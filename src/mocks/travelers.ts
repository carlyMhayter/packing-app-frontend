import { type Traveler } from "../types/traveler";

export const mockTravelers: Traveler[] = [
  {
    id: "traveler-1",
    name: "Alice",
    type: "adult",
    temperaturePreferences: {
      cold: 32,
      cool: 55,
      warm: 75,
      hot: 90,
      unit: "F",
    },
    medications: [],
    routineIds: ["routine-1"],
  },
  {
    id: "traveler-2",
    name: "Bob",
    type: "adult",
    temperaturePreferences: {
      cold: 40,
      cool: 60,
      warm: 78,
      hot: 95,
      unit: "F",
    },
    medications: ["Allergy medication"],
    routineIds: [],
  },
];
