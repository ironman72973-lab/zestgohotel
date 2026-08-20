import React, { useState } from "react";
import "./railway.css";
import railwayStation from "../../images/railway.png";
/* =========================================================
   APIs
========================================================= */
const TRAIN_API = "http://localhost/one/train.php";
const OSRM_API = "https://router.project-osrm.org/route/v1/driving";
const NOMINATIM_API = "https://nominatim.openstreetmap.org/reverse";

const getTodayISO = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    return new Date(now.getTime() - offset * 60000)
        .toISOString()
        .slice(0, 10);
};
/* =========================================================
   ICON
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
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </svg>
        );
    }
    if (name === "user") {
        return (
            <svg {...commonProps}>
                <circle cx="12" cy="8" r="3" />
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
                <circle cx="12" cy="10" r="2.5" />
            </svg>
        );
    }
    if (name === "currentLocation") {
        return (
            <svg {...commonProps}>
                <circle cx="12" cy="12" r="7" />
                <circle cx="12" cy="12" r="2.5" />
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
                <circle cx="15" cy="13" r=".5" />
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
                <circle cx="12" cy="12" r="9" />
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
    dropdown = false,
    type = "text",
    placeholder = "",
    readOnly = false,
    min,
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
                        setValue &&
                        setValue(e.target.value)
                    }
                    placeholder={placeholder}
                    autoComplete="off"
                    readOnly={readOnly}
                    min={min}
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
   SUMMARY MONEY ROW
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
   RAILWAY PICKUP
========================================================= */
function RailwayPickup() {
    /* =====================================================
       BASIC DETAILS
    ===================================================== */
    const [
        pickupStation,
        setPickupStation,
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
        arrivalDate,
        setArrivalDate,
    ] = useState("");
    const [
        arrivalTime,
        setArrivalTime,
    ] = useState("");
    const [
        departureTime,
        setDepartureTime,
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
       TRAIN STATUS
    ===================================================== */
    const [
        trainStatus,
        setTrainStatus,
    ] = useState("Waiting");
    const [
        lastUpdated,
        setLastUpdated,
    ] = useState("");
    const [
        trainLoading,
        setTrainLoading,
    ] = useState(false);
    const [
        trainError,
        setTrainError,
    ] = useState("");
    const [
        delayMonitoring,
        setDelayMonitoring,
    ] = useState(true);
    /* =====================================================
       DROP LOCATION
    ===================================================== */
    const [
        dropLocation,
        setDropLocation,
    ] = useState(
        "Oceanview Palace Hotel, Rushikonda"
    );
    const [
        dropLatitude,
        setDropLatitude,
    ] = useState(null);
    const [
        dropLongitude,
        setDropLongitude,
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
       ROUTE
    ===================================================== */
    const [
        routeDistance,
        setRouteDistance,
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
    /* =====================================================
       PASSENGERS
    ===================================================== */
    const [
        passengers,
        setPassengers,
    ] = useState("2");
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
        parking: false,
        waiting: false,
        porter: false,
        babySeat: false,
        extraLuggage: false,
        wheelchair: false,
        other: false,
    });
    /* =====================================================
       FARE SETTINGS
    ===================================================== */
    const PER_KM_RATE = 20.5;
    const STATION_PARKING = 40;
    const DRIVER_ALLOWANCE = 50;
    const WAITING_CHARGES = 20;
    const PORTER_CHARGE = 100;
    const BABY_SEAT_CHARGE = 100;
    const EXTRA_LUGGAGE_CHARGE = 100;
    const GST_RATE = 5;
    const COMMISSION_RATE = 10;
    /* =====================================================
       ADDITIONAL CHARGES
       Meet & Greet = ₹0
    ===================================================== */
    const meetGreetCharge = 0;

    const parkingCharge =
        requirements.parking
            ? STATION_PARKING
            : 0;

    const waitingCharge =
        requirements.waiting
            ? WAITING_CHARGES
            : 0;

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
    /* =====================================================
       BASE FARE FROM ROUTE DISTANCE
       distance × ₹12.50
    ===================================================== */
    const baseFare =
        Number(routeDistance || 0) *
        PER_KM_RATE;
    /* =====================================================
       FARE CALCULATION
    ===================================================== */
    const fareBeforeGST =
        baseFare +
        parkingCharge +
        waitingCharge +
        DRIVER_ALLOWANCE +
        meetGreetCharge +
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
       TRAIN TIME FORMAT
    ===================================================== */
    const formatTrainTime = (
        time
    ) => {
        if (!time) {
            return "";
        }
        const parts =
            String(time).split(":");
        if (
            parts.length < 2
        ) {
            return time;
        }
        let hours =
            parseInt(
                parts[0],
                10
            );
        const minutes =
            parts[1];
        if (
            Number.isNaN(hours)
        ) {
            return time;
        }
        const suffix =
            hours >= 12
                ? "PM"
                : "AM";
        hours =
            hours % 12 || 12;
        return `${String(
            hours
        ).padStart(
            2,
            "0"
        )}:${minutes} ${suffix}`;
    };
    /* =====================================================
       FETCH TRAIN STATUS
    ===================================================== */
    const fetchTrainStatus =
        async (
            number,
            date
        ) => {
            if (
                !number ||
                !date
            ) {
                setTrainError(
                    "Enter train number and arrival date."
                );
                return;
            }
            const cleanTrainNumber =
                String(number)
                    .trim();
            if (
                !/^[0-9]+$/.test(
                    cleanTrainNumber
                )
            ) {
                setTrainError(
                    "Invalid train number."
                );
                setTrainStatus(
                    "Not Available"
                );
                return;
            }
            setTrainLoading(
                true
            );
            setTrainError("");
            setTrainStatus(
                "Checking..."
            );
            try {
                const url =
                    `${TRAIN_API}` +
                    `?trainNo=${encodeURIComponent(
                        cleanTrainNumber
                    )}` +
                    `&stationCode=VSKP` +
                    `&date=${encodeURIComponent(
                        date
                    )}`;
                const response =
                    await fetch(
                        url,
                        {
                            method: "GET",
                            headers: {
                                Accept:
                                    "application/json",
                            },
                            cache:
                                "no-store",
                        }
                    );
                if (
                    !response.ok
                ) {
                    throw new Error(
                        `HTTP Error ${response.status}`
                    );
                }
                const data =
                    await response.json();
                if (
                    !data.success
                ) {
                    setTrainError(
                        data.error ||
                        data.message ||
                        "Train details not found."
                    );
                    setTrainStatus(
                        "Not Available"
                    );
                    return;
                }
                /* TRAIN NAME */
                setTrainName(
                    data.train_name ||
                    ""
                );
                /* ARRIVAL */
                setArrivalTime(
                    data.arrival_time
                        ? formatTrainTime(
                            data.arrival_time
                        )
                        : ""
                );
                /* DEPARTURE */
                setDepartureTime(
                    data.departure_time
                        ? formatTrainTime(
                            data.departure_time
                        )
                        : ""
                );
                /* PLATFORM */
                if (
                    data.platform !==
                        null &&
                    data.platform !==
                        undefined &&
                    data.platform !== ""
                ) {
                    setPlatform(
                        String(
                            data.platform
                        )
                    );
                } else {
                    setPlatform("");
                }
                /* DELAY */
                const delay =
                    Number(
                        data.delay_minutes ||
                        0
                    );
                if (
                    delay > 0
                ) {
                    setTrainStatus(
                        `Delayed ${delay} min`
                    );
                } else {
                    setTrainStatus(
                        data.status ||
                        "On Time"
                    );
                }
                /* LAST UPDATED */
                if (
                    data.last_updated
                ) {
                    const parsedDate =
                        new Date(
                            data.last_updated
                        );
                    if (
                        !Number.isNaN(
                            parsedDate.getTime()
                        )
                    ) {
                        setLastUpdated(
                            parsedDate.toLocaleString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )
                        );
                    } else {
                        setLastUpdated(
                            data.last_updated
                        );
                    }
                } else {
                    setLastUpdated(
                        new Date().toLocaleString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )
                    );
                }
            } catch (error) {
                console.error(
                    "TRAIN API ERROR:",
                    error
                );
                setTrainError(
                    "Unable to connect to train status service."
                );
                setTrainStatus(
                    "Connection Error"
                );
            } finally {
                setTrainLoading(
                    false
                );
            }
        };
    /* =====================================================
       TRAIN NUMBER
    ===================================================== */
    const handleTrainNumberChange =
        (event) => {
            const value =
                event.target.value.replace(
                    /\D/g,
                    ""
                );
            setTrainNumber(
                value
            );
        };
    /* =====================================================
       GET TRAIN DETAILS
    ===================================================== */
    const getTrainDetails =
        () => {
            const number =
                trainNumber.trim();
            setTrainError("");
            if (!number) {
                setTrainError(
                    "Enter train number."
                );
                return;
            }
            if (
                !/^[0-9]+$/.test(
                    number
                )
            ) {
                setTrainError(
                    "Invalid train number."
                );
                return;
            }
            if (
                !arrivalDate
            ) {
                setTrainError(
                    "Select arrival date."
                );
                return;
            }
            fetchTrainStatus(
                number,
                arrivalDate
            );
        };
    /* =====================================================
       REFRESH TRAIN
    ===================================================== */
    const refreshTrainStatus =
        () => {
            if (
                !trainNumber.trim() ||
                !arrivalDate
            ) {
                setTrainError(
                    "Enter train number and arrival date first."
                );
                return;
            }
            fetchTrainStatus(
                trainNumber.trim(),
                arrivalDate
            );
        };
    /* =====================================================
       OSRM ROUTING
       Customer / Current Location -> Visakhapatnam Junction (VSKP)
       Since this is Railway Pickup, route starts at the
       customer's current/drop location and ends at VSKP.
    ===================================================== */
    const calculateRoute =
        async (
            fromLat,
            fromLng
        ) => {
            if (
                fromLat == null ||
                fromLng == null ||
                !Number.isFinite(Number(fromLat)) ||
                !Number.isFinite(Number(fromLng))
            ) {
                setRouteError(
                    "Current location is required to calculate route distance."
                );
                return;
            }
            /* VSKP approximate coordinates */
            const VSKP_LATITUDE = 17.72159;
            const VSKP_LONGITUDE = 83.289514;
            setRouteLoading(
                true
            );
            setRouteError("");
            setRouteDistance(0);
            try {
                const url =
                    `${OSRM_API}/` +
                    `${fromLng},${fromLat};` +
                    `${VSKP_LONGITUDE},${VSKP_LATITUDE}` +
                    `?overview=false&steps=false`;
                const response =
                    await fetch(
                        url
                    );
                if (
                    !response.ok
                ) {
                    throw new Error(
                        `OSRM HTTP ${response.status}`
                    );
                }
                const data =
                    await response.json();
                if (
                    data.code !==
                    "Ok" ||
                    !data.routes ||
                    !data.routes.length
                ) {
                    throw new Error(
                        "No route found."
                    );
                }
                const distanceMeters =
                    data.routes[0]
                        .distance;
                const distanceKm =
                    distanceMeters /
                    1000;
                setRouteDistance(
                    Number(
                        distanceKm.toFixed(
                            2
                        )
                    )
                );
            } catch (
                error
            ) {
                console.error(
                    "OSRM ROUTING ERROR:",
                    error
                );
                setRouteDistance(
                    0
                );
                setRouteError(
                    "Unable to calculate road distance."
                );
            } finally {
                setRouteLoading(
                    false
                );
            }
        };
    /* =====================================================
       GET LOCATION + ROUTE
    ===================================================== */
    const getLocationAndRoute =
        () => {
            if (
                !navigator.geolocation
            ) {
                setLocationError(
                    "Geolocation is not supported."
                );
                return;
            }
            setLocationLoading(
                true
            );
            setLocationError("");
            navigator.geolocation.getCurrentPosition(
                async (
                    position
                ) => {
                    const latitude =
                        position.coords.latitude;
                    const longitude =
                        position.coords.longitude;
                    setDropLatitude(
                        latitude
                    );
                    setDropLongitude(
                        longitude
                    );
                    try {
                        const response =
                            await fetch(
                                `${NOMINATIM_API}?lat=${latitude}&lon=${longitude}&format=json`,
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
                                "Address lookup failed"
                            );
                        }
                        const data =
                            await response.json();
                        setDropLocation(
                            data.display_name ||
                            `${latitude.toFixed(
                                6
                            )}, ${longitude.toFixed(
                                6
                            )}`
                        );
                    } catch (
                        error
                    ) {
                        setDropLocation(
                            `${latitude.toFixed(
                                6
                            )}, ${longitude.toFixed(
                                6
                            )}`
                        );
                    }
                    setLocationLoading(
                        false
                    );
                    await calculateRoute(
                        latitude,
                        longitude
                    );
                },
                () => {
                    setLocationLoading(
                        false
                    );
                    setLocationError(
                        "Unable to get current location. Please allow location access."
                    );
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0,
                }
            );
        };
    /* =====================================================
       REQUIREMENT TOGGLE
    ===================================================== */
    const toggleRequirement =
        (name) => {
            setRequirements(
                previous => ({
                    ...previous,
                    [name]:
                        !previous[name],
                })
            );
        };
    /* =====================================================
       CLEAR ALL
    ===================================================== */
    const clearAll = () => {
        setPickupStation(
            "Visakhapatnam Junction (VSKP)"
        );
        setTrainNumber("");
        setTrainName("");
        setArrivalDate("");
        setArrivalTime("");
        setDepartureTime("");
        setCoach("");
        setBerth("");
        setPlatform("");
        setTrainStatus(
            "Waiting"
        );
        setLastUpdated("");
        setTrainLoading(
            false
        );
        setTrainError("");
        setDelayMonitoring(
            true
        );
        setDropLocation(
            "Oceanview Palace Hotel, Rushikonda"
        );
        setDropLatitude(
            null
        );
        setDropLongitude(
            null
        );
        setLocationLoading(
            false
        );
        setLocationError("");
        setRouteDistance(
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
        setPassengers("2");
        setLuggage(
            "2 Medium Bags, 1 Small Bag"
        );
        setAssistance(
            "No Assistance"
        );
        setRequirements({
            meetGreet: true,
            parking: false,
            waiting: false,
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
            setTrainError("");
            setLocationError("");
            setRouteError("");

            if (!pickupStation.trim()) {
                setTrainError("Pickup station is required.");
                return;
            }

            if (!trainNumber.trim()) {
                setTrainError("Enter train number.");
                return;
            }

            if (!arrivalDate) {
                setTrainError("Select arrival date.");
                return;
            }

            if (!arrivalTime) {
                setTrainError("Arrival time is required.");
                return;
            }

            if (!dropLocation.trim()) {
                setLocationError("Drop location is required.");
                return;
            }

            if (!contactPerson.trim()) {
                setLocationError("Hotel contact person is required.");
                return;
            }

            const mobileDigits = contactMobile.replace(/\D/g, "");
            if (mobileDigits.length < 10) {
                setLocationError("Enter a valid contact number.");
                return;
            }

            if (Number(passengers) <= 0 || !Number.isFinite(Number(passengers))) {
                setLocationError("Enter a valid passenger count.");
                return;
            }

            if (Number(routeDistance) <= 0) {
                setRouteError("Get the current location to calculate the route distance before continuing.");
                return;
            }

            const bookingData = {
                serviceType:
                    "Railway Pickup",
                pickupStation,
                trainNumber,
                trainName,
                arrivalDate,
                arrivalTime,
                departureTime,
                coach,
                berth,
                platform,
                delayMonitoring,
                trainStatus,
                dropLocation,
                dropLatitude,
                dropLongitude,
                routeDistance,
                ratePerKm:
                    PER_KM_RATE,
                contactPerson,
                contactMobile,
                passengers,
                luggage,
                assistance,
                requirements,
                fare: {
                    baseFare,
                    stationParking:
                        parkingCharge,
                    driverAllowance:
                        DRIVER_ALLOWANCE,
                    waitingCharges:
                        waitingCharge,
                    meetGreetCharge,
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
                "RAILWAY PICKUP BOOKING:",
                bookingData
            );
            alert(
                "Railway Pickup details saved successfully."
            );
        };
    /* =====================================================
       RETURN
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
                <div className="booking-layout">
                    {/* =================================================
                        LEFT
                    ================================================= */}
                    <div className="booking-left">
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
                                        value={
                                            pickupStation
                                        }
                                        setValue={
                                            setPickupStation
                                        }
                                        icon="train"
                                        dropdown
                                    />
                                    {/* TRAIN NUMBER + GET */}
                                    <div className="rp-field">
                                        <label>
                                            Train Number
                                            <span className="required">
                                                *
                                            </span>
                                        </label>
                                        <div className="train-number-input">
                                            <div className="rp-input">
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={
                                                        trainNumber
                                                    }
                                                    onChange={
                                                        handleTrainNumberChange
                                                    }
                                                    placeholder="Enter train number"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="get-train-button"
                                                onClick={
                                                    getTrainDetails
                                                }
                                                disabled={
                                                    trainLoading
                                                }
                                            >
                                                {trainLoading
                                                    ? "GET..."
                                                    : "GET"}
                                            </button>
                                        </div>
                                    </div>
                                    {trainLoading && (
                                        <div className="train-loading">
                                            Checking train status...
                                        </div>
                                    )}
                                    {trainError && (
                                        <div className="train-error">
                                            {trainError}
                                        </div>
                                    )}
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
                                    <InputField
                                        label="Arrival Date"
                                        required
                                        value={
                                            arrivalDate
                                        }
                                        setValue={
                                            setArrivalDate
                                        }
                                        icon="calendar"
                                        type="date"
                                        min={getTodayISO()}
                                    />
                                    <InputField
                                        label="Arrival Time"
                                        required
                                        value={
                                            arrivalTime
                                        }
                                        setValue={
                                            setArrivalTime
                                        }
                                        icon="clock"
                                        placeholder="Arrival time"
                                    />
                                    <InputField
                                        label="Departure Time"
                                        value={
                                            departureTime
                                        }
                                        setValue={
                                            setDepartureTime
                                        }
                                        icon="clock"
                                        placeholder="Departure time"
                                    />
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
                                <div className="drop-location-row">
                                    <div className="drop-location-input">
                                        <InputField
                                            label="Drop Location"
                                            required
                                            value={
                                                dropLocation
                                            }
                                            setValue={
                                                setDropLocation
                                            }
                                            icon="location"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="current-location-button"
                                        onClick={
                                            getLocationAndRoute
                                        }
                                        disabled={
                                            locationLoading ||
                                            routeLoading
                                        }
                                    >
                                        <Icon
                                            name="currentLocation"
                                            size={17}
                                        />
                                        {locationLoading
                                            ? "Locating..."
                                            : routeLoading
                                            ? "Routing..."
                                            : "Current Location"}
                                    </button>
                                </div>
                                {locationError && (
                                    <div className="location-error">
                                        {locationError}
                                    </div>
                                )}
                                {routeError && (
                                    <div className="route-error">
                                        {routeError}
                                    </div>
                                )}
                                {/* ROUTE DISTANCE - SINGLE SOURCE OF TRUTH */}
                                <div className="route-distance-display">
                                    <span>
                                        Road Distance to VSKP
                                    </span>
                                    <strong>
                                        {routeLoading
                                            ? "Calculating..."
                                            : routeDistance > 0
                                            ? `${routeDistance.toFixed(2)} km`
                                            : "Not calculated"}
                                    </strong>
                                </div>

                                <span
                                    className="hidden-route-distance"
                                    data-distance={routeDistance}
                                >
                                    {routeDistance}
                                </span>
                                <div className="drop-fields">
                                    <InputField
                                        label="Hotel Contact Person"
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
                                        type="number"
                                        placeholder="Enter passenger count"
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
                                        dropdown
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
                                        name="parking"
                                        label="Station Parking"
                                        requirements={
                                            requirements
                                        }
                                        toggleRequirement={
                                            toggleRequirement
                                        }
                                    />
                                    <Requirement
                                        name="waiting"
                                        label="Waiting Charges (30 mins)"
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
                        {/* TRAIN STATUS */}
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
                                        {trainName ||
                                            "Train"}
                                        {trainNumber
                                            ? ` (${trainNumber})`
                                            : ""}
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
                                            {departureTime ||
                                                "--:--"}
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
                                            {arrivalTime ||
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
                                <div className="updated">
                                    <span>
                                        Last Updated:{" "}
                                        {lastUpdated ||
                                            "Not updated"}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={
                                            refreshTrainStatus
                                        }
                                        disabled={
                                            trainLoading
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
                                label="Route Fare"
                                value={
                                    baseFare
                                }
                            />
                            {parkingCharge > 0 && (
                                <SummaryRow
                                    label="Station Parking"
                                    value={
                                        parkingCharge
                                    }
                                />
                            )}
                            <SummaryRow
                                label="Driver Allowance"
                                value={
                                    DRIVER_ALLOWANCE
                                }
                            />
                            {waitingCharge > 0 && (
                                <SummaryRow
                                    label="Waiting Charges (30 mins)"
                                    value={
                                        waitingCharge
                                    }
                                />
                            )}
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
                            {/* SUBTOTAL */}
                            <div className="summary-row subtotal">
                                <span>
                                    Subtotal
                                </span>
                                <strong>
                                    {formatMoney(
                                        subtotal
                                    )}
                                </strong>
                            </div>
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
                                </strong>{" "}
                                on this booking
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
                                Waiting charges apply only when
                                "Waiting Charges (30 mins)" is
                                selected under Additional
                                Requirements. Additional waiting
                                time will be charged as per
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