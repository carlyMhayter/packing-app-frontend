import { useEffect } from "react";
import TripSection from "./TripSection";
import "./styles/dashboard.css";
import TravelerSection from "./TravelerSection";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectCurrentUser,
  fetchBasicUserDataThunk,
} from "../../../state/appSlice";
import RoutinesSection from "./RoutinesSection";

export default function Dashboard() {
  const user = useAppSelector(selectCurrentUser);
  const displayName = user?.first_name ?? user?.email?.split("@")[0] ?? "there";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.id) {
      console.log("useEffect");
      dispatch(fetchBasicUserDataThunk({ user_id: user.id }));
    } else {
      return;
    }
  }, [user]);
  console.log(user);
  return (
    <div className="dashboard">
      <h1 className="dashboard-welcome">Welcome {displayName}!</h1>

      <div className="dashboard-grid">
        <TripSection />
        <TravelerSection />
        <RoutinesSection />
      </div>
    </div>
  );
}
