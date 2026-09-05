import { PackingListStatus, SectionType } from "../enums/enums";

export interface PackingListBase {
  generated_at?: Date;
  total_items: number;
  checked_items: number;
  status: (typeof PackingListStatus)[keyof typeof PackingListStatus];
  setup_step_completed: number;
  source: string;
  is_private: boolean;
  is_shareable: boolean;
  clothing_preference_id?: number;
  routine_id?: number;
}

export interface PackingListCreate extends PackingListBase {
  trip_traveler_id: number;
}

export interface PackingListPublic extends PackingListBase {
  id: number;
  trip_traveler_id: number;
}

export interface PackingListUpdate {
  generated_at?: Date;
  total_items?: number;
  checked_items?: number;
  status?: (typeof PackingListStatus)[keyof typeof PackingListStatus];
  setup_step_completed?: number;
  source?: string;
  is_private?: boolean;
  is_shareable?: boolean;
  clothing_preference_id?: number;
  routine_id?: number;
}

export interface GeneratePackingListRequest {
  clothing_preference_id: number;
  routine_id: number;
  traveler_id: number;
}

export interface PackingListSectionBase {
  packing_list_id: number;
  section_type: (typeof SectionType)[keyof typeof SectionType];
  is_visible_to_collaborators: boolean;
  order: number;
  traveler_id?: number;
}

export interface PackingListSectionCreate extends PackingListSectionBase {}

export interface PackingListSectionPublic extends PackingListSectionBase {
  id: number;
}

export interface PackingListSectionUpdate {
  is_visible_to_collaborators?: boolean;
  order?: number;
  traveler_id?: number;
}
