import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import {
  type ClothingPrefPublicState,
  type ClothingPrefPublic,
} from "../types/clothingPrefs.ts";
import {
  getClothingPrefById,
  updateClothingPref,
} from "../services/clothingPrefs.ts";

export const fetchClothingPrefThunk = createAsyncThunk(
  "clothingPref/getClothingPref",
  async ({ clothingPref_id }: { clothingPref_id: number }) => {
    const response = await getClothingPrefById(clothingPref_id);
    if (!response) {
      throw new Error("Failed to fetch clothingPref data");
    }

    return response;
  },
);

export const updateClothingPrefThunk = createAsyncThunk(
  "clothingPref/updateClothingPref",
  async ({ payload }: { payload: Partial<ClothingPrefPublic> }) => {
    const response = await updateClothingPref(Number(payload.id), payload);
    if (!response) {
      throw new Error("Failed to fetch clothingPref data");
    }

    return response;
  },
);

const initialClothingPrefState: ClothingPrefPublicState = {
  isLoading: true,
  error: null,
  name: "",
  id: 0,
  description: "",
  preferences: "",
  creator_id: 0,
  parent_preference_id: 0,
  traveler_id: 0,
  trip_traveler_id: 0,
  is_master_from_template: false,
  created_at: null,
  updated_at: null,
};

const clothingPrefSlice = createSlice({
  name: "clothingPref",
  initialState: initialClothingPrefState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get clothingPref
      .addCase(fetchClothingPrefThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchClothingPrefThunk.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = null;
        state.name = data.name;
        state.id = data.id;
        state.preferences = data.preferences;
        state.created_at = data.created_at;
        state.updated_at = data.updated_at;
        state.description = data.description;
        state.is_master_from_template = data.is_master_from_template;
        state.creator_id = data.creator_id;
        state.traveler_id = data.traveler_id;
        state.parent_preference_id = data.parent_preference_id;
      })
      .addCase(fetchClothingPrefThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "ClothingPref fetch failed.";
      })
      // update clothingPref
      .addCase(updateClothingPrefThunk.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.name = data.name;
        state.id = data.id;
        state.created_at = data.created_at;
        state.updated_at = data.updated_at;
        state.description = data.description;
        state.includes_hair_care = data.includes_hair_care;
        state.includes_skin_care = data.includes_skin_care;
        state.includes_body_care = data.includes_body_care;
        state.includes_hygiene = data.includes_hygiene;
        state.includes_nail_care = data.includes_nail_care;
        state.includes_makeup = data.includes_makeup;
        state.includes_makeup_tools = data.includes_makeup_tools;
        state.includes_fragrance = data.includes_fragrance;
        state.includes_feminine_hygiene = data.includes_feminine_hygiene;
        state.is_master_from_template = data.is_master_from_template;
        state.creator_id = data.creator_id;
        state.parent_clothingPref_id = data.parent_clothingPref_id;
        state.clothingPref_steps = data.clothingPref_steps;
        state.travelers = data.travelers;
        state.traveler_id = data.traveler_id;
        state.trip_travelers = data.trip_travelers;
      })
      .addCase(updateClothingPrefThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "ClothingPref update failed.";
      });
  },
});

// selectors
export const selectClothingPref = (state: RootState) => state.clothingPref;
export const selectLoading = (state: RootState) => state.clothingPref.isLoading;
export const selectError = (state: RootState) => state.clothingPref.error;
export const selectTravelers = (state: RootState) =>
  state.clothingPref.travelers ?? [];
export const selectTripTravelers = (state: RootState) =>
  state.clothingPref.trip_travelers ?? [];
export const selectSteps = (state: RootState) =>
  state.clothingPref.clothingPref_steps ?? [];

export default clothingPrefSlice.reducer;
