import type { Traveler } from "../../types/traveler";

export const sampleTravelerClothingPreferences = {
  name: "Sample Clothing Preferences",
  travelerId: "7",
  id: "13",
  description: "Sample clothing preferences for traveler 1",
  preferences: {
    tops: { rewears: 1, per_day: 2 },
    bottoms: { rewears: 4, per_day: 1 },
    outerwear: { rewears: 7, per_day: 1 },
    sleepwear: { rewears: 3, per_day: 1 },
    socks: { rewears: 1, per_day: 1 },
    underwear: { rewears: 1, per_day: 1 },
    dresses: { rewears: 3, per_day: 1 },
    suits: { rewears: 1, per_day: 1 },
    footwear: { num: 2 },
    swimwear: { num: 2 },
    accessories: { num: 1 },
  },
};

export const sampleTravelerProfile: Traveler = {
  id: "7",
  name: "John Doe",
  type: "adult",
  temperaturePreferences: {
    hot: 90,
    warm: 75,
    cool: 55,
    cold: 32,
    unit: "F",
  },
  medications: ["Medication A", "Medication B"],
  routineIds: ["routine-1", "routine-2"],
  clothingPreferences: sampleTravelerClothingPreferences,
};
