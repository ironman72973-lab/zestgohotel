import React, { useState } from "react";
import "./railway.css";
import railwayStation from "../../images/railway.png";
/* =========================================================
   DEFAULT RAILWAY STATION
========================================================= */
const RAILWAY_STATION = {
    name: "Visakhapatnam Junction",
    code: "VSKP",
    // Visakhapatnam Junction coordinates
    latitude: 17.7231,
    longitude: 83.3012,
};
/* =========================================================
   FARE
========================================================= */
const RATE_PER_KM = 25.5;
const STATION_PARKING = 40;
const DRIVER_ALLOWANCE = 50;
const WAITING_CHARGES = 20;
const PORTER_CHARGE = 100;
const BABY_SEAT_CHARGE = 100;
const EXTRA_LUGGAGE_CHARGE = 100;
const GST_RATE = 5;
const COMMISSION_RATE = 10;
/*
 * Meet & Greet is ₹0
 */
const MEET_GREET_CHARGE = 0;
/* =========================================================
   ICON COMPONENT
========================================================= */
function Icon({ name, size = 20 }) {
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
                <circle cx="9" cy="16" r="1" />
                <circle cx="15" cy="16" r="1" />
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
    if (name === "currentLocation") {
        return (
            <svg {...commonProps}>
                <circle
                    cx="12"
                    cy="12"
                    r="3"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="8"
                />
                <path d="M12 2v3" />
                <path d="M12 19v3" />
                <path d="M2 12h3" />
                <path d="M19 12h3" />
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
}
/* =========================================================
   INPUT FIELD
========================================================= */
function InputField({
    label,
    required = false,
    value,
    setValue,
    icon,
    type = "text",
    placeholder = "",
}) {
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
                        setValue(
                            e.target.value
                        )
                    }
                    placeholder={placeholder}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}
/* =========================================================
   REQUIREMENT
========================================================= */
function Requirement({
    name,
    label,
    requirements,
    toggleRequirement,
}) {
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
}
/* =========================================================
   SUMMARY ROW
========================================================= */
function SummaryRow({
    label,
    value,
    negative = false,
}) {
    const formatMoney = (
        amount
    ) => {
        return `₹ ${Number(
            amount || 0
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        )}`;
    };
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
}
/* =========================================================
   RAILWAY DROP
========================================================= */
function RailwayDrop() {
    /* =====================================================
       TRIP
    ===================================================== */
    const [
        dropStation,
        setDropStation,
    ] = useState(
        "Visakhapatnam Junction (VSKP)"
    );
    const [
        trainNumber,
        setTrainNumber,
    ] = useState("");
    const [
        trainName,
        setTrainName,
    ] = useState("");
    const [
        departureDate,
        setDepartureDate,
    ] = useState("");
    const [
        departureTime,
        setDepartureTime,
    ] = useState("");
    const [
        arrivalTime,
        setArrivalTime,
    ] = useState("");
    const [
        coach,
        setCoach,
    ] = useState("");
    const [
        berth,
        setBerth,
    ] = useState("");
    const [
        platform,
        setPlatform,
    ] = useState("");
    /* =====================================================
       PICKUP LOCATION
    ===================================================== */
    const [
        pickupLocation,
        setPickupLocation,
    ] = useState("");
    const [
        pickupLatitude,
        setPickupLatitude,
    ] = useState(null);
    const [
        pickupLongitude,
        setPickupLongitude,
    ] = useState(null);
    const [
        locationLoading,
        setLocationLoading,
    ] = useState(false);
    const [
        locationError,
        setLocationError,
    ] = useState("");
    /* =====================================================
       ROUTING
    ===================================================== */
    const [
        routeDistance,
        setRouteDistance,
    ] = useState(0);
    const [
        routeDuration,
        setRouteDuration,
    ] = useState(0);
    const [
        routeLoading,
        setRouteLoading,
    ] = useState(false);
    const [
        routeError,
        setRouteError,
    ] = useState("");
    /* =====================================================
       CONTACT
    ===================================================== */
    const [
        contactPerson,
        setContactPerson,
    ] = useState(
        "Rohit Sharma"
    );
    const [
        contactMobile,
        setContactMobile,
    ] = useState(
        "+91 98765 43210"
    );
    const [
        passengers,
        setPassengers,
    ] = useState(
        "2 Adults, 1 Child"
    );
    const [
        luggage,
        setLuggage,
    ] = useState(
        "2 Medium Bags, 1 Small Bag"
    );
    const [
        assistance,
        setAssistance,
    ] = useState(
        "No Assistance"
    );
    /* =====================================================
       REQUIREMENTS
    ===================================================== */
    const [
        requirements,
        setRequirements,
    ] = useState({
        meetGreet: true,
        porter: false,
        babySeat: false,
        extraLuggage: false,
        wheelchair: false,
        other: false,
    });
    /* =====================================================
       FARE
    ===================================================== */
    const baseFare =
        Number(routeDistance || 0) *
        RATE_PER_KM;
    const porterCharge =
        requirements.porter
            ? PORTER_CHARGE
            : 0;
    const babySeatCharge =
        requirements.babySeat
            ? BABY_SEAT_CHARGE
            : 0;
    const extraLuggageCharge =
        requirements.extraLuggage
            ? EXTRA_LUGGAGE_CHARGE
            : 0;
    const fareBeforeGST =
        baseFare +
        STATION_PARKING +
        DRIVER_ALLOWANCE +
        WAITING_CHARGES +
        MEET_GREET_CHARGE +
        porterCharge +
        babySeatCharge +
        extraLuggageCharge;
    const gst =
        fareBeforeGST *
        (GST_RATE / 100);
    const subtotal =
        fareBeforeGST + gst;
    const hotelCommission =
        subtotal *
        (COMMISSION_RATE / 100);
    const grandTotal =
        subtotal -
        hotelCommission;
    /* =====================================================
       MONEY
    ===================================================== */
    const formatMoney = (
        amount
    ) => {
        return `₹ ${Number(
            amount || 0
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        )}`;
    };
    /* =====================================================
       OSRM ROUTING
       PICKUP LOCATION
          ↓
       RAILWAY STATION
       DISTANCE IS NEVER DISPLAYED.
    ===================================================== */
    const calculateRoute =
        async (
            latitude,
            longitude
        ) => {
            if (
                latitude === null ||
                longitude === null
            ) {
                setRouteError(
                    "Pickup coordinates are unavailable."
                );
                return;
            }
            setRouteLoading(
                true
            );
            setRouteError("");
            try {
                const fromLatitude =
                    Number(latitude);
                const fromLongitude =
                    Number(longitude);
                const toLatitude =
                    Number(
                        RAILWAY_STATION.latitude
                    );
                const toLongitude =
                    Number(
                        RAILWAY_STATION.longitude
                    );
                /*
                 * OSRM uses:
                 *
                 * longitude,latitude
                 */
                const osrmUrl =
                    "https://router.project-osrm.org/route/v1/driving/" +
                    `${fromLongitude},${fromLatitude};` +
                    `${toLongitude},${toLatitude}` +
                    "?overview=false";
                console.log(
                    "RAILWAY DROP OSRM:",
                    osrmUrl
                );
                const response =
                    await fetch(
                        osrmUrl,
                        {
                            method: "GET",
                            headers: {
                                Accept:
                                    "application/json",
                            },
                            cache: "no-store",
                        }
                    );
                if (
                    !response.ok
                ) {
                    throw new Error(
                        `Routing service returned ${response.status}`
                    );
                }
                const data =
                    await response.json();
                if (
                    data.code !== "Ok" ||
                    !data.routes ||
                    !data.routes.length
                ) {
                    throw new Error(
                        "No driving route found."
                    );
                }
                const route =
                    data.routes[0];
                /*
                 * OSRM distance is meters.
                 *
                 * Convert to KM.
                 */
                const distanceKm =
                    Number(
                        route.distance
                    ) / 1000;
                /*
                 * OSRM duration is seconds.
                 *
                 * Convert to minutes.
                 */
                const durationMinutes =
                    Number(
                        route.duration
                    ) / 60;
                if (
                    !Number.isFinite(
                        distanceKm
                    )
                ) {
                    throw new Error(
                        "Invalid distance received."
                    );
                }
                /*
                 * STORE ONLY.
                 *
                 * Do not display this value.
                 */
                setRouteDistance(
                    Number(
                        distanceKm.toFixed(2)
                    )
                );
                setRouteDuration(
                    Math.round(
                        durationMinutes
                    )
                );
            } catch (
                error
            ) {
                console.error(
                    "RAILWAY DROP ROUTING ERROR:",
                    error
                );
                setRouteDistance(
                    0
                );
                setRouteDuration(
                    0
                );
                setRouteError(
                    error.message ||
                    "Unable to calculate route."
                );
            } finally {
                setRouteLoading(
                    false
                );
            }
        };
    /* =====================================================
       CURRENT LOCATION
       GPS
       ↓
       ADDRESS
       ↓
       OSRM
    ===================================================== */
    const getCurrentLocation =
        () => {
            if (
                !navigator.geolocation
            ) {
                setLocationError(
                    "Geolocation is not supported by this browser."
                );
                return;
            }
            setLocationLoading(
                true
            );
            setLocationError("");
            setRouteError("");
            navigator.geolocation.getCurrentPosition(
                async (
                    position
                ) => {
                    const latitude =
                        position.coords.latitude;
                    const longitude =
                        position.coords.longitude;
                    /*
                     * Save coordinates
                     */
                    setPickupLatitude(
                        latitude
                    );
                    setPickupLongitude(
                        longitude
                    );
                    /*
                     * Reverse geocoding
                     *
                     * GPS → address
                     */
                    try {
                        const response =
                            await fetch(
                                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                                {
                                    headers: {
                                        Accept:
                                            "application/json",
                                    },
                                }
                            );
                        if (
                            !response.ok
                        ) {
                            throw new Error(
                                "Unable to find address."
                            );
                        }
                        const data =
                            await response.json();
                        setPickupLocation(
                            data.display_name ||
                            `${latitude}, ${longitude}`
                        );
                    } catch (
                        error
                    ) {
                        console.error(
                            "REVERSE GEOCODING ERROR:",
                            error
                        );
                        setPickupLocation(
                            `${latitude}, ${longitude}`
                        );
                    }
                    /*
                     * AUTOMATIC ROUTING
                     */
                    await calculateRoute(
                        latitude,
                        longitude
                    );
                    setLocationLoading(
                        false
                    );
                },
                (
                    error
                ) => {
                    console.error(
                        "LOCATION ERROR:",
                        error
                    );
                    setLocationLoading(
                        false
                    );
                    if (
                        error.code === 1
                    ) {
                        setLocationError(
                            "Location permission was denied."
                        );
                    } else if (
                        error.code === 2
                    ) {
                        setLocationError(
                            "Unable to determine your location."
                        );
                    } else {
                        setLocationError(
                            "Unable to get your current location."
                        );
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0,
                }
            );
        };
    /* =====================================================
       MANUAL PICKUP ADDRESS
       IMPORTANT:
       Current Location is the reliable automatic
       coordinate source.
       If user manually enters an address, we use
       Nominatim search to obtain coordinates and
       then automatically run OSRM.
    ===================================================== */
    const handlePickupLocationBlur =
        async () => {
            const address =
                pickupLocation.trim();
            if (
                !address
            ) {
                return;
            }
            /*
             * If GPS coordinates already exist,
             * do not unnecessarily geocode again.
             */
            if (
                pickupLatitude !== null &&
                pickupLongitude !== null
            ) {
                await calculateRoute(
                    pickupLatitude,
                    pickupLongitude
                );
                return;
            }
            setRouteLoading(
                true
            );
            setRouteError("");
            try {
                const searchUrl =
                    "https://nominatim.openstreetmap.org/search" +
                    `?format=jsonv2` +
                    `&limit=1` +
                    `&q=${encodeURIComponent(
                        address
                    )}`;
                const response =
                    await fetch(
                        searchUrl,
                        {
                            headers: {
                                Accept:
                                    "application/json",
                            },
                        }
                    );
                if (
                    !response.ok
                ) {
                    throw new Error(
                        "Unable to find pickup address."
                    );
                }
                const data =
                    await response.json();
                if (
                    !data.length
                ) {
                    throw new Error(
                        "Pickup address could not be located."
                    );
                }
                const latitude =
                    Number(
                        data[0].lat
                    );
                const longitude =
                    Number(
                        data[0].lon
                    );
                setPickupLatitude(
                    latitude
                );
                setPickupLongitude(
                    longitude
                );
                await calculateRoute(
                    latitude,
                    longitude
                );
            } catch (
                error
            ) {
                console.error(
                    "PICKUP ADDRESS ERROR:",
                    error
                );
                setRouteDistance(
                    0
                );
                setRouteError(
                    error.message ||
                    "Unable to locate pickup address."
                );
                setRouteLoading(
                    false
                );
            }
        };
    /* =====================================================
       REQUIREMENT TOGGLE
    ===================================================== */
    const toggleRequirement =
        (name) => {
            setRequirements(
                (previous) => ({
                    ...previous,
                    [name]:
                        !previous[name],
                })
            );
        };
    /* =====================================================
       CLEAR ALL
    ===================================================== */
    const clearAll =
        () => {
            setDropStation(
                "Visakhapatnam Junction (VSKP)"
            );
            setTrainNumber("");
            setTrainName("");
            setDepartureDate("");
            setDepartureTime("");
            setArrivalTime("");
            setCoach("");
            setBerth("");
            setPlatform("");
            setPickupLocation("");
            setPickupLatitude(
                null
            );
            setPickupLongitude(
                null
            );
            setLocationLoading(
                false
            );
            setLocationError("");
            setRouteDistance(
                0
            );
            setRouteDuration(
                0
            );
            setRouteLoading(
                false
            );
            setRouteError("");
            setContactPerson(
                "Rohit Sharma"
            );
            setContactMobile(
                "+91 98765 43210"
            );
            setPassengers(
                "2 Adults, 1 Child"
            );
            setLuggage(
                "2 Medium Bags, 1 Small Bag"
            );
            setAssistance(
                "No Assistance"
            );
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
       SAVE & CONTINUE
    ===================================================== */
    const handleContinue =
        () => {
            const bookingData = {
                serviceType:
                    "Railway Drop",
                pickupLocation,
                pickupLatitude,
                pickupLongitude,
                dropStation,
                trainNumber,
                trainName,
                departureDate,
                departureTime,
                arrivalTime,
                coach,
                berth,
                platform,
                passengers,
                luggage,
                contactPerson,
                contactMobile,
                assistance,
                requirements,
                /*
                 * INTERNAL ROUTE DATA
                 *
                 * Distance remains hidden
                 * from UI but is saved here.
                 */
                route: {
                    distanceKm:
                        routeDistance,
                    durationMinutes:
                        routeDuration,
                    ratePerKm:
                        RATE_PER_KM,
                },
                fare: {
                    baseFare,
                    stationParking:
                        STATION_PARKING,
                    driverAllowance:
                        DRIVER_ALLOWANCE,
                    waitingCharges:
                        WAITING_CHARGES,
                    meetGreet:
                        MEET_GREET_CHARGE,
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
                "RAILWAY DROP BOOKING:",
                bookingData
            );
            alert(
                "Railway Drop details saved successfully."
            );
        };
    /* =====================================================
       UI
    ===================================================== */
    return (
        <div
            className="railway-page"
            style={{
                backgroundImage:
                    `url(${railwayStation})`,
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
                <div className="page-heading">
                    <div>
                        <h1>
                            Railway Drop Booking
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
                                Railway Drop
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
                    LAYOUT
                ================================================= */}
                <div className="booking-layout">
                    {/* =================================================
                        LEFT
                    ================================================= */}
                    <div className="booking-left">
                        {/* STEPS */}
                        <div className="steps">
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
                            <div className="step">
                                <div className="step-circle">
                                    2
                                </div>
                                <span>
                                    Vehicle Selection
                                </span>
                            </div>
                            <div className="step-line" />
                            <div className="step">
                                <div className="step-circle">
                                    3
                                </div>
                                <span>
                                    Guest Details
                                </span>
                            </div>
                            <div className="step-line" />
                            <div className="step">
                                <div className="step-circle">
                                    4
                                </div>
                                <span>
                                    Fare & Payment
                                </span>
                            </div>
                            <div className="step-line" />
                            <div className="step">
                                <div className="step-circle">
                                    5
                                </div>
                                <span>
                                    Confirmation
                                </span>
                            </div>
                        </div>
                        {/* FORM */}
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
                                    {/* PICKUP LOCATION */}
                                    <div className="location-field-wrapper">
                                        <div className="location-input-row">
                                            <div className="location-input-main">
                                                <InputField
                                                    label="Pickup Location"
                                                    required
                                                    value={
                                                        pickupLocation
                                                    }
                                                    setValue={
                                                        setPickupLocation
                                                    }
                                                    icon="location"
                                                    placeholder="Hotel / pickup address"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="current-location-button"
                                                onClick={
                                                    getCurrentLocation
                                                }
                                                disabled={
                                                    locationLoading
                                                }
                                            >
                                                <Icon
                                                    name="currentLocation"
                                                    size={17}
                                                />
                                                {locationLoading
                                                    ? "Locating..."
                                                    : "Current Location"}
                                            </button>
                                        </div>
                                        {locationError && (
                                            <div className="location-error">
                                                {locationError}
                                            </div>
                                        )}
                                        {routeLoading && (
                                            <div className="route-loading">
                                                Calculating road route automatically...
                                            </div>
                                        )}
                                        {routeError && (
                                            <div className="route-error">
                                                {routeError}
                                            </div>
                                        )}
                                        {/* =================================================
                                            HIDDEN ROUTE DISTANCE
                                        ================================================= */}
                                        <span
                                            className="hidden-route-distance"
                                            aria-hidden="true"
                                        >
                                            {routeDistance}
                                        </span>
                                        <span
                                            className="hidden-route-duration"
                                            aria-hidden="true"
                                        >
                                            {routeDuration}
                                        </span>
                                    </div>
                                    {/* DROP STATION */}
                                    <InputField
                                        label="Drop Station"
                                        required
                                        value={
                                            dropStation
                                        }
                                        setValue={
                                            setDropStation
                                        }
                                        icon="train"
                                    />
                                    {/* TRAIN NUMBER */}
                                    <InputField
                                        label="Train Number"
                                        value={
                                            trainNumber
                                        }
                                        setValue={
                                            setTrainNumber
                                        }
                                        placeholder="Enter train number"
                                    />
                                    {/* TRAIN NAME */}
                                    <InputField
                                        label="Train Name"
                                        value={
                                            trainName
                                        }
                                        setValue={
                                            setTrainName
                                        }
                                        placeholder="Train name"
                                    />
                                    {/* DEPARTURE DATE */}
                                    <InputField
                                        label="Departure Date"
                                        required
                                        value={
                                            departureDate
                                        }
                                        setValue={
                                            setDepartureDate
                                        }
                                        icon="calendar"
                                        type="date"
                                    />
                                    {/* DEPARTURE TIME */}
                                    <InputField
                                        label="Departure Time"
                                        required
                                        value={
                                            departureTime
                                        }
                                        setValue={
                                            setDepartureTime
                                        }
                                        icon="clock"
                                        placeholder="Departure time"
                                    />
                                    {/* ARRIVAL TIME */}
                                    <InputField
                                        label="Arrival Time"
                                        value={
                                            arrivalTime
                                        }
                                        setValue={
                                            setArrivalTime
                                        }
                                        icon="clock"
                                        placeholder="Arrival time"
                                    />
                                    {/* COACH */}
                                    <InputField
                                        label="Coach Number"
                                        value={
                                            coach
                                        }
                                        setValue={
                                            setCoach
                                        }
                                        placeholder="Example: S4 / B2 / A1"
                                    />
                                    {/* BERTH */}
                                    <InputField
                                        label="Berth / Seat Number"
                                        value={
                                            berth
                                        }
                                        setValue={
                                            setBerth
                                        }
                                        placeholder="Example: 36"
                                    />
                                    {/* PLATFORM */}
                                    <InputField
                                        label="Platform Number"
                                        value={
                                            platform
                                        }
                                        setValue={
                                            setPlatform
                                        }
                                        placeholder="Platform"
                                    />
                                </div>
                            </section>
                            {/* =================================================
                                CONTACT
                            ================================================= */}
                            <section className="form-section">
                                <h2 className="sub-heading">
                                    Guest Details
                                </h2>
                                <div className="drop-fields">
                                    <InputField
                                        label="Hotel / Contact Person"
                                        required
                                        value={
                                            contactPerson
                                        }
                                        setValue={
                                            setContactPerson
                                        }
                                    />
                                    <InputField
                                        label="Contact Number"
                                        value={
                                            contactMobile
                                        }
                                        setValue={
                                            setContactMobile
                                        }
                                    />
                                </div>
                            </section>
                            {/* =================================================
                                PASSENGERS
                            ================================================= */}
                            <section className="form-section">
                                <h2 className="sub-heading">
                                    Passenger & Luggage
                                </h2>
                                <div className="passenger-fields">
                                    <InputField
                                        label="No. of Passengers"
                                        required
                                        value={
                                            passengers
                                        }
                                        setValue={
                                            setPassengers
                                        }
                                        icon="user"
                                    />
                                    <InputField
                                        label="Luggage Count"
                                        value={
                                            luggage
                                        }
                                        setValue={
                                            setLuggage
                                        }
                                        icon="bag"
                                    />
                                    <InputField
                                        label="Special Assistance"
                                        value={
                                            assistance
                                        }
                                        setValue={
                                            setAssistance
                                        }
                                    />
                                </div>
                            </section>
                            {/* =================================================
                                REQUIREMENTS
                            ================================================= */}
                            <section className="form-section">
                                <h2 className="sub-heading">
                                    Additional Requirements
                                </h2>
                                <div className="requirements">
                                    <Requirement
                                        name="meetGreet"
                                        label="Meet & Greet"
                                        requirements={
                                            requirements
                                        }
                                        toggleRequirement={
                                            toggleRequirement
                                        }
                                    />
                                    <Requirement
                                        name="porter"
                                        label="Porter Service"
                                        requirements={
                                            requirements
                                        }
                                        toggleRequirement={
                                            toggleRequirement
                                        }
                                    />
                                    <Requirement
                                        name="babySeat"
                                        label="Baby Seat"
                                        requirements={
                                            requirements
                                        }
                                        toggleRequirement={
                                            toggleRequirement
                                        }
                                    />
                                    <Requirement
                                        name="extraLuggage"
                                        label="Extra Luggage Space"
                                        requirements={
                                            requirements
                                        }
                                        toggleRequirement={
                                            toggleRequirement
                                        }
                                    />
                                    <Requirement
                                        name="wheelchair"
                                        label="Wheelchair Access"
                                        requirements={
                                            requirements
                                        }
                                        toggleRequirement={
                                            toggleRequirement
                                        }
                                    />
                                    <Requirement
                                        name="other"
                                        label="Other"
                                        requirements={
                                            requirements
                                        }
                                        toggleRequirement={
                                            toggleRequirement
                                        }
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
                                    onClick={
                                        handleContinue
                                    }
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
                                    onClick={
                                        clearAll
                                    }
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
                        RIGHT SUMMARY
                    ================================================= */}
                    <aside className="right-summary">
                        {/* =================================================
                            ROUTE SUMMARY
                        ================================================= */}
                        <div className="summary-card">
                            <div className="summary-header">
                                <h3>
                                    Railway Drop
                                </h3>
                                <span className="status-badge">
                                    {routeLoading
                                        ? "Calculating"
                                        : routeDistance > 0
                                            ? "Route Ready"
                                            : "Waiting"}
                                </span>
                            </div>
                            <div className="train-status">
                                <div className="train-title">
                                    <Icon
                                        name="train"
                                        size={23}
                                    />
                                    <strong>
                                        {trainName ||
                                            "Railway Drop"}
                                        {trainNumber
                                            ? ` (${trainNumber})`
                                            : ""}
                                    </strong>
                                </div>
                                <div className="route">
                                    <div className="route-place">
                                        <span>
                                            Pickup
                                        </span>
                                        <strong>
                                            {pickupLocation ||
                                                "Pickup Location"}
                                        </strong>
                                    </div>
                                    <div className="route-arrow">
                                        →
                                    </div>
                                    <div className="route-place">
                                        <span>
                                            Drop
                                        </span>
                                        <strong>
                                            {dropStation}
                                        </strong>
                                        <b>
                                            {departureTime ||
                                                "--:--"}
                                        </b>
                                    </div>
                                </div>
                                {platform && (
                                    <div className="train-platform">
                                        Platform:
                                        <strong>
                                            {platform}
                                        </strong>
                                    </div>
                                )}
                                {coach && (
                                    <div className="train-platform">
                                        Coach:
                                        <strong>
                                            {coach}
                                        </strong>
                                    </div>
                                )}
                                {berth && (
                                    <div className="train-platform">
                                        Berth:
                                        <strong>
                                            {berth}
                                        </strong>
                                    </div>
                                )}
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
                                label="Base Fare"
                                value={
                                    baseFare
                                }
                            />
                            <SummaryRow
                                label="Station Parking"
                                value={
                                    STATION_PARKING
                                }
                            />
                            <SummaryRow
                                label="Driver Allowance"
                                value={
                                    DRIVER_ALLOWANCE
                                }
                            />
                            <SummaryRow
                                label="Waiting Charges (30 mins)"
                                value={
                                    WAITING_CHARGES
                                }
                            />
                            <SummaryRow
                                label="Meet & Greet"
                                value={
                                    0
                                }
                            />
                            {porterCharge > 0 && (
                                <SummaryRow
                                    label="Porter Service"
                                    value={
                                        porterCharge
                                    }
                                />
                            )}
                            {babySeatCharge > 0 && (
                                <SummaryRow
                                    label="Baby Seat"
                                    value={
                                        babySeatCharge
                                    }
                                />
                            )}
                            {extraLuggageCharge > 0 && (
                                <SummaryRow
                                    label="Extra Luggage Space"
                                    value={
                                        extraLuggageCharge
                                    }
                                />
                            )}
                            <SummaryRow
                                label="GST (5%)"
                                value={
                                    gst
                                }
                            />
                            <div className="fare-divider" />
                            <SummaryRow
                                label="Subtotal"
                                value={
                                    subtotal
                                }
                            />
                            <SummaryRow
                                label="Hotel Commission (10%)"
                                value={
                                    hotelCommission
                                }
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
                                    Your Earnings
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
                                </strong>{" "}
                                on this booking.
                            </p>
                        </div>
                        {/* =================================================
                            NOTE
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
                                The road route is
                                automatically calculated
                                from the pickup location
                                to the railway station.
                                The route distance is
                                kept hidden and is used
                                internally to calculate
                                the fare at ₹25.50 per km.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
export default RailwayDrop;