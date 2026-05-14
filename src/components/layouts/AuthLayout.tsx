import { Outlet } from "react-router";
import nameLogo from "../../assets/text_&_logo.png";
import AnimatedBorder from "../animations/border/AnimatedBorder";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <img src={nameLogo} alt="Packing App" className="auth-name-logo" />
      <p>Packing as unique as you are!</p>
      <AnimatedBorder className="auth-card">
        <Outlet />
      </AnimatedBorder>
    </div>
  );
}
