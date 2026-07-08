// import { useState } from "react";
import { sub } from "date-fns";
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
  function subarraySum(arr, target) {
    // code here
    const answer = arr.filter((item, index) => {
      let prev = 0;
      let next = 0;
      let sum = 0;

      if (index > 0) {
        prev = arr[index - 1];
        next = arr[index + 1];
        sum = prev + next + item;
        if (sum === target) {
          console.log([prev, next]);

          return [prev, next];
        }
      } else if (index + 1 <= arr.length + 1) {
        prev = arr[index - 1];
        next = arr[index + 1];
        sum = prev + next + item;
        if (sum === target) {
          console.log([prev, next]);

          return [prev, next];
        }
      }
    });
    if (answer.length === 0) {
      console.log("no answer");
      return -1;
    }
  }

  subarraySum([1, 2, 12, 4, 95], 9);
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
