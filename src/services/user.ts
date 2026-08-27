import { api } from "./api";
import { type User, type UserWithRelationships } from "../types/user";
import { mockUser } from "../mocks/user";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export const getMe = async (): Promise<User> => {
  try {
    const res = await api.request("/auth/me");
    if (!res.ok) throw new Error("Failed to get current user");
    const data: unknown = await res.json();
    return data as User;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] getMe:", err);
      return mockUser;
    }
    throw err;
  }
};

export const getUserDashboard = async (
  user_id: number,
): Promise<UserWithRelationships> => {
  try {
    const res = await api.request(`/user/${user_id}/dashboard`);
    if (!res.ok) throw new Error("Failed to get user dashboard");
    const data: UserWithRelationships = await res.json();
    return data;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] getUserDashboard:", err);
      return mockUser;
    }
    throw err;
  }
};

interface UpdateProfilePayload {
  name?: string;
  email?: string;
  username?: string;
}

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<User> => {
  try {
    const res = await api.request("/user/profile", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    const data: unknown = await res.json();
    return data as User;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] updateProfile:", err);
      return { ...mockUser, ...payload };
    }
    throw err;
  }
};

interface UpdatePasswordPayload {
  current: string;
  next: string;
}

export const updatePassword = async (
  payload: UpdatePasswordPayload,
): Promise<void> => {
  try {
    const res = await api.request("/user/password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update password");
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] updatePassword:", err);
      return;
    }
    throw err;
  }
};

interface UpdatePreferencesPayload {
  language?: string;
  timezone?: string;
  unit?: "imperial" | "metric";
}

export const updatePreferences = async (
  payload: UpdatePreferencesPayload,
): Promise<User> => {
  try {
    const res = await api.request("/user/preferences", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update preferences");
    const data: unknown = await res.json();
    return data as User;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] updatePreferences:", err);
      return { ...mockUser, ...payload };
    }
    throw err;
  }
};

export const deleteAccount = async (): Promise<void> => {
  try {
    const res = await api.request("/user", { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete account");
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] deleteAccount:", err);
      return;
    }
    throw err;
  }
};
