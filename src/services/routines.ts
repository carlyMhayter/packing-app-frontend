import { api } from "./api";
import { type Routine, type RoutinePublic } from "../types/routine";
import { mockRoutines } from "../mocks/routines";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export const listRoutines = async (
  userId: number,
  limit?: number,
): Promise<RoutinePublic[]> => {
  try {
    const url =
      limit !== undefined
        ? `/routines?user_id=${userId}&limit=${limit}`
        : `/routines?user_id=${userId}`;
    const res = await api.request(url);
    if (!res.ok) throw new Error("Failed to fetch routines");
    const data: unknown = await res.json();
    return data as RoutinePublic[];
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] listRoutines:", err);
      return limit !== undefined ? mockRoutines.slice(0, limit) : mockRoutines;
    }
    throw err;
  }
};

export const getRoutineById = async (id: number): Promise<RoutinePublic> => {
  const res = await api.request(`/routines/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch routine ${id}`);
  const data: unknown = await res.json();
  return data as RoutinePublic;
};

export const createRoutine = async (
  payload: Omit<Routine, "id">,
): Promise<RoutinePublic> => {
  const res = await api.request("/routines", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create routine");
  const data: unknown = await res.json();
  return data as RoutinePublic;
};

export const updateRoutine = async (
  id: number,
  payload: Partial<Omit<RoutinePublic, "id">>,
): Promise<RoutinePublic> => {
  const res = await api.request(`/routines/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update routine ${id}`);
  const data: unknown = await res.json();
  return data as RoutinePublic;
};

export const deleteRoutine = async (id: number): Promise<void> => {
  const res = await api.request(`/routines/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete routine ${id}`);
};
