import React, { useMemo, useState } from "react";
import {
  Menu,
  HelpCircle,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  Users,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  CircleDollarSign,
  Building2,
  Headphones,
  MapPin,
  Clock3,
  Check,
  Info
} from "lucide-react";
import "./ls.css";
import vizagHero from "../../images/hotel.png";
import vizagCity from "../../images/hotel.png";
import arakuValley from "../../images/hotel.png";
import simhachalam from "../../images/hotel.png";
import borraCaves from "../../images/hotel.png";
import manager from "../../images/hotel.png";
/* =========================================================
   PACKAGE DATA
========================================================= */
const packages = [
  {
    id: 1,
    title: "Vizag City Tour",
    image: vizagCity,
    duration: "8 Hours",
    distance: "90 KM",
    description:
      "Explore the best of Visakhapatnam city attractions.",
    price: 2499
  },
  {
    id: 2,
    title: "Araku Valley Tour",
    image: arakuValley,
    duration: "10 Hours",
    distance: "220 KM",
    description:
      "Scenic beauty, waterfalls, coffee plantations & tribal culture.",
    price: 4499
  },
  {
    id: 3,
    title: "Simhachalam & Rushikonda",
    image: simhachalam,
    duration: "6 Hours",
    distance: "70 KM",
    description:
      "Visit Simhachalam Temple and Rushikonda Beach.",
    price: 1999
  },
  {
    id: 4,
    title: "Borra Caves & Ananthagiri",
    image: borraCaves,
    duration: "9 Hours",
    distance: "160 KM",
    description:
      "Borra Caves, Ananthagiri Hills and Duduma Waterfalls.",
    price: 3499
  }
];
/* =========================================================
   MONEY FORMAT
========================================================= */
function money(value) {
  return `₹ ${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
/* =========================================================
   SUMMARY ROW
========================================================= */
function SummaryRow({ label, value }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
/* =========================================================
   PRICE ROW
========================================================= */
function PriceRow({ label, value, commission = false }) {
  return (
    <div
      className={`price-row ${
        commission ? "commission-row" : ""
      }`}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function LocalSightseeing() {
  const [selectedPackage, setSelectedPackage] = useState(
    packages[0]
  );
  /* =======================================================
     CALCULATIONS
  ======================================================= */
  const pricing = useMemo(() => {
    const packageFare = Number(selectedPackage.price);
    const extraHour = 0;
    const extraKm = 0;
    const gst = packageFare * 0.05;
    const subtotal =
      packageFare +
      extraHour +
      extraKm +
      gst;
    const commission = packageFare * 0.1;
    const grandTotal =
      subtotal - commission;
    return {
      packageFare,
      extraHour,
      extraKm,
      gst,
      subtotal,
      commission,
      grandTotal
    };
  }, [selectedPackage]);
  return (
    <div className="zestgo-page">
      {/* ===================================================
          TOP HEADER
      =================================================== */}
      <header className="top-header">
        {/* LEFT */}
        <div className="header-left">
          <button
            type="button"
            className="menu-button"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <ChevronRight size={15} />
            <span>New Booking</span>
            <ChevronRight size={15} />
            <strong>Local Sightseeing</strong>
          </div>
        </div>
        {/* RIGHT */}
        <div className="header-right">
          {/* HELP */}
          <button
            type="button"
            className="help-button"
          >
            <HelpCircle size={17} />
            <span>Help Center</span>
          </button>
          {/* NOTIFICATION */}
          <button
            type="button"
            className="notification"
            aria-label="Notifications"
          >
            <Bell size={22} />
            <span>12</span>
          </button>
          <div className="header-divider" />
          {/* MANAGER */}
          <button
            type="button"
            className="manager"
            aria-label="Manager profile"
          >
            <img
              src={manager}
              alt="Rohit Sharma"
            />
            <div className="manager-details">
              <strong>Rohit Sharma</strong>
              <span>Reception Manager</span>
            </div>
            <ChevronDown size={18} />
          </button>
        </div>
      </header>
      {/* ===================================================
          HERO
      =================================================== */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${vizagHero})`
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>Local Sightseeing Package</h1>
          <p>
            Explore popular attractions around the city
            with our local tour packages.
          </p>
        </div>
        <button
          type="button"
          className="change-service"
        >
          <ChevronLeft size={17} />
          <span>Change Service</span>
        </button>
      </section>
      {/* ===================================================
          PAGE CONTENT
      =================================================== */}
      <main className="page-container">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}
        <div className="left-content">
          {/* =================================================
              STEP PROGRESS
          ================================================= */}
          <div className="steps-card">
            <div className="step active">
              <span>1</span>
              <strong>
                Package &amp; Details
              </strong>
            </div>
            <div className="step-line" />
            <div className="step">
              <span>2</span>
              <p>Vehicle Selection</p>
            </div>
            <div className="step-line" />
            <div className="step">
              <span>3</span>
              <p>Guest Details</p>
            </div>
            <div className="step-line" />
            <div className="step">
              <span>4</span>
              <p>Payment &amp; Confirm</p>
            </div>
          </div>
          {/* =================================================
              BOOKING CARD
          ================================================= */}
          <section className="booking-card">
            {/* SECTION 1 */}
            <div className="section-title">
              <div className="section-number">
                1
              </div>
              <h2>
                Choose Sightseeing Package
              </h2>
            </div>
            {/* PACKAGE AREA */}
            <div className="package-area">
              <div className="package-list">
                {packages.map((item) => {
                  const isSelected =
                    selectedPackage.id === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`package-card ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() =>
                        setSelectedPackage(item)
                      }
                      aria-pressed={isSelected}
                    >
                      {/* IMAGE */}
                      <div
                        className="package-image"
                        style={{
                          backgroundImage:
                            `url(${item.image})`
                        }}
                      >
                        {isSelected && (
                          <div className="selected-icon">
                            <Check
                              size={14}
                              strokeWidth={3}
                            />
                          </div>
                        )}
                      </div>
                      {/* TITLE */}
                      <h3>{item.title}</h3>
                      {/* META */}
                      <div className="package-meta">
                        <span>
                          <Clock3 size={14} />
                          {item.duration}
                        </span>
                        <span>
                          <MapPin size={14} />
                          {item.distance}
                        </span>
                      </div>
                      {/* DESCRIPTION */}
                      <p>{item.description}</p>
                      {/* PRICE */}
                      <div className="package-price">
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}
                      </div>
                      <small>
                        Up to 4 People
                      </small>
                    </button>
                  );
                })}
              </div>
              {/* NEXT */}
              <button
                type="button"
                className="package-next"
                aria-label="Next packages"
              >
                <ChevronRight size={22} />
              </button>
            </div>
            {/* PACKAGE INFO */}
            <div className="package-info">
              <Info size={17} />
              <span>
                All packages include driver allowance,
                fuel, toll, parking and taxes.
              </span>
            </div>
            <div className="separator" />
            {/* SECTION 2 */}
            <div className="section-title trip-title">
              <div className="section-number">
                2
              </div>
              <h2>Trip Details</h2>
            </div>
            {/* TRIP FORM */}
            <div className="trip-form">
              {/* DATE */}
              <div className="field">
                <label htmlFor="pickup-date">
                  Pickup Date
                </label>
                <div className="input">
                  <CalendarDays size={16} />
                  <span id="pickup-date">
                    25 May 2025
                  </span>
                </div>
              </div>
              {/* TIME */}
              <div className="field">
                <label htmlFor="pickup-time">
                  Pickup Time
                </label>
                <div className="input">
                  <Clock3 size={16} />
                  <span id="pickup-time">
                    09:00 AM
                  </span>
                  <ChevronDown
                    size={16}
                    className="input-arrow"
                  />
                </div>
              </div>
              {/* LOCATION */}
              <div className="field">
                <label htmlFor="pickup-location">
                  Pickup Location
                </label>
                <div className="input">
                  <MapPin size={16} />
                  <span id="pickup-location">
                    Oceanview Palace Hotel
                  </span>
                  <ChevronDown
                    size={16}
                    className="input-arrow"
                  />
                </div>
              </div>
              {/* PEOPLE */}
              <div className="field">
                <label htmlFor="passengers">
                  Number of People
                </label>
                <div className="input">
                  <Users size={16} />
                  <span id="passengers">
                    2 Adults, 1 Child
                  </span>
                  <ChevronDown
                    size={16}
                    className="input-arrow"
                  />
                </div>
              </div>
              {/* DURATION */}
              <div className="field">
                <label htmlFor="duration">
                  Total Duration
                </label>
                <div className="input">
                  <Clock3 size={16} />
                  <span id="duration">
                    {selectedPackage.duration}{" "}
                    (Approx.)
                  </span>
                  <ChevronDown
                    size={16}
                    className="input-arrow"
                  />
                </div>
              </div>
              {/* SPECIAL INSTRUCTIONS */}
              <div className="field">
                <label htmlFor="instructions">
                  Special Instructions (Optional)
                </label>
                <div
                  className="input placeholder"
                  id="instructions"
                >
                  <span>
                    Any special requests
                  </span>
                </div>
              </div>
            </div>
            {/* DRIVER MESSAGE */}
            <div className="driver-message">
              <Info size={17} />
              <span>
                Our driver will contact you before pickup.
              </span>
            </div>
          </section>
          {/* =================================================
              BENEFITS
          ================================================= */}
          <section className="benefits">
            <div className="benefit">
              <ShieldCheck size={30} />
              <div>
                <strong>
                  Free Cancellation
                </strong>
                <p>
                  Cancel up to 12 hours before
                  your scheduled trip.
                </p>
              </div>
            </div>
            <div className="benefit-divider" />
            <div className="benefit">
              <Headphones size={30} />
              <div>
                <strong>24x7 Support</strong>
                <p>
                  We're here to help you anytime,
                  anywhere.
                </p>
              </div>
            </div>
            <div className="benefit-divider" />
            <div className="benefit">
              <CircleDollarSign size={30} />
              <div>
                <strong>
                  Best Price Guarantee
                </strong>
                <p>
                  Get the best price with zero
                  hidden charges.
                </p>
              </div>
            </div>
            <div className="benefit-divider" />
            <div className="benefit">
              <Building2 size={30} />
              <div>
                <strong>
                  Trusted by 500+ Hotels
                </strong>
                <p>
                  Join hundreds of hotels who
                  trust ZestGo Lakway Fleet.
                </p>
              </div>
            </div>
          </section>
        </div>
        {/* =================================================
            RIGHT SUMMARY
        ================================================= */}
        <aside className="summary">
          <div className="summary-header">
            <CalendarDays size={22} />
            <h2>
              Booking Summary
            </h2>
          </div>
          <div className="summary-content">
            {/* SUMMARY */}
            <SummaryRow
              label="Service Type"
              value="Local Sightseeing"
            />
            <SummaryRow
              label="Package"
              value={selectedPackage.title}
            />
            <SummaryRow
              label="Duration"
              value={`${selectedPackage.duration} / ${selectedPackage.distance} (Approx.)`}
            />
            <SummaryRow
              label="Date & Time"
              value="25 May 2025, 09:00 AM"
            />
            <SummaryRow
              label="Pickup Location"
              value="Oceanview Palace Hotel"
            />
            <SummaryRow
              label="Passengers"
              value="2 Adults, 1 Child"
            />
            {/* FARE BREAKDOWN */}
            <div className="fare-box">
              <h3>Fare Breakdown</h3>
              <PriceRow
                label="Package Fare"
                value={money(pricing.packageFare)}
              />
              <PriceRow
                label="Extra Hour (0)"
                value={money(pricing.extraHour)}
              />
              <PriceRow
                label="Extra KM (0)"
                value={money(pricing.extraKm)}
              />
              <PriceRow
                label="GST (5%)"
                value={money(pricing.gst)}
              />
              <div className="fare-dotted" />
              <PriceRow
                label="Subtotal"
                value={money(pricing.subtotal)}
              />
              <PriceRow
                label="Hotel Commission (10%)"
                value={`- ${money(pricing.commission)}`}
                commission
              />
              <div className="grand-total">
                <strong>
                  Grand Total
                </strong>
                <span>
                  {money(pricing.grandTotal)}
                </span>
              </div>
            </div>
            {/* HOTEL EARNINGS */}
            <div className="earning-box">
              <div className="earning-heading">
                <div>
                  <Users size={17} />
                  <strong>
                    Your Earnings (Estimated)
                  </strong>
                </div>
                <span>
                  10% Commission
                </span>
              </div>
              <p>
                You will earn{" "}
                <strong>
                  {money(pricing.commission)}
                </strong>{" "}
                on this booking.
              </p>
            </div>
            {/* CONTINUE */}
            <button
              type="button"
              className="continue"
            >
              <span>
                Continue to Vehicle Selection
              </span>
              <ArrowRight size={20} />
            </button>
            {/* SAVE */}
            <button
              type="button"
              className="save"
            >
              <Bookmark size={18} />
              <span>
                Save as Draft
              </span>
            </button>
            {/* SECURITY */}
            <div className="security">
              <ShieldCheck size={15} />
              <span>
                Your booking details are safe and secure
              </span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}