import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchRecentTrips } from "../services/trips";
import type { TripPublic } from "../types/trip";
import type { RootState } from "./store";

// maintains trip ids in sorted order
// by last updated date, most recent first
// normalizes trip data
const tripsAdapter = createEntityAdapter<TripPublic>({
  sortComparer: (a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
});

// fetches the 4 most recent trips for a given userId
export const loadRecentTrips = createAsyncThunk(
  "trips/loadRecent",
  async (userId: number) => {
    return fetchRecentTrips(4, userId);
  },
);

// fetches a trip by its ID
export const loadTripById = createAsyncThunk(
  "trips/loadById",
  async ({ tripId, userId }: { tripId: string; userId: number }) => {
    const { getTripById } = await import("../services/trips");
    return getTripById(tripId, userId); // Your existing API call
  },
);

// fetches a trip by its ID
export const selectTripDetailById = createAsyncThunk(
  "trips/loadByIdDetail",
  async ({ tripId, userId }: { tripId: string; userId: number }) => {
    const { getTripById } = await import("../services/trips");
    const trip = await getTripById(tripId, userId);
    return trip;
  },
);

const tripSlice = createSlice({
  name: "trip",
  initialState: tripsAdapter.getInitialState({
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      //loadRecentTrips
      .addCase(loadRecentTrips.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadRecentTrips.fulfilled, (state, action) => {
        state.status = "succeeded";
        tripsAdapter.setAll(state, action.payload); // or upsertMany
      })
      .addCase(loadRecentTrips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })

      // loadTripById
      .addCase(loadTripById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadTripById.fulfilled, (state, action) => {
        state.status = "succeeded";
        tripsAdapter.upsertOne(state, action.payload);
      })
      .addCase(loadTripById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load trip";
      })

      // selectTripDetailById
      .addCase(selectTripDetailById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(selectTripDetailById.fulfilled, (state, action) => {
        state.status = "succeeded";
        tripsAdapter.upsertOne(state, action.payload);
      })
      .addCase(selectTripDetailById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load trip";
      });
  },
});

// Status selectors
export const selectTripsStatus = (state: RootState) => state.trip.status;
export const selectTripsError = (state: RootState) => state.trip.error;

export default tripSlice.reducer;
