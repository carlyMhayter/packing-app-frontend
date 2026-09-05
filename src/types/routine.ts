import type { TripTraveler } from "./tripTravelers";
import type { TravelerBase } from "./travelers";
import type { ItemPublic } from "./items";

export interface RoutineStep {
  id: number;
  step_number: number;
  name: string;
  routine?: Routine;
  routine_id?: number;
  items?: ItemPublic[];
}

export interface RoutineStepCreate {
  step_number: number;
  name: string;
  routine_id?: number;
  items?: ItemPublic[];
}

export interface RoutineStepPublic extends RoutineStep {
  id: number;
  items?: ItemPublic[];
}

export interface RoutineStepUpdate {
  step_number?: number;
  name?: string;
  routine_id?: number;
  items?: ItemPublic[];
}

export interface Routine {
  id: number;
  name: string;
  description: string;
  includes_hair_care: boolean;
  includes_skin_care: boolean;
  includes_body_care: boolean;
  includes_hygiene: boolean;
  includes_nail_care: boolean;
  includes_makeup: boolean;
  includes_makeup_tools: boolean;
  includes_fragrance: boolean;
  includes_feminine_hygiene: boolean;
  is_master_from_template: boolean;
  creator_id?: number;
  parent_routine_id?: number;
  routine_steps?: RoutineStep[] | [] | null;
  traveler_id?: number;
  // Frontend-only convenience fields (not present in backend schema)
  travelers?: TravelerBase | null;
  trip_travelers?: TripTraveler | [] | null;
}

export interface RoutineSimple {
  id: number;
  updated_at: Date;
  name: string;
  description: string;
}

export interface RoutineCreate extends Routine {
  traveler_id?: number;
  parent_routine_id?: number;
}

export interface RoutinePublic extends Routine {
  id: number;
  created_at: Date | null;
  updated_at: Date | null;
  parent_routine_id?: number;
  traveler_id?: number;
  routine_steps?: RoutineStepPublic[] | null;
}

export interface RoutineUpdate {
  name?: string;
  description?: string;
  includes_hair_care?: boolean;
  includes_skin_care?: boolean;
  includes_body_care?: boolean;
  includes_hygiene?: boolean;
  includes_nail_care?: boolean;
  includes_makeup?: boolean;
  includes_makeup_tools?: boolean;
  includes_fragrance?: boolean;
  includes_feminine_hygiene?: boolean;
  is_master_from_template?: boolean;
  traveler_id?: number;
  parent_routine_id?: number;
  routine_steps?: RoutineStep[];
}

export interface RoutinePublicState extends RoutinePublic {
  isLoading: boolean;
  error: string | null;
}
