import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecentTrips } from "../services/trips";
import type { TripPublicState } from "../types/trip";
import type { RootState } from "./store";
import { getTripById } from "../services/trips";

// maintains trip ids in sorted order
// by last updated date, most recent first
// normalizes trip data
// const tripsAdapter = createEntityAdapter<TripPublic>({
//   sortComparer: (a, b) =>
//     new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
// });

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
        state.forecastTrip = data.forecastTrip;
        state.id = data.id;
        state.name = data.name;
        state.updated_at = data.updated_at;
        state.departure_date = data.departure_date;
        state.arrival_date = data.arrival_date;
        state.destinations = data.destinations;
        state.created_at = data.created_at;
      })
      .addCase(loadTripThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to load trip";
      });
  },
});

// Adapter selectors
// export const {
//   selectById: selectTripById,
//   selectIds: selecttrip_ids,
//   selectEntities: selectTripEntities,
//   selectAll: selectAllTrips,
//   selectTotal: selectTotalTrips,
// } = tripsAdapter.getSelectors<RootState>((state) => state.trip);

// Mapped selector for trip detail page
// export const selectTripDetailById = (
//   state: RootState,
//   trip_id: string,
// ): TripDetailData | null => {
//   const numericId = Number(trip_id);
//   const tripPublic = selectTripById(state, numericId);
//   console.log("tripPublic", tripPublic);
//   if (!tripPublic) return null;
//   return mapTripPublicToDetail(tripPublic);
// };

// Status selectors
export const selectTripsIsLoading = (state: RootState) => state.trip.isLoading;
export const selectTripsError = (state: RootState) => state.trip.error;
export const selectTrip = (state: RootState) => state.trip;
export const selectTripDestinations = (state: RootState) =>
  state.trip.destinations;

export default tripSlice.reducer;
