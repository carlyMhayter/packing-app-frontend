import { ClothingCategories } from "../enums/enums";

export interface ClothingDetail {
  rewear_days?: number;
  num_per_day?: number;
  type?: (typeof ClothingCategories)[keyof typeof ClothingCategories];
}

export interface ClothingAccessoryDetail {
  name?: string;
  type?: (typeof ClothingCategories)[keyof typeof ClothingCategories];
  number?: number;
}

export interface ClothingSleepwearDetail {
  dedicated_sleepwear?: boolean;
}

export interface ClothingPrefsAll {
  tops?: ClothingDetail;
  bottoms?: ClothingDetail;
  dresses?: ClothingDetail;
  suits?: ClothingDetail;
  outerwear?: ClothingDetail;
  underwear?: ClothingDetail;
  socks?: ClothingDetail;
  footwear?: ClothingAccessoryDetail[];
  accessories?: ClothingAccessoryDetail[];
  sleepwear?: ClothingSleepwearDetail[];
}

export interface ClothingPref {
  name: string;
  preferences: ClothingPrefsAll;
  description?: string;
  creator_id?: number;
  parent_preference_id?: number;
  traveler_id?: number;
  trip_traveler_id?: number;
  is_master_from_template: boolean;
  change_for_lounge: boolean;
  change_for_sleep: boolean;
}

export interface ClothingPrefCreate extends ClothingPref {
  name: string;
}

export interface ClothingPrefPublic extends ClothingPref {
  id: number;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface ClothingPrefPublicState extends ClothingPrefPublic {
  isLoading: boolean;
  error: string | null;
}

export interface ClothingPrefSimple {
  name: string;
  updated_at: Date;
  id: number;
}

export interface ClothingPreferenceUpdate {
  id: number;
  traveler_id?: number;
  name?: string;
  preferences?: ClothingPrefsAll;
  description?: string;
  creator_id?: number;
  parent_preference_id?: number;
  trip_traveler_id?: number;
}
