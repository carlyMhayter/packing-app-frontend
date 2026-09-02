import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import InternalLayout from "../components/layouts/InternalLayout.tsx";
import Login from "../components/auth/login/login";
import CreateUser from "../components/auth/createUser";
import RetrievePassword from "../components/auth/retrievePassword/retrievePassword";
import ResetPassword from "../components/auth/resetPassword/resetPassword";
import TwoFactorAuth from "../components/auth/twoFactorAuth/twoFactorAuth";
import Homepage from "../components/home/homepage";
import Dashboard from "../components/home/dashboard/dashboard";
import TripPlanner from "../components/trips/tripPlanner/tripPlanner";
import PackingPlanner from "../components/packingPlanner/packingPlanner.tsx";
import TravelerPage from "../components/traveler/travelerPage.tsx";
import TripPage from "../components/trips/TripPage.tsx";
import AccountSettings from "../components/accountSettings/accountSettings.tsx";
import TripsListPage from "../components/trips/TripsListPage.tsx";
import RoutinePage from "../components/routines/routinePage.tsx";
// function ProtectedRoute({ children }: { children: ReactNode }) {
//   const { isAuthenticated, isLoading } = useAuth();
//   if (isLoading) return <LoadingDots />;
//   if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
//   return <>{children}</>;
// }

// function ProtectedInternalLayout() {
//   return (
//     <ProtectedRoute>
//       <InternalLayout />
//     </ProtectedRoute>
//   );
// }

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Homepage },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "create_user", Component: CreateUser },
          { path: "retrieve_password", Component: RetrievePassword },
          { path: "reset_password", Component: ResetPassword },
          { path: "two_factor", Component: TwoFactorAuth },
        ],
      },
      {
        path: "dashboard",
        Component: InternalLayout,
        children: [{ index: true, Component: Dashboard }],
      },
      {
        path: "packing_planner",
        Component: InternalLayout,
        children: [{ index: true, Component: PackingPlanner }],
      },
      {
        path: "travelers/:traveler_id",
        Component: InternalLayout,
        children: [{ index: true, Component: TravelerPage }],
      },
      {
        path: "routines/:routine_id",
        Component: InternalLayout,
        children: [{ index: true, Component: RoutinePage }],
      },
      {
        path: "trips",
        Component: InternalLayout,
        children: [{ index: true, Component: TripsListPage }],
      },
      {
        path: "trips/:trip_id",
        Component: InternalLayout,
        children: [{ index: true, Component: TripPage }],
      },
      {
        path: "trip_planner",
        Component: InternalLayout,
        children: [{ index: true, Component: TripPlanner }],
      },
      {
        path: "trip_summary",
        Component: InternalLayout,
        children: [{ index: true, Component: TripPlanner }],
      },
      {
        path: "account_settings",
        Component: InternalLayout,
        children: [{ index: true, Component: AccountSettings }],
      },
    ],
  },
]);

export default router;
