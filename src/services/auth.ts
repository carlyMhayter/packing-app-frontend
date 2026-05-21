import { api } from "./api";

export interface LoginResponse {
  requires_2fa?: boolean;
  temp_token?: string;
  access_token?: string;
  refresh_token?: string;
  user_id?: number;
}

export interface User {
  id: number;
  email: string;
  name?: string;
}

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const data = new URLSearchParams({ username: email, password });

  const response = await api.requestForm("/auth/login", {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }
  return response.json();
};

export const verify2FA = async (tempToken: string, code: string) => {
  const response = await api.request("/auth/verify-2fa", {
    method: "POST",
    body: JSON.stringify({ temp_token: tempToken, code }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Invalid code");
  }
  const data = await response.json();
  api.setTokens(data.access_token, data.refresh_token);
  return data;
};

export const createUser = async (email: string, password: string) => {
  const response = await api.request("/user/create", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Registration failed");
  }
  return response.json();
};

export const resend2FACode = async (tempToken: string) => {
  const response = await api.request("/auth/resend-2fa", {
    method: "POST",
    body: JSON.stringify({ temp_token: tempToken }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to resend code");
  }
  return response.json();
};

export const forgotPassword = async (email: string) => {
  const response = await api.request("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to send reset link");
  }
  return response.json();
};

export const resetPassword = async (token: string, password: string) => {
  const response = await api.request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to reset password");
  }
  return response.json();
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.request("/auth/me", { method: "GET" });
    if (response.ok) {
      return response.json();
    }
    return null;
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  api.clearTokens();
};
