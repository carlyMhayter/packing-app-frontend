import { api } from "./api";
import { type Routine } from "../types/routine";
import { mockRoutines } from "../mocks/routines";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export const listRoutines = async (userId: number, limit?: number): Promise<Routine[]> => {
  try {
    const url = limit !== undefined
      ? `/routines?user_id=${userId}&limit=${limit}`
      : `/routines?user_id=${userId}`;
    const res = await api.request(url);
    if (!res.ok) throw new Error("Failed to fetch routines");
    const data: unknown = await res.json();
    return data as Routine[];
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] listRoutines:", err);
      return limit !== undefined ? mockRoutines.slice(0, limit) : mockRoutines;
    }
    throw err;
  }
};

export const getRoutineById = async (id: string): Promise<Routine> => {
  try {
    const res = await api.request(`/routines/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch routine ${id}`);
    const data: unknown = await res.json();
    return data as Routine;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] getRoutineById:", err);
      const found = mockRoutines.find((r) => r.id === id);
      if (!found) throw new Error(`Routine ${id} not found in mock data`);
      return found;
    }
    throw err;
  }
};

export const createRoutine = async (
  payload: Omit<Routine, "id">,
): Promise<Routine> => {
  try {
    const res = await api.request("/routines", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create routine");
    const data: unknown = await res.json();
    return data as Routine;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] createRoutine:", err);
      return { ...payload, id: `routine-${Date.now()}` };
    }
    throw err;
  }
};

export const updateRoutine = async (
  id: string,
  payload: Partial<Omit<Routine, "id">>,
): Promise<Routine> => {
  try {
    const res = await api.request(`/routines/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to update routine ${id}`);
    const data: unknown = await res.json();
    return data as Routine;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] updateRoutine:", err);
      const found = mockRoutines.find((r) => r.id === id);
      if (!found) throw new Error(`Routine ${id} not found in mock data`);
      return { ...found, ...payload };
    }
    throw err;
  }
};

export const deleteRoutine = async (id: string): Promise<void> => {
  try {
    const res = await api.request(`/routines/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete routine ${id}`);
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] deleteRoutine:", err);
      return;
    }
    throw err;
  }
};
