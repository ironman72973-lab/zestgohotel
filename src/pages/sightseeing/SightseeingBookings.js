import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ChevronDown,
  ChevronRight,
  Check,
  Info,
  ArrowRight,
  Bookmark,
  LockKeyhole,
  RefreshCcw,
  Headphones,
  BadgeDollarSign,
  Building2,
  User,
  Phone,
  Mail,
} from "lucide-react";

import "./SightSeeingForm.css";

// ======================================================
// IMAGE IMPORTS
// ======================================================

import vizagTour from "../assets/sightseeing/vizag-tour.jpg";
import arakuTour from "../assets/sightseeing/araku-valley.jpg";
import simhachalamTour from "../assets/sightseeing/simhachalam.jpg";
import borraCaves from "../assets/sightseeing/borra-caves.jpg";

// ======================================================
// SIGHTSEEING PACKAGE DATA
// ======================================================

const sightseeingPackages = [
  {
    id: "vizag-city",
    title: "Vizag City Tour",
    image: vizagTour,
    hours: 8,
    km: 60,
    price: 2499,
    description:
      "Explore the best of Visakhapatnam city attractions.",
    people: "Up to 4 People",
  },

  {
    id: "araku-valley",
    title: "Araku Valley Tour",
    image: arakuTour,
    hours: 10,
    km: 220,
    price: 4499,
    description:
      "Scenic beauty, waterfalls, coffee plantations & tribal culture.",
    people: "Up to 4 People",
  },

  {
    id: "simhachalam-rushikonda",
    title: "Simhachalam & Rushikonda",
    image: simhachalamTour,
    hours: 6,
    km: 70,
    price: 1999,
    description:
      "Visit Simhachalam Temple and Rushikonda Beach.",
    people: "Up to 4 People",
  },

  {
    id: "borra-antharagiri",
    title: "Borra Caves & Ananthagiri",
    image: borraCaves,
    hours: 9,
    km: 160,
    price: 3499,
    description:
      "Borra Caves, Ananthagiri Hills and Duduma Waterfalls.",
    people: "Up to 4 People",
  },
];

// ======================================================
// DROPDOWN OPTIONS
// ======================================================

const timeOptions = [
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
];

const pickupLocations = [
  "Oceanview Palace Hotel",
  "Novotel Visakhapatnam",
  "The Gateway Hotel",
  "Hotel Daspalla",
  "Airport Pickup",
];

const passengerOptions = [
  "1 Adult",
  "2 Adults",
  "2 Adults, 1 Child",
  "3 Adults",
  "3 Adults, 1 Child",
  "4 Adults",
];

// ======================================================
// CURRENCY FORMAT
// ======================================================

