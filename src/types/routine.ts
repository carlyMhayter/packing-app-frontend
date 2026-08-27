export interface Routine {
  id: string;
  name: string;
  items: string[];
  travelerId?: string;
}

export interface RoutineSimple {
  id: number;
  updated_at: Date;
  name: string;
  description: string;
}
