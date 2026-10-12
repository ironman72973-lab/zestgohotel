import React, { useEffect, useRef, useState } from "react";
import sedanImg from "../../images/dezire.png";
import suvImg from "../../images/ertiga.png";
import premiumSuvImg from "../../images/innova.png";
import luxuryCarImg from "../../images/bmw.png";
import tempoTravellerImg from "../../images/force.png";
import miniBusImg from "../../images/minibus.png";
import busImg from "../../images/bus.png";
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
// Location autocomplete powered by OpenStreetMap Nominatim.
// Search is debounced and requests are cancelled when the query changes.
const LocationAutocomplete = ({ name, value, onChange, onLocationSelect, placeholder, label }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedLabel, setSelectedLabel] = useState("");
  const wrapperRef = useRef(null);
  useEffect(() => {
    const query = (value || "").trim();
    if (query.length < 3 || query === selectedLabel) {
      setSuggestions([]);
      setIsLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: query,
          format: "jsonv2",
          addressdetails: "1",
          limit: "6",
          countrycodes: "in",
        });
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`,
          { signal: controller.signal, headers: { Accept: "application/json" } }
        );
        if (!response.ok) throw new Error("Location search is unavailable");
        const places = await response.json();
        setSuggestions(places.map((place) => ({
          id: place.place_id,
          title: place.name || place.display_name.split(",")[0],
          description: place.display_name,
          lat: Number(place.lat),
          lon: Number(place.lon),
        })));
        setActiveIndex(-1);
        setIsOpen(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSuggestions([]);
          setIsOpen(true);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 550);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [value, selectedLabel]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const chooseSuggestion = (place) => {
    setSelectedLabel(place.description);
    onChange(place.description);
    onLocationSelect?.({ lat: place.lat, lon: place.lon, label: place.description });
    setIsOpen(false);
    setSuggestions([]);
    setActiveIndex(-1);
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" && suggestions.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp" && suggestions.length) {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
    } else if (event.key === "Enter" && isOpen && suggestions.length) {
      event.preventDefault();
      chooseSuggestion(suggestions[activeIndex >= 0 ? activeIndex : 0]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };
  return (
    <div className="location-autocomplete" ref={wrapperRef}>
      <div className="input-wrapper location-input-wrapper">
        <FaMapMarkerAlt aria-hidden="true" />
        <input
          type="text"
          name={name}
          value={value}
          onChange={(event) => {
            setSelectedLabel("");
            onLocationSelect?.(null);
            onChange(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => value.trim().length >= 3 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-label={label}
          aria-autocomplete="list"
          aria-expanded={isOpen && suggestions.length > 0}
          aria-controls={`${name}-location-suggestions`}
        />
        {isLoading && <span className="location-search-spinner" aria-label="Searching locations" />}
        {!isLoading && value.trim().length >= 3 && value === selectedLabel && (
          <span className="location-selected-mark" aria-label="Location selected">✓</span>
        )}
      </div>
      {isOpen && (isLoading || suggestions.length > 0 || value.trim().length >= 3) && (
        <div className="location-suggestions" id={`${name}-location-suggestions`} role="listbox">
          {isLoading && <div className="location-suggestion-status">Searching nearby locations…</div>}
          {!isLoading && suggestions.map((place, index) => (
            <button
              type="button"
              key={place.id}
              className={`location-suggestion ${index === activeIndex ? "active" : ""}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => chooseSuggestion(place)}
            >
              <span className="location-suggestion-icon"><FaMapMarkerAlt /></span>
              <span className="location-suggestion-copy">
                <strong>{place.title}</strong>
                <small>{place.description}</small>
              </span>
            </button>
          ))}
          {!isLoading && suggestions.length === 0 && (
            <div className="location-suggestion-status">
              No matching locations found. Try adding a locality or city name.
            </div>
          )}
          <div className="location-attribution">Location results by OpenStreetMap</div>
        </div>
      )}
    </div>
  );
};
// Vehicle Images
const RentalBooking = () => {
  // =========================================================
  // STATE
  // =========================================================
  const [tripType, setTripType] = useState("half");
  const [currentStep, setCurrentStep] = useState(1);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("success");
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropCoordinates, setDropCoordinates] = useState(null);
  const [routeDistanceKm, setRouteDistanceKm] = useState(null);
  const [routeDistanceStatus, setRouteDistanceStatus] = useState("idle");
  const [vehicle, setVehicle] = useState("SUV");
  const [hourlyPackage, setHourlyPackage] = useState("4h40km");
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    passengers: 1,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10),
    time: "10:00",
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
  // Calculate actual driving distance between the selected locations.
  // OSRM returns road-route distance in metres; the booking limit is 150 km.
  useEffect(() => {
    if (!pickupCoordinates || !dropCoordinates) {
      setRouteDistanceKm(null);
      setRouteDistanceStatus("idle");
      return undefined;
    }
    const controller = new AbortController();
    setRouteDistanceKm(null);
    setRouteDistanceStatus("checking");
    const timer = window.setTimeout(async () => {
      try {
        const routeUrl = `https://router.project-osrm.org/route/v1/driving/${pickupCoordinates.lon},${pickupCoordinates.lat};${dropCoordinates.lon},${dropCoordinates.lat}?overview=false`;
        const response = await fetch(routeUrl, { signal: controller.signal });
        if (!response.ok) throw new Error("Route lookup failed");
        const data = await response.json();
        if (data.code !== "Ok" || !data.routes?.length) throw new Error("No route found");
        setRouteDistanceKm(data.routes[0].distance / 1000);
        setRouteDistanceStatus("ready");
      } catch (error) {
        if (error.name !== "AbortError") {
          setRouteDistanceKm(null);
          setRouteDistanceStatus("error");
        }
      }
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [pickupCoordinates, dropCoordinates]);
  // Restore a saved draft once when the form opens.
  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem("zestgo-rental-booking-draft");
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.formData) setFormData((prev) => ({ ...prev, ...parsed.formData }));
        if (parsed.tripType) setTripType(parsed.tripType);
        if (parsed.vehicle) setVehicle(parsed.vehicle);
        if (parsed.hourlyPackage) setHourlyPackage(parsed.hourlyPackage);
        setNotice("Your saved draft has been restored.");
        setNoticeType("success");
      }
    } catch (error) {
      console.warn("Unable to restore rental draft:", error);
    }
  }, []);
  const showNotice = (message, type = "success") => {
    setNotice(message);
    setNoticeType(type);
  };
  const handleSaveDraft = () => {
    try {
      const draft = {
        formData,
        tripType,
        vehicle,
        hourlyPackage,
        savedAt: new Date().toISOString(),
      };
      window.localStorage.setItem("zestgo-rental-booking-draft", JSON.stringify(draft));
      showNotice("Draft saved on this device. You can return to it later.");
    } catch (error) {
      showNotice("Draft could not be saved in this browser. Check your storage settings.", "error");
    }
  };
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
    if (notice) setNotice("");
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
  // The first 150 km are included; each additional started kilometre costs ₹15.
  const extraDistanceKm = routeDistanceStatus === "ready" && routeDistanceKm !== null
    ? Math.ceil(Math.max(0, routeDistanceKm - 150))
    : 0;
  const extraDistanceCharge = extraDistanceKm * 15;
  const taxableAmount = baseRentalFare + driverCharges + extraDistanceCharge;
  const taxes = Math.round(taxableAmount * 0.05);
  const totalFare = taxableAmount + taxes;
  const hotelCommission = Math.round(totalFare * 0.1);
  // =========================================================
  // CONTINUE
  // =========================================================
  const handleContinue = () => {
    const requiredFields = [
      ["customerName", "Please enter the customer name."],
      ["mobile", "Please enter the customer mobile number."],
      ["pickup", "Please enter a pickup location."],
      ["drop", "Please enter a drop location."],
      ["date", "Please choose a pickup date."],
      ["time", "Please choose a pickup time."],
    ];
    for (const [field, message] of requiredFields) {
      if (!String(formData[field] ?? "").trim()) {
        setCurrentStep(field === "customerName" || field === "mobile" ? 2 : 1);
        showNotice(message, "error");
        return;
      }
    }
    if (!pickupCoordinates || !dropCoordinates) {
      setCurrentStep(1);
      showNotice("Please select both pickup and drop locations from the suggestions so we can verify the driving distance.", "error");
      return;
    }
    if (routeDistanceStatus === "checking" || routeDistanceStatus === "idle") {
      setCurrentStep(1);
      showNotice("Please wait while we calculate the driving distance.", "error");
      return;
    }
    if (routeDistanceStatus === "error" || routeDistanceKm === null) {
      setCurrentStep(1);
      showNotice("We could not calculate the route. Please try selecting the locations again.", "error");
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setCurrentStep(2);
      showNotice("Enter a valid 10-digit mobile number.", "error");
      return;
    }
    if (Number(formData.passengers) < 1 || Number(formData.passengers) > maxPassengers) {
      setCurrentStep(1);
      showNotice(`Passenger count must be between 1 and ${maxPassengers} for ${vehicle}.`, "error");
      return;
    }
    setCurrentStep(3);
    if (extraDistanceCharge > 0) {
      showNotice(`Your trip is ${Math.round(routeDistanceKm)} km. An extra-distance charge of ₹${extraDistanceCharge.toLocaleString("en-IN")} applies for ${extraDistanceKm} km beyond the included 150 km. Review the fare before confirming.`, "success");
    } else {
      showNotice("Your booking details look good. Review the summary before confirming.");
    }
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
        <button type="button" className="draft-top-button" onClick={handleSaveDraft}>
          <FaFileAlt />
          Save as Draft
        </button>
      </div>
      {notice && (
        <div className={`booking-notice ${noticeType}`} role="status" aria-live="polite">
          <span className="booking-notice-mark">{noticeType === "error" ? "!" : "✓"}</span>
          <span>{notice}</span>
          <button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}>×</button>
        </div>
      )}
      {/* =====================================================
          PROGRESS
      ===================================================== */}
      <div className="booking-progress">
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
          <div className="progress-number">{currentStep > 1 ? "✓" : "1"}</div>
          <span>Rental Details</span>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
          <div className="progress-number">{currentStep > 2 ? "✓" : "2"}</div>
          <span>Customer Details</span>
        </div>
        <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
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
                role="button"
                tabIndex={0}
                aria-pressed={tripType === "hourly"}
                onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setTripType("hourly")}
                onClick={() => { setTripType("hourly"); setNotice(""); }}
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
                role="button"
                tabIndex={0}
                aria-pressed={tripType === "half"}
                onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setTripType("half")}
                onClick={() => { setTripType("half"); setNotice(""); }}
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
                role="button"
                tabIndex={0}
                aria-pressed={tripType === "full"}
                onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setTripType("full")}
                onClick={() => { setTripType("full"); setNotice(""); }}
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
              VEHICLE & PLAN DETAILS — SINGLE CARD
          ================================================= */}
          <div className="rental-section vehicle-plan-card">
            <div className="section-heading vehicle-plan-heading">
              <span className="section-number">2</span>
              <div>
                <h2>Vehicle &amp; Plan Details</h2>
                <p>Choose the vehicle and rental plan for this booking</p>
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
                      role="button"
                      tabIndex={0}
                      aria-pressed={hourlyPackage === pkg.id}
                      onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setHourlyPackage(pkg.id)}
                      onClick={() => { setHourlyPackage(pkg.id); setNotice(""); }}
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
            <div className="section-heading vehicle-selection-heading">
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
                  role="button"
                  tabIndex={0}
                  aria-pressed={vehicle === item.name}
                  onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && handleVehicleChange(item.name)}
                  onClick={() => { handleVehicleChange(item.name); setNotice(""); }}
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
          </div>
          {/* =================================================
              RENTAL DETAILS
          ================================================= */}
          <div className="rental-section rental-details-card">
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
            <div className="rental-form-grid trip-info-grid">
              {/* PICKUP */}
              <div className="form-field">
                <label>
                  Pickup Location <span>*</span>
                </label>
                <LocationAutocomplete
                  name="pickup"
                  label="Pickup Location"
                  value={formData.pickup}
                  onChange={(value) => handleChange({ target: { name: "pickup", value } })}
                  onLocationSelect={setPickupCoordinates}
                  placeholder="Search pickup area, landmark, or address"
                />
              </div>
              {/* DROP */}
              <div className="form-field">
                <label>
                  Drop Location <span>*</span>
                </label>
                <LocationAutocomplete
                  name="drop"
                  label="Drop Location"
                  value={formData.drop}
                  onChange={(value) => handleChange({ target: { name: "drop", value } })}
                  onLocationSelect={setDropCoordinates}
                  placeholder="Search destination, landmark, or address"
                />
                {pickupCoordinates && dropCoordinates && (
                  <p
                    className={`route-distance-message ${routeDistanceStatus === "ready" && routeDistanceKm > 150 ? "route-distance-error" : ""}`}
                    role="status"
                    aria-live="polite"
                  >
                    {routeDistanceStatus === "checking" && "Checking driving distance…"}
                    {routeDistanceStatus === "error" && "Driving distance unavailable. Please try again."}
                    {routeDistanceStatus === "ready" && routeDistanceKm <= 150 && `Driving distance: ${Math.round(routeDistanceKm)} km (within 150 km limit)`}
                    {routeDistanceStatus === "ready" && routeDistanceKm > 150 && `Driving distance: ${Math.round(routeDistanceKm)} km. ${extraDistanceKm} extra km × ₹15 = ₹${extraDistanceCharge.toLocaleString("en-IN")} extra charge (150 km included).`}
                  </p>
                )}
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
            </div>
            <div className="pickup-schedule-card">
              <div className="pickup-schedule-heading">
                <span className="schedule-icon"><FaCalendarAlt /></span>
                <div>
                  <h3>Pickup Schedule</h3>
                  <p>Choose the pickup date and time</p>
                </div>
              </div>
              <div className="pickup-datetime-column">
              {/* DATE */}
              <div className="form-field">
                <label>
                  Pickup Date <span>*</span>
                </label>
                <div className="input-wrapper">
                  <FaCalendarAlt />
                  <input
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
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
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="Select time"
                  />
                </div>
              </div>
              </div>
            </div>
            {/* SELECTION DETAILS CARD */}
            <div className="selection-details-card">
              <div className="pickup-schedule-heading selection-details-heading">
                <span className="schedule-icon"><FaFileAlt /></span>
                <div>
                  <h3>Selection Details</h3>
                  <p>Review the rental options currently selected</p>
                </div>
              </div>
              <div className="selection-details-grid">
                <div className="selection-detail-item">
                  <span>Rental Type</span>
                  <strong>{selectedTrip}</strong>
                </div>
                {tripType === "hourly" && selectedHourlyPackage && (
                  <div className="selection-detail-item">
                    <span>Hourly Package</span>
                    <strong>{selectedHourlyPackage.label} / {selectedHourlyPackage.distance}</strong>
                  </div>
                )}
                <div className="selection-detail-item">
                  <span>Selected Vehicle</span>
                  <strong>{vehicle}</strong>
                </div>
                <div className="selection-detail-item">
                  <span>Passenger Capacity</span>
                  <strong>{formData.passengers} of {maxPassengers}</strong>
                </div>
                <div className="selection-detail-item">
                  <span>Pickup Location</span>
                  <strong>{formData.pickup || "Not selected"}</strong>
                </div>
                <div className="selection-detail-item">
                  <span>Drop Location</span>
                  <strong>{formData.drop || "Not selected"}</strong>
                </div>
                <div className="selection-detail-item">
                  <span>Pickup Date</span>
                  <strong>{formData.date ? new Date(`${formData.date}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "Not selected"}</strong>
                </div>
                <div className="selection-detail-item">
                  <span>Pickup Time</span>
                  <strong>{formData.time ? new Date(`2000-01-01T${formData.time}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Not selected"}</strong>
                </div>
                <div className="selection-detail-item">
                  <span>Trip Purpose</span>
                  <strong>{formData.purpose || "Not selected"}</strong>
                </div>
                <div className="selection-detail-item">
                  <span>Additional Stops</span>
                  <strong>{formData.stops || "None added"}</strong>
                </div>
                <div className="selection-detail-item">
                  <span>Special Requirements</span>
                  <strong>{formData.requirements || "None added"}</strong>
                </div>
              </div>
            </div>
            <p className="extra-distance-note selection-distance-note">
              Note: The first 150 km are included in the rental. If the driving distance exceeds 150 km, an additional ₹15 per extra kilometre will be charged. Extra distance is rounded up to the next whole kilometre.
            </p>
            <div className="rental-form-grid additional-info-grid">
              {/* PURPOSE */}
                            <div className="form-field trip-purpose-field">
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
              {currentStep === 3 ? "Booking Details Reviewed" : "Continue to Confirmation"}
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
                  {formData.date ? new Date(`${formData.date}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "Not selected"}
                </strong>
              </div>
              <div className="summary-row">
                <span>
                  Time
                </span>
                <strong>
                  {formData.time ? new Date(`2000-01-01T${formData.time}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Not selected"}
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
              {extraDistanceCharge > 0 && (
                <div className="fare-row">
                  <span>
                    Extra Distance ({extraDistanceKm} km × ₹15; first 150 km included)
                  </span>
                  <strong>₹{extraDistanceCharge.toLocaleString("en-IN")}</strong>
                </div>
              )}
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
          <button type="button" className="save-draft-button" onClick={handleSaveDraft}>
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