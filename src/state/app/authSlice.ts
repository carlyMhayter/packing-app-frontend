import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./authStore.ts";
import { type User, type AuthState } from "../../types/auth.ts";
import { api } from "../../services/api.ts";

// Initialize auth on app startup
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.request("/auth/me", { method: "GET" });
      if (response.ok) {
        return (await response.json()) as User;
      }
      // Fallback to test user for development
      return { id: 1, email: "test@example.com" } as User;
    } catch {
      return { id: 1, email: "test@example.com" } as User;
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: User) => {
    return userData;
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  api.clearTokens();
  return null;
});

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isLoading = false;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectUserId = (state: RootState) => state.auth.user?.id ?? 1;

export default authSlice.reducer;
