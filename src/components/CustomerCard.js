import React from "react";
import "./CustomerCard.css";

function CustomerCard({
  customerName,
  mobile,
  email,
  pickup,
  destination,
  travelDate,
  passengers,
  bookingStatus,
}) {
  return (
    <div className="card customer-card shadow-sm border-0">
      <div className="card-header customer-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Customer Details</h5>

        <span
          className={`badge ${
            bookingStatus === "Confirmed"
              ? "bg-success"
              : bookingStatus === "Pending"
              ? "bg-warning text-dark"
              : "bg-danger"
          }`}
        >
          {bookingStatus}
        </span>
      </div>

      <div className="card-body">

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Name</label>
            <p>{customerName}</p>
          </div>

          <div className="col-md-6">
            <label>Mobile</label>
            <p>{mobile}</p>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Email</label>
            <p>{email}</p>
          </div>

          <div className="col-md-6">
            <label>Passengers</label>
            <p>{passengers}</p>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Pickup</label>
            <p>{pickup}</p>
          </div>

          <div className="col-md-6">
            <label>Destination</label>
            <p>{destination}</p>
          </div>
        </div>

        <div>
          <label>Travel Date</label>
          <p>{travelDate}</p>
        </div>

      </div>
    </div>
  );
}

export default CustomerCard;