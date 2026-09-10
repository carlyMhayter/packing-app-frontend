import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ActivitiesPublicState } from "../types/activities";
import type { RootState } from "./store";
import { getActivityById, fetchAllActivities } from "../services/activities";

// fetches all activities
export const fetchAllActivitiesThunk = createAsyncThunk(
  "activities/fetchAll",
  async () => {
    return fetchAllActivities();
  },
);

// fetches a activity by its ID
export const fetchActivityThunk = createAsyncThunk(
  "activities/fetchById",
  async ({ activity_id }: { activity_id: number }) => {
    console.log("fetchActivityThunk");
    return getActivityById(activity_id); //
  },
);

const intialState: ActivitiesPublicState = {
  isLoading: false,
  error: null,
  activities: [],
};

const activitySlice = createSlice({
  name: "activity",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllActivitiesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllActivitiesThunk.fulfilled, (state, action) => {
        const data = action.payload;
        state.isLoading = false;
        state.activities = data;
      })
      .addCase(fetchAllActivitiesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch activities";
      });
  },
});

// Status selectors
export const selectActivitiesIsLoading = (state: RootState) =>
  state.activities.isLoading;
export const selectActivitiesError = (state: RootState) =>
  state.activities.error;
export const selectActivities = (state: RootState) =>
  state.activities.activities;

export default activitySlice.reducer;
