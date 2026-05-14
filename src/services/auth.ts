import { api } from "./api";

export interface LoginResponse {
  requires_2fa?: boolean;
  temp_token?: string;
  access_token?: string;
  refresh_token?: string;
  user_id?: number;
}

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  const response = await fetch(
    `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth/login`,
    {
      method: "POST",
      body: formData,
    },
  );
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
  // TODO: I am getting a CORS error here.....
  console.log("Resend 2FA response:", response);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to resend code");
  }

  return response.json();
};
