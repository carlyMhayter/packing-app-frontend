import { Outlet } from "react-router";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      {/* will either be <Home> or <Settings> */}
      <Outlet />
    </div>
  );
}
