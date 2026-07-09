import { api } from "./api";
import { type User } from "../types/user";
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

interface UpdateNotificationsPayload {
  email?: boolean;
  weather?: boolean;
  packing?: boolean;
}

export const updateNotifications = async (
  payload: UpdateNotificationsPayload,
): Promise<User> => {
  try {
    const res = await api.request("/user/notifications", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update notifications");
    const data: unknown = await res.json();
    return data as User;
  } catch (err) {
    if (USE_MOCKS) {
      console.warn("[MOCK] updateNotifications:", err);
      const currentNotifs = mockUser.notifications ?? {
        email: false,
        weather: false,
        packing: false,
      };
      return { ...mockUser, notifications: { ...currentNotifs, ...payload } };
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
