import React from "react";
import {
    FaPlaneArrival,
    FaHotel,
    FaUser,
    FaPhone,
    FaCar,
    FaSuitcase,
    FaUsers,
    FaReceipt,
    FaPercent,
    FaIndianRupeeSign,
    FaCircleCheck,
    FaFloppyDisk,
    FaPrint
} from "react-icons/fa6";

function BookingSummary({ booking, fare = 0 }) {

    const gst = Math.round(fare * 0.05);

    const commissionRate = 10;

    const commission = Math.round(fare * commissionRate / 100);

    const grandTotal = fare + gst;

    return (

        <div className="booking-summary sticky-top">

            {/* Header */}

            <div className="summary-header">

                <h4>

                    Booking Summary

                </h4>

                <span className="summary-status">

                    Draft

                </span>

            </div>

            {/* Service */}

            <div className="summary-section">

                <h6>

                    SERVICE

                </h6>

                <div className="summary-row">

                    <span>

                        <FaPlaneArrival />

                        Airport Pickup

                    </span>

                </div>

            </div>

            {/* Flight */}

            <div className="summary-section">

                <h6>

                    FLIGHT

                </h6>

                <div className="summary-row">

                    <span>

                        Airport

                    </span>

                    <strong>

                        {booking.airport || "--"}

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        Flight

                    </span>

                    <strong>

                        {booking.flightNumber || "--"}

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        Arrival

                    </span>

                    <strong>

                        {booking.arrivalDate || "--"}

                    </strong>

                </div>

            </div>

            {/* Hotel */}

            <div className="summary-section">

                <h6>

                    HOTEL

                </h6>

                <div className="summary-row">

                    <span>

                        <FaHotel />

                        Hotel

                    </span>

                    <strong>

                        {booking.hotel || "--"}

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        Room

                    </span>

                    <strong>

                        {booking.room || "--"}

                    </strong>

                </div>

            </div>

            {/* Guest */}

            <div className="summary-section">

                <h6>

                    GUEST

                </h6>

                <div className="summary-row">

                    <span>

                        <FaUser />

                        Guest

                    </span>

                    <strong>

                        {booking.guestName || "--"}

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        <FaPhone />

                        Mobile

                    </span>

                    <strong>

                        {booking.mobile || "--"}

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        <FaUsers />

                        Passengers

                    </span>

                    <strong>

                        {booking.adults || 1}

                    </strong>

                </div>

            </div>

            {/* Vehicle */}

            <div className="summary-section">

                <h6>

                    VEHICLE

                </h6>

                <div className="summary-row">

                    <span>

                        <FaCar />

                        Vehicle

                    </span>

                    <strong>

                        {booking.vehicle || "--"}

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        <FaSuitcase />

                        Luggage

                    </span>

                    <strong>

                        {booking.luggage || 1}

                    </strong>

                </div>

            </div>

            {/* Fare */}

            <div className="summary-section">

                <h6>

                    FARE BREAKDOWN

                </h6>

                <div className="summary-row">

                    <span>

                        Base Fare

                    </span>

                    <strong>

                        ₹{fare}

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        GST (5%)

                    </span>

                    <strong>

                        ₹{gst}

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        Hotel Commission

                    </span>

                    <strong className="text-success">

                        ₹{commission}

                    </strong>

                </div>

            </div>

            {/* Total */}

            <div className="summary-total">

                <span>

                    Grand Total

                </span>

                <h2>

                    ₹{grandTotal}

                </h2>

            </div>

            {/* Earnings */}

            <div className="earning-card">

                <div>

                    <FaPercent />

                </div>

                <div>

                    <h6>

                        Estimated Hotel Earnings

                    </h6>

                    <h3>

                        ₹{commission}

                    </h3>

                    <small>

                        {commissionRate}% Commission

                    </small>

                </div>

            </div>

            {/* Buttons */}

            <div className="d-grid gap-3 mt-4">

                <button className="btn btn-success btn-lg">

                    <FaCircleCheck className="me-2" />

                    Book Now

                </button>

                <button className="btn btn-outline-success">

                    <FaFloppyDisk className="me-2" />

                    Save Draft

                </button>

                <button className="btn btn-outline-secondary">

                    <FaPrint className="me-2" />

                    Print Quote

                </button>

            </div>

            {/* Footer */}

            <div className="summary-footer">

                <div>

                    ✓ Verified Drivers

                </div>

                <div>

                    ✓ Live GPS Tracking

                </div>

                <div>

                    ✓ 24×7 Support

                </div>

                <div>

                    ✓ Instant Confirmation

                </div>

            </div>

        </div>

    );

}

export default BookingSummary;