const formatCurrency = (amount) => {
  return `₹ ${Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function SightSeeingForm() {
  const navigate = useNavigate();

  // ====================================================
  // PACKAGE STATE
  // ====================================================

  const [selectedPackage, setSelectedPackage] = useState(
    sightseeingPackages[0]
  );

  // ====================================================
  // TRIP DETAILS STATE
  // ====================================================

  const [pickupDate, setPickupDate] = useState("2025-05-25");

  const [pickupTime, setPickupTime] = useState("09:00 AM");

  const [pickupLocation, setPickupLocation] = useState(
    "Oceanview Palace Hotel"
  );

  const [passengers, setPassengers] = useState(
    "2 Adults, 1 Child"
  );

  const [specialInstructions, setSpecialInstructions] =
    useState("");

  // ====================================================
  // GUEST / CUSTOMER DETAILS STATE
  // ====================================================

  const [guestName, setGuestName] = useState("");

  const [guestPhone, setGuestPhone] = useState("");

  const [guestEmail, setGuestEmail] = useState("");

  const [alternatePhone, setAlternatePhone] = useState("");

  // ====================================================
  // UI STATE
  // ====================================================

  const [showMorePackages, setShowMorePackages] =
    useState(false);

  // ====================================================
  // FARE CALCULATION
  // ====================================================

  const packageFare = selectedPackage.price;

  const extraHour = 0;

  const extraKm = 0;

  // 5% GST
  const gst = useMemo(() => {
    return packageFare * 0.05;
  }, [packageFare]);

  // Subtotal
  const subtotal = useMemo(() => {
    return packageFare + extraHour + extraKm + gst;
  }, [packageFare, extraHour, extraKm, gst]);

  // 10% hotel commission
  const hotelCommission = useMemo(() => {
    return subtotal * 0.1;
  }, [subtotal]);

  // Grand total after commission
  const grandTotal = useMemo(() => {
    return subtotal - hotelCommission;
  }, [subtotal, hotelCommission]);

  // ====================================================
  // COMPLETE BOOKING DATA
  // ====================================================

  const bookingData = {
    serviceType: "Local Sightseeing",

    package: {
      id: selectedPackage.id,
      title: selectedPackage.title,
      image: selectedPackage.image,
      duration: selectedPackage.hours,
      distance: selectedPackage.km,
      price: selectedPackage.price,
      description: selectedPackage.description,
    },

    tripDetails: {
      pickupDate,
      pickupTime,
      pickupLocation,
      passengers,
      totalDuration: selectedPackage.hours,
      totalKm: selectedPackage.km,
      specialInstructions,
    },

    // ==================================================
    // GUEST DETAILS
    // ==================================================

    guestDetails: {
      name: guestName,
      phone: guestPhone,
      email: guestEmail,
      alternatePhone,
    },

    fare: {
      packageFare,
      extraHour,
      extraKm,
      gst,
      subtotal,
      hotelCommission,
      grandTotal,
    },

    createdAt: new Date().toISOString(),
  };

  // ====================================================
  // CONTINUE TO VEHICLE SELECTION
  // ====================================================

  const handleContinue = () => {
    if (!guestName.trim()) {
      alert("Please enter guest name.");
      return;
    }

    if (!guestPhone.trim()) {
      alert("Please enter guest mobile number.");
      return;
    }

    if (guestPhone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      guestEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        guestEmail.trim()
      )
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    navigate("/vehicle-selection", {
      state: bookingData,
    });
  };

  // ====================================================
  // SAVE AS DRAFT
  // ====================================================

  const handleSaveDraft = () => {
    localStorage.setItem(
      "sightseeingBookingDraft",
      JSON.stringify(bookingData)
    );

    alert("Booking saved as draft.");
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="sightseeing-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="top-header">

        <div className="brand-section">

          <div className="brand-logo">

            <div className="logo-mark">
              Z
            </div>

            <div className="brand-text">

              <div className="brand-name">
                ZestGo
              </div>

              <div className="brand-subtitle">
                LAKWAY FLEET
              </div>

            </div>

          </div>

          <button
            type="button"
            className="menu-button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>


        {/* Breadcrumb */}

        <div className="breadcrumb">

          <span>
            Dashboard
          </span>

          <ChevronRight size={16} />

          <span>
            New Booking
          </span>

          <ChevronRight size={16} />

          <strong>
            Local Sightseeing
          </strong>

        </div>


        {/* Header Right */}

        <div className="header-right">

          <button
            type="button"
            className="help-button"
          >
            <span className="question-icon">
              ?
            </span>

            Help Center
          </button>


          <div className="notification">

            <span className="notification-icon">
              ♧
            </span>

            <span className="notification-count">
              12
            </span>

          </div>


          <div className="user-profile">

            <div className="user-avatar">
              RS
            </div>

            <div className="user-info">

              <strong>
                Rohit Sharma
              </strong>

              <span>
                Reception Manager
              </span>

            </div>

            <ChevronDown size={18} />

          </div>

        </div>

      </header>


      {/* ==================================================
          HERO
      ================================================== */}

      <section className="hero-section">

        <div className="hero-content">

          <h1>
            Local Sightseeing Package
          </h1>

          <p>
            Explore popular attractions around the city
            with our local tour packages.
          </p>

        </div>


        <button
          type="button"
          className="change-service-button"
        >
          <ArrowRight size={17} />

          Change Service
        </button>

      </section>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="main-wrapper">

        {/* ==================================================
            STEPPER
        ================================================== */}

        <div className="booking-stepper">

          <div className="step active">

            <div className="step-number">
              1
            </div>

            <strong>
              Package & Details
            </strong>

          </div>


          <div className="step-line"></div>


          <div className="step">

            <div className="step-number">
              2
            </div>

            <span>
              Vehicle Selection
            </span>

          </div>


          <div className="step-line"></div>


          <div className="step">

            <div className="step-number">
              3
            </div>

            <span>
              Guest Details
            </span>

          </div>


          <div className="step-line"></div>


          <div className="step">

            <div className="step-number">
              4
            </div>

            <span>
              Payment & Confirm
            </span>

          </div>

        </div>


        {/* ==================================================
            CONTENT GRID
        ================================================== */}

        <div className="content-grid">

          {/* ==================================================
              LEFT FORM AREA
          ================================================== */}

          <section className="form-area">


            {/* ==================================================
                PACKAGE CARD
            ================================================== */}

            <div className="card package-card">

              <div className="section-title">

                <div className="section-number">
                  1
                </div>

                <h2>
                  Choose Sightseeing Package
                </h2>

              </div>


              <div className="packages-wrapper">

                <div className="packages-grid">

                  {sightseeingPackages
                    .slice(
                      0,
                      showMorePackages
                        ? sightseeingPackages.length
                        : 4
                    )
                    .map((pkg) => {

                      const isSelected =
                        selectedPackage.id ===
                        pkg.id;

                      return (

                        <div
                          key={pkg.id}
                          className={`package-option ${
                            isSelected
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedPackage(
                              pkg
                            )
                          }
                        >

                          {/* Image */}

                          <div className="package-image-wrapper">

                            <img
                              src={pkg.image}
                              alt={pkg.title}
                              className="package-image"
                            />

                            {isSelected && (
                              <div className="selected-check">

                                <Check
                                  size={16}
                                />

                              </div>
                            )}

                          </div>


                          {/* Content */}

                          <div className="package-content">

                            <h3>
                              {pkg.title}
                            </h3>


                            <div className="package-meta">

                              <span>

                                <Clock3
                                  size={15}
                                />

                                {pkg.hours} Hours

                              </span>


                              <span>

                                <MapPin
                                  size={15}
                                />

                                {pkg.km} KM

                              </span>

                            </div>


                            <p>
                              {pkg.description}
                            </p>


                            <div className="package-price">

                              ₹{" "}
                              {pkg.price.toLocaleString(
                                "en-IN"
                              )}

                            </div>


                            <div className="package-people">

                              {pkg.people}

                            </div>

                          </div>

                        </div>

                      );

                    })}

                </div>


                {/* More Packages */}

                <button
                  type="button"
                  className="package-next-button"
                  onClick={() =>
                    setShowMorePackages(
                      !showMorePackages
                    )
                  }
                >

                  <ChevronRight
                    size={23}
                  />

                </button>

              </div>


              {/* Information */}

              <div className="information-bar">

                <Info size={18} />

                <span>
                  All packages include driver allowance,
                  fuel, toll, parking and taxes.
                </span>

              </div>

            </div>


            {/* ==================================================
                TRIP DETAILS
            ================================================== */}

            <div className="card trip-details-card">

              <div className="section-title">

                <div className="section-number">
                  2
                </div>

                <h2>
                  Trip Details
                </h2>

              </div>


              <div className="trip-form-grid">


                {/* ==================================================
                    PICKUP DATE
                ================================================== */}

                <div className="form-group">

                  <label>
                    Pickup Date
                  </label>

                  <div className="input-wrapper">

                    <CalendarDays
                      size={18}
                    />

                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) =>
                        setPickupDate(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>


                {/* ==================================================
                    PICKUP TIME
                ================================================== */}

                <div className="form-group">

                  <label>
                    Pickup Time
                  </label>

                  <div className="select-wrapper">

                    <Clock3
                      size={18}
                    />

                    <select
                      value={pickupTime}
                      onChange={(e) =>
                        setPickupTime(
                          e.target.value
                        )
                      }
                    >

                      {timeOptions.map(
                        (time) => (
                          <option
                            key={time}
                            value={time}
                          >
                            {time}
                          </option>
                        )
                      )}

                    </select>

                    <ChevronDown
                      size={17}
                    />

                  </div>

                </div>


                {/* ==================================================
                    PICKUP LOCATION
                ================================================== */}

                <div className="form-group">

                  <label>
                    Pickup Location
                  </label>

                  <div className="select-wrapper">

                    <MapPin
                      size={18}
                    />

                    <select
                      value={pickupLocation}
                      onChange={(e) =>
                        setPickupLocation(
                          e.target.value
                        )
                      }
                    >

                      {pickupLocations.map(
                        (location) => (
                          <option
                            key={location}
                            value={location}
                          >
                            {location}
                          </option>
                        )
                      )}

                    </select>

                    <ChevronDown
                      size={17}
                    />

                  </div>

                </div>


                {/* ==================================================
                    NUMBER OF PEOPLE
                ================================================== */}

                <div className="form-group">

                  <label>
                    Number of People
                  </label>

                  <div className="select-wrapper">

                    <Users
                      size={18}
                    />

                    <select
                      value={passengers}
                      onChange={(e) =>
                        setPassengers(
                          e.target.value
                        )
                      }
                    >

                      {passengerOptions.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                    <ChevronDown
                      size={17}
                    />

                  </div>

                </div>


                {/* ==================================================
                    TOTAL DURATION
                ================================================== */}

                <div className="form-group">

                  <label>
                    Total Duration
                  </label>

                  <div className="select-wrapper">

                    <Clock3
                      size={18}
                    />

                    <select
                      value={`${selectedPackage.hours} Hours`}
                      disabled
                    >

                      <option>
                        {selectedPackage.hours}
                        {" "}
                        Hours (Approx.)
                      </option>

                    </select>

                    <ChevronDown
                      size={17}
                    />

                  </div>

                </div>


                {/* ==================================================
                    SPECIAL INSTRUCTIONS
                ================================================== */}

                <div className="form-group">

                  <label>
                    Special Instructions{" "}
                    <span>
                      (Optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Any special requests"
                    value={specialInstructions}
                    onChange={(e) =>
                      setSpecialInstructions(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* Driver Information */}

              <div className="driver-info">

                <Info size={18} />

                <span>
                  Our driver will contact you
                  before pickup.
                </span>

              </div>

            </div>


            {/* ==================================================
                GUEST DETAILS
            ================================================== */}

            <div className="card guest-details-card">

              <div className="section-title">

                <div className="section-number">
                  3
                </div>

                <h2>
                  Guest Details
                </h2>

              </div>


              <div className="guest-form-grid">


                {/* ==================================================
                    GUEST NAME
                ================================================== */}

                <div className="form-group">

                  <label>
                    Guest Name
                    <span className="required">
                      *
                    </span>
                  </label>

                  <div className="input-wrapper">

                    <User
                      size={18}
                    />

                    <input
                      type="text"
                      placeholder="Enter guest full name"
                      value={guestName}
                      onChange={(e) =>
                        setGuestName(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>


                {/* ==================================================
                    MOBILE NUMBER
                ================================================== */}

                <div className="form-group">

                  <label>
                    Mobile Number
                    <span className="required">
                      *
                    </span>
                  </label>

                  <div className="input-wrapper">

                    <Phone
                      size={18}
                    />

                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={guestPhone}
                      maxLength={10}
                      onChange={(e) => {

                        const value =
                          e.target.value.replace(
                            /\D/g,
                            ""
                          );

                        setGuestPhone(value);

                      }}
                    />

                  </div>

                </div>


                {/* ==================================================
                    EMAIL
                ================================================== */}

                <div className="form-group">

                  <label>
                    Email Address
                    <span>
                      (Optional)
                    </span>
                  </label>

                  <div className="input-wrapper">

                    <Mail
                      size={18}
                    />

                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={guestEmail}
                      onChange={(e) =>
                        setGuestEmail(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>


                {/* ==================================================
                    ALTERNATE PHONE
                ================================================== */}

                <div className="form-group">

                  <label>
                    Alternate Contact
                    <span>
                      (Optional)
                    </span>
                  </label>

                  <div className="input-wrapper">

                    <Phone
                      size={18}
                    />

                    <input
                      type="tel"
                      placeholder="Alternate mobile number"
                      value={alternatePhone}
                      maxLength={10}
                      onChange={(e) => {

                        const value =
                          e.target.value.replace(
                            /\D/g,
                            ""
                          );

                        setAlternatePhone(
                          value
                        );

                      }}
                    />

                  </div>

                </div>

              </div>


              {/* Guest info */}

              <div className="driver-info">

                <Info size={18} />

                <span>
                  Guest contact details will be used
                  only for booking and trip communication.
                </span>

              </div>

            </div>


            {/* ==================================================
                BENEFITS
            ================================================== */}

            <div className="benefits-card">


              {/* Free Cancellation */}

              <div className="benefit">

                <div className="benefit-icon">
                  <RefreshCcw
                    size={27}
                  />
                </div>

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


              <div className="benefit-divider"></div>


              {/* Support */}

              <div className="benefit">

                <div className="benefit-icon">

                  <Headphones
                    size={27}
                  />

                </div>

                <div>

                  <strong>
                    24x7 Support
                  </strong>

                  <p>
                    We're here to help you anytime,
                    anywhere.
                  </p>

                </div>

              </div>


              <div className="benefit-divider"></div>


              {/* Price */}

              <div className="benefit">

                <div className="benefit-icon">

                  <BadgeDollarSign
                    size={27}
                  />

                </div>

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


              <div className="benefit-divider"></div>


              {/* Hotels */}

              <div className="benefit">

                <div className="benefit-icon">

                  <Building2
                    size={27}
                  />

                </div>

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

            </div>

          </section>


          {/* ==================================================
              BOOKING SUMMARY
          ================================================== */}

          <aside className="summary-card">


            {/* ==================================================
                SUMMARY HEADER
            ================================================== */}

            <div className="summary-header">

              <CalendarDays
                size={22}
              />

              <h2>
                Booking Summary
              </h2>

            </div>


            {/* ==================================================
                SUMMARY BODY
            ================================================== */}

            <div className="summary-body">


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
                value={`${selectedPackage.hours} Hours / ${selectedPackage.km} KM (Approx.)`}
              />


              <SummaryRow
                label="Date & Time"
                value={`${formatDisplayDate(
                  pickupDate
                )}, ${pickupTime}`}
              />


              <SummaryRow
                label="Pickup Location"
                value={pickupLocation}
              />


              <SummaryRow
                label="Passengers"
                value={passengers}
              />


              {/* ==================================================
                  GUEST SUMMARY
              ================================================== */}

              {guestName && (
                <SummaryRow
                  label="Guest Name"
                  value={guestName}
                />
              )}


              {guestPhone && (
                <SummaryRow
                  label="Contact"
                  value={guestPhone}
                />
              )}


              {/* ==================================================
                  FARE BREAKDOWN
              ================================================== */}

              <div className="fare-box">

                <div className="fare-title">
                  Fare Breakdown
                </div>


                <FareRow
                  label="Package Fare"
                  value={formatCurrency(
                    packageFare
                  )}
                />


                <FareRow
                  label="Extra Hour (0)"
                  value={formatCurrency(
                    extraHour
                  )}
                />


                <FareRow
                  label="Extra KM (0)"
                  value={formatCurrency(
                    extraKm
                  )}
                />


                <FareRow
                  label="GST (5%)"
                  value={formatCurrency(
                    gst
                  )}
                />


                <div className="fare-separator"></div>


                <FareRow
                  label="Subtotal"
                  value={formatCurrency(
                    subtotal
                  )}
                />


                <FareRow
                  label="Hotel Commission (10%)"
                  value={`- ${formatCurrency(
                    hotelCommission
                  )}`}
                  commission
                />


                {/* Grand Total */}

                <div className="grand-total">

                  <span>
                    Grand Total
                  </span>

                  <strong>
                    {formatCurrency(
                      grandTotal
                    )}
                  </strong>

                </div>

              </div>


              {/* ==================================================
                  EARNINGS
              ================================================== */}

              <div className="earnings-box">

                <div className="earnings-top">

                  <strong>
                    🧑‍💼 Your Earnings (Estimated)
                  </strong>

                  <span>
                    10% Commission
                  </span>

                </div>


                <p>

                  You will earn{" "}

                  <strong>
                    {formatCurrency(
                      hotelCommission
                    )}
                  </strong>{" "}

                  on this booking

                </p>

              </div>


              {/* ==================================================
                  CONTINUE
              ================================================== */}

              <button
                type="button"
                className="continue-button"
                onClick={handleContinue}
              >

                <span>
                  Continue to Vehicle Selection
                </span>

                <ArrowRight
                  size={21}
                />

              </button>


              {/* ==================================================
                  SAVE DRAFT
              ================================================== */}

              <button
                type="button"
                className="save-draft-button"
                onClick={handleSaveDraft}
              >

                <Bookmark
                  size={19}
                />

                <span>
                  Save as Draft
                </span>

              </button>


              {/* Secure */}

              <div className="secure-message">

                <LockKeyhole
                  size={15}
                />

                <span>
                  Your booking details are safe
                  and secure
                </span>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}


// ======================================================
// SUMMARY ROW
// ======================================================

function SummaryRow({
  label,
  value,
}) {
  return (
    <div className="summary-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


// ======================================================
// FARE ROW
// ======================================================

function FareRow({
  label,
  value,
  commission = false,
}) {
  return (
    <div
      className={`fare-row ${
        commission
          ? "commission-row"
          : ""
      }`}
    >

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


// ======================================================
// DATE FORMATTER
// ======================================================

function formatDisplayDate(date) {

  if (!date) {
    return "";
  }

  const parsedDate =
    new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}