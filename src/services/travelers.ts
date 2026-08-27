import { api } from "./api";
import { type TravelerProfile } from "../types/traveler";
import { mockTravelers } from "../mocks/travelers";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export const listTravelers = async (userId: number, limit?: number): Promise<TravelerProfile[]> => {
  try {
    const url = limit !== undefined
      ? `/travelers?user_id=${userId}&limit=${limit}`
      : `/travelers?user_id=${userId}`;
    const res = await api.request(url);
    if (!res.ok) throw new Error("Failed to fetch travelers");
    const data: unknown = await res.json();
    return data as TravelerProfile[];
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] listTravelers:", err);
      return limit !== undefined ? mockTravelers.slice(0, limit) : mockTravelers;
    }
    throw err;
  }
};

export const getTravelerById = async (id: string): Promise<TravelerProfile> => {
  try {
    const res = await api.request(`/travelers/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch traveler ${id}`);
    const data: unknown = await res.json();
    return data as TravelerProfile;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] getTravelerById:", err);
      const found = mockTravelers.find((t) => t.id === id);
      if (!found) throw new Error(`Traveler ${id} not found in mock data`);
      return found;
    }
    throw err;
  }
};

export const createTraveler = async (
  payload: Omit<TravelerProfile, "id">,
): Promise<TravelerProfile> => {
  try {
    const res = await api.request("/travelers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create traveler");
    const data: unknown = await res.json();
    return data as TravelerProfile;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] createTraveler:", err);
      return { ...payload, id: `traveler-${Date.now()}` };
    }
    throw err;
  }
};

export const updateTraveler = async (
  id: string,
  payload: Partial<Omit<TravelerProfile, "id">>,
): Promise<TravelerProfile> => {
  try {
    const res = await api.request(`/travelers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to update traveler ${id}`);
    const data: unknown = await res.json();
    return data as TravelerProfile;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] updateTraveler:", err);
      const found = mockTravelers.find((t) => t.id === id);
      if (!found) throw new Error(`Traveler ${id} not found in mock data`);
      return { ...found, ...payload };
    }
    throw err;
  }
};

export const deleteTraveler = async (id: string): Promise<void> => {
  try {
    const res = await api.request(`/travelers/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete traveler ${id}`);
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] deleteTraveler:", err);
      return;
    }
    throw err;
  }
};
