import React from "react";
import "./VehicleCard.css";

function VehicleCard({
  image,
  vehicleName,
  vehicleType,
  seats,
  luggage,
  acType,
  fare,
  status,
  onBook,
}) {
  return (
    <div className="vehicle-card shadow-sm">
      <div className="vehicle-image">
        <img
          src={image || "/images/no-vehicle.png"}
          alt={vehicleName}
        />
      </div>

      <div className="vehicle-body">
        <div className="vehicle-header">
          <h5>{vehicleName}</h5>
          <span
            className={
              status === "Available"
                ? "vehicle-status available"
                : "vehicle-status unavailable"
            }
          >
            {status}
          </span>
        </div>

        <p className="vehicle-type">{vehicleType}</p>

        <div className="vehicle-info">
          <div>
            <strong>Seats</strong>
            <span>{seats}</span>
          </div>

          <div>
            <strong>Luggage</strong>
            <span>{luggage}</span>
          </div>

          <div>
            <strong>AC</strong>
            <span>{acType}</span>
          </div>
        </div>

        <div className="vehicle-footer">
          <div>
            <small>Starting Fare</small>
            <h4>₹{fare}</h4>
          </div>

          <button
            className="btn btn-success"
            onClick={onBook}
            disabled={status !== "Available"}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;