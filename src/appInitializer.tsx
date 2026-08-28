import { useEffect } from "react";
import "./index.css";
import { initializeAuthThunk } from "./state/appSlice.ts";
import { useAppDispatch } from "./hooks/reduxHooks.ts";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuthThunk());
  }, [dispatch]);

  return children;
}
