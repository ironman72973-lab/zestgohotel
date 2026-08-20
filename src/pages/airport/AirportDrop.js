import React, { useState } from "react";
import "./airport.css";
import airportBg from "../../images/airport.png";
/* =========================================================
   API
========================================================= */
const FLIGHT_API = "http://localhost/one/flight.php";
const OSRM_API =
  "https://router.project-osrm.org/route/v1/driving";
const NOMINATIM_API =
  "https://nominatim.openstreetmap.org";
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
  if (name === "plane") {
    return (
      <svg {...commonProps}>
        <path d="M2 16.5 22 12 2 7.5l4.2 4.5L2 16.5Z" />
        <path d="M6.2 12H22" />
        <path d="m11 9 2.5-6" />
        <path d="m11 15 2.5 6" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
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
        <rect x="4" y="7" width="16" height="13" rx="2" />
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
  if (name === "target") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
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
  if (name === "route") {
    return (
      <svg {...commonProps}>
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <path d="M8 18h2c4 0 6-2 6-6V8" />
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
}) {
  return (
    <div className="ap-field">
      <label>
        {label}
        {required && (
          <span className="required">*</span>
        )}
      </label>
      <div className="ap-input">
        {icon && (
          <span className="input-icon">
            <Icon name={icon} size={18} />
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
        />
        {dropdown && (
          <span className="dropdown-icon">
            <Icon name="chevron" size={17} />
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
  price = null,
  requirements,
  toggleRequirement,
}) {
  const selected =
    requirements[name];
  return (
    <button
      type="button"
      className={`requirement ${
        selected ? "selected" : ""
      }`}
      onClick={() =>
        toggleRequirement(name)
      }
    >
      <span className="checkbox">
        {selected && (
          <Icon name="check" size={12} />
        )}
      </span>
      <span>{label}</span>
      {price !== null && (
        <small>
          + ₹{price}
        </small>
      )}
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
  const formatMoney = (amount) => {
    return `₹ ${Number(
      amount || 0
    ).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  return (
    <div className="summary-row">
      <span>{label}</span>
      <strong
        className={
          negative
            ? "negative"
            : ""
        }
      >
        {negative ? "- " : ""}
        {formatMoney(value)}
      </strong>
    </div>
  );
}
/* =========================================================
   AIRPORT DROP
========================================================= */
function AirportDrop() {
  /* =====================================================
     FLIGHT
  ===================================================== */
  const [
    departureAirport,
    setDepartureAirport,
  ] = useState(
    "Visakhapatnam Airport (VTZ)"
  );
  const [
    flightNumber,
    setFlightNumber,
  ] = useState("");
  const [
    airline,
    setAirline,
  ] = useState("");
  const [
    flightStatus,
    setFlightStatus,
  ] = useState("Waiting");
  const [
    departureDate,
    setDepartureDate,
  ] = useState("");
  const [
    departureTime,
    setDepartureTime,
  ] = useState("");
  const [
    terminal,
    setTerminal,
  ] = useState("");
  const [
    gate,
    setGate,
  ] = useState("");
  /* =====================================================
     HOTEL PICKUP
  ===================================================== */
  const [
    hotelLocation,
    setHotelLocation,
  ] = useState(
    "Oceanview Palace Hotel, Rushikonda"
  );
  const [
    hotelContact,
    setHotelContact,
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
    roomNumber,
    setRoomNumber,
  ] = useState("205");
  /* =====================================================
     PASSENGERS
  ===================================================== */
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
    "2 Large, 1 Small"
  );
  const [
    pickupTime,
    setPickupTime,
  ] = useState("");
  const [
    specialInstructions,
    setSpecialInstructions,
  ] = useState("");
  /* =====================================================
     AIRPORT COORDINATES
  ===================================================== */
  const [
    airportLatitude,
    setAirportLatitude,
  ] = useState(null);
  const [
    airportLongitude,
    setAirportLongitude,
  ] = useState(null);
  /* =====================================================
     HOTEL COORDINATES
  ===================================================== */
  const [
    hotelLatitude,
    setHotelLatitude,
  ] = useState(null);
  const [
    hotelLongitude,
    setHotelLongitude,
  ] = useState(null);
  /* =====================================================
     ROUTE
     HOTEL -> AIRPORT
  ===================================================== */
  const [
    routeDistanceKm,
    setRouteDistanceKm,
  ] = useState(0);
  const [
    routeDuration,
    setRouteDuration,
  ] = useState("");
  const [
    routeLoading,
    setRouteLoading,
  ] = useState(false);
  const [
    routeError,
    setRouteError,
  ] = useState("");
  /* =====================================================
     FLIGHT STATUS
  ===================================================== */
  const [
    flightLoading,
    setFlightLoading,
  ] = useState(false);
  const [
    flightError,
    setFlightError,
  ] = useState("");
  const [
    lastUpdated,
    setLastUpdated,
  ] = useState("");
  /* =====================================================
     CURRENT LOCATION
  ===================================================== */
  const [
    locationLoading,
    setLocationLoading,
  ] = useState(false);
  const [
    locationError,
    setLocationError,
  ] = useState("");
  /* =====================================================
     REQUIREMENTS
     Meet & Greet = ₹0
  ===================================================== */
  const [
    requirements,
    setRequirements,
  ] = useState({
    meetGreet: true,
    babySeat: false,
    extraLuggage: false,
    femaleDriver: false,
  });
  /* =====================================================
     FARE
  ===================================================== */
  const RATE_PER_KM = 25.5;
  const AIRPORT_PARKING = 60;
  const DRIVER_ALLOWANCE = 50;
  const WAITING_CHARGES = 0;
  const MEET_GREET_CHARGE = 0;
  const BABY_SEAT_CHARGE = 100;
  const EXTRA_LUGGAGE_CHARGE = 100;
  const FEMALE_DRIVER_CHARGE = 150;
  const GST_RATE = 5;
  const COMMISSION_RATE = 10;
  /* =====================================================
     OPTIONAL CHARGES
  ===================================================== */
  const babySeatCharge =
    requirements.babySeat
      ? BABY_SEAT_CHARGE
      : 0;
  const extraLuggageCharge =
    requirements.extraLuggage
      ? EXTRA_LUGGAGE_CHARGE
      : 0;
  const femaleDriverCharge =
    requirements.femaleDriver
      ? FEMALE_DRIVER_CHARGE
      : 0;
  /* =====================================================
     DISTANCE FARE
     HOTEL -> AIRPORT
  ===================================================== */
  const distanceFare =
    Number(routeDistanceKm || 0) *
    RATE_PER_KM;
  /* =====================================================
     FARE BEFORE GST
  ===================================================== */
  const fareBeforeGST =
    distanceFare +
    AIRPORT_PARKING +
    DRIVER_ALLOWANCE +
    WAITING_CHARGES +
    MEET_GREET_CHARGE +
    babySeatCharge +
    extraLuggageCharge +
    femaleDriverCharge;
  /* =====================================================
     GST
  ===================================================== */
  const gst =
    fareBeforeGST *
    (GST_RATE / 100);
  /* =====================================================
     SUBTOTAL
  ===================================================== */
  const subtotal =
    fareBeforeGST + gst;
  /* =====================================================
     COMMISSION
  ===================================================== */
  const hotelCommission =
    subtotal *
    (COMMISSION_RATE / 100);
  /* =====================================================
     GRAND TOTAL
  ===================================================== */
  const grandTotal =
    subtotal -
    hotelCommission;
  /* =====================================================
     MONEY
  ===================================================== */
  const formatMoney = (amount) => {
    return `₹ ${Number(
      amount || 0
    ).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  /* =====================================================
     TIME FORMAT
  ===================================================== */
  const formatFlightTime = (
    value
  ) => {
    if (!value) {
      return "";
    }
    const date =
      new Date(value);
    if (
      !Number.isNaN(
        date.getTime()
      )
    ) {
      return date.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      );
    }
    return value;
  };
  /* =====================================================
     GET FLIGHT DETAILS
  ===================================================== */
  const getFlightDetails =
    async () => {
      const number =
        flightNumber
          .trim()
          .replace(/\s+/g, "")
          .toUpperCase();
      if (!number) {
        setFlightError(
          "Enter flight number."
        );
        return;
      }
      if (
        !/^[A-Z0-9]{2,10}$/.test(
          number
        )
      ) {
        setFlightError(
          "Invalid flight number."
        );
        return;
      }
      if (!departureDate) {
        setFlightError(
          "Select departure date."
        );
        return;
      }
      setFlightLoading(true);
      setFlightError("");
      setRouteError("");
      try {
        const url =
          `${FLIGHT_API}` +
          `?flight=${encodeURIComponent(
            number
          )}` +
          `&date=${encodeURIComponent(
            departureDate
          )}`;
        console.log(
          "FLIGHT API REQUEST:",
          url
        );
        const response =
          await fetch(url, {
            method: "GET",
            headers: {
              Accept:
                "application/json",
            },
            cache: "no-store",
          });
        if (!response.ok) {
          throw new Error(
            `HTTP Error ${response.status}`
          );
        }
        const data =
          await response.json();
        console.log(
          "FLIGHT API RESPONSE:",
          data
        );
        if (!data.success) {
          throw new Error(
            data.message ||
              "Flight details not found."
          );
        }
        /* ===============================================
           FLIGHT NUMBER
        =============================================== */
        setFlightNumber(
          data.flight?.number ||
            number
        );
        /* ===============================================
           AIRLINE
        =============================================== */
        setAirline(
          data.airline?.name ||
            ""
        );
        /* ===============================================
           STATUS
        =============================================== */
        setFlightStatus(
          data.flight?.status ||
            "Unknown"
        );
        /* ===============================================
           DEPARTURE AIRPORT
           This is the destination airport for
           the hotel-to-airport route.
        =============================================== */
        setDepartureAirport(
          data.departure?.airport ||
            ""
        );
        /* ===============================================
           AIRPORT IATA
        =============================================== */
        const iata =
          data.departure?.iata ||
          "";
        const icao =
          data.departure?.icao ||
          "";
        /* ===============================================
           TERMINAL
        =============================================== */
        setTerminal(
          data.departure?.terminal ||
            ""
        );
        /* ===============================================
           GATE
        =============================================== */
        setGate(
          data.departure?.gate ||
            ""
        );
        /* ===============================================
           AIRPORT COORDINATES
        =============================================== */
        const lat =
          Number(
            data.departure?.location
              ?.latitude
          );
        const lng =
          Number(
            data.departure?.location
              ?.longitude
          );
        if (
          Number.isFinite(lat) &&
          Number.isFinite(lng)
        ) {
          setAirportLatitude(
            lat
          );
          setAirportLongitude(
            lng
          );
        }
        /* ===============================================
           FLIGHT DEPARTURE TIME
        =============================================== */
        const scheduled =
          data.departure?.scheduled
            ?.local;
        const estimated =
          data.departure?.estimated;
        const actual =
          data.departure?.actual;
        const selectedTime =
          actual ||
          estimated ||
          scheduled;
        setDepartureTime(
          formatFlightTime(
            selectedTime
          )
        );
        /* ===============================================
           LAST UPDATED
        =============================================== */
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
        /* ===============================================
           CALCULATE ROUTE
           HOTEL -> AIRPORT
        =============================================== */
        if (
          Number.isFinite(lat) &&
          Number.isFinite(lng) &&
          Number.isFinite(
            Number(hotelLatitude)
          ) &&
          Number.isFinite(
            Number(hotelLongitude)
          )
        ) {
          calculateRoute(
            Number(hotelLatitude),
            Number(hotelLongitude),
            lat,
            lng
          );
        }
        console.log(
          "AIRPORT:",
          {
            iata,
            icao,
            latitude: lat,
            longitude: lng,
          }
        );
      } catch (error) {
        console.error(
          "FLIGHT API ERROR:",
          error
        );
        setFlightError(
          error.message ||
            "Unable to connect to flight tracking service."
        );
        setFlightStatus(
          "Not Available"
        );
      } finally {
        setFlightLoading(false);
      }
    };
  /* =====================================================
     REFRESH FLIGHT
  ===================================================== */
  const refreshFlight =
    () => {
      if (
        !flightNumber ||
        !departureDate
      ) {
        setFlightError(
          "Enter flight number and departure date first."
        );
        return;
      }
      getFlightDetails();
    };
  /* =====================================================
     GEOCODE HOTEL
  ===================================================== */
  const geocodeHotel =
    async (
      address
    ) => {
      if (
        !address.trim()
      ) {
        return;
      }
      try {
        const url =
          `${NOMINATIM_API}/search` +
          `?format=json` +
          `&limit=1` +
          `&countrycodes=in` +
          `&q=${encodeURIComponent(
            address
          )}`;
        const response =
          await fetch(url, {
            headers: {
              Accept:
                "application/json",
            },
          });
        if (!response.ok) {
          throw new Error(
            "Unable to find address."
          );
        }
        const results =
          await response.json();
        if (
          !results ||
          results.length === 0
        ) {
          setRouteError(
            "Hotel location could not be found."
          );
          return;
        }
        const lat =
          Number(
            results[0].lat
          );
        const lng =
          Number(
            results[0].lon
          );
        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lng)
        ) {
          setRouteError(
            "Invalid hotel coordinates."
          );
          return;
        }
        setHotelLatitude(
          lat
        );
        setHotelLongitude(
          lng
        );
        /* ===============================================
           HOTEL -> AIRPORT
        =============================================== */
        if (
          Number.isFinite(
            Number(
              airportLatitude
            )
          ) &&
          Number.isFinite(
            Number(
              airportLongitude
            )
          )
        ) {
          calculateRoute(
            lat,
            lng,
            Number(
              airportLatitude
            ),
            Number(
              airportLongitude
            )
          );
        }
      } catch (error) {
        console.error(
          "GEOCODING ERROR:",
          error
        );
        setRouteError(
          "Unable to find hotel location."
        );
      }
    };
  /* =====================================================
     CURRENT LOCATION
  ===================================================== */
  const getCurrentLocation =
    () => {
      setLocationError("");
      if (
        !navigator.geolocation
      ) {
        setLocationError(
          "Location is not supported by this browser."
        );
        return;
      }
      setLocationLoading(
        true
      );
      navigator.geolocation.getCurrentPosition(
        async (
          position
        ) => {
          const lat =
            position.coords.latitude;
          const lng =
            position.coords.longitude;
          try {
            const url =
              `${NOMINATIM_API}/reverse` +
              `?format=json` +
              `&lat=${lat}` +
              `&lon=${lng}` +
              `&zoom=18` +
              `&addressdetails=1`;
            const response =
              await fetch(url, {
                headers: {
                  Accept:
                    "application/json",
                },
              });
            if (!response.ok) {
              throw new Error(
                "Unable to get address."
              );
            }
            const data =
              await response.json();
            setHotelLocation(
              data.display_name ||
                ""
            );
            setHotelLatitude(
              lat
            );
            setHotelLongitude(
              lng
            );
            /* ==========================================
               HOTEL -> AIRPORT
            ========================================== */
            if (
              Number.isFinite(
                Number(
                  airportLatitude
                )
              ) &&
              Number.isFinite(
                Number(
                  airportLongitude
                )
              )
            ) {
              calculateRoute(
                lat,
                lng,
                Number(
                  airportLatitude
                ),
                Number(
                  airportLongitude
                )
              );
            }
          } catch (error) {
            console.error(
              "CURRENT LOCATION ERROR:",
              error
            );
            setLocationError(
              "Unable to convert current location to address."
            );
          } finally {
            setLocationLoading(
              false
            );
          }
        },
        (error) => {
          console.error(
            "GEOLOCATION ERROR:",
            error
          );
          let message =
            "Unable to get current location.";
          if (
            error.code === 1
          ) {
            message =
              "Location permission was denied.";
          }
          if (
            error.code === 2
          ) {
            message =
              "Current location is unavailable.";
          }
          if (
            error.code === 3
          ) {
            message =
              "Location request timed out.";
          }
          setLocationError(
            message
          );
          setLocationLoading(
            false
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
     HOTEL BLUR
  ===================================================== */
  const handleHotelBlur =
    () => {
      if (
        hotelLocation.trim()
      ) {
        geocodeHotel(
          hotelLocation
        );
      }
    };
  /* =====================================================
     OSRM ROUTING
     HOTEL -> AIRPORT
  ===================================================== */
  const calculateRoute =
    async (
      fromLat,
      fromLng,
      toLat,
      toLng
    ) => {
      if (
        !Number.isFinite(
          Number(fromLat)
        ) ||
        !Number.isFinite(
          Number(fromLng)
        ) ||
        !Number.isFinite(
          Number(toLat)
        ) ||
        !Number.isFinite(
          Number(toLng)
        )
      ) {
        setRouteError(
          "Valid hotel and airport coordinates are required."
        );
        return;
      }
      setRouteLoading(
        true
      );
      setRouteError("");
      try {
        const coordinates =
          `${fromLng},${fromLat};${toLng},${toLat}`;
        const url =
          `${OSRM_API}/${coordinates}` +
          `?overview=false`;
        console.log(
          "OSRM ROUTE REQUEST:",
          url
        );
        const response =
          await fetch(url, {
            method: "GET",
            headers: {
              Accept:
                "application/json",
            },
          });
        if (!response.ok) {
          throw new Error(
            `OSRM HTTP Error ${response.status}`
          );
        }
        const data =
          await response.json();
        console.log(
          "OSRM RESPONSE:",
          data
        );
        if (
          data.code !== "Ok" ||
          !data.routes ||
          !data.routes.length
        ) {
          throw new Error(
            "Route not found."
          );
        }
        const route =
          data.routes[0];
        /* ===============================================
           METERS -> KM
        =============================================== */
        const distanceKm =
          Number(
            route.distance || 0
          ) / 1000;
        /* ===============================================
           SECONDS -> MINUTES
        =============================================== */
        const durationMinutes =
          Math.round(
            Number(
              route.duration || 0
            ) / 60
          );
        setRouteDistanceKm(
          Number(
            distanceKm.toFixed(2)
          )
        );
        setRouteDuration(
          `${durationMinutes} min`
        );
      } catch (error) {
        console.error(
          "OSRM ERROR:",
          error
        );
        setRouteError(
          "Unable to calculate road distance."
        );
        setRouteDistanceKm(
          0
        );
        setRouteDuration(
          ""
        );
      } finally {
        setRouteLoading(
          false
        );
      }
    };
  /* =====================================================
     REFRESH ROUTE
  ===================================================== */
  const refreshRoute =
    () => {
      if (
        !Number.isFinite(
          Number(
            hotelLatitude
          )
        ) ||
        !Number.isFinite(
          Number(
            hotelLongitude
          )
        )
      ) {
        if (
          hotelLocation.trim()
        ) {
          geocodeHotel(
            hotelLocation
          );
        } else {
          setRouteError(
            "Enter hotel location first."
          );
        }
        return;
      }
      if (
        !Number.isFinite(
          Number(
            airportLatitude
          )
        ) ||
        !Number.isFinite(
          Number(
            airportLongitude
          )
        )
      ) {
        setRouteError(
          "Get flight details first."
        );
        return;
      }
      calculateRoute(
        Number(
          hotelLatitude
        ),
        Number(
          hotelLongitude
        ),
        Number(
          airportLatitude
        ),
        Number(
          airportLongitude
        )
      );
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
      setDepartureAirport(
        "Visakhapatnam Airport (VTZ)"
      );
      setFlightNumber("");
      setAirline("");
      setFlightStatus(
        "Waiting"
      );
      setDepartureDate("");
      setDepartureTime("");
      setTerminal("");
      setGate("");
      setHotelLocation(
        "Oceanview Palace Hotel, Rushikonda"
      );
      setHotelContact(
        "Rohit Sharma"
      );
      setContactMobile(
        "+91 98765 43210"
      );
      setRoomNumber(
        "205"
      );
      setPassengers(
        "2 Adults, 1 Child"
      );
      setLuggage(
        "2 Large, 1 Small"
      );
      setPickupTime("");
      setSpecialInstructions("");
      setAirportLatitude(
        null
      );
      setAirportLongitude(
        null
      );
      setHotelLatitude(
        null
      );
      setHotelLongitude(
        null
      );
      setRouteDistanceKm(
        0
      );
      setRouteDuration(
        ""
      );
      setRouteLoading(
        false
      );
      setRouteError(
        ""
      );
      setFlightLoading(
        false
      );
      setFlightError(
        ""
      );
      setLastUpdated(
        ""
      );
      setLocationLoading(
        false
      );
      setLocationError(
        ""
      );
      setRequirements({
        meetGreet: true,
        babySeat: false,
        extraLuggage: false,
        femaleDriver: false,
      });
    };
  /* =====================================================
     SAVE
  ===================================================== */
  const handleContinue =
    () => {
      if (!flightNumber) {
        alert(
          "Please enter flight number."
        );
        return;
      }
      if (!departureDate) {
        alert(
          "Please select departure date."
        );
        return;
      }
      if (
        !hotelLocation.trim()
      ) {
        alert(
          "Please enter hotel pickup location."
        );
        return;
      }
      if (
        !routeDistanceKm ||
        routeDistanceKm <= 0
      ) {
        alert(
          "Please calculate the hotel to airport route first."
        );
        return;
      }
      const bookingData = {
        serviceType:
          "Airport Drop",
        departureAirport,
        flightNumber,
        airline,
        flightStatus,
        departureDate,
        departureTime,
        terminal,
        gate,
        airportCoordinates: {
          latitude:
            airportLatitude,
          longitude:
            airportLongitude,
        },
        hotelLocation,
        hotelCoordinates: {
          latitude:
            hotelLatitude,
          longitude:
            hotelLongitude,
        },
        hotelContact,
        contactMobile,
        roomNumber,
        passengers,
        luggage,
        pickupTime,
        specialInstructions,
        requirements,
        route: {
          from:
            "Hotel",
          to:
            "Airport",
          distanceKm:
            routeDistanceKm,
          duration:
            routeDuration,
          ratePerKm:
            RATE_PER_KM,
        },
        fare: {
          distanceFare,
          airportParking:
            AIRPORT_PARKING,
          driverAllowance:
            DRIVER_ALLOWANCE,
          waitingCharges:
            WAITING_CHARGES,
          meetGreet:
            MEET_GREET_CHARGE,
          babySeatCharge,
          extraLuggageCharge,
          femaleDriverCharge,
          gst,
          subtotal,
          hotelCommission,
          grandTotal,
        },
      };
      console.log(
        "AIRPORT DROP BOOKING:",
        bookingData
      );
      alert(
        "Airport Drop details saved successfully."
      );
    };
  /* =====================================================
     RETURN
  ===================================================== */
  return (
    <div
      className="airport-page"
      style={{
        backgroundImage:
          `url(${airportBg})`,
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
              Airport Drop Booking
            </h1>
            <div className="breadcrumbs">
              <span>
                Dashboard
              </span>
              <b>›</b>
              <span>
                New Booking
              </span>
              <b>›</b>
              <strong>
                Airport Drop
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
                    name="plane"
                    size={21}
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
                  FLIGHT DETAILS
              ================================================= */}
              <section className="form-section">
                <div className="section-heading">
                  <Icon
                    name="plane"
                    size={21}
                  />
                  <h2>
                    Flight Details
                  </h2>
                </div>
                <div className="trip-fields">
                  <InputField
                    label="Departure Airport"
                    required
                    value={
                      departureAirport
                    }
                    setValue={
                      setDepartureAirport
                    }
                    icon="plane"
                  />
                  {/* FLIGHT NUMBER */}
                  <div className="ap-field">
                    <label>
                      Flight Number
                      <span className="required">
                        *
                      </span>
                    </label>
                    <div className="flight-number-input">
                      <div className="ap-input">
                        <input
                          type="text"
                          value={
                            flightNumber
                          }
                          onChange={(e) =>
                            setFlightNumber(
                              e.target.value
                                .replace(
                                  /\s+/g,
                                  ""
                                )
                                .toUpperCase()
                            )
                          }
                          placeholder="Example: 6E5248"
                          autoComplete="off"
                        />
                      </div>
                      <button
                        type="button"
                        className="get-flight-btn"
                        onClick={
                          getFlightDetails
                        }
                        disabled={
                          flightLoading
                        }
                      >
                        {flightLoading
                          ? "GET..."
                          : "GET"}
                      </button>
                    </div>
                  </div>
                  {/* DATE */}
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
                  <InputField
                    label="Airline"
                    value={
                      airline
                    }
                    setValue={
                      setAirline
                    }
                    placeholder="Airline"
                    readOnly
                  />
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
                  <InputField
                    label="Terminal"
                    value={
                      terminal
                    }
                    setValue={
                      setTerminal
                    }
                    placeholder="Terminal"
                    readOnly
                  />
                  <InputField
                    label="Gate"
                    value={
                      gate
                    }
                    setValue={
                      setGate
                    }
                    placeholder="Gate"
                    readOnly
                  />
                  <InputField
                    label="Flight Status"
                    value={
                      flightStatus
                    }
                    setValue={
                      setFlightStatus
                    }
                    placeholder="Status"
                    readOnly
                  />
                </div>
                {flightError && (
                  <div className="flight-error">
                    {flightError}
                  </div>
                )}
              </section>
              {/* =================================================
                  HOTEL PICKUP
              ================================================= */}
              <section className="form-section">
                <h2 className="sub-heading">
                  Hotel Pickup Location
                </h2>
                <div className="drop-fields">
                  <div className="ap-field">
                    <label>
                      Hotel Pickup Location
                      <span className="required">
                        *
                      </span>
                    </label>
                    <div className="location-input">
                      <div className="ap-input">
                        <span className="input-icon">
                          <Icon
                            name="location"
                            size={18}
                          />
                        </span>
                        <input
                          type="text"
                          value={
                            hotelLocation
                          }
                          onChange={(e) =>
                            setHotelLocation(
                              e.target.value
                            )
                          }
                          onBlur={
                            handleHotelBlur
                          }
                          placeholder="Enter hotel address"
                          autoComplete="off"
                        />
                      </div>
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
                          name="target"
                          size={18}
                        />
                        {locationLoading
                          ? "..."
                          : "Current"}
                      </button>
                    </div>
                  </div>
                  <InputField
                    label="Hotel Contact Person"
                    required
                    value={
                      hotelContact
                    }
                    setValue={
                      setHotelContact
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
                  <InputField
                    label="Room Number"
                    value={
                      roomNumber
                    }
                    setValue={
                      setRoomNumber
                    }
                    placeholder="Optional"
                  />
                </div>
                {locationError && (
                  <div className="location-error">
                    {locationError}
                  </div>
                )}
              </section>
              {/* =================================================
                  ROUTE
              ================================================= */}
              <section className="form-section route-section">
                <div className="route-heading">
                  <div className="route-title">
                    <Icon
                      name="route"
                      size={21}
                    />
                    <h2>
                      Hotel to Airport Route
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="refresh-route-btn"
                    onClick={
                      refreshRoute
                    }
                    disabled={
                      routeLoading
                    }
                  >
                    <Icon
                      name="refresh"
                      size={16}
                    />
                    {routeLoading
                      ? "Calculating..."
                      : "Calculate Route"}
                  </button>
                </div>
                <div className="route-info">
                  <div className="route-point">
                    <span className="route-dot hotel-dot" />
                    <div>
                      <small>
                        From
                      </small>
                      <strong>
                        {hotelLocation}
                      </strong>
                    </div>
                  </div>
                  <div className="route-arrow">
                    →
                  </div>
                  <div className="route-point">
                    <span className="route-dot airport-dot" />
                    <div>
                      <small>
                        To
                      </small>
                      <strong>
                        {departureAirport}
                      </strong>
                    </div>
                  </div>
                </div>
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
                  {routeDistanceKm}
                </span>
                <span
                  className="hidden-route-duration"
                  aria-hidden="true"
                >
                  {routeDuration}
                </span>
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
                    label="Luggage"
                    value={
                      luggage
                    }
                    setValue={
                      setLuggage
                    }
                    icon="bag"
                  />
                  <InputField
                    label="Pickup Time"
                    required
                    value={
                      pickupTime
                    }
                    setValue={
                      setPickupTime
                    }
                    icon="clock"
                    type="time"
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
                    price={0}
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
                    price={100}
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
                    price={100}
                    requirements={
                      requirements
                    }
                    toggleRequirement={
                      toggleRequirement
                    }
                  />
                  <Requirement
                    name="femaleDriver"
                    label="Female Driver"
                    price={150}
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
                  INSTRUCTIONS
              ================================================= */}
              <section className="form-section">
                <h2 className="sub-heading">
                  Special Instructions
                </h2>
                <InputField
                  label="Instructions for Driver"
                  value={
                    specialInstructions
                  }
                  setValue={
                    setSpecialInstructions
                  }
                  placeholder="Any special instructions for driver..."
                />
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
            {/* FLIGHT */}
            <div className="summary-card">
              <div className="summary-header">
                <h3>
                  Flight Status
                </h3>
                <span className="status-badge">
                  {flightStatus}
                </span>
              </div>
              <div className="flight-summary">
                <div className="flight-title">
                  <Icon
                    name="plane"
                    size={23}
                  />
                  <strong>
                    {airline ||
                      "Airline"}
                    {flightNumber
                      ? ` (${flightNumber})`
                      : ""}
                  </strong>
                </div>
                <div className="flight-route">
                  <div className="flight-place">
                    <span>
                      Hotel Pickup
                    </span>
                    <strong>
                      {hotelLocation}
                    </strong>
                  </div>
                  <div className="route-arrow">
                    →
                  </div>
                  <div className="flight-place">
                    <span>
                      Airport
                    </span>
                    <strong>
                      {departureAirport}
                    </strong>
                    <b>
                      {departureTime ||
                        "--:--"}
                    </b>
                  </div>
                </div>
                {terminal && (
                  <div className="flight-meta">
                    <span>
                      Terminal
                    </span>
                    <strong>
                      {terminal}
                    </strong>
                  </div>
                )}
                {gate && (
                  <div className="flight-meta">
                    <span>
                      Gate
                    </span>
                    <strong>
                      {gate}
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
                      refreshFlight
                    }
                    disabled={
                      flightLoading
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
            {/* ROUTE SUMMARY */}
            <div className="summary-card">
              <h3 className="fare-title">
                Route & Distance
                <span>
                  OSRM
                </span>
              </h3>
              <div className="route-summary">
                <div>
                  <span>
                    Route
                  </span>
                  <strong>
                    Hotel → Airport
                  </strong>
                </div>
                <div>
                  <span>
                    Road Distance
                  </span>
                  <strong>
                    {routeDistanceKm > 0
                      ? `${routeDistanceKm.toFixed(
                          2
                        )} km`
                      : "--"}
                  </strong>
                </div>
                <div>
                  <span>
                    Estimated Road Time
                  </span>
                  <strong>
                    {routeDuration ||
                      "--"}
                  </strong>
                </div>
                <div>
                  <span>
                    Rate
                  </span>
                  <strong>
                    ₹25.50 / km
                  </strong>
                </div>
              </div>
            </div>
            {/* FARE */}
            <div className="summary-card">
              <h3 className="fare-title">
                Fare Summary
                <span>
                  Estimation
                </span>
              </h3>
              <SummaryRow
                label="Distance Fare"
                value={
                  distanceFare
                }
              />
              <SummaryRow
                label="Airport Parking"
                value={
                  AIRPORT_PARKING
                }
              />
              <SummaryRow
                label="Driver Allowance"
                value={
                  DRIVER_ALLOWANCE
                }
              />
              <SummaryRow
                label="Waiting Charges"
                value={
                  WAITING_CHARGES
                }
              />
              <SummaryRow
                label="Meet & Greet"
                value={
                  MEET_GREET_CHARGE
                }
              />
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
              {femaleDriverCharge > 0 && (
                <SummaryRow
                  label="Female Driver"
                  value={
                    femaleDriverCharge
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
              {/* SUBTOTAL 16PX BOLD */}
              <div className="subtotal-row">
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
            {/* EARNINGS */}
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
            {/* NOTE */}
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
                Meet & Greet is included
                at no additional charge.
                Driver pickup time should
                be scheduled according to
                the flight departure time.
                Additional waiting time
                will be charged according
                to policy.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
export default AirportDrop;