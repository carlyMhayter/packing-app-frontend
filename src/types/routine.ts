import type { Traveler } from "./traveler";
import type { Product } from "./products";
import type { TripTraveler } from "./tripTravelers";

export interface RoutineStep {
  id: number;
  step_number: number;
  name: string;
  routine?: Routine;
  routine_id?: number;
  products?: Product[];
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
  routine_steps?: RoutineStep[] | [];
  travelers?: Traveler | null;
  traveler_id?: number;
  trip_travelers?: TripTraveler | [];
}

export interface RoutineSimple {
  id: number;
  updated_at: Date;
  name: string;
  description: string;
}

export interface RoutineCreate extends Routine {
  traveler_id: number;
  master_routine_id: number;
  trip_traveler_id: number;
  is_master_from_template: boolean;
}

export interface RoutinePublic extends Routine {
  created_at: Date | null;
  updated_at: Date | null;
}

export interface RoutinePublicState extends RoutinePublic {
  isLoading: boolean;
  error: string | null;
}
