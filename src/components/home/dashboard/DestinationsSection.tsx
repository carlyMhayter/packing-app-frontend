// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import TravelerEditModal from "../../modals/travelerEdit/TravelerEditModal";
// import TripSection from "./TripSection";
// import "./styles/dashboard.css";

function SectionLink({ children }: { children: React.ReactNode }) {
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

export default function DestinationsSection() {
  return (
    <div className="dashboard-section">
      <SectionLink> Recent Destinations</SectionLink>
      <div className="dashboard-section-body">
        <p className="dashboard-empty-line">No trips saved,</p>
        <p className="dashboard-empty-line">so no destinations</p>
        <p className="dashboard-empty-line">yet!</p>
      </div>
    </div>
  );
}
