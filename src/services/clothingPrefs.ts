import { api } from "./api";
import {
  type ClothingPref,
  type ClothingPrefPublic,
} from "../types/clothingPrefs";

export const listClothingPrefs = async (
  userId: number,
  limit?: number,
): Promise<ClothingPref[]> => {
  const url =
    limit !== undefined
      ? `/clothingPrefs?user_id=${userId}&limit=${limit}`
      : `/clothingPrefs?user_id=${userId}`;
  const res = await api.request(url);
  if (!res.ok) throw new Error("Failed to fetch clothingPrefs");
  const data: unknown = await res.json();
  return data as ClothingPref[];
};

export const getClothingPrefById = async (
  id: number,
): Promise<ClothingPrefPublic> => {
  const res = await api.request(`/clothingPrefs/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch clothingPref ${id}`);
  const data: unknown = await res.json();
  return data as ClothingPrefPublic;
};

export const createClothingPref = async (
  payload: Omit<ClothingPref, "id">,
): Promise<ClothingPrefPublic> => {
  const res = await api.request("/clothingPrefs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create clothingPref");
  const data: unknown = await res.json();
  return data as ClothingPrefPublic;
};

export const updateClothingPref = async (
  id: number,
  payload: Partial<Omit<ClothingPrefPublic, "id">>,
): Promise<ClothingPrefPublic> => {
  const res = await api.request(`/clothingPrefs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update clothingPref ${id}`);
  const data: unknown = await res.json();
  return data as ClothingPrefPublic;
};

export const deleteClothingPref = async (id: number): Promise<void> => {
  const res = await api.request(`/clothingPrefs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete clothingPref ${id}`);
};
