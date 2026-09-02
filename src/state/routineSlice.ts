import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import {
  type RoutinePublicState,
  type RoutinePublic,
} from "../types/routine.ts";
import { getRoutineById, updateRoutine } from "../services/routines.ts";

export const fetchRoutineThunk = createAsyncThunk(
  "routine/getRoutine",
  async ({ routine_id }: { routine_id: number }) => {
    const response = await getRoutineById(routine_id);
    if (!response) {
      throw new Error("Failed to fetch routine data");
    }

    return response;
  },
);

export const updateRoutineThunk = createAsyncThunk(
  "routine/updateRoutine",
  async ({ payload }: { payload: Partial<RoutinePublic> }) => {
    const response = await updateRoutine(Number(payload.id), payload);
    if (!response) {
      throw new Error("Failed to fetch routine data");
    }

    return response;
  },
);

const initialRoutineState: RoutinePublicState = {
  isLoading: true,
  error: null,
  name: "",
  id: 0,
  created_at: null,
  updated_at: null,
  description: "",
  includes_hair_care: false,
  includes_skin_care: false,
  includes_body_care: false,
  includes_hygiene: false,
  includes_nail_care: false,
  includes_makeup: false,
  includes_makeup_tools: false,
  includes_fragrance: false,
  includes_feminine_hygiene: false,
  is_master_from_template: false,
  creator_id: 0,
  parent_routine_id: 0,
  routine_steps: [],
  travelers: null,
  traveler_id: 0,
  trip_travelers: [],
};

const routineSlice = createSlice({
  name: "routine",
  initialState: initialRoutineState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get routine
      .addCase(fetchRoutineThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRoutineThunk.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.error = null;
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
        state.parent_routine_id = data.parent_routine_id;
        state.routine_steps = data.routine_steps;
        state.travelers = data.travelers;
        state.traveler_id = data.traveler_id;
        state.trip_travelers = data.trip_travelers;
      })
      .addCase(fetchRoutineThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Routine fetch failed.";
      })
      // update routine
      .addCase(updateRoutineThunk.fulfilled, (state, action) => {
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
        state.parent_routine_id = data.parent_routine_id;
        state.routine_steps = data.routine_steps;
        state.travelers = data.travelers;
        state.traveler_id = data.traveler_id;
        state.trip_travelers = data.trip_travelers;
      })
      .addCase(updateRoutineThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Routine update failed.";
      });
  },
});

// selectors
export const selectRoutine = (state: RootState) => state.routine;
export const selectLoading = (state: RootState) => state.routine.isLoading;
export const selectError = (state: RootState) => state.routine.error;
export const selectTravelers = (state: RootState) =>
  state.routine.travelers ?? [];
export const selectTripTravelers = (state: RootState) =>
  state.routine.trip_travelers ?? [];
export const selectSteps = (state: RootState) =>
  state.routine.routine_steps ?? [];

export default routineSlice.reducer;
