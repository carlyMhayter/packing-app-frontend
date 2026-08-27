export interface TravelerClothingPreferences {
  id: string;
  travelerId: string;
  name: string;
  description?: string;
  preferences: ClothingPreferences;
}

export interface ClothingPreferences {
  tops: ClothingPreferenceDetail;
  bottoms: ClothingPreferenceDetail;
  outerwear: ClothingPreferenceDetail;
  sleepwear: ClothingPreferenceDetail;
  socks: ClothingPreferenceDetail;
  underwear: ClothingPreferenceDetail;
  dresses: ClothingPreferenceDetail;
  suits: ClothingPreferenceDetail;
  footwear: AccessoryPreferences;
  accessories: AccessoryPreferences;
  swimwear: AccessoryPreferences;
}

export interface ClothingPreferenceDetail {
  rewears: number;
  per_day: number;
}

export interface AccessoryPreferences {
  num: number;
}
