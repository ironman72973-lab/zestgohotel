import React, { useEffect, useState } from "react";
import airportBg from "../../images/airport.png";
import "./airport.css";
/* =========================================================
   API
========================================================= */
const FLIGHT_API_URL = "http://localhost/one/flight.php";
const OSRM_URL =
    "https://router.project-osrm.org/route/v1/driving";
const RATE_PER_KM = 25.5;
/* =========================================================
   ICON
========================================================= */
const Icon = ({ name, size = 20, stroke = 1.8 }) => {
    const icons = {
        plane: (
            <>
                <path d="M2 16.5 22 12 2 7.5l4.2 4.5L2 16.5Z" />
                <path d="M6.2 12H22" />
                <path d="m11 9 2.5-6" />
                <path d="m11 15 2.5 6" />
            </>
        ),
        calendar: (
            <>
                <rect x="3" y="4.5" width="18" height="17" rx="2" />
                <path d="M7 2.5v4M17 2.5v4M3 9h18" />
                <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
            </>
        ),
        clock: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
            </>
        ),
        user: (
            <>
                <circle cx="12" cy="7.5" r="3.2" />
                <path d="M5 20c.8-3.5 3.1-5.2 7-5.2s6.2 1.7 7 5.2" />
            </>
        ),
        bag: (
            <>
                <rect x="4" y="7" width="16" height="13" rx="2" />
                <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                <path d="M8 11v6M16 11v6" />
            </>
        ),
        pin: (
            <>
                <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
                <circle cx="12" cy="10" r="2.2" />
            </>
        ),
        car: (
            <>
                <path d="m5 17-1-5 2-5h12l2 5-1 5" />
                <path d="M4 14h16" />
                <path d="M7 17h.01M17 17h.01" />
                <path d="m7 7 1.5-3h7L17 7" />
            </>
        ),
        shield: (
            <>
                <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" />
                <path d="m8.5 12 2.2 2.2 4.8-5" />
            </>
        ),
        support: (
            <>
                <path d="M4 13a8 8 0 0 1 16 0" />
                <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H4ZM20 13v4a2 2 0 0 1-2 2h-1v-6h3Z" />
                <path d="M12 21h3" />
            </>
        ),
        refresh: (
            <>
                <path d="M20 11a8 8 0 0 0-14.7-3L3 11" />
                <path d="M3 7v4h4" />
                <path d="M4 13a8 8 0 0 0 14.7 3L21 13" />
                <path d="M21 17v-4h-4" />
            </>
        ),
        chevron: (
            <path d="m8 10 4 4 4-4" />
        ),
        arrow: (
            <>
                <path d="M4 12h16" />
                <path d="m14 6 6 6-6 6" />
            </>
        ),
        help: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M9.7 9a2.4 2.4 0 1 1 4 1.8c-1.1.8-1.7 1.2-1.7 2.7" />
                <path d="M12 17h.01" />
            </>
        ),
        bell: (
            <>
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
                <path d="M10 21h4" />
            </>
        ),
        check: (
            <path d="m5 12 4 4L19 7" />
        )
    };
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {icons[name]}
        </svg>
    );
};
/* =========================================================
   FIELD
========================================================= */
function Field({
    label,
    required,
    icon,
    value,
    dropdown,
    onChange,
    placeholder,
    type = "text",
    readOnly = false
}) {
    return (
        <label className="field">
            <span className="field-label">
                {label}
                {required && (
                    <b>*</b>
                )}
            </span>
            <div className="field-box">
                {icon && (
                    <span className="field-icon">
                        <Icon
                            name={icon}
                            size={19}
                        />
                    </span>
                )}
                <input
                    type={type}
                    value={value || ""}
                    onChange={(e) =>
                        onChange &&
                        onChange(e.target.value)
                    }
                    placeholder={placeholder}
                    readOnly={readOnly}
                />
                {dropdown && (
                    <span className="field-chevron">
                        <Icon
                            name="chevron"
                            size={18}
                        />
                    </span>
                )}
            </div>
        </label>
    );
}
/* =========================================================
   SUMMARY ROW
========================================================= */
function SummaryRow({ label, value }) {
    return (
        <div className="summary-row">
            <span>
                {label}
            </span>
            <strong>
                {value || "-"}
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
    negative = false
}) {
    let formatted = value;
    if (
        typeof value === "number" &&
        !Number.isNaN(value)
    ) {
        formatted =
            "₹ " +
            Math.abs(value).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
    }
    return (
        <div
            className={`fare-row ${
                negative ? "negative" : ""
            }`}
        >
            <span>
                {label}
            </span>
            <strong>
                {negative && "- "}
                {formatted}
            </strong>
        </div>
    );
}
/* =========================================================
   TRUST
========================================================= */
function Trust({
    icon,
    title,
    sub
}) {
    return (
        <div className="trust-item">
            <Icon
                name={icon}
                size={25}
            />
            <span>
                {title}
            </span>
            <small>
                {sub}
            </small>
        </div>
    );
}
/* =========================================================
   MAIN
========================================================= */
export default function AirportPickup() {
    /* =====================================================
       DATE
    ===================================================== */
    const today =
        new Date()
            .toISOString()
            .split("T")[0];
    /* =====================================================
       FLIGHT
    ===================================================== */
    const [
        flight,
        setFlight
    ] = useState("");
    const [
        date,
        setDate
    ] = useState(today);
    const [
        time,
        setTime
    ] = useState("");
    const [
        airline,
        setAirline
    ] = useState("");
    const [
        flightStatus,
        setFlightStatus
    ] = useState("");
    /* =====================================================
       ARRIVAL AIRPORT
    ===================================================== */
    const [
        arrivalAirport,
        setArrivalAirport
    ] = useState("");
    const [
        arrivalIata,
        setArrivalIata
    ] = useState("");
    const [
        arrivalIcao,
        setArrivalIcao
    ] = useState("");
    const [
        arrivalTerminal,
        setArrivalTerminal
    ] = useState("");
    const [
        arrivalGate,
        setArrivalGate
    ] = useState("");
    /* =====================================================
       AIRPORT COORDINATES
       HIDDEN
    ===================================================== */
    const [
        arrivalLatitude,
        setArrivalLatitude
    ] = useState("");
    const [
        arrivalLongitude,
        setArrivalLongitude
    ] = useState("");
    /* =====================================================
       HOTEL / DROP LOCATION
    ===================================================== */
    const [
        dropLocation,
        setDropLocation
    ] = useState(
        "Oceanview Palace Hotel, Rushikonda"
    );
    const [
        dropLatitude,
        setDropLatitude
    ] = useState("");
    const [
        dropLongitude,
        setDropLongitude
    ] = useState("");
    /* =====================================================
       LOCATION
    ===================================================== */
    const [
        locationLoading,
        setLocationLoading
    ] = useState(false);
    /* =====================================================
       ROUTE
    ===================================================== */
    const [
        airportHotelDistance,
        setAirportHotelDistance
    ] = useState("");
    const [
        airportHotelDuration,
        setAirportHotelDuration
    ] = useState("");
    const [
        routeLoading,
        setRouteLoading
    ] = useState(false);
    /* =====================================================
       API STATE
    ===================================================== */
    const [
        loadingFlight,
        setLoadingFlight
    ] = useState(false);
    const [
        flightMessage,
        setFlightMessage
    ] = useState("");
    /* =====================================================
       BOOKING DETAILS
    ===================================================== */
    const [
        passengers,
        setPassengers
    ] = useState(
        "2 Adults, 1 Child"
    );
    const [
        luggage,
        setLuggage
    ] = useState(
        "2 Large, 1 Small"
    );
    const [
        meet,
        setMeet
    ] = useState(true);
    const [
        wait,
        setWait
    ] = useState(
        "60 Minutes (Free)"
    );
    const [
        room,
        setRoom
    ] = useState("205");
    const [
        instructions,
        setInstructions
    ] = useState("");
    /* =====================================================
       PREFERENCES
    ===================================================== */
    const [
        ac,
        setAc
    ] = useState(true);
    const [
        baby,
        setBaby
    ] = useState(false);
    const [
        extra,
        setExtra
    ] = useState(false);
    const [
        female,
        setFemale
    ] = useState(false);
    /* =====================================================
       GET CURRENT LOCATION
    ===================================================== */
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert(
                "Location is not supported by this browser."
            );
            return;
        }
        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude =
                    position.coords.latitude;
                const longitude =
                    position.coords.longitude;
                setDropLatitude(latitude);
                setDropLongitude(longitude);
                try {
                    const response =
                        await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
                                latitude
                            )}&lon=${encodeURIComponent(
                                longitude
                            )}&zoom=18&addressdetails=1`,
                            {
                                headers: {
                                    Accept:
                                        "application/json"
                                }
                            }
                        );
                    if (!response.ok) {
                        throw new Error(
                            "Unable to get address."
                        );
                    }
                    const data =
                        await response.json();
                    setDropLocation(
                        data.display_name ||
                        `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                    );
                } catch (error) {
                    console.error(error);
                    setDropLocation(
                        `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                    );
                } finally {
                    setLocationLoading(false);
                }
            },
            () => {
                setLocationLoading(false);
                alert(
                    "Unable to get current location. Please allow location access."
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    };
    /* =====================================================
       GET FLIGHT DETAILS
    ===================================================== */
    const getFlightDetails =
        async () => {
            const cleanFlight =
                flight
                    .replace(/\s+/g, "")
                    .toUpperCase();
            if (!cleanFlight) {
                setFlightMessage(
                    "Please enter a flight number."
                );
                return;
            }
            if (!date) {
                setFlightMessage(
                    "Please select arrival date."
                );
                return;
            }
            setLoadingFlight(true);
            setFlightMessage("");
            try {
                const url =
                    `${FLIGHT_API_URL}?flight=${encodeURIComponent(
                        cleanFlight
                    )}&date=${encodeURIComponent(
                        date
                    )}`;
                const response =
                    await fetch(url);
                const data =
                    await response.json();
                if (
                    !response.ok ||
                    !data.success
                ) {
                    throw new Error(
                        data.message ||
                        "Flight details not found."
                    );
                }
                /* =========================================
                   FLIGHT
                ========================================= */
                setFlight(
                    data.flight?.number ||
                    cleanFlight
                );
                setFlightStatus(
                    data.flight?.status || ""
                );
                /* =========================================
                   AIRLINE
                ========================================= */
                setAirline(
                    data.airline?.name || ""
                );
                /* =========================================
                   ARRIVAL
                ========================================= */
                setArrivalAirport(
                    data.arrival?.airport || ""
                );
                setArrivalIata(
                    data.arrival?.iata || ""
                );
                setArrivalIcao(
                    data.arrival?.icao || ""
                );
                setArrivalTerminal(
                    data.arrival?.terminal || ""
                );
                setArrivalGate(
                    data.arrival?.gate || ""
                );
                /* =========================================
                   ARRIVAL COORDINATES
                ========================================= */
                setArrivalLatitude(
                    data.arrival?.location?.latitude ?? ""
                );
                setArrivalLongitude(
                    data.arrival?.location?.longitude ?? ""
                );
                /* =========================================
                   ARRIVAL TIME
                ========================================= */
                const arrivalTime =
                    data.arrival?.scheduled?.local ||
                    data.arrival?.estimated ||
                    data.arrival?.actual ||
                    "";
                if (arrivalTime) {
                    const parsed =
                        new Date(arrivalTime);
                    if (
                        !Number.isNaN(
                            parsed.getTime()
                        )
                    ) {
                        setTime(
                            parsed.toLocaleTimeString(
                                "en-IN",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                }
                            )
                        );
                    } else {
                        setTime(arrivalTime);
                    }
                } else {
                    setTime("");
                }
                setFlightMessage(
                    "Flight details loaded successfully."
                );
            } catch (error) {
                console.error(
                    "Flight API error:",
                    error
                );
                setFlightMessage(
                    error.message ||
                    "Unable to get flight details."
                );
            } finally {
                setLoadingFlight(false);
            }
        };
    /* =====================================================
       CALCULATE AIRPORT → HOTEL
========================================================= */
    const calculateAirportToHotelRoute =
        async () => {
            if (
                arrivalLatitude === "" ||
                arrivalLongitude === "" ||
                dropLatitude === "" ||
                dropLongitude === ""
            ) {
                setAirportHotelDistance("");
                setAirportHotelDuration("");
                return;
            }
            setRouteLoading(true);
            try {
                /*
                 * OSRM coordinate order:
                 *
                 * longitude,latitude
                 *
                 * Airport FIRST
                 * Hotel SECOND
                 */
                const coordinates =
                    `${arrivalLongitude},${arrivalLatitude};${dropLongitude},${dropLatitude}`;
                const url =
                    `${OSRM_URL}/${coordinates}?overview=false`;
                const response =
                    await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        "Routing service unavailable."
                    );
                }
                const data =
                    await response.json();
                if (
                    data.code !== "Ok" ||
                    !data.routes?.length
                ) {
                    throw new Error(
                        "No road route found."
                    );
                }
                const route =
                    data.routes[0];
                /* METERS → KM */
                const distanceKm =
                    route.distance / 1000;
                /* SECONDS → MINUTES */
                const durationMinutes =
                    Math.round(
                        route.duration / 60
                    );
                setAirportHotelDistance(
                    distanceKm
                );
                setAirportHotelDuration(
                    durationMinutes
                );
            } catch (error) {
                console.error(
                    "Routing error:",
                    error
                );
                setAirportHotelDistance("");
                setAirportHotelDuration("");
            } finally {
                setRouteLoading(false);
            }
        };
    /* =====================================================
       AUTOMATIC ROUTING
    ===================================================== */
    useEffect(() => {
        calculateAirportToHotelRoute();
    }, [
        arrivalLatitude,
        arrivalLongitude,
        dropLatitude,
        dropLongitude
    ]);
    /* =====================================================
       FARE CALCULATION
    ===================================================== */
    const distance =
        Number(
            airportHotelDistance
        ) || 0;
    /* DISTANCE × ₹25.50 */
    const baseFare =
        distance * RATE_PER_KM;
    const airportParking = 200;
    const driverAllowance = 50;
    const meetFee = 0;
    const babyFee =
        baby ? 100 : 0;
    const extraFee =
        extra ? 100 : 0;
    const femaleFee =
        female ? 150 : 0;
    const additionalCharges =
        meetFee +
        babyFee +
        extraFee +
        femaleFee;
    const subtotalBeforeGST =
        baseFare +
        airportParking +
        driverAllowance +
        additionalCharges;
    const gst =
        subtotalBeforeGST * 0.05;
    const subtotal =
        subtotalBeforeGST + gst;
    const commission =
        subtotal * 0.10;
    const grandTotal =
        subtotal - commission;
    const money =
        (amount) =>
            "₹ " +
            Number(
                amount || 0
            ).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
    /* =====================================================
       RENDER
    ===================================================== */
    return (
        <div
            className="app"
            style={{
                backgroundImage: `
                    linear-gradient(
                        135deg,
                        rgba(0,0,0,.80),
                        rgba(0,0,0,.75)
                    ),
                    url(${airportBg})
                `
            }}
        >
            {/* =================================================
               HEADER
            ================================================= */}
            <header className="hero">
                <div className="airport-background">
                    <div className="airport-building">
                        <div className="airport-glass"></div>
                        <div className="airport-light light1"></div>
                        <div className="airport-light light2"></div>
                        <div className="airport-light light3"></div>
                        <div className="airport-light light4"></div>
                    </div>
                    <div className="airplane">
                        ✈
                    </div>
                    <div className="sun"></div>
                </div>
                <div className="brand">
                    <div className="logo-mark">
                        Z
                    </div>
                    <div className="logo-text">
                        <div>
                            <strong>Zest</strong>
                            <b>Go</b>
                        </div>
                        <small>
                            LAKWAY FLEET
                        </small>
                    </div>
                </div>
                <div className="hero-title">
                    <h1>
                        New Booking - Airport Pickup
                    </h1>
                    <span></span>
                </div>
                <div className="header-actions">
                    <button className="help-btn">
                        <Icon
                            name="help"
                            size={24}
                        />
                        Help Center
                    </button>
                    <button className="bell">
                        <Icon
                            name="bell"
                            size={25}
                        />
                        <em>12</em>
                    </button>
                    <div className="profile">
                        <div className="profile-avatar">
                            RS
                        </div>
                        <div>
                            <strong>
                                Rohit Sharma
                            </strong>
                            <small>
                                Reception Manager
                            </small>
                        </div>
                        <Icon
                            name="chevron"
                            size={20}
                        />
                    </div>
                </div>
            </header>
            {/* =================================================
               MAIN
            ================================================= */}
            <main className="page">
                {/* =================================================
                   LEFT
                ================================================= */}
                <section className="booking-card">
                    {/* STEPS */}
                    <nav className="steps">
                        {[
                            "Service & Trip Details",
                            "Vehicle Selection",
                            "Guest Details",
                            "Fare & Payment",
                            "Confirmation"
                        ].map(
                            (step, index) => (
                                <React.Fragment key={step}>
                                    <div
                                        className={`step ${
                                            index === 0
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <span>
                                            {index + 1}
                                        </span>
                                        <label>
                                            {step}
                                        </label>
                                    </div>
                                    {index < 4 && (
                                        <div className="step-line" />
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </nav>
                    <div className="booking-content">
                        {/* =================================================
                           SERVICE TITLE
                        ================================================= */}
                        <div className="service-heading">
                            <div className="plane-tile">
                                <Icon
                                    name="plane"
                                    size={33}
                                />
                            </div>
                            <div>
                                <h2>
                                    Airport Pickup
                                </h2>
                                <p>
                                    Pick up your guest from
                                    airport and drop them
                                    to the hotel.
                                </p>
                            </div>
                        </div>
                        {/* =================================================
                           FLIGHT INFORMATION
                        ================================================= */}
                        <div className="panel">
                            <h3>
                                Flight Information
                            </h3>
                            <div className="flight-search-grid">
                                <Field
                                    label="Flight Number"
                                    required
                                    icon="plane"
                                    value={flight}
                                    onChange={(value) =>
                                        setFlight(
                                            value
                                                .replace(
                                                    /\s+/g,
                                                    ""
                                                )
                                                .toUpperCase()
                                        )
                                    }
                                    placeholder="Example: 6E5248"
                                />
                                <Field
                                    label="Arrival Date"
                                    required
                                    icon="calendar"
                                    type="date"
                                    value={date}
                                    onChange={setDate}
                                />
                                <div className="get-flight-wrapper">
                                    <span className="field-label">
                                        &nbsp;
                                    </span>
                                    <button
                                        type="button"
                                        className="get-flight-btn"
                                        onClick={
                                            getFlightDetails
                                        }
                                        disabled={
                                            loadingFlight
                                        }
                                    >
                                        <Icon
                                            name="refresh"
                                            size={18}
                                        />
                                        {loadingFlight
                                            ? "Getting..."
                                            : "Get Details"
                                        }
                                    </button>
                                </div>
                            </div>
                            {flightMessage && (
                                <div
                                    className={`flight-message ${
                                        flightMessage.includes(
                                            "successfully"
                                        )
                                            ? "success"
                                            : "error"
                                    }`}
                                >
                                    {flightMessage}
                                </div>
                            )}
                            {/* API DETAILS ARE INSIDE INPUT FIELDS */}
                            <div className="grid four flight-api-fields">
                                <Field
                                    label="Airline"
                                    icon="plane"
                                    value={airline}
                                    readOnly
                                    placeholder="Get from flight"
                                />
                                <Field
                                    label="Flight Status"
                                    icon="check"
                                    value={flightStatus}
                                    readOnly
                                    placeholder="Get from flight"
                                />
                                <Field
                                    label="Arrival Airport"
                                    icon="plane"
                                    value={
                                        arrivalAirport
                                            ? `${arrivalAirport}${
                                                arrivalIata
                                                    ? ` (${arrivalIata})`
                                                    : ""
                                            }`
                                            : ""
                                    }
                                    readOnly
                                    placeholder="Get from flight"
                                />
                                <Field
                                    label="IATA"
                                    icon="plane"
                                    value={arrivalIata}
                                    readOnly
                                    placeholder="Get from flight"
                                />
                                <Field
                                    label="Arrival Time"
                                    icon="clock"
                                    value={time}
                                    readOnly
                                    placeholder="Get from flight"
                                />
                                <Field
                                    label="Terminal"
                                    icon="pin"
                                    value={arrivalTerminal}
                                    readOnly
                                    placeholder="Get from flight"
                                />
                                <Field
                                    label="Gate"
                                    icon="pin"
                                    value={arrivalGate}
                                    readOnly
                                    placeholder="Get from flight"
                                />
                                <Field
                                    label="ICAO"
                                    icon="plane"
                                    value={arrivalIcao}
                                    readOnly
                                    placeholder="Get from flight"
                                />
                            </div>
                            {/* =================================================
                               COMPLETELY HIDDEN AIRPORT DATA
                            ================================================= */}
                            <span
                                className="hidden-flight-data"
                                data-airport-latitude={
                                    arrivalLatitude
                                }
                                data-airport-longitude={
                                    arrivalLongitude
                                }
                                aria-hidden="true"
                            ></span>
                        </div>
                        {/* =================================================
                           DROP LOCATION
                        ================================================= */}
                        <div className="panel">
                            <h3>
                                Drop Location
                            </h3>
                            <div className="pickup-grid">
                                <div className="pickup-location-field">
                                    <label className="field">
                                        <span className="field-label">
                                            Hotel / Drop Location
                                            <b>*</b>
                                        </span>
                                        <div className="field-box">
                                            <span className="field-icon">
                                                <Icon
                                                    name="pin"
                                                    size={19}
                                                />
                                            </span>
                                            <input
                                                type="text"
                                                value={
                                                    dropLocation
                                                }
                                                onChange={(e) =>
                                                    setDropLocation(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter hotel / drop location"
                                            />
                                        </div>
                                    </label>
                                    <button
                                        type="button"
                                        className="current-location-btn"
                                        onClick={
                                            getCurrentLocation
                                        }
                                        disabled={
                                            locationLoading
                                        }
                                    >
                                        <Icon
                                            name="pin"
                                            size={17}
                                        />
                                        {locationLoading
                                            ? "Getting Address..."
                                            : "Use Current Location"
                                        }
                                    </button>
                                </div>
                                <Field
                                    label="Room Number"
                                    icon="bag"
                                    value={room}
                                    onChange={setRoom}
                                    placeholder="Optional"
                                />
                                <Field
                                    label="Special Instructions"
                                    icon="pin"
                                    value={instructions}
                                    onChange={
                                        setInstructions
                                    }
                                    placeholder="Any instructions for driver..."
                                />
                            </div>
                            {/* =================================================
                               HIDDEN HOTEL COORDINATES
                            ================================================= */}
                            <span hidden
                                className="hidden-route-data"
                                data-hotel-latitude={
                                    dropLatitude
                                }
                                data-hotel-longitude={
                                    dropLongitude
                                }
                                aria-hidden="true"
                            ></span>
                            {/* =================================================
                               HIDDEN AIRPORT COORDINATES
                            ================================================= */}
                            <span
                                className="hidden-route-data"
                                data-airport-latitude={
                                    arrivalLatitude
                                }
                                data-airport-longitude={
                                    arrivalLongitude
                                }
                                aria-hidden="true"
                            ></span>
                            {/* =================================================
                               HIDDEN ROAD DISTANCE
                            ================================================= */}
                            <span
                                className="hidden-route-distance"
                                data-distance-km={
                                    airportHotelDistance
                                }
                                data-duration-minutes={
                                    airportHotelDuration
                                }
                                aria-hidden="true"
                            >
                                {airportHotelDistance}
                            </span>
                        </div>
                        {/* =================================================
                           PICKUP DETAILS
                        ================================================= */}
                        <div className="panel">
                            <h3>
                                Pickup Details
                            </h3>
                            <div className="grid four">
                                <Field
                                    label="Number of Passengers"
                                    required
                                    icon="user"
                                    value={passengers}
                                    dropdown
                                    onChange={
                                        setPassengers
                                    }
                                />
                                <Field
                                    label="Luggage"
                                    icon="bag"
                                    value={luggage}
                                    onChange={
                                        setLuggage
                                    }
                                />
                                <Field
                                    label="Meet & Greet Service"
                                    icon="user"
                                    value={
                                        meet
                                            ? "Yes (+ ₹0)"
                                            : "No"
                                    }
                                    dropdown
                                    onChange={() =>
                                        setMeet(!meet)
                                    }
                                />
                                <Field
                                    label="Driver Wait Time"
                                    icon="clock"
                                    value={wait}
                                    dropdown
                                    onChange={setWait}
                                />
                            </div>
                        </div>
                        {/* =================================================
                           PREFERENCES
                        ================================================= */}
                        <div className="panel preferences">
                            <h3>
                                Additional Preferences
                            </h3>
                            <div className="preference-row">
                                <button
                                    type="button"
                                    className={`pref ${
                                        ac
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setAc(!ac)
                                    }
                                >
                                    <span className="check-box">
                                        {ac && (
                                            <Icon
                                                name="check"
                                                size={14}
                                            />
                                        )}
                                    </span>
                                    <span>
                                        AC Vehicle
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className={`pref ${
                                        baby
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setBaby(!baby)
                                    }
                                >
                                    <span className="check-box">
                                        {baby && (
                                            <Icon
                                                name="check"
                                                size={14}
                                            />
                                        )}
                                    </span>
                                    <span>
                                        Baby Seat
                                    </span>
                                    <small>
                                        + ₹100
                                    </small>
                                </button>
                                <button
                                    type="button"
                                    className={`pref ${
                                        extra
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setExtra(!extra)
                                    }
                                >
                                    <span className="check-box">
                                        {extra && (
                                            <Icon
                                                name="check"
                                                size={14}
                                            />
                                        )}
                                    </span>
                                    <span>
                                        Extra Luggage
                                    </span>
                                    <small>
                                        + ₹100
                                    </small>
                                </button>
                                <button
                                    type="button"
                                    className={`pref ${
                                        female
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setFemale(!female)
                                    }
                                >
                                    <span className="check-box">
                                        {female && (
                                            <Icon
                                                name="check"
                                                size={14}
                                            />
                                        )}
                                    </span>
                                    <span>
                                        Female Driver
                                    </span>
                                    <small>
                                        + ₹150
                                    </small>
                                </button>
                            </div>
                        </div>
                        {/* =================================================
                           CONTINUE
                        ================================================= */}
                        <button
                            type="button"
                            className="continue"
                        >
                            Continue to Vehicle Selection
                            <Icon
                                name="arrow"
                                size={25}
                            />
                        </button>
                    </div>
                </section>
                {/* =================================================
                   RIGHT SUMMARY
                ================================================= */}
                <aside className="summary">
                    <div className="summary-title">
                        Booking Summary
                    </div>
                    <div className="summary-body">
                        <SummaryRow
                            label="Service Type"
                            value="Airport Pickup"
                        />
                        <SummaryRow
                            label="From"
                            value={
                                arrivalAirport
                                    ? `${arrivalAirport}${
                                        arrivalIata
                                            ? ` (${arrivalIata})`
                                            : ""
                                    }`
                                    : "-"
                            }
                        />
                        <SummaryRow
                            label="To"
                            value={
                                dropLocation
                            }
                        />
                        <SummaryRow
                            label="Flight"
                            value={flight}
                        />
                        <SummaryRow
                            label="Airline"
                            value={airline}
                        />
                        <SummaryRow
                            label="Date & Time"
                            value={
                                date
                                    ? `${date}${
                                        time
                                            ? `, ${time}`
                                            : ""
                                    }`
                                    : "-"
                            }
                        />
                        <SummaryRow
                            label="Passengers"
                            value={passengers}
                        />
                        <SummaryRow
                            label="Luggage"
                            value={luggage}
                        />
                        <SummaryRow
                            label="Meet & Greet"
                            value={
                                meet
                                    ? "Yes"
                                    : "No"
                            }
                        />
                        <SummaryRow
                            label="Wait Time"
                            value={wait}
                        />
                        {/* =================================================
                           FARE
                        ================================================= */}
                        <div className="fare-box">
                            <h4>
                                Fare Breakdown
                            </h4>
                            <FareRow
                                label={
                                    `Distance Fare (${distance.toFixed(
                                        1
                                    )} km × ₹${RATE_PER_KM.toFixed(
                                        2
                                    )})`
                                }
                                value={baseFare}
                            />
                            <FareRow
                                label="Airport Parking"
                                value={200}
                            />
                            <FareRow
                                label="Meet & Greet Service"
                                value={meetFee}
                            />
                            <FareRow
                                label="Driver Allowance"
                                value={50}
                            />
                            <FareRow
                                label="Waiting Charges After 60 min"
                                value="₹ 2.00/min"
                            />
                            {baby && (
                                <FareRow
                                    label="Baby Seat"
                                    value={100}
                                />
                            )}
                            {extra && (
                                <FareRow
                                    label="Extra Luggage"
                                    value={100}
                                />
                            )}
                            {female && (
                                <FareRow
                                    label="Female Driver"
                                    value={150}
                                />
                            )}
                            <FareRow
                                label="GST (5%)"
                                value={gst}
                            />
                            <div className="fare-divider"></div>
                            <FareRow
                                label="Subtotal"
                                value={subtotal}
                            />
                            <FareRow
                                label="Hotel Commission (10%)"
                                value={commission}
                                negative
                            />
                            <div className="grand">
                                <span>
                                    Grand Total
                                </span>
                                <strong>
                                    {money(
                                        grandTotal
                                    )}
                                </strong>
                            </div>
                        </div>
                        {/* =================================================
                           EARNINGS
                        ================================================= */}
                        <div className="earn">
                            <div className="earn-top">
                                <span>
                                    ● You Earn
                                    <small>
                                        {" "}
                                        (Estimated)
                                    </small>
                                </span>
                                <b>
                                    10% Commission
                                </b>
                            </div>
                            <strong>
                                Estimated Earnings
                                <i>
                                    {money(
                                        commission
                                    )}
                                </i>
                            </strong>
                            <p>
                                You will earn on this booking
                            </p>
                        </div>
                        {/* =================================================
                           TRUST
                        ================================================= */}
                        <div className="trust">
                            <Trust
                                icon="shield"
                                title="Safe & Verified"
                                sub="Drivers"
                            />
                            <Trust
                                icon="car"
                                title="Clean & Sanitized"
                                sub="Vehicles"
                            />
                            <Trust
                                icon="clock"
                                title="On-time"
                                sub="Guaranteed"
                            />
                            <Trust
                                icon="support"
                                title="24x7"
                                sub="Support"
                            />
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}