import React from "react";
import "./BookingCard.css";

function BookingCard({
  bookingNo,
  service,
  guest,
  pickup,
  drop,
  date,
  time,
  vehicle,
  fare,
  status,
  onView,
}) {
  const badgeClass = {
    Pending: "warning",
    Confirmed: "success",
    Cancelled: "danger",
    Completed: "primary",
  };

  return (
    <div className="card booking-card shadow-sm border-0 mb-3">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="booking-no">{bookingNo}</h5>
            <small className="text-muted">{service}</small>
          </div>

          <span className={`badge bg-${badgeClass[status] || "secondary"}`}>
            {status}
          </span>
        </div>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label>Guest</label>
            <p>{guest}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label>Vehicle</label>
            <p>{vehicle}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label>Pickup</label>
            <p>{pickup}</p>
          </div>

          <div className="col-md-6 mb-3">
            <label>Drop</label>
            <p>{drop}</p>
          </div>

          <div className="col-md-4 mb-3">
            <label>Date</label>
            <p>{date}</p>
          </div>

          <div className="col-md-4 mb-3">
            <label>Time</label>
            <p>{time}</p>
          </div>

          <div className="col-md-4 mb-3">
            <label>Fare</label>
            <p className="booking-fare">₹{fare}</p>
          </div>

        </div>

        <div className="text-end">
          <button
            className="btn btn-success"
            onClick={onView}
          >
            View Details
          </button>
        </div>

      </div>
    </div>
  );
}

export default BookingCard;