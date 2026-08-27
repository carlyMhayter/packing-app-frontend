import { configureStore } from "@reduxjs/toolkit";
import tripsReducer from "./tripSlice.tsx";

const store = configureStore({
  reducer: {
    trips: tripsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
