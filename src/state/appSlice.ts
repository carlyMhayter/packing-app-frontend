import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import { type User } from "../types/auth.ts";
import { api } from "../services/api.ts";
import { loginUser, getCurrentUser } from "../services/auth.ts";
import { verify2FA, resend2FACode } from "../services/auth.ts";
import { type UserAppState } from "../types/user.ts";
import { TemperatureUnit } from "../enums/enums.ts";
import { getUserDashboard } from "../services/user.ts";
// Initialize auth on app startup
export const initializeAuthThunk = createAsyncThunk(
  "app/initialize",
  async () => {
    try {
      const response = await api.request("/auth/me", { method: "GET" });
      if (response.ok) {
        return (await response.json()) as User;
      }
      // Fallback to test user for development
    } catch {
      console.log("no existing session");
    }

    // 2. Development auto-login (only if no tokens exist)
    if (import.meta.env.DEV && !localStorage.getItem("platypak_access_token")) {
      try {
        const loginRes = await loginUser(
          import.meta.env.VITE_TEST_USER_EMAIL,
          import.meta.env.VITE_TEST_USER_PW,
        );
        if (!loginRes.requires_2fa && loginRes.access_token) {
          api.setTokens(loginRes.access_token, loginRes.refresh_token!);
          const user = await getCurrentUser();
          if (user) return user;
        }
      } catch {
        console.warn("Dev auto-login failed");
      }
    }

    // 3. Ultimate fallback
    return { id: 1, email: "test@example.com" } as User;
  },
);

export const loginThunk = createAsyncThunk(
  "app/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    const response = await loginUser(email, password);

    if (response.requires_2fa) {
      return rejectWithValue({
        requires_2fa: true,
        temp_token: response.temp_token,
      });
    }

    api.setTokens(response.access_token!, response.refresh_token!);

    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Failed to get user profile after login");
    }

    return user;
  },
);

export const verify2FAThunk = createAsyncThunk(
  "app/verify2fa",
  async ({ token, code }: { token: string; code: string }) => {
    await verify2FA(token, code);
    const user = getCurrentUser();
    if (!user) {
      throw new Error("2FA verified but failed to fetch user profile");
    }
    return user;
  },
);

export const resend2FAThunk = createAsyncThunk(
  "app/resend2fa",
  async ({ token }: { token: string }) => {
    const result = await resend2FACode(token);
    return result;
  },
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  api.clearTokens();
  return null;
});

export const fetchBasicUserDataThunk = createAsyncThunk(
  "app/getuserbasic",
  async ({ user_id }: { user_id: number }) => {
    console.log("fetchBasicUserDataThunk");
    const response = await getUserDashboard(user_id);
    if (!response) {
      throw new Error("Failed to fetch user dashboard data");
    }

    return response;
  },
);

const initialUserAppState: UserAppState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  id: 0,
  first_name: "",
  is_2fa_enabled: false,
  is_active: true,
  temperature_unit: TemperatureUnit.FAHRENHEIT,
  trips: [],
  travelers: [],
  routines: [],
};

const appSlice = createSlice({
  name: "app",
  initialState: initialUserAppState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // initialize auth
      .addCase(initializeAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuthThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initializeAuthThunk.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message ?? "User authentification failed.";
      })
      // login
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;

        const payload = action.payload as
          | { requires_2fa?: boolean }
          | undefined;
        if (!payload?.requires_2fa) {
          state.error = action.error.message ?? "Login failed";
        }
      })
      // 2fa verify and login
      .addCase(verify2FAThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verify2FAThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(verify2FAThunk.rejected, (state, action) => {
        state.isLoading = false;

        const payload = action.payload as
          | { requires_2fa?: boolean }
          | undefined;
        if (!payload?.requires_2fa) {
          state.error = action.error.message ?? "Verification failed";
        }
      })
      // fetch basic user data for dashboard
      .addCase(fetchBasicUserDataThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBasicUserDataThunk.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = null;
        state.temperature_unit =
          state.temperature_unit ?? TemperatureUnit.FAHRENHEIT;
        state.trips = data.trips;
        state.travelers = data.travelers;
        state.routines = data.routines;
      })
      .addCase(fetchBasicUserDataThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message ?? "Unable to fetch basic user data";
      })

      // logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// selectors
export const selectCurrentUser = (state: RootState) => state.app.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.app.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.app.isLoading;
export const selectAuthError = (state: RootState) => state.app.error;
export const selectUserId = (state: RootState) => state.app.user?.id ?? 1;
export const selectTrips = (state: RootState) => state.app.trips ?? [];
export const selectTravelers = (state: RootState) => state.app.travelers ?? [];

export default appSlice.reducer;
