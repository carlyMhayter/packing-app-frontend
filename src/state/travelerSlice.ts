import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import { TemperatureUnit } from "../enums/enums.ts";
import {
  type TravelerPublicState,
  type TravelerPublic,
} from "../types/travelers.ts";
import { getTravelerById, updateTraveler } from "../services/travelers.ts";

export const fetchTravelerThunk = createAsyncThunk(
  "traveler/getTraveler",
  async ({ traveler_id }: { traveler_id: number }) => {
    const response = await getTravelerById(traveler_id);
    if (!response) {
      throw new Error("Failed to fetch traveler data");
    }

    return response;
  },
);

export const updateTravelerThunk = createAsyncThunk(
  "traveler/updateTraveler",
  async ({ payload }: { payload: Partial<TravelerPublic> }) => {
    const response = await updateTraveler(Number(payload.id), payload);
    if (!response) {
      throw new Error("Failed to fetch traveler data");
    }

    return response;
  },
);

const initialTravelerState: TravelerPublicState = {
  isLoading: true,
  error: null,
  name: "",
  traveler_type: "adult",
  temp_unit: TemperatureUnit.FAHRENHEIT,
  temp_pref: JSON.stringify({ cold: 32, cool: 55, warm: 75, hot: 90 }),
  is_active: true,
  user_id: 0,
  id: 0,
  trip_ids: [],
  clothing_preference: null,
  trip_travelers: [],

  is_primary_for_user: true,
};

const travelerSlice = createSlice({
  name: "traveler",
  initialState: initialTravelerState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get traveler
      .addCase(fetchTravelerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTravelerThunk.fulfilled, (state, action) => {
        const data = action.payload;
        console.log("data in thunk", data);

        state.name = data.name;
        state.traveler_type = data.traveler_type;
        state.temp_unit = data.temp_unit;
        state.temp_pref = data.temp_pref;
        state.is_active = data.is_active;
        state.user_id = data.user_id;
        state.id = data.id;
        state.trip_ids = data.trip_ids;
        state.is_primary_for_user = data.is_primary_for_user;
        state.clothing_preference = data.clothing_preference;
        state.trip_travelers = data.trip_travelers;
        state.isLoading = false;
      })
      .addCase(fetchTravelerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Traveler fetch failed.";
      })
      // update traveler
      .addCase(updateTravelerThunk.fulfilled, (state, action) => {
        const data = action.payload;
        state.name = data.name;
        state.traveler_type = data.traveler_type;
        state.temp_unit = data.temp_unit;
        state.temp_pref = data.temp_pref;
        state.is_active = data.is_active;
        state.user_id = data.user_id;
        state.id = data.id;
        state.trip_ids = data.trip_ids;
        state.is_primary_for_user = data.is_primary_for_user;
        state.clothing_preference = data.clothing_preference;
        state.trip_travelers = data.trip_travelers;
        state.isLoading = false;
      })
      .addCase(updateTravelerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Traveler update failed.";
      });
  },
});

// selectors
export const selectTraveler = (state: RootState) => state.traveler;
export const selectIsActive = (state: RootState) => state.traveler.is_active;
export const selectLoading = (state: RootState) => state.traveler.isLoading;
export const selectError = (state: RootState) => state.traveler.error;
export const selectUserId = (state: RootState) => state.traveler.user_id ?? 1;
export const selectTrips = (state: RootState) => state.traveler.trip_ids ?? [];

export default travelerSlice.reducer;
