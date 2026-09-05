import type { TripTravelerPublic } from "../types/tripTravelers";
import { api } from "./api";

export const getTripTraveler = async (
  trip_traveler_id: number,
): Promise<TripTravelerPublic> => {
  console.log("getTripTravelerById");
  const res = await api.request(`/trip_travelers/${trip_traveler_id}`);
  // console.log("res", res);

  if (!res.ok) throw new Error(`Failed to fetch trip ${trip_traveler_id}`);
  const data: unknown = await res.json();
  console.log("data", data);

  return data as TripTravelerPublic;
};
