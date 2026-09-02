import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice.ts";
import travelerReducer from "./travelerSlice.ts";
import tripReducer from "./tripSlice.tsx";
import routineReducer from "./routineSlice.ts";

const store = configureStore({
  reducer: {
    app: appReducer,
    traveler: travelerReducer,
    trip: tripReducer,
    routine: routineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
