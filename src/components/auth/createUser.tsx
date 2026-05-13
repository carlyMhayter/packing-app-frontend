import { Outlet } from "react-router";

export default function CreateUser() {
  return (
    <div>
      <h1>Create User</h1>
      {/* will either be <Home> or <Settings> */}
      <Outlet />
    </div>
  );
}
