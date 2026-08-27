import { useEffect } from "react";
import "./index.css";
import { initializeAuth } from "./state/app/authSlice.ts";
import { useAppDispatch } from "./hooks/reduxHooks.ts";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return children;
}
