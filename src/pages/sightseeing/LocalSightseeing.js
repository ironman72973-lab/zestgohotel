import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  ChevronRight,
  ChevronDown,
  Bell,
  CircleHelp,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Info,
  Check,
  ArrowRight,
  Bookmark,
  Headphones,
  BadgeCheck,
  Building2,
  WalletCards,
  LockKeyhole,
  CircleArrowRight,
} from "lucide-react";
import "./ls.css";
/* =========================================================
   IMAGE IMPORTS
========================================================= */
import backgroundImage from "../../images/hotel1.png";
import heroVizag from "../../images/hotel1.png";
import vizagTour from "../../images/hotel1.png";
import arakuTour from "../../images/hotel1.png";
import simhachalam from "../../images/hotel1.png";
import borraCaves from "../../images/hotel1.png";
import profileImage from "../../images/hotel1.png";
/* =========================================================
   PACKAGE DATA
========================================================= */
const packages = [
  {
    id: 1,
    name: "Vizag City Tour",
    hours: "8 Hours",
    distance: "60 KM",
    description:
      "Explore the best of Visakhapatnam attractions.",
    price: "₹ 3,499",
    priceValue: 3499,
    people: "Up to 4 People",
    image: vizagTour,
  },
  {
    id: 2,
    name: "Araku Valley Tour",
    hours: "1 day",
    distance: "220 KM",
    description:
      "Scenic beauty, waterfalls, coffee plantations & tribal culture.",
    price: "₹ 4,499",
    priceValue: 4499,
    people: "Up to 4 People",
    image: arakuTour,
  },
  {
    id: 3,
    name: "Simhachalam & Rushikonda",
    hours: "6 Hours",
    distance: "70 KM",
    description:
      "Visit Simhachalam Temple and Rushikonda Beach.",
    price: "₹ 1,999",
    priceValue: 1999,
    people: "Up to 4 People",
    image: simhachalam,
  },
  {
    id: 4,
    name: "Borra Caves & Ananthagiri",
    hours: "9 Hours",
    distance: "160 KM",
    description:
      "Borra Caves, Ananthagiri Hills and Duduma Waterfalls.",
    price: "₹ 3,499",
    priceValue: 3499,
    people: "Up to 4 People",
    image: borraCaves,
  },
];
/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function LocalSightseeing() {
  const navigate = useNavigate();
  /* =======================================================
     STATES
  ======================================================= */
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [pickupDate, setPickupDate] =
    useState("25 May 2025");
  const [pickupTime, setPickupTime] =
    useState("09:00 AM");
  const [pickupLocation, setPickupLocation] =
    useState("Oceanview Palace Hotel");
  const [passengers, setPassengers] =
    useState("2 Adults, 1 Child");
  const [duration, setDuration] =
    useState("8 Hours (Approx.)");
  const [specialInstructions, setSpecialInstructions] =
    useState("");
  /* =======================================================
     SELECTED PACKAGE
  ======================================================= */
  const selected =
    packages.find(
      (item) => item.id === selectedPackage
    ) || packages[0];
  /* =======================================================
     FARE CALCULATION
  ======================================================= */
  const packageFare = selected.priceValue;
  const extraHour = 0;
  const extraKm = 0;
  const gst = Number(
    (
      (packageFare + extraHour + extraKm) *
      0.05
    ).toFixed(2)
  );
  const subtotal = Number(
    (
      packageFare +
      extraHour +
      extraKm +
      gst
    ).toFixed(2)
  );
  const hotelCommission = Number(
    (packageFare * 0.1).toFixed(2)
  );
  const grandTotal = Number(
    (subtotal - hotelCommission).toFixed(2)
  );
  /* =======================================================
     CONTINUE TO BOOKING
  ======================================================= */
  const handleContinue = () => {
    const bookingData = {
      serviceType: "Local Sightseeing",
      package: {
        id: selected.id,
        name: selected.name,
        hours: selected.hours,
        distance: selected.distance,
        description: selected.description,
        price: selected.price,
        priceValue: selected.priceValue,
        people: selected.people,
        image: selected.image,
      },
      tripDetails: {
        pickupDate,
        pickupTime,
        pickupLocation,
        passengers,
        duration,
        specialInstructions,
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
    };
    console.log(
      "Booking Data:",
      bookingData
    );
    navigate("/booking", {
      state: bookingData,
    });
  };
  /* =======================================================
     CHANGE SERVICE
  ======================================================= */
  const handleChangeService = () => {
    navigate("/services");
  };
  /* =======================================================
     SAVE DRAFT
  ======================================================= */
  const handleSaveDraft = () => {
    const draftData = {
      serviceType: "Local Sightseeing",
      package: selected,
      tripDetails: {
        pickupDate,
        pickupTime,
        pickupLocation,
        passengers,
        duration,
        specialInstructions,
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
    };
    localStorage.setItem(
      "localSightseeingDraft",
      JSON.stringify(draftData)
    );
    alert("Booking saved as draft.");
  };
  /* =======================================================
     RETURN
  ======================================================= */
  return (
    <div
      className="app"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(247, 250, 249, 0.90),
            rgba(247, 250, 249, 0.90)
          ),
          url(${backgroundImage})
        `,
      }}
    >
      {/* ===================================================
          HEADER
      =================================================== */}
      <header className="topbar">
        <div className="logoArea">
          <div className="logoMark">
            <span>Z</span>
          </div>
          <div className="logoText">
            <div>
              <span className="zest">
                Zest
              </span>
              <span className="go">
                Go
              </span>
            </div>
            <small>
              LAKWA FLEET
            </small>
          </div>
        </div>
        <button
          type="button"
          className="menuButton"
        >
          <Menu size={25} />
        </button>
        <div className="breadcrumbs">
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
        <div className="headerRight">
          <button
            type="button"
            className="helpButton"
          >
            <CircleHelp size={19} />
            Help Center
          </button>
          <div className="notification">
            <Bell size={22} />
            <span>
              12
            </span>
          </div>
          <div className="profile">
            <img
              src={profileImage}
              alt="Profile"
            />
            <div className="profileText">
              <strong>
                Rohit Sharma
              </strong>
              <small>
                Reception Manager
              </small>
            </div>
            <ChevronDown size={18} />
          </div>
        </div>
      </header>
      {/* ===================================================
          HERO
      =================================================== */}
      <section
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(247, 250, 249, 0.98) 0%,
              rgba(247, 250, 249, 0.95) 28%,
              rgba(247, 250, 249, 0.35) 56%,
              rgba(247, 250, 249, 0.05) 100%
            ),
            url(${heroVizag})
          `,
        }}
      >
        <div className="heroContent">
          <h1>
            Local Sightseeing Package
          </h1>
          <p>
            Explore popular attractions around
            the city with our local tour packages.
          </p>
        </div>
        <button
          type="button"
          className="changeService"
          onClick={handleChangeService}
        >
          ← &nbsp; Change Service
        </button>
      </section>
      {/* ===================================================
          MAIN CONTENT
      =================================================== */}
      <main className="pageContent">
        {/* =================================================
            LEFT COLUMN
        ================================================= */}
        <div className="leftColumn">
          {/* =================================================
              STEPPER
          ================================================= */}
          <div className="stepper">
            <div className="step active">
              <span className="stepNumber">
                1
              </span>
              <strong>
                Package & Details
              </strong>
            </div>
            <div className="stepLine" />
            <div className="step">
              <span className="stepNumber">
                2
              </span>
              <strong>
                Vehicle Selection
              </strong>
            </div>
            <div className="stepLine" />
            <div className="step">
              <span className="stepNumber">
                3
              </span>
              <strong>
                Guest Details
              </strong>
            </div>
            <div className="stepLine" />
            <div className="step">
              <span className="stepNumber">
                4
              </span>
              <strong>
                Payment & Confirm
              </strong>
            </div>
          </div>
          {/* =================================================
              PACKAGE SECTION
          ================================================= */}
          <section className="contentCard packageSection">
            <div className="sectionTitle">
              <span className="numberBadge">
                1
              </span>
              <h2>
                Choose Sightseeing Package
              </h2>
            </div>
            <div className="packageGrid">
              {packages.map((item) => (
                <div
                  key={item.id}
                  className={`
                    packageCard
                    ${
                      selectedPackage === item.id
                        ? "selected"
                        : ""
                    }
                  `}
                  onClick={() =>
                    setSelectedPackage(item.id)
                  }
                >
                  <div className="imageWrap">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                    {selectedPackage ===
                      item.id && (
                      <span className="selectedIcon">
                        <Check size={14} />
                      </span>
                    )}
                  </div>
                  <h3>
                    {item.name}
                  </h3>
                  <div className="packageMeta">
                    <span>
                      <Clock3 size={15} />
                      {item.hours}
                    </span>
                    <span>
                      <MapPin size={15} />
                      {item.distance}
                    </span>
                  </div>
                  <p>
                    {item.description}
                  </p>
                  <div className="packagePrice">
                    {item.price}
                  </div>
                  <div className="packagePeople">
                    {item.people}
                  </div>
                </div>
              ))}
            </div>
            <div className="packageInfo">
              <Info size={17} />
              <span>
                All packages include driver allowance,
                fuel, toll, parking and taxes.
              </span>
            </div>
          </section>
          {/* =================================================
              TRIP DETAILS
          ================================================= */}
          <section className="contentCard tripSection">
            <div className="sectionTitle">
              <span className="numberBadge">
                2
              </span>
              <h2>
                Trip Details
              </h2>
            </div>
            <div className="formGrid">
              {/* PICKUP DATE */}
              <div className="formField">
                <label>
                  Pickup Date
                </label>
                <div className="inputBox">
                  <div className="inputLeft">
                    <CalendarDays size={18} />
                    <input
                      type="text"
                      value={pickupDate}
                      onChange={(e) =>
                        setPickupDate(
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <ChevronDown size={17} />
                </div>
              </div>
              {/* PICKUP TIME */}
              <div className="formField">
                <label>
                  Pickup Time
                </label>
                <div className="inputBox">
                  <div className="inputLeft">
                    <Clock3 size={18} />
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) =>
                        setPickupTime(
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <ChevronDown size={17} />
                </div>
              </div>
              {/* PICKUP LOCATION */}
              <div className="formField">
                <label>
                  Pickup Location
                </label>
                <div className="inputBox">
                  <div className="inputLeft">
                    <MapPin size={18} />
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) =>
                        setPickupLocation(
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <ChevronDown size={17} />
                </div>
              </div>
              {/* PASSENGERS */}
              <div className="formField">
                <label>
                  Number of People
                </label>
                <div className="inputBox">
                  <div className="inputLeft">
                    <Users size={18} />
                    <input
                      type="text"
                      value={passengers}
                      onChange={(e) =>
                        setPassengers(
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <ChevronDown size={17} />
                </div>
              </div>
              {/* DURATION */}
              <div className="formField">
                <label>
                  Total Duration
                </label>
                <div className="inputBox">
                  <div className="inputLeft">
                    <Clock3 size={18} />
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) =>
                        setDuration(
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <ChevronDown size={17} />
                </div>
              </div>
              {/* SPECIAL INSTRUCTIONS */}
              <div className="formField">
                <label>
                  Special Instructions (Optional)
                </label>
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder="Any special requests"
                    value={
                      specialInstructions
                    }
                    onChange={(e) =>
                      setSpecialInstructions(
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="driverInfo">
              <Info size={17} />
              <span>
                Our driver will contact you
                before pickup.
              </span>
            </div>
          </section>
          {/* =================================================
              BENEFITS
          ================================================= */}
          <section className="benefits">
            <Benefit
              icon={
                <CircleArrowRight />
              }
              title="Free Cancellation"
              text="Cancel up to 12 hours before your scheduled trip."
            />
            <Benefit
              icon={
                <Headphones />
              }
              title="24×7 Support"
              text="We're here to help you anytime, anywhere."
            />
            <Benefit
              icon={
                <BadgeCheck />
              }
              title="Best Price Guarantee"
              text="Get the best price with zero hidden charges."
            />
            <Benefit
              icon={
                <Building2 />
              }
              title="Trusted by 500+ Hotels"
              text="Join hundreds of hotels who trust ZestGo Lakwa Fleet."
            />
          </section>
        </div>
        {/* =================================================
            RIGHT SUMMARY
        ================================================= */}
        <aside className="summaryColumn">
          <div className="summaryCard">
            {/* SUMMARY HEADER */}
            <div className="summaryHeader">
              <CalendarDays size={22} />
              <h2>
                Booking Summary
              </h2>
            </div>
            <div className="summaryBody">
              {/* SERVICE */}
              <SummaryRow
                label="Service Type"
                value="Local Sightseeing"
              />
              {/* PACKAGE */}
              <SummaryRow
                label="Package"
                value={selected.name}
              />
              {/* DURATION */}
              <SummaryRow
                label="Duration"
                value={`${selected.hours} / ${selected.distance} (Approx.)`}
              />
              {/* DATE & TIME */}
              <SummaryRow
                label="Date & Time"
                value={`${pickupDate}, ${pickupTime}`}
              />
              {/* PICKUP */}
              <SummaryRow
                label="Pickup Location"
                value={pickupLocation}
              />
              {/* PASSENGERS */}
              <SummaryRow
                label="Passengers"
                value={passengers}
              />
              {/* =================================================
                  FARE BREAKDOWN
              ================================================= */}
              <div className="fareBox">
                <h3>
                  Fare Breakdown
                </h3>
                <FareRow
                  label="Package Fare"
                  value={`₹ ${packageFare.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}`}
                />
                <FareRow
                  label="Extra Hour (0)"
                  value="₹ 0.00"
                />
                <FareRow
                  label="Extra KM (0)"
                  value="₹ 0.00"
                />
                <FareRow
                  label="GST (5%)"
                  value={`₹ ${gst.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}`}
                />
                <div className="fareDivider" />
                <FareRow
                  label="Subtotal"
                  value={`₹ ${subtotal.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}`}
                />
                <FareRow
                  label="Hotel Commission (10%)"
                  value={`- ₹ ${hotelCommission.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}`}
                />
                <div className="fareDivider" />
                <div className="grandTotal">
                  <strong>
                    Grand Total
                  </strong>
                  <strong>
                    ₹{" "}
                    {grandTotal.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </strong>
                </div>
              </div>
              {/* =================================================
                  EARNINGS
              ================================================= */}
              <div className="earningBox">
                <div className="earningHeader">
                  <span>
                    <WalletCards size={17} />
                    Your Earnings (Estimated)
                  </span>
                  <small>
                    10% Commission
                  </small>
                </div>
                <p>
                  You will earn{" "}
                  <strong>
                    ₹{" "}
                    {hotelCommission.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </strong>{" "}
                  on this booking
                </p>
              </div>
              {/* =================================================
                  CONTINUE BUTTON
              ================================================= */}
              <button
                type="button"
                className="continueButton"
                onClick={handleContinue}
              >
                <span>
                  Continue to Vehicle Selection
                </span>
                <ArrowRight size={20} />
              </button>
              {/* =================================================
                  SAVE DRAFT
              ================================================= */}
              <button
                type="button"
                className="draftButton"
                onClick={handleSaveDraft}
              >
                <Bookmark size={19} />
                Save as Draft
              </button>
              {/* =================================================
                  SECURE TEXT
              ================================================= */}
              <div className="secureText">
                <LockKeyhole size={16} />
                <span>
                  Your booking details are safe
                  and secure
                </span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
/* =========================================================
   FORM FIELD COMPONENT
========================================================= */
function FormField({
  label,
  icon,
  value,
  arrow = false,
}) {
  return (
    <div className="formField">
      <label>
        {label}
      </label>
      <div className="inputBox">
        <div className="inputLeft">
          {icon}
          <span>
            {value}
          </span>
        </div>
        {arrow && (
          <ChevronDown size={17} />
        )}
      </div>
    </div>
  );
}
/* =========================================================
   SUMMARY ROW
========================================================= */
function SummaryRow({
  label,
  value,
}) {
  return (
    <div className="summaryRow">
      <span>
        {label}
      </span>
      <strong>
        {value}
      </strong>
    </div>
  );
}
/* =========================================================
   FARE ROW
========================================================= */
function FareRow({
  label,
  value,
}) {
  return (
    <div className="fareRow">
      <span>
        {label}
      </span>
      <strong>
        {value}
      </strong>
    </div>
  );
}
/* =========================================================
   BENEFIT COMPONENT
========================================================= */
function Benefit({
  icon,
  title,
  text,
}) {
  return (
    <div className="benefit">
      <div className="benefitIcon">
        {icon}
      </div>
      <div>
        <strong>
          {title}
        </strong>
        <p>
          {text}
        </p>
      </div>
    </div>
  );
}