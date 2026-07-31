import React from "react";
import "./StatusBadge.css";

const COLORS = {
  Active: "success",
  Inactive: "secondary",
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
  Cancelled: "danger",
  Completed: "primary",
  Booked: "info",
  Running: "primary",
  Scheduled: "dark",
  Paid: "success",
  Unpaid: "danger",
};

function StatusBadge({ status = "Pending" }) {
  const badgeClass = COLORS[status] || "secondary";

  return (
    <span className={`status-badge ${badgeClass}`}>
      {status}
    </span>
  );
}

export default StatusBadge;