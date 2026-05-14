import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Login from "../components/auth/login/login";
import CreateUser from "../components/auth/createUser";
import RetrievePassword from "../components/auth/retrievePassword/retrievePassword";
import ResetPassword from "../components/auth/resetPassword/resetPassword";
import TwoFactorAuth from "../components/auth/twoFactorAuth/twoFactorAuth";
import Homepage from "../components/home/homepage";
import Dashboard from "../components/home/dashboard/dashboard";

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
        Component: DashboardLayout,
        children: [{ index: true, Component: Dashboard }],
      },
    ],
  },
]);

export default router;
