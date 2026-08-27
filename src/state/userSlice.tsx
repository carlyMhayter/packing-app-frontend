import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { fetchRecentTrips } from "../services/trips";
import type { TripPublic } from "../types/trip";
import type { RootState } from "./app/authStore";
