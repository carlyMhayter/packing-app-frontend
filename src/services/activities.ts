import { api } from "./api";
import {
  // type ActivityCreate,
  type ActivityPublic,
} from "../types/activities";

export const fetchAllActivities = async (): Promise<ActivityPublic[]> => {
  const res = await api.request(`/activities`);
  console.log("res in fetchAllActivities:", res);
  if (!res.ok) throw new Error("Failed to fetch activities");
  const data: unknown = await res.json();
  return data as ActivityPublic[];
};

export const getActivityById = async (
  activity_id: number,
): Promise<ActivityPublic> => {
  console.log("getActivityById");
  const res = await api.request(`/activities/${activity_id}`);
  // console.log("res", res);

  if (!res.ok) throw new Error(`Failed to fetch activity ${activity_id}`);
  const data: unknown = await res.json();
  console.log("getActivityById data", data);

  return data as ActivityPublic;
};

// export const createActivity = async (
//   payload: CreateActivityPayload,
// ): Promise<ActivityPublic> => {
//     const res = await api.request("/trips/create", {
//       method: "POST",
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error("Failed to create trip");
//     const data: unknown = await res.json();
//     return data as ActivityPublic;

// };

export const updateActivity = async (
  activity_id: string,
  payload: Partial<Pick<ActivityPublic, "name">>,
): Promise<ActivityPublic> => {
  const res = await api.request(`/trips/${activity_id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update trip ${activity_id}`);
  const data: unknown = await res.json();
  return data as ActivityPublic;
};

export const deleteActivity = async (trip_id: string): Promise<void> => {
  const res = await api.request(`/trips/${trip_id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete trip ${trip_id}`);
};

export const fetchActivitiesForTrip = async (
  trip_id: number,
): Promise<ActivityPublic[]> => {
  const res = await api.request(`/activities/trip/${trip_id}`, {
    method: "GET",
  });
  if (!res.ok)
    throw new Error(`Failed to fetch activities for trip ${trip_id}`);
  const data = await res.json();
  console.log("getActivitiesForTrip data", data);

  return data;
};

export const addActivityToTrip = async (
  trip_id: number,
  activity_id: number,
): Promise<void> => {
  const res = await api.request(`/trips/${trip_id}/activities`, {
    method: "POST",
    body: JSON.stringify({ activity_id }),
  });
  if (!res.ok)
    throw new Error(`Failed to add activity ${activity_id} to trip ${trip_id}`);
};
