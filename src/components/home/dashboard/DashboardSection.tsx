import React from "react";
import "./styles/dashboard.css";
import { SectionLink } from "./SectionLink";

type Props = {
  title: string;
  children: React.ReactNode;
};

function DashboardSection({ title, children }: Props) {
  return (
    <div
      className={`dashboard-section ${title.toLowerCase().includes("trip") ? "trip-section" : ""}`}
    >
      <div className="dashboard-section-header">
        <SectionLink>{title}</SectionLink>
      </div>
      <div className="dashboard-section-body">{children}</div>
    </div>
  );
}

export default DashboardSection;
