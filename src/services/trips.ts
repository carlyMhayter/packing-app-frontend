import { api } from "./api";
import { type TripPublic } from "../types/trip";
import { mockTripDetail, mockTripList } from "../mocks/trips";
export { mapTripPublicToDetail } from "../utils/tripsMapper";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

interface CreateTripDestinationPayload {
  user_id: number;
  destination_name: string;
  arrival_date: string;
  departure_date: string;
  nights: number;
  has_laundry: boolean;
  label: string;
  address?: Record<string, unknown>;
  order: number;
}

interface CreateTripPayload {
  name: string;
  user_id: number;
  destinations: CreateTripDestinationPayload[];
}

export const fetchRecentTrips = async (
  limit: number,
  userId: number,
): Promise<TripPublic[]> => {
  try {
    const res = await api.request(
      `/trips?sort_field=updated_at&sort_order=desc&limit=${limit}&user_id=${userId}`,
    );
    if (!res.ok) throw new Error("Failed to fetch trips");
    const data: unknown = await res.json();
    return data as TripPublic[];
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] fetchRecentTrips:", err);
      return mockTripList.slice(0, limit);
    }
    throw err;
  }
};

export const getTripById = async (
  trip_id: number,
  userId: number,
): Promise<TripPublic> => {
  console.log("getTripById");
  const res = await api.request(`/trips/${trip_id}?user_id=${userId}`);
  console.log("res", res);

  if (!res.ok) throw new Error(`Failed to fetch trip ${trip_id}`);
  const data: unknown = await res.json();
  console.log("data", data);

  return data as TripPublic;
};

export const createTrip = async (
  payload: CreateTripPayload,
): Promise<TripPublic> => {
  try {
    const res = await api.request("/trips/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create trip");
    const data: unknown = await res.json();
    return data as TripPublic;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] createTrip:", err);
      return { ...mockTripDetail, name: payload.name };
    }
    throw err;
  }
};

export const updateTrip = async (
  trip_id: string,
  payload: Partial<Pick<TripPublic, "name">>,
): Promise<TripPublic> => {
  try {
    const res = await api.request(`/trips/${trip_id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to update trip ${trip_id}`);
    const data: unknown = await res.json();
    return data as TripPublic;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] updateTrip:", err);
      return { ...mockTripDetail, ...payload };
    }
    throw err;
  }
};

export const deleteTrip = async (trip_id: string): Promise<void> => {
  try {
    const res = await api.request(`/trips/${trip_id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete trip ${trip_id}`);
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] deleteTrip:", err);
      return;
    }
    throw err;
  }
};
