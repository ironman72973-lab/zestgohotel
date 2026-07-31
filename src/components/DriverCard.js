import React from "react";
import "./DriverCard.css";
import { FaUser, FaPhoneAlt, FaCar, FaIdBadge, FaCircle } from "react-icons/fa";

function DriverCard({
  driverName,
  mobile,
  vehicleNumber,
  vehicleType,
  status = "Available",
  image,
  onClick,
}) {
  return (
    <div className="driver-card" onClick={onClick}>
      <div className="driver-card-header">
        <img
          src={image || "https://via.placeholder.com/80"}
          alt={driverName}
          className="driver-image"
        />

        <div className="driver-info">
          <h5>{driverName}</h5>
          <span className={`driver-status ${status.toLowerCase()}`}>
            <FaCircle /> {status}
          </span>
        </div>
      </div>

      <div className="driver-card-body">

        <div className="driver-row">
          <FaPhoneAlt />
          <span>{mobile}</span>
        </div>

        <div className="driver-row">
          <FaCar />
          <span>{vehicleNumber}</span>
        </div>

        <div className="driver-row">
          <FaIdBadge />
          <span>{vehicleType}</span>
        </div>

      </div>
    </div>
  );
}

export default DriverCard;