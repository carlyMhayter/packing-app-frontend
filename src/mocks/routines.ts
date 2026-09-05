import { type RoutinePublic } from "../types/routine";

export const mockRoutines: RoutinePublic[] = [
  {
    id: 1,
    name: "Standard Hygiene Routine",
    description: "Daily hygiene essentials",
    includes_hair_care: true,
    includes_skin_care: true,
    includes_body_care: true,
    includes_hygiene: true,
    includes_nail_care: false,
    includes_makeup: false,
    includes_makeup_tools: false,
    includes_fragrance: false,
    includes_feminine_hygiene: false,
    is_master_from_template: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
