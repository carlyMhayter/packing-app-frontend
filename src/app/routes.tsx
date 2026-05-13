import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login";
import CreateUser from "../components/auth/createUser";
// import root as Root from "../main";
import Home from "../components/dashboard/home";

const router = createBrowserRouter([
  {
    path: "/",
    // Component: Root,
    children: [
      { index: true, Component: Home },
      //   { path: "about", Component: About },
      {
        path: "auth",
        children: [
          { path: "login", Component: Login },
          { path: "create_user", Component: CreateUser },
        ],
      },
      //   {
      //     path: "concerts",
      //     children: [
      //       { index: true, Component: ConcertsHome },
      //       { path: ":city", Component: ConcertsCity },
      //       { path: "trending", Component: ConcertsTrending },
      //     ],
      //   },
    ],
  },
]);

export default router;
