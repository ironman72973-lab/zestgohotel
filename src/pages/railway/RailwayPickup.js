import React, { useState } from "react";
import "./railway.css";
import railwayStation from "../../images/railway.png";
function RailwayPickup() {
  /* =====================================================
     BASIC FORM STATES
  ===================================================== */
  const [pickupStation, setPickupStation] = useState(
    "Visakhapatnam Junction (VSKP)"
  );
  const [trainNumber, setTrainNumber] = useState("12703");
  const [trainName, setTrainName] = useState(
    "Falaknuma Express"
  );
  const [arrivalDate, setArrivalDate] = useState(
    "25 May 2025"
  );
  const [arrivalTime, setArrivalTime] = useState(
    "06:45 PM"
  );
  const [coach, setCoach] = useState("B2");
  const [berth, setBerth] = useState("25");
  const [platform, setPlatform] = useState("3");
  const [delayMonitoring, setDelayMonitoring] =
    useState(true);
  const [dropLocation, setDropLocation] = useState(
    "Oceanview Palace Hotel, Rushikonda"
  );
  const [contactPerson, setContactPerson] =
    useState("Rohit Sharma");
  const [contactMobile, setContactMobile] =
    useState("+91 98765 43210");
  const [passengers, setPassengers] = useState(
    "2 Adults, 1 Child"
  );
  const [luggage, setLuggage] = useState(
    "2 Medium Bags, 1 Small Bag"
  );
  const [assistance, setAssistance] = useState(
    "No Assistance"
  );
  /* =====================================================
     ADDITIONAL REQUIREMENTS
  ===================================================== */
  const [requirements, setRequirements] = useState({
    meetGreet: true,
    porter: false,
    babySeat: false,
    extraLuggage: false,
    wheelchair: false,
    other: false,
  });
  /* =====================================================
     TRAIN STATUS
  ===================================================== */
  const [trainStatus, setTrainStatus] =
    useState("On Time");
  const [lastUpdated, setLastUpdated] =
    useState("25 May 2025, 10:15 AM");
  /* =====================================================
     FARE SETTINGS
  ===================================================== */
  const BASE_FARE = 649;
  const STATION_PARKING = 40;
  const DRIVER_ALLOWANCE = 50;
  const WAITING_CHARGES = 20;
  const PORTER_CHARGE = 100;
  const BABY_SEAT_CHARGE = 100;
  const EXTRA_LUGGAGE_CHARGE = 100;
  const GST_RATE = 5;
  const COMMISSION_RATE = 10;
  /* =====================================================
     CALCULATE ADDITIONAL CHARGES
  ===================================================== */
  const porterCharge = requirements.porter
    ? PORTER_CHARGE
    : 0;
  const babySeatCharge = requirements.babySeat
    ? BABY_SEAT_CHARGE
    : 0;
  const extraLuggageCharge =
    requirements.extraLuggage
      ? EXTRA_LUGGAGE_CHARGE
      : 0;
  /* =====================================================
     FARE CALCULATION
  ===================================================== */
  const fareBeforeGST =
    BASE_FARE +
    STATION_PARKING +
    DRIVER_ALLOWANCE +
    WAITING_CHARGES +
    porterCharge +
    babySeatCharge +
    extraLuggageCharge;
  const gst =
    fareBeforeGST * (GST_RATE / 100);
  const subtotal =
    fareBeforeGST + gst;
  const hotelCommission =
    subtotal * (COMMISSION_RATE / 100);
  const grandTotal =
    subtotal - hotelCommission;
  /* =====================================================
     MONEY FORMAT
  ===================================================== */
  const formatMoney = (amount) => {
    return `₹ ${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  /* =====================================================
     REQUIREMENT TOGGLE
  ===================================================== */
  const toggleRequirement = (name) => {
    setRequirements((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };
  /* =====================================================
     CLEAR ALL
  ===================================================== */
  const clearAll = () => {
    setPickupStation(
      "Visakhapatnam Junction (VSKP)"
    );
    setTrainNumber("12703");
    setTrainName("Falaknuma Express");
    setArrivalDate("25 May 2025");
    setArrivalTime("06:45 PM");
    setCoach("B2");
    setBerth("25");
    setPlatform("3");
    setDelayMonitoring(true);
    setDropLocation(
      "Oceanview Palace Hotel, Rushikonda"
    );
    setContactPerson("Rohit Sharma");
    setContactMobile("+91 98765 43210");
    setPassengers("2 Adults, 1 Child");
    setLuggage(
      "2 Medium Bags, 1 Small Bag"
    );
    setAssistance("No Assistance");
    setRequirements({
      meetGreet: true,
      porter: false,
      babySeat: false,
      extraLuggage: false,
      wheelchair: false,
      other: false,
    });
  };
  /* =====================================================
     REFRESH TRAIN STATUS
  ===================================================== */
  const refreshTrainStatus = () => {
    setTrainStatus("Checking...");
    setTimeout(() => {
      setTrainStatus("On Time");
      setLastUpdated(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
  };
  /* =====================================================
     SAVE & CONTINUE
  ===================================================== */
  const handleContinue = () => {
    const bookingData = {
      serviceType: "Railway Pickup",
      pickupStation,
      trainNumber,
      trainName,
      arrivalDate,
      arrivalTime,
      coach,
      berth,
      platform,
      delayMonitoring,
      dropLocation,
      contactPerson,
      contactMobile,
      passengers,
      luggage,
      assistance,
      requirements,
      fare: {
        baseFare: BASE_FARE,
        stationParking:
          STATION_PARKING,
        driverAllowance:
          DRIVER_ALLOWANCE,
        waitingCharges:
          WAITING_CHARGES,
        porterCharge,
        babySeatCharge,
        extraLuggageCharge,
        gst,
        subtotal,
        hotelCommission,
        grandTotal,
      },
    };
    console.log(
      "Railway Pickup Booking:",
      bookingData
    );
    alert(
      "Railway Pickup details saved successfully."
    );
  };
  /* =====================================================
     ICON COMPONENT
  ===================================================== */
  const Icon = ({
    name,
    size = 20,
  }) => {
    const commonProps = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };
    if (name === "menu") {
      return (
        <svg {...commonProps}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      );
    }
    if (name === "chevron") {
      return (
        <svg {...commonProps}>
          <path d="m7 10 5 5 5-5" />
        </svg>
      );
    }
    if (name === "arrowLeft") {
      return (
        <svg {...commonProps}>
          <path d="M19 12H5" />
          <path d="m11 18-6-6 6-6" />
        </svg>
      );
    }
    if (name === "arrowRight") {
      return (
        <svg {...commonProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    }
    if (name === "train") {
      return (
        <svg {...commonProps}>
          <rect
            x="5"
            y="3"
            width="14"
            height="15"
            rx="2"
          />
          <path d="M8 18l-2 3" />
          <path d="M16 18l2 3" />
          <path d="M8 7h8" />
          <path d="M8 11h2" />
          <path d="M14 11h2" />
          <circle
            cx="9"
            cy="16"
            r="1"
          />
          <circle
            cx="15"
            cy="16"
            r="1"
          />
        </svg>
      );
    }
    if (name === "calendar") {
      return (
        <svg {...commonProps}>
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
          />
          <path d="M7 3v4" />
          <path d="M17 3v4" />
          <path d="M3 9h18" />
          <path d="M8 13h.01" />
          <path d="M12 13h.01" />
          <path d="M16 13h.01" />
          <path d="M8 17h.01" />
          <path d="M12 17h.01" />
        </svg>
      );
    }
    if (name === "clock") {
      return (
        <svg {...commonProps}>
          <circle
            cx="12"
            cy="12"
            r="9"
          />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    }
    if (name === "user") {
      return (
        <svg {...commonProps}>
          <circle
            cx="12"
            cy="8"
            r="3"
          />
          <path d="M5 20c.7-3.5 3-5.3 7-5.3s6.3 1.8 7 5.3" />
        </svg>
      );
    }
    if (name === "bag") {
      return (
        <svg {...commonProps}>
          <rect
            x="4"
            y="7"
            width="16"
            height="13"
            rx="2"
          />
          <path d="M8 7V5a4 4 0 0 1 8 0v2" />
        </svg>
      );
    }
    if (name === "location") {
      return (
        <svg {...commonProps}>
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle
            cx="12"
            cy="10"
            r="2.5"
          />
        </svg>
      );
    }
    if (name === "bell") {
      return (
        <svg {...commonProps}>
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
          <path d="M10 21h4" />
        </svg>
      );
    }
    if (name === "wallet") {
      return (
        <svg {...commonProps}>
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V6Z" />
          <path d="M4 7h16" />
          <path d="M15 13h3" />
          <circle
            cx="15"
            cy="13"
            r=".5"
          />
        </svg>
      );
    }
    if (name === "refresh") {
      return (
        <svg {...commonProps}>
          <path d="M20 11a8 8 0 0 0-14.7-3L3 11" />
          <path d="M3 7v4h4" />
          <path d="M4 13a8 8 0 0 0 14.7 3L21 13" />
          <path d="M21 17v-4h-4" />
        </svg>
      );
    }
    if (name === "trash") {
      return (
        <svg {...commonProps}>
          <path d="M4 7h16" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M6 7l1 14h10l1-14" />
          <path d="M9 7V4h6v3" />
        </svg>
      );
    }
    if (name === "info") {
      return (
        <svg {...commonProps}>
          <circle
            cx="12"
            cy="12"
            r="9"
          />
          <path d="M12 11v5" />
          <path d="M12 8h.01" />
        </svg>
      );
    }
    if (name === "check") {
      return (
        <svg {...commonProps}>
          <path d="m5 12 4 4L19 7" />
        </svg>
      );
    }
    return null;
  };
  /* =====================================================
     INPUT FIELD
  ===================================================== */
  const InputField = ({
    label,
    required = false,
    value,
    setValue,
    icon,
    dropdown = false,
    type = "text",
  }) => {
    return (
      <div className="rp-field">
        <label>
          {label}
          {required && (
            <span className="required">
              *
            </span>
          )}
        </label>
        <div className="rp-input">
          {icon && (
            <span className="input-icon">
              <Icon
                name={icon}
                size={18}
              />
            </span>
          )}
          <input
            type={type}
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
          />
          {dropdown && (
            <span className="dropdown-icon">
              <Icon
                name="chevron"
                size={17}
              />
            </span>
          )}
        </div>
      </div>
    );
  };
  /* =====================================================
     REQUIREMENT BUTTON
  ===================================================== */
  const Requirement = ({
    name,
    label,
  }) => {
    const selected =
      requirements[name];
    return (
      <button
        type="button"
        className={`requirement ${
          selected
            ? "selected"
            : ""
        }`}
        onClick={() =>
          toggleRequirement(name)
        }
      >
        <span className="checkbox">
          {selected && (
            <Icon
              name="check"
              size={12}
            />
          )}
        </span>
        <span>
          {label}
        </span>
      </button>
    );
  };
  /* =====================================================
     SUMMARY ROW
  ===================================================== */
  const SummaryRow = ({
    label,
    value,
    negative = false,
  }) => {
    return (
      <div className="summary-row">
        <span>
          {label}
        </span>
        <strong
          className={
            negative
              ? "negative"
              : ""
          }
        >
          {negative
            ? "- "
            : ""}
          {formatMoney(value)}
        </strong>
      </div>
    );
  };
  /* =====================================================
     RETURN
  ===================================================== */
  return (
    <div
      className="railway-page"
      style={{
        backgroundImage: `url(${railwayStation})`,
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}
      <header className="top-header">
        <div className="header-left">
          <button
            type="button"
            className="menu-button"
          >
            <Icon
              name="menu"
              size={23}
            />
          </button>
          <div className="welcome">
            <span>
              Welcome, Reception Manager
            </span>
            <Icon
              name="chevron"
              size={15}
            />
          </div>
        </div>
        <div className="header-right">
          {/* WALLET */}
          <div className="wallet-box">
            <div className="wallet-icon">
              <Icon
                name="wallet"
                size={20}
              />
            </div>
            <div>
              <span>
                Wallet Balance
              </span>
              <strong>
                ₹ 48,750.00
              </strong>
            </div>
          </div>
          {/* NOTIFICATION */}
          <button
            type="button"
            className="notification-button"
          >
            <Icon
              name="bell"
              size={24}
            />
            <span>
              12
            </span>
          </button>
          {/* PROFILE */}
          <div className="profile">
            <div className="profile-image">
              RS
            </div>
            <div className="profile-details">
              <strong>
                Rohit Sharma
              </strong>
              <span>
                Reception Manager
              </span>
            </div>
            <Icon
              name="chevron"
              size={16}
            />
          </div>
        </div>
      </header>
      {/* =================================================
          MAIN
      ================================================= */}
      <main className="main-content">
        {/* PAGE HEADER */}
        <div className="page-heading">
          <div>
            <h1>
              Railway Pickup Booking
            </h1>
            <div className="breadcrumbs">
              <span>
                Dashboard
              </span>
              <b>
                ›
              </b>
              <span>
                New Booking
              </span>
              <b>
                ›
              </b>
              <strong>
                Railway Pickup
              </strong>
            </div>
          </div>
          <button
            type="button"
            className="back-service"
          >
            <Icon
              name="arrowLeft"
              size={18}
            />
            Back to Services
          </button>
        </div>
        {/* =================================================
            TWO COLUMN LAYOUT
        ================================================= */}
        <div className="booking-layout">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}
          <div className="booking-left">
            {/* =================================================
                STEPS
            ================================================= */}
            <div className="steps">
              {/* STEP 1 */}
              <div className="step active">
                <div className="step-circle">
                  <Icon
                    name="train"
                    size={22}
                  />
                </div>
                <strong>
                  Service & Trip Details
                </strong>
              </div>
              <div className="step-line" />
              {/* STEP 2 */}
              <div className="step">
                <div className="step-circle">
                  2
                </div>
                <span>
                  Vehicle Selection
                </span>
              </div>
              <div className="step-line" />
              {/* STEP 3 */}
              <div className="step">
                <div className="step-circle">
                  3
                </div>
                <span>
                  Guest Details
                </span>
              </div>
              <div className="step-line" />
              {/* STEP 4 */}
              <div className="step">
                <div className="step-circle">
                  4
                </div>
                <span>
                  Fare & Payment
                </span>
              </div>
              <div className="step-line" />
              {/* STEP 5 */}
              <div className="step">
                <div className="step-circle">
                  5
                </div>
                <span>
                  Confirmation
                </span>
              </div>
            </div>
            {/* =================================================
                FORM
            ================================================= */}
            <div className="form-card">
              {/* =================================================
                  TRIP DETAILS
              ================================================= */}
              <section className="form-section">
                <div className="section-heading">
                  <Icon
                    name="train"
                    size={21}
                  />
                  <h2>
                    Trip Details
                  </h2>
                </div>
                <div className="trip-fields">
                  <InputField
                    label="Pickup Station"
                    required
                    value={pickupStation}
                    setValue={setPickupStation}
                    icon="train"
                    dropdown
                  />
                  <InputField
                    label="Train Number"
                    required
                    value={trainNumber}
                    setValue={setTrainNumber}
                  />
                  <InputField
                    label="Train Name"
                    value={trainName}
                    setValue={setTrainName}
                  />
                  <InputField
                    label="Arrival Date"
                    required
                    value={arrivalDate}
                    setValue={setArrivalDate}
                    icon="calendar"
                  />
                  <InputField
                    label="Arrival Time"
                    required
                    value={arrivalTime}
                    setValue={setArrivalTime}
                    icon="clock"
                  />
                  <InputField
                    label="Coach"
                    value={coach}
                    setValue={setCoach}
                  />
                  <InputField
                    label="Berth / Seat Number"
                    value={berth}
                    setValue={setBerth}
                  />
                  <InputField
                    label="Platform Number"
                    value={platform}
                    setValue={setPlatform}
                  />
                  {/* DELAY MONITORING */}
                  <div className="delay-box">
                    <label>
                      Delay Monitoring
                    </label>
                    <div className="delay-row">
                      <button
                        type="button"
                        className={`toggle ${
                          delayMonitoring
                            ? "enabled"
                            : ""
                        }`}
                        onClick={() =>
                          setDelayMonitoring(
                            !delayMonitoring
                          )
                        }
                      >
                        <span />
                      </button>
                      <span>
                        Track live status & notify
                      </span>
                    </div>
                  </div>
                </div>
              </section>
              {/* =================================================
                  DROP LOCATION
              ================================================= */}
              <section className="form-section">
                <h2 className="sub-heading">
                  Drop Location
                </h2>
                <div className="drop-fields">
                  <InputField
                    label="Drop Location"
                    required
                    value={dropLocation}
                    setValue={setDropLocation}
                    icon="location"
                  />
                  <InputField
                    label="Hotel Contact Person"
                    required
                    value={contactPerson}
                    setValue={setContactPerson}
                  />
                  <InputField
                    label="Contact Number"
                    value={contactMobile}
                    setValue={setContactMobile}
                  />
                </div>
              </section>
              {/* =================================================
                  PASSENGER & LUGGAGE
              ================================================= */}
              <section className="form-section">
                <h2 className="sub-heading">
                  Passenger & Luggage
                </h2>
                <div className="passenger-fields">
                  <InputField
                    label="No. of Passengers"
                    required
                    value={passengers}
                    setValue={setPassengers}
                    icon="user"
                  />
                  <InputField
                    label="Luggage Count"
                    value={luggage}
                    setValue={setLuggage}
                    icon="bag"
                  />
                  <InputField
                    label="Special Assistance"
                    value={assistance}
                    setValue={setAssistance}
                    dropdown
                  />
                </div>
              </section>
              {/* =================================================
                  ADDITIONAL REQUIREMENTS
              ================================================= */}
              <section className="form-section">
                <h2 className="sub-heading">
                  Additional Requirements
                </h2>
                <div className="requirements">
                  <Requirement
                    name="meetGreet"
                    label="Meet & Greet"
                  />
                  <Requirement
                    name="porter"
                    label="Porter Service"
                  />
                  <Requirement
                    name="babySeat"
                    label="Baby Seat"
                  />
                  <Requirement
                    name="extraLuggage"
                    label="Extra Luggage Space"
                  />
                  <Requirement
                    name="wheelchair"
                    label="Wheelchair Access"
                  />
                  <Requirement
                    name="other"
                    label="Other"
                  />
                </div>
              </section>
              {/* =================================================
                  FOOTER
              ================================================= */}
              <div className="form-footer">
                <button
                  type="button"
                  className="continue-button"
                  onClick={handleContinue}
                >
                  Save & Continue
                  <Icon
                    name="arrowRight"
                    size={18}
                  />
                </button>
                <button
                  type="button"
                  className="clear-button"
                  onClick={clearAll}
                >
                  <Icon
                    name="trash"
                    size={16}
                  />
                  Clear All
                </button>
              </div>
            </div>
          </div>
          {/* =================================================
              RIGHT SIDE
          ================================================= */}
          <aside className="right-summary">
            {/* =================================================
                TRAIN STATUS
            ================================================= */}
            <div className="summary-card">
              <div className="summary-header">
                <h3>
                  Train Status
                </h3>
                <span className="status-badge">
                  {trainStatus}
                </span>
              </div>
              <div className="train-status">
                <div className="train-title">
                  <Icon
                    name="train"
                    size={23}
                  />
                  <strong>
                    {trainName} ({trainNumber})
                  </strong>
                </div>
                <div className="route">
                  <div className="route-place">
                    <span>
                      Departure
                    </span>
                    <strong>
                      Secunderabad Jn (SC)
                    </strong>
                    <b>
                      05:20 PM
                    </b>
                  </div>
                  <div className="route-arrow">
                    →
                  </div>
                  <div className="route-place">
                    <span>
                      Arrival
                    </span>
                    <strong>
                      Visakhapatnam Jn (VSKP)
                    </strong>
                    <b>
                      {arrivalTime}
                    </b>
                  </div>
                </div>
                <div className="updated">
                  <span>
                    Last Updated: {lastUpdated}
                  </span>
                  <button
                    type="button"
                    onClick={
                      refreshTrainStatus
                    }
                  >
                    <Icon
                      name="refresh"
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>
            {/* =================================================
                FARE SUMMARY
            ================================================= */}
            <div className="summary-card">
              <h3 className="fare-title">
                Fare Summary
                <span>
                  (Estimation)
                </span>
              </h3>
              <SummaryRow
                label="Base Fare (Sedan)"
                value={BASE_FARE}
              />
              <SummaryRow
                label="Station Parking"
                value={STATION_PARKING}
              />
              <SummaryRow
                label="Driver Allowance"
                value={DRIVER_ALLOWANCE}
              />
              <SummaryRow
                label="Waiting Charges (30 mins)"
                value={WAITING_CHARGES}
              />
              {porterCharge > 0 && (
                <SummaryRow
                  label="Porter Service"
                  value={porterCharge}
                />
              )}
              {babySeatCharge > 0 && (
                <SummaryRow
                  label="Baby Seat"
                  value={babySeatCharge}
                />
              )}
              {extraLuggageCharge > 0 && (
                <SummaryRow
                  label="Extra Luggage Space"
                  value={extraLuggageCharge}
                />
              )}
              <SummaryRow
                label="GST (5%)"
                value={gst}
              />
              <div className="fare-divider" />
              <SummaryRow
                label="Subtotal"
                value={subtotal}
              />
              <SummaryRow
                label="Hotel Commission (10%)"
                value={hotelCommission}
                negative
              />
              <div className="grand-total">
                <span>
                  Grand Total
                </span>
                <strong>
                  {formatMoney(
                    grandTotal
                  )}
                </strong>
              </div>
            </div>
            {/* =================================================
                EARNINGS
            ================================================= */}
            <div className="earnings-card">
              <div className="earnings-heading">
                <div className="earning-icon">
                  ₹
                </div>
                <strong>
                  Your Earnings (Estimated)
                </strong>
                <span>
                  10% Commission
                </span>
              </div>
              <p>
                You will earn{" "}
                <strong>
                  {formatMoney(
                    hotelCommission
                  )}
                </strong>
                {" "}on this booking
              </p>
            </div>
            {/* =================================================
                IMPORTANT NOTE
            ================================================= */}
            <div className="important-note">
              <div className="note-heading">
                <Icon
                  name="info"
                  size={19}
                />
                <strong>
                  Important Note
                </strong>
              </div>
              <p>
                Driver will wait for 30
                minutes from the arrival
                time at no extra cost.
                Additional waiting time
                will be charged as per
                policy.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
export default RailwayPickup;