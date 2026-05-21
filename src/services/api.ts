const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ACCESS_TOKEN_KEY = "platypak_access_token";
const REFRESH_TOKEN_KEY = "platypak_refresh_token";

class ApiClient {
  private accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);
  private refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN_KEY);

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  // Generic method to make API requests with automatic token handling
  async request(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(this.accessToken && { Authorization: `Bearer ${this.accessToken}` }),
      ...(options.headers as Record<string, string>),
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 && this.refreshToken) {
      await this.refreshAccessToken();
      return this.request(endpoint, options);
    }
    return response;
  }

  async requestForm(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(this.accessToken && { Authorization: `Bearer ${this.accessToken}` }),
      ...(options.headers as Record<string, string>),
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 && this.refreshToken) {
      await this.refreshAccessToken();
      return this.request(endpoint, options);
    }
    return response;
  }

  // POST request to /refresh endpoint
  // generates a new access token using the refresh token
  private async refreshAccessToken() {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: this.refreshToken }),
    });
    if (response.ok) {
      const data = await response.json();
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
    } else {
      this.clearTokens();
      throw new Error("Session expired");
    }
  }
}

export const api = new ApiClient();
