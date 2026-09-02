import { api } from "./api";
import { type TravelerPublic } from "../types/traveler";

export const listTravelers = async (
  userId: number,
  limit?: number,
): Promise<TravelerPublic[]> => {
  const url =
    limit !== undefined
      ? `/travelers?user_id=${userId}&limit=${limit}`
      : `/travelers?user_id=${userId}`;
  const res = await api.request(url);
  if (!res.ok) throw new Error("Failed to fetch travelers");
  const data: unknown = await res.json();
  return data as TravelerPublic[];
};

export const getTravelerById = async (id: number): Promise<TravelerPublic> => {
  console.log("getTravelerById");
  const res = await api.request(`/travelers/${id}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error(`Failed to fetch traveler ${id}`);
  const data = await res.json();
  return data;
};

export const createTraveler = async (
  payload: Omit<TravelerPublic, "id">,
): Promise<TravelerPublic> => {
  const res = await api.request("/travelers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create traveler");
  const data: unknown = await res.json();
  return data as TravelerPublic;
};

export const updateTraveler = async (
  id: number,
  payload: Partial<Omit<TravelerPublic, "id">>,
): Promise<TravelerPublic> => {
  const res = await api.request(`/travelers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update traveler ${id}`);
  const data: unknown = await res.json();
  return data as TravelerPublic;
};

export const deleteTraveler = async (id: string): Promise<void> => {
  const res = await api.request(`/travelers/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete traveler ${id}`);
};
