import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generatePackingList } from "../services/packingLists";
import type {
  PackingListCreationResponse,
  GeneratePackingListPayload,
} from "../types/packingLists";
import type { RootState } from "./store";

export const generatePackingListThunk = createAsyncThunk(
  "packingList/generate",
  async (payload: GeneratePackingListPayload) => {
    return generatePackingList(payload);
  },
);

interface PackingListState {
  generatedLists: PackingListCreationResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PackingListState = {
  generatedLists: [],
  isLoading: false,
  error: null,
};

const packingListSlice = createSlice({
  name: "packingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generatePackingListThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generatePackingListThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.generatedLists = action.payload;
      })
      .addCase(generatePackingListThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to generate packing list";
      });
  },
});

export const selectGeneratedLists = (state: RootState) =>
  state.packingList.generatedLists;
export const selectPackingListById = (state: RootState, listId: number) =>
  state.packingList.generatedLists.find((item) => item.list.id === listId);
export const selectPackingListIsLoading = (state: RootState) =>
  state.packingList.isLoading;
export const selectPackingListError = (state: RootState) =>
  state.packingList.error;

export default packingListSlice.reducer;
