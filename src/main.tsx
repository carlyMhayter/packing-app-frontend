import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./app/routes.tsx";
import { Provider } from "react-redux";
import store from "./state/store.ts";
import AppInitializer from "./appInitializer.tsx";

export const root = createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
    </Provider>
  </StrictMode>,
);
