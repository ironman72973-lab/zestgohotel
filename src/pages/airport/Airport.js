import React from "react";
import { Link } from "react-router-dom";
import "./airport.css";
import AirportBackground from "../../images/airport.png";
import AirportHero from "../../images/terminal.png";
import PickupImage from "../../images/car.png"
import DropImage from "../../images/car.png"
import PickupIcon from "../../images/takeoff.png"
import DropIcon from "../../images/plane.png"
const Airport = () => {
    return (
        <div
            className="airport-page"
            style={{
                backgroundImage: `url(${AirportBackground})`
            }}
        >
            <div className="airport-overlay">
                <div className="airport-container">
                    {/* ==========================================
                                HERO SECTION
                    =========================================== */}
                    <section className="hero-section">
                        <div className="hero-left">
                            <span className="hero-tag">
                                HOTEL PARTNER PORTAL
                            </span>
                            <h1>
                                Airport Transfers
                            </h1>
                            <p>
                                Book airport pickup and airport drop
                                services for your hotel guests with
                                professional drivers, instant booking
                                confirmation and real-time trip tracking.
                            </p>
                            <div className="hero-buttons">
                                <Link
                                    to="/airport/pickup"
                                    className="btn-primary-custom"
                                >
                                    Airport Pickup
                                </Link>
                                <Link
                                    to="/airport/drop"
                                    className="btn-secondary-custom"
                                >
                                    Airport Drop
                                </Link>
                            </div>
                        </div>
                        <div className="hero-right">
                            <img
                                src={AirportHero}
                                alt="Airport"
                            />
                        </div>
                    </section>
                    {/* ==========================================
                            PART 2 STARTS HERE
                    =========================================== */}
                    {/* ==========================================
                            QUICK SERVICES
                    ========================================== */}
                    <section className="service-section">
                        <div className="service-header">
                            <div>
                                <span className="section-tag">
                                    QUICK BOOKING
                                </span>
                                <h2>
                                    Airport Services
                                </h2>
                                <p>
                                    Create airport bookings for hotel guests
                                    in just a few clicks.
                                </p>
                            </div>
                        </div>
                        <div className="service-grid">
                            {/* ==================================
                                    AIRPORT PICKUP
                            =================================== */}
                            <div className="service-card pickup-card">
                                <div className="service-left">
                                    <span className="service-label">
    <img
        src={PickupIcon}
        alt="Pickup"
    />
    Airport Pickup
</span>
                                    <h3>
                                        Pickup Guests
                                        From Airport
                                    </h3>
                                    <p>
                                        Schedule guest pickup directly from
                                        the airport with professional
                                        drivers and live tracking.
                                    </p>
                                    <ul>
                                        <li>✓ Flight Tracking</li>
                                        <li>✓ Meet & Greet</li>
                                        <li>✓ Professional Driver</li>
                                        <li>✓ Live Tracking</li>
                                    </ul>
                                    <Link
                                        to="/airport/pickup"
                                        className="service-btn pickup-btn"
                                    >
                                        New Pickup Booking
                                    </Link>
                                </div>
                                <div className="service-right">
                                    <img
                                        src={PickupImage}
                                        alt="Airport Pickup"
                                    />
                                </div>
                            </div>
                            {/* ==================================
                                    AIRPORT DROP
                            =================================== */}
                            <div className="service-card drop-card">
                                <div className="service-left">
<span className="service-label">
    <img
        src={DropIcon}
        alt="Drop"
    />
    Airport Drop
</span>
                                    <h3>
                                        Drop Guests
                                        To Airport
                                    </h3>
                                    <p>
                                        Schedule timely airport drop
                                        with verified drivers and
                                        comfortable vehicles.
                                    </p>
                                    <ul>
                                        <li>✓ Timely Pickup</li>
                                        <li>✓ Comfortable Vehicle</li>
                                        <li>✓ Flight Reminder</li>
                                        <li>✓ 24×7 Support</li>
                                    </ul>
                                    <Link
                                        to="/airport/drop"
                                        className="service-btn drop-btn"
                                    >
                                        New Drop Booking
                                    </Link>
                                </div>
                                <div className="service-right">
                                    <img
                                        src={DropImage}
                                        alt="Airport Drop"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ==========================================
                            PART 3 STARTS HERE
                    ========================================== */}
                                        {/* ==========================================
                            DASHBOARD STATISTICS
                    ========================================== */}
                    <section className="stats-section">
                        <div className="stats-header">
                            <div>
                                <span className="section-tag">
                                    OVERVIEW
                                </span>
                                <h2>
                                    Today's Performance
                                </h2>
                                <p>
                                    Monitor today's airport booking activities.
                                </p>
                            </div>
                        </div>
                        <div className="stats-grid">
                            {/* Total */}
                            <div className="stats-card">
                                <div className="stats-icon total-icon">
                                    📋
                                </div>
                                <div className="stats-info">
                                    <h5>Total Bookings</h5>
                                    <h2>18</h2>
                                    <span>
                                        +12% Today
                                    </span>
                                </div>
                            </div>
                            {/* Pickup */}
                            <div className="stats-card">
                                <div className="stats-icon pickup-icon">
                                    🛬
                                </div>
                                <div className="stats-info">
                                    <h5>Airport Pickup</h5>
                                    <h2>09</h2>
                                    <span>
                                        5 Upcoming
                                    </span>
                                </div>
                            </div>
                            {/* Drop */}
                            <div className="stats-card">
                                <div className="stats-icon drop-icon">
                                    🛫
                                </div>
                                <div className="stats-info">
                                    <h5>Airport Drop</h5>
                                    <h2>09</h2>
                                    <span>
                                        4 Upcoming
                                    </span>
                                </div>
                            </div>
                            {/* Completed */}
                            <div className="stats-card">
                                <div className="stats-icon completed-icon">
                                    ✅
                                </div>
                                <div className="stats-info">
                                    <h5>Completed</h5>
                                    <h2>13</h2>
                                    <span>
                                        Successful Trips
                                    </span>
                                </div>
                            </div>
                            {/* Cancelled */}
                            <div className="stats-card">
                                <div className="stats-icon cancelled-icon">
                                    ❌
                                </div>
                                <div className="stats-info">
                                    <h5>Cancelled</h5>
                                    <h2>02</h2>
                                    <span>
                                        Needs Attention
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ==========================================
                            BOOKING TABLE
                            PART 4 STARTS HERE
                    ========================================== */}
                                        {/* ==========================================
                            TODAY'S BOOKINGS
                    ========================================== */}
                    <section className="booking-section">
                        <div className="booking-card">
                            <div className="booking-top">
                                <div>
                                    <span className="section-tag">
                                        BOOKINGS
                                    </span>
                                    <h2>
                                        Today's Airport Bookings
                                    </h2>
                                    <p>
                                        Airport pickup and drop bookings.
                                    </p>
                                </div>
                                <div className="booking-actions">
                                    <input
                                        type="text"
                                        placeholder="Search Booking..."
                                    />
                                    <button>
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="booking-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Guest</th>
                                            <th>Room</th>
                                            <th>Type</th>
                                            <th>Flight</th>
                                            <th>Date</th>
                                            <th>Vehicle</th>
                                            <th>Status</th>
                                            <th>Fare</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>STAY001</td>
                                            <td>Rahul Sharma</td>
                                            <td>203</td>
                                            <td>
                                                <span className="pickup-tag">
                                                    Pickup
                                                </span>
                                            </td>
                                            <td>6E642</td>
                                            <td>
                                                02 Aug
                                                <br />
                                                09:30 AM
                                            </td>
                                            <td>
                                                Innova
                                            </td>
                                            <td>
                                                <span className="status completed">
                                                    Completed
                                                </span>
                                            </td>
                                            <td>
                                                ₹1,850
                                            </td>
                                            <td>
                                                <button className="view-btn">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>STAY002</td>
                                            <td>Anjali Rao</td>
                                            <td>512</td>
                                            <td>
                                                <span className="drop-tag">
                                                    Drop
                                                </span>
                                            </td>
                                            <td>AI302</td>
                                            <td>
                                                02 Aug
                                                <br />
                                                11:45 AM
                                            </td>
                                            <td>
                                                Ertiga
                                            </td>
                                            <td>
                                                <span className="status pending">
                                                    Pending
                                                </span>
                                            </td>
                                            <td>
                                                ₹1,250
                                            </td>
                                            <td>
                                                <button className="view-btn">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>STAY003</td>
                                            <td>John David</td>
                                            <td>401</td>
                                            <td>
                                                <span className="pickup-tag">
                                                    Pickup
                                                </span>
                                            </td>
                                            <td>UK826</td>
                                            <td>
                                                02 Aug
                                                <br />
                                                03:15 PM
                                            </td>
                                            <td>
                                                Crysta
                                            </td>
                                            <td>
                                                <span className="status assigned">
                                                    Assigned
                                                </span>
                                            </td>
                                            <td>
                                                ₹2,200
                                            </td>
                                            <td>
                                                <button className="view-btn">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
export default Airport;