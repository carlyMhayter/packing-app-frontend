import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecentTrips } from "../services/trips";
import type { TripPublicState } from "../types/trip";
import type { RootState } from "./store";
import { getTripById } from "../services/trips";
import { fetchTravelersForTrip } from "../services/trips";

// fetches the 4 most recent trips for a given userId
export const loadRecentTrips = createAsyncThunk(
  "trips/loadRecent",
  async (userId: number) => {
    return fetchRecentTrips(4, userId);
  },
);

// fetches a trip by its ID
export const loadTripThunk = createAsyncThunk(
  "trips/loadById",
  async ({ trip_id, user_id }: { trip_id: number; user_id: number }) => {
    console.log("loadTripThunk");
    return getTripById(trip_id, user_id); //
  },
);

// fetches a trip by its ID
export const loadTripTravelersThunk = createAsyncThunk(
  "trips/loadTripTravelers",
  async ({ trip_id }: { trip_id: number }) => {
    console.log("loadTripTravelersThunk");
    return fetchTravelersForTrip(trip_id); //
  },
);

const intialState: TripPublicState = {
  isLoading: false,
  error: null,
  forecastTrip: null,
  id: 0,
  name: null,
  updated_at: null,
  departure_date: null,
  arrival_date: null,
  destinations: [],
  created_at: null,
  travelers: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // loadTripById
      .addCase(loadTripThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadTripThunk.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.forecastTrip = data.forecast_trip;
        state.id = data.id;
        state.name = data.name;
        state.updated_at = data.updated_at;
        state.departure_date = data.departure_date;
        state.arrival_date = data.arrival_date;
        state.destinations = data.destinations;
        state.created_at = data.created_at;
        state.travelers = data.travelers;
      })
      .addCase(loadTripThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to load trip";
      });
  },
});

// Status selectors
export const selectTripsIsLoading = (state: RootState) => state.trip.isLoading;
export const selectTripsError = (state: RootState) => state.trip.error;
export const selectTrip = (state: RootState) => state.trip;
export const selectTripDestinations = (state: RootState) =>
  state.trip.destinations;
export const selectTripTravelers = (state: RootState) => state.trip.travelers;

export default tripSlice.reducer;
