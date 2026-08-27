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
  tripId: string,
  userId: number,
): Promise<TripPublic> => {
  try {
    const res = await api.request(`/trips/${tripId}?user_id=${userId}`);
    if (!res.ok) throw new Error(`Failed to fetch trip ${tripId}`);
    const data: unknown = await res.json();
    return data as TripPublic;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] getTripById:", err);
      return mockTripDetail;
    }
    throw err;
  }
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
  tripId: string,
  payload: Partial<Pick<TripPublic, "name">>,
): Promise<TripPublic> => {
  try {
    const res = await api.request(`/trips/${tripId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to update trip ${tripId}`);
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

export const deleteTrip = async (tripId: string): Promise<void> => {
  try {
    const res = await api.request(`/trips/${tripId}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete trip ${tripId}`);
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] deleteTrip:", err);
      return;
    }
    throw err;
  }
};
