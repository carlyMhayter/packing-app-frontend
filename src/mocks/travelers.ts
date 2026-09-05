import { type TravelerPublic } from "../types/travelers";

export const mockTravelers: TravelerPublic[] = [
  {
    id: 1,
    name: "Alice",
    traveler_type: "adult",
    temp_unit: "fahrenheit",
    temp_pref: JSON.stringify({ cold: 32, cool: 55, warm: 75, hot: 90 }),
    is_active: true,
    user_id: 1,
    trip_ids: [],
    is_primary_for_user: false,
  },
  {
    id: 2,
    name: "Bob",
    traveler_type: "adult",
    temp_unit: "fahrenheit",
    temp_pref: JSON.stringify({ cold: 40, cool: 60, warm: 78, hot: 95 }),
    is_active: true,
    user_id: 1,
    trip_ids: [],
    is_primary_for_user: false,
  },
];
