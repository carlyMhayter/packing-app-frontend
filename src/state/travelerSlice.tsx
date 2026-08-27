import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const blankTravelerData = [
  {
    id: "",
    name: "",
    type: "adult",
    temperaturePreferences: {
      cold: 0,
      cool: 0,
      warm: 0,
      hot: 0,
      unit: "F",
    },
    medications: [],
    routineIds: [],
    clothingPreferences: {
      tops: [],
      bottoms: [],
      outerwear: [],
      footwear: [],
      accessories: [],
    },
  },
];

const travelerSlice = createSlice({
  name: "travelers",
  initialState: blankTravelerData,
  reducers: {
    addTraveler: (state, action: PayloadAction<typeof blankTravelerData>) => {
      return [...state, ...action.payload];
    },
    deleteTraveler: (state, action: PayloadAction<string>) => {
      return state.filter((traveler) => traveler.id !== action.payload);
    },
    updateTraveler: (
      state,
      action: PayloadAction<typeof blankTravelerData>,
    ) => {
      const updatedTraveler = action.payload[0];
      const index = state.findIndex(
        (traveler) => traveler.id === updatedTraveler.id,
      );
      if (index !== -1) {
        state[index] = updatedTraveler;
      }
    },
  },
});

export const { addTraveler, deleteTraveler, updateTraveler } =
  travelerSlice.actions;
export default travelerSlice.reducer;
