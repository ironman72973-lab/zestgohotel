
import React, { useState } from "react";
import {
  FaBars,
  FaQuestionCircle,
  FaBell,
  FaChevronDown,
  FaChevronRight,
  FaSun,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaPlus,
  FaArrowRight,
  FaFileAlt,
  FaShieldAlt,
  FaHeadset,
  FaPhoneAlt,
  FaComments,
  FaInfoCircle,
  FaChartLine,
  FaWallet,
  FaIdCard,
  FaHotel,
} from "react-icons/fa";

import "./rental.css";

// Vehicle Images
import sedanImg from "../../images/dezire.png";
import suvImg from "../../images/ertiga.png";
import premiumSuvImg from "../../images/innova.png";
import luxuryCarImg from "../../images/bmw.png";
import tempoTravellerImg from "../../images/force.png";
import miniBusImg from "../../images/minibus.png";
import busImg from "../../images/bus.png";

const RentalBooking = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [tripType, setTripType] = useState("half");
  const [vehicle, setVehicle] = useState("SUV");
  const [hourlyPackage, setHourlyPackage] = useState("4h40km");

  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    passengers: 1,
    date: "25 May 2025",
    time: "10:00 AM",
    purpose: "Others",
    stops: "",
    requirements: "",
    customerName: "",
    mobile: "",
    guestType: "Hotel Guest",
    idProofType: "Aadhaar Card",
    idProofNumber: "",
    roomNumber: "",
    customerNotes: "",
  });

  // =========================================================
  // VEHICLE DATA
  // =========================================================

  const vehicles = [
    {
      id: "sedan",
      name: "Sedan",
      capacity: 4,
      image: sedanImg,
    },
    {
      id: "suv",
      name: "SUV",
      capacity: 6,
      image: suvImg,
    },
    {
      id: "premium-suv",
      name: "Premium SUV",
      capacity: 6,
      image: premiumSuvImg,
    },
    {
      id: "luxury-car",
      name: "Luxury Car",
      capacity: 4,
      image: luxuryCarImg,
    },
    {
      id: "tempo-traveller",
      name: "Tempo Traveller",
      capacity: 17,
      image: tempoTravellerImg,
    },
    {
      id: "mini-bus",
      name: "Mini Bus",
      capacity: 25,
      image: miniBusImg,
    },
    {
      id: "bus",
      name: "Bus",
      capacity: 45,
      image: busImg,
    },
  ];

  // =========================================================
  // HOURLY PACKAGES
  // =========================================================

  const hourlyPackages = [
    {
      id: "1h10km",
      label: "1 Hour",
      distance: "10 KM",
      icon: <FaClock />,
    },
    {
      id: "2h20km",
      label: "2 Hours",
      distance: "20 KM",
      icon: <FaClock />,
    },
    {
      id: "2h30km",
      label: "2 Hours",
      distance: "30 KM",
      icon: <FaClock />,
    },
    {
      id: "3h30km",
      label: "3 Hours",
      distance: "30 KM",
      icon: <FaClock />,
    },
    {
      id: "4h40km",
      label: "4 Hours",
      distance: "40 KM",
      icon: <FaClock />,
    },
    {
      id: "4h50km",
      label: "4 Hours",
      distance: "50 KM",
      icon: <FaClock />,
    },
    {
      id: "6h60km",
      label: "6 Hours",
      distance: "60 KM",
      icon: <FaClock />,
    },
    {
      id: "6h75km",
      label: "6 Hours",
      distance: "75 KM",
      icon: <FaClock />,
    },
    {
      id: "8h80km",
      label: "8 Hours",
      distance: "80 KM",
      icon: <FaClock />,
    },
    {
      id: "8h100km",
      label: "8 Hours",
      distance: "100 KM",
      icon: <FaClock />,
    },
    {
      id: "10h120km",
      label: "10 Hours",
      distance: "120 KM",
      icon: <FaClock />,
    },
    {
      id: "12h150km",
      label: "12 Hours",
      distance: "150 KM",
      icon: <FaClock />,
    },
  ];

  // =========================================================
  // 84 VEHICLE / HOURLY PACKAGE RATES
  // =========================================================

  const hourlyRates = {
    Sedan: {
      "1h10km": 550,
      "2h20km": 950,
      "2h30km": 1100,
      "3h30km": 1400,
      "4h40km": 1700,
      "4h50km": 1850,
      "6h60km": 2300,
      "6h75km": 2600,
      "8h80km": 2900,
      "8h100km": 3300,
      "10h120km": 3800,
      "12h150km": 4400,
    },

    SUV: {
      "1h10km": 750,
      "2h20km": 1400,
      "2h30km": 1600,
      "3h30km": 1900,
      "4h40km": 2500,
      "4h50km": 2800,
      "6h60km": 3500,
      "6h75km": 3900,
      "8h80km": 4400,
      "8h100km": 4900,
      "10h120km": 5600,
      "12h150km": 6400,
    },

    "Premium SUV": {
      "1h10km": 1100,
      "2h20km": 2000,
      "2h30km": 2300,
      "3h30km": 2800,
      "4h40km": 3600,
      "4h50km": 4000,
      "6h60km": 5000,
      "6h75km": 5600,
      "8h80km": 6400,
      "8h100km": 7200,
      "10h120km": 8200,
      "12h150km": 9400,
    },

    "Luxury Car": {
      "1h10km": 1600,
      "2h20km": 2900,
      "2h30km": 3350,
      "3h30km": 4050,
      "4h40km": 5350,
      "4h50km": 5950,
      "6h60km": 7400,
      "6h75km": 8200,
      "8h80km": 9200,
      "8h100km": 10200,
      "10h120km": 11700,
      "12h150km": 13200,
    },

    "Tempo Traveller": {
      "1h10km": 1950,
      "2h20km": 3550,
      "2h30km": 3950,
      "3h30km": 4650,
      "4h40km": 6200,
      "4h50km": 7000,
      "6h60km": 8700,
      "6h75km": 9700,
      "8h80km": 11200,
      "8h100km": 12700,
      "10h120km": 14700,
      "12h150km": 16800,
    },

    "Mini Bus": {
      "1h10km": 2700,
      "2h20km": 4950,
      "2h30km": 5550,
      "3h30km": 6500,
      "4h40km": 8500,
      "4h50km": 9500,
      "6h60km": 11800,
      "6h75km": 13300,
      "8h80km": 15300,
      "8h100km": 17300,
      "10h120km": 19800,
      "12h150km": 22800,
    },

    Bus: {
      "1h10km": 3800,
      "2h20km": 6800,
      "2h30km": 7800,
      "3h30km": 9300,
      "4h40km": 11800,
      "4h50km": 13300,
      "6h60km": 16800,
      "6h75km": 18800,
      "8h80km": 21800,
      "8h100km": 24300,
      "10h120km": 27800,
      "12h150km": 32500,
    },
  };

  // =========================================================
  // SELECTED VEHICLE
  // =========================================================

  const selectedVehicle =
    vehicles.find((item) => item.name === vehicle) || vehicles[1];

  const maxPassengers = selectedVehicle.capacity;

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "passengers") {
      let passengerValue = Number(value);

      if (!passengerValue || passengerValue < 1) {
        passengerValue = 1;
      }

      if (passengerValue > maxPassengers) {
        passengerValue = maxPassengers;
      }

      setFormData((prev) => ({
        ...prev,
        passengers: passengerValue,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // VEHICLE CHANGE
  // =========================================================

  const handleVehicleChange = (vehicleName) => {
    setVehicle(vehicleName);

    const newVehicle =
      vehicles.find((item) => item.name === vehicleName) ||
      vehicles[1];

    if (Number(formData.passengers) > newVehicle.capacity) {
      setFormData((prev) => ({
        ...prev,
        passengers: newVehicle.capacity,
      }));
    }
  };

  // =========================================================
  // FARE CALCULATION
  // =========================================================

  const selectedHourlyFare =
    hourlyRates[vehicle]?.[hourlyPackage] || 0;

  const selectedHourlyPackage =
    hourlyPackages.find((item) => item.id === hourlyPackage);

  const selectedTrip =
    tripType === "hourly"
      ? "Hourly Rental"
      : tripType === "half"
      ? "Half Day Rental"
      : "Full Day Rental";

  const baseRentalFare =
    tripType === "hourly"
      ? selectedHourlyFare
      : tripType === "half"
      ? 2500
      : 4000;

  const driverCharges = 800;

  const taxableAmount = baseRentalFare + driverCharges;

  const taxes = Math.round(taxableAmount * 0.05);

  const totalFare = taxableAmount + taxes;

  const hotelCommission = Math.round(totalFare * 0.1);

  // =========================================================
  // CONTINUE
  // =========================================================

  const handleContinue = () => {
    if (!formData.customerName.trim()) {
      alert("Please enter customer name.");
      return;
    }

    if (!formData.mobile.trim()) {
      alert("Please enter customer mobile number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.pickup.trim()) {
      alert("Please enter pickup location.");
      return;
    }

    if (!formData.drop.trim()) {
      alert("Please enter drop location.");
      return;
    }

    if (
      !formData.passengers ||
      Number(formData.passengers) < 1 ||
      Number(formData.passengers) > maxPassengers
    ) {
      alert(
        `Number of passengers must be between 1 and ${maxPassengers} for ${vehicle}.`
      );
      return;
    }

    alert("Rental booking details validated successfully.");
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="rental-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="rental-header">
        <div className="header-left">

          <button className="menu-button">
            <FaBars />
          </button>

          <div className="header-title">
            <FaHotel />
            <span>Rental Booking</span>
          </div>

        </div>

        <div className="header-right">

          <button className="header-icon">
            <FaQuestionCircle />
          </button>

          <button className="header-icon notification-icon">
            <FaBell />
            <span className="notification-dot"></span>
          </button>

          <div className="profile-area">

            <div className="profile-avatar">
              H
            </div>

            <div className="profile-info">
              <strong>Hotel Partner</strong>
              <span>Hotel Admin</span>
            </div>

            <FaChevronDown className="profile-arrow" />

          </div>

        </div>
      </header>

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="rental-breadcrumb">
        <span>Hotel Dashboard</span>

        <FaChevronRight />

        <span>Bookings</span>

        <FaChevronRight />

        <strong>Rental Booking</strong>
      </div>

      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="rental-heading">

        <div>
          <h1>Rental Booking</h1>

          <p>
            Create a vehicle rental booking for your hotel guest
          </p>
        </div>

        <button className="draft-top-button">
          <FaFileAlt />
          Save as Draft
        </button>

      </div>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="booking-progress">

        <div className="progress-line"></div>

        <div className="progress-step active">
          <div className="progress-number">1</div>
          <span>Rental Details</span>
        </div>

        <div className="progress-step">
          <div className="progress-number">2</div>
          <span>Customer Details</span>
        </div>

        <div className="progress-step">
          <div className="progress-number">3</div>
          <span>Confirmation</span>
        </div>

      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <main className="rental-main-grid">

        {/* ===================================================
            MAIN CARD
        =================================================== */}

        <section className="rental-main-card">

          {/* =================================================
              TRIP TYPE
          ================================================= */}

          <div className="rental-section">

            <div className="section-heading">

              <span className="section-number">
                1
              </span>

              <div>
                <h2>Choose Rental Type</h2>

                <p>
                  Select the rental duration for your guest
                </p>
              </div>

            </div>

            <div className="trip-type-grid">

              {/* HOURLY */}

              <div
                className={`trip-type-card ${
                  tripType === "hourly" ? "active" : ""
                }`}
                onClick={() => setTripType("hourly")}
              >

                <div className="trip-icon">
                  <FaClock />
                </div>

                <div className="trip-content">
                  <strong>Hourly Rental</strong>
                  <span>Flexible hourly packages</span>
                </div>

                <div className="trip-check">
                  {tripType === "hourly" && "✓"}
                </div>

              </div>

              {/* HALF DAY */}

              <div
                className={`trip-type-card ${
                  tripType === "half" ? "active" : ""
                }`}
                onClick={() => setTripType("half")}
              >

                <div className="trip-icon">
                  <FaSun />
                </div>

                <div className="trip-content">
                  <strong>Half Day</strong>
                  <span>Up to 6 hours</span>
                </div>

                <div className="trip-check">
                  {tripType === "half" && "✓"}
                </div>

              </div>

              {/* FULL DAY */}

              <div
                className={`trip-type-card ${
                  tripType === "full" ? "active" : ""
                }`}
                onClick={() => setTripType("full")}
              >

                <div className="trip-icon">
                  <FaCalendarAlt />
                </div>

                <div className="trip-content">
                  <strong>Full Day</strong>
                  <span>Up to 12 hours</span>
                </div>

                <div className="trip-check">
                  {tripType === "full" && "✓"}
                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              HOURLY PACKAGE
          ================================================= */}

          {tripType === "hourly" && (
            <div className="hourly-package-section">

              <div className="section-heading">

                <span className="section-number">
                  2
                </span>

                <div>
                  <h2>Choose Hourly Package</h2>

                  <p>
                    Select hours and maximum distance
                  </p>
                </div>

              </div>

              <div className="hourly-package-grid">

                {hourlyPackages.map((pkg) => {

                  const fare =
                    hourlyRates[vehicle]?.[pkg.id] || 0;

                  return (
                    <div
                      key={pkg.id}
                      className={`hourly-package-card ${
                        hourlyPackage === pkg.id
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setHourlyPackage(pkg.id)
                      }
                    >

                      <div className="hourly-package-icon">
                        {pkg.icon}
                      </div>

                      <div className="hourly-package-content">

                        <strong>
                          {pkg.label}
                        </strong>

                        <span>
                          Up to {pkg.distance}
                        </span>

                        <b>
                          ₹{fare.toLocaleString("en-IN")}
                        </b>

                      </div>

                      <div className="hourly-package-check">
                        {hourlyPackage === pkg.id &&
                          "✓"}
                      </div>

                    </div>
                  );
                })}

              </div>
            </div>
          )}

          {/* =================================================
              VEHICLE
          ================================================= */}

          <div className="rental-section">

            <div className="section-heading">

              <span className="section-number">
                {tripType === "hourly" ? "3" : "2"}
              </span>

              <div>
                <h2>Select Vehicle</h2>

                <p>
                  Choose a suitable vehicle for the guest
                </p>
              </div>

            </div>

            <div className="vehicle-grid">

              {vehicles.map((item) => (

                <div
                  key={item.id}
                  className={`vehicle-card ${
                    vehicle === item.name
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleVehicleChange(item.name)
                  }
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="vehicle-image"
                  />

                  {/* ONLY VEHICLE NAME */}
                  <div className="vehicle-info">
                    <strong>{item.name}</strong>
                  </div>

                  <div className="vehicle-check">
                    {vehicle === item.name && "✓"}
                  </div>

                </div>

              ))}

            </div>
          </div>

          {/* =================================================
              CAPACITY INFO
          ================================================= */}

          <div className="rental-info-strip">

            <FaInfoCircle />

            <div>

              <strong>
                Selected Vehicle Capacity
              </strong>

              <span>
                {vehicle} can accommodate up to{" "}
                <b>{maxPassengers} passengers</b>.
              </span>

            </div>

          </div>

          {/* =================================================
              RENTAL DETAILS
          ================================================= */}

          <div className="rental-section">

            <div className="section-heading">

              <span className="section-number">
                {tripType === "hourly" ? "4" : "3"}
              </span>

              <div>
                <h2>Rental Details</h2>

                <p>
                  Enter the trip and booking information
                </p>
              </div>

            </div>

            <h3 className="main-form-title">
              Trip Information
            </h3>

            <div className="rental-form-grid">

              {/* PICKUP */}

              <div className="form-field">

                <label>
                  Pickup Location <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaMapMarkerAlt />

                  <input
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                  />

                </div>

              </div>

              {/* DROP */}

              <div className="form-field">

                <label>
                  Drop Location <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaMapMarkerAlt />

                  <input
                    type="text"
                    name="drop"
                    value={formData.drop}
                    onChange={handleChange}
                    placeholder="Enter drop location"
                  />

                </div>

              </div>

              {/* PASSENGERS */}

              <div className="form-field">

                <label>
                  Number of Passengers <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaUser />

                  <input
                    type="number"
                    name="passengers"
                    min="1"
                    max={maxPassengers}
                    value={formData.passengers}
                    onChange={handleChange}
                    placeholder={`1-${maxPassengers}`}
                  />

                </div>

                <small>
                  Maximum {maxPassengers} passengers for{" "}
                  {vehicle}
                </small>

              </div>

              {/* DATE */}

              <div className="form-field">

                <label>
                  Pickup Date <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaCalendarAlt />

                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Select date"
                  />

                </div>

              </div>

              {/* TIME */}

              <div className="form-field">

                <label>
                  Pickup Time <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaClock />

                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="Select time"
                  />

                </div>

              </div>

              {/* PURPOSE */}

              <div className="form-field">

                <label>
                  Trip Purpose
                </label>

                <div className="select-wrapper">

                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                  >
                    <option>
                      Airport Transfer
                    </option>

                    <option>
                      Business Meeting
                    </option>

                    <option>
                      Sightseeing
                    </option>

                    <option>
                      Wedding / Event
                    </option>

                    <option>
                      Local Travel
                    </option>

                    <option>
                      Others
                    </option>
                  </select>

                  <FaChevronDown />

                </div>

              </div>

              {/* ADDITIONAL STOPS */}

              <div className="form-field">

                <label>
                  Additional Stops
                </label>

                <div className="input-wrapper">

                  <FaPlus />

                  <input
                    type="text"
                    name="stops"
                    value={formData.stops}
                    onChange={handleChange}
                    placeholder="Add intermediate stops"
                  />

                </div>

              </div>

              {/* REQUIREMENTS */}

              <div className="form-field">

                <label>
                  Special Requirements
                </label>

                <div className="input-wrapper">

                  <FaInfoCircle />

                  <input
                    type="text"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Child seat, luggage, etc."
                  />

                </div>

              </div>

            </div>

            {/* RENTAL RULES */}

            <div className="rental-rules">

              <FaInfoCircle />

              <div>

                <strong>
                  Rental Information
                </strong>

                <p>
                  Package includes vehicle and driver
                  charges. Additional parking, tolls and
                  extra kilometres, if applicable, may be
                  charged separately.
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              CUSTOMER DETAILS
          ================================================= */}

          <div className="rental-section">

            <div className="section-heading">

              <span className="section-number">
                {tripType === "hourly" ? "5" : "4"}
              </span>

              <div>
                <h2>Customer Details</h2>

                <p>
                  Enter guest information for the booking
                </p>
              </div>

            </div>

            <h3 className="customer-section-title">
              Guest Information
            </h3>

            <div className="customer-form-grid">

              {/* CUSTOMER NAME */}

              <div className="form-field">

                <label>
                  Customer Name <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaUser />

                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter guest name"
                  />

                </div>

              </div>

              {/* MOBILE */}

              <div className="form-field">

                <label>
                  Mobile Number <span>*</span>
                </label>

                <div className="input-wrapper">

                  <FaPhoneAlt />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    placeholder="10-digit mobile number"
                  />

                </div>

              </div>

              {/* GUEST TYPE */}

              <div className="form-field">

                <label>
                  Guest Type
                </label>

                <div className="select-wrapper">

                  <select
                    name="guestType"
                    value={formData.guestType}
                    onChange={handleChange}
                  >
                    <option>
                      Hotel Guest
                    </option>

                    <option>
                      Corporate Guest
                    </option>

                    <option>
                      Walk-in Guest
                    </option>

                    <option>
                      Other
                    </option>
                  </select>

                  <FaChevronDown />

                </div>

              </div>

              {/* ROOM NUMBER */}

              <div className="form-field">

                <label>
                  Room Number
                </label>

                <div className="input-wrapper">

                  <FaHotel />

                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="Hotel room number"
                  />

                </div>

              </div>

              {/* ID PROOF TYPE */}

              <div className="form-field">

                <label>
                  ID Proof Type
                </label>

                <div className="select-wrapper">

                  <select
                    name="idProofType"
                    value={formData.idProofType}
                    onChange={handleChange}
                  >
                    <option>
                      Aadhaar Card
                    </option>

                    <option>
                      Passport
                    </option>

                    <option>
                      Driving Licence
                    </option>

                    <option>
                      Voter ID
                    </option>

                    <option>
                      Other
                    </option>
                  </select>

                  <FaChevronDown />

                </div>

              </div>

              {/* ID NUMBER */}

              <div className="form-field">

                <label>
                  ID Proof Number
                </label>

                <div className="input-wrapper">

                  <FaIdCard />

                  <input
                    type="text"
                    name="idProofNumber"
                    value={formData.idProofNumber}
                    onChange={handleChange}
                    placeholder="Enter ID number"
                  />

                </div>

              </div>

              {/* NOTES */}

              <div className="form-field customer-notes-field">

                <label>
                  Customer Notes
                </label>

                <div className="textarea-wrapper">

                  <FaComments />

                  <textarea
                    name="customerNotes"
                    value={formData.customerNotes}
                    onChange={handleChange}
                    placeholder="Any additional instructions or guest requirements..."
                    rows="4"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              CONTINUE
          ================================================= */}

          <div className="continue-area">

            <button
              className="continue-button"
              onClick={handleContinue}
            >
              Continue to Confirmation

              <FaArrowRight />
            </button>

          </div>

        </section>

        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <aside className="rental-sidebar">

          {/* BOOKING SUMMARY */}

          <div className="sidebar-card">

            <div className="sidebar-card-header">

              <div>
                <h3>Booking Summary</h3>

                <span>
                  Review your rental
                </span>
              </div>

              <FaFileAlt />

            </div>

            <div className="summary-content">

              <div className="summary-row">
                <span>Rental Type</span>

                <strong>
                  {selectedTrip}
                </strong>
              </div>

              {tripType === "hourly" &&
                selectedHourlyPackage && (
                  <div className="summary-row">

                    <span>
                      Package
                    </span>

                    <strong>
                      {selectedHourlyPackage.label} /{" "}
                      {selectedHourlyPackage.distance}
                    </strong>

                  </div>
                )}

              <div className="summary-row">

                <span>
                  Vehicle
                </span>

                <strong>
                  {vehicle}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Passengers
                </span>

                <strong>
                  {formData.passengers}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Pickup
                </span>

                <strong>
                  {formData.pickup ||
                    "Not selected"}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Drop
                </span>

                <strong>
                  {formData.drop ||
                    "Not selected"}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Date
                </span>

                <strong>
                  {formData.date}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Time
                </span>

                <strong>
                  {formData.time}
                </strong>

              </div>

            </div>

          </div>

          {/* FARE BREAKDOWN */}

          <div className="fare-card">

            <div className="sidebar-card-header">

              <div>
                <h3>
                  Fare Breakdown
                </h3>

                <span>
                  Estimated booking amount
                </span>
              </div>

              <FaWallet />

            </div>

            <div className="fare-content">

              <div className="fare-row">

                <span>
                  Base Rental Fare
                </span>

                <strong>
                  ₹{baseRentalFare.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="fare-row">

                <span>
                  Driver Charges
                </span>

                <strong>
                  ₹{driverCharges.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="fare-row">

                <span>
                  Taxes / GST
                </span>

                <strong>
                  ₹{taxes.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="fare-divider"></div>

              <div className="fare-total">

                <span>
                  Total Fare
                </span>

                <strong>
                  ₹{totalFare.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            </div>

          </div>

          {/* HOTEL COMMISSION */}

          <div className="earnings-card">

            <div className="earnings-icon">
              <FaChartLine />
            </div>

            <div className="earnings-content">

              <span>
                Hotel Commission
              </span>

              <strong>
                ₹{hotelCommission.toLocaleString(
                  "en-IN"
                )}
              </strong>

              <small>
                10% commission on completed booking
              </small>

            </div>

          </div>

          {/* SAVE DRAFT */}

          <button className="save-draft-button">

            <FaFileAlt />

            Save Booking as Draft

          </button>

          {/* SECURITY */}

          <div className="security-card">

            <div className="security-icon">
              <FaShieldAlt />
            </div>

            <div>

              <strong>
                Secure Booking
              </strong>

              <p>
                Your guest information and booking
                details are protected.
              </p>

            </div>

          </div>

        </aside>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="rental-footer">

        <div className="footer-support">

          <div className="footer-icon">
            <FaHeadset />
          </div>

          <div>

            <strong>
              Need Help?
            </strong>

            <span>
              ZestGo Partner Support
            </span>

          </div>

        </div>

        <div className="footer-actions">

          <button>
            <FaPhoneAlt />
            Call Support
          </button>

          <button>
            <FaComments />
            Chat with Us
          </button>

          <button>
            <FaQuestionCircle />
            Help Center
          </button>

        </div>

      </footer>

    </div>
  );
};

export default RentalBooking;