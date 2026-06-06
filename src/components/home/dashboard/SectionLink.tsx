import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelerEditModal from "../../modals/travelerEdit/TravelerEditModal";
import "./styles/dashboard.css";

export function SectionLink({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <button
      className="dashboard-section-title"
      onClick={() => navigate("/dashboard")}
      type="button"
    >
      {children}
    </button>
  );
}
