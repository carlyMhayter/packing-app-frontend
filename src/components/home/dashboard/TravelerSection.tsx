import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
// import { fetchRecentTravelers } from "../../../services/travelers";
// import { type Traveler } from "../../../types/traveler";
import DashboardSection from "./DashboardSection";

export default function TravelerSection() {
  //   const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [travelers, setTravelers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     fetchRecentTravelers(4)
  //       .then((response: any) => {
  //         console.log("Fetched travelers:", response);
  //         setTravelers(response);
  //         setIsLoading(false);
  //       })
  //       .catch((err: Error) => console.error(err));
  //   }, []);

  if (isLoading) {
    return (
      <DashboardSection title="Travelers">
        <div className="dashboard-section-body">Loading.....</div>
        <div className="dashboard-section-footer">
          <button
            className="sci-btn"
            onClick={() => navigate("/traveler_planner")}
            type="button"
          >
            + Add New Traveler
          </button>
        </div>
      </DashboardSection>
    );
  }

  console.log("Travelers to display:", travelers);
  console.log("Travelers length:", travelers.length);
  console.log("Travelers isLoading:", isLoading);

  return (
    <DashboardSection title="Travelers">
      <p className="dashboard-empty-line">No travelers yet!</p>
      <p className="dashboard-empty-line">Let&apos;s get started!</p>
      <div className="dashboard-section-footer">
        <button
          className="sci-btn"
          onClick={() => navigate("/traveler_planner")}
          type="button"
        >
          + Add New Traveler
        </button>
      </div>
    </DashboardSection>
  );
}
