import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice.ts";
import travelerReducer from "./travelerSlice.ts";
import tripReducer from "./tripSlice.tsx";
import routineReducer from "./routineSlice.ts";
import clothingPrefReducer from "./clothingPrefSlice.ts";
import activitiesReducer from "./activitySlice.tsx";
import packingListReducer from "./packingListSlice.tsx";

const store = configureStore({
  reducer: {
    app: appReducer,
    traveler: travelerReducer,
    trip: tripReducer,
    routine: routineReducer,
    clothingPref: clothingPrefReducer,
    activities: activitiesReducer,
    packingList: packingListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
