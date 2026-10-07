import React, {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import {
  FaChevronRight,
  FaChevronDown,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaRoute,
  FaConciergeBell,
  FaHeadset,
  FaComments,
  FaShieldAlt,
  FaArrowRight,
  FaSave,
  FaCheckCircle,
  FaGift,
  FaPhoneAlt,
  FaSearch,
  FaSpinner,
  FaExclamationTriangle
} from "react-icons/fa";

import "./mdt.css";

/* =====================================================
   CONFIGURATION
===================================================== */

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search";

const NOMINATIM_REVERSE_URL =
  "https://nominatim.openstreetmap.org/reverse";

const OSRM_URL =
  "https://router.project-osrm.org/route/v1/driving";

const FARE_PER_KM = 30;
const DRIVER_ALLOWANCE_PER_DAY = 1000;
const HOTEL_COMMISSION_PERCENT = 10;
const GST_PERCENT = 5;

/* =====================================================
   INITIAL FORM
===================================================== */

const initialForm = {
  startDate: "2025-05-25",
  endDate: "2025-05-28",

  fromCity:
    "Visakhapatnam, Andhra Pradesh",

  fromLat: 17.6868,
  fromLng: 83.2185,

  destination:
    "Araku Valley, Andhra Pradesh",

  destinationLat: 18.3273,
  destinationLng: 82.8765,

  via: "",

  distance: "",
  routeDuration: "",

  pickupDate: "2025-05-25",
  pickupTime: "06:30",

  returnDate: "2025-05-28",
  returnTime: "18:00",

  nightHalt:
    "Yes, Driver Stay Required",

  driverAllowance:
    "₹ 1,000 / Day",

  tollParking:
    "To be paid by Hotel",

  statePermit:
    "Required",

  specialInstructions: ""
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

function MultiDayTour() {
  const [form, setForm] =
    useState(initialForm);

  const [activeStep, setActiveStep] =
    useState(1);

  const [routeLoading, setRouteLoading] =
    useState(false);

  const [routeError, setRouteError] =
    useState("");

  /* ===================================================
     PASSENGERS
  =================================================== */

  const passengers = {
    adults: 2,
    children: 1
  };

  /* ===================================================
     DURATION
  =================================================== */

  const duration = useMemo(() => {
    if (
      !form.startDate ||
      !form.endDate ||
      !form.pickupTime ||
      !form.returnTime
    ) {
      return {
        days: 0,
        nights: 0,
        totalHours: 0,
        label: "Select dates and times",
        valid: false
      };
    }

    const start =
      new Date(
        `${form.startDate}T${form.pickupTime}:00`
      );

    const end =
      new Date(
        `${form.endDate}T${form.returnTime}:00`
      );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return {
        days: 0,
        nights: 0,
        totalHours: 0,
        label: "Invalid date/time",
        valid: false
      };
    }

    const difference =
      end.getTime() -
      start.getTime();

    if (difference < 0) {
      return {
        days: 0,
        nights: 0,
        totalHours: 0,
        label:
          "Return must be after pickup",
        valid: false
      };
    }

    const totalHours =
      difference /
      (1000 * 60 * 60);

    const days =
      Math.max(
        1,
        Math.ceil(
          totalHours / 24
        )
      );

    const nights =
      totalHours > 12
        ? Math.ceil(
            (totalHours - 12) / 24
          )
        : 0;

    const label =
      `${days} Day${
        days !== 1 ? "s" : ""
      } / ` +
      `${nights} Night${
        nights !== 1 ? "s" : ""
      }`;

    return {
      days,
      nights,
      totalHours,
      label,
      valid: true
    };
  }, [
    form.startDate,
    form.endDate,
    form.pickupTime,
    form.returnTime
  ]);

  /* ===================================================
     PRICING
  =================================================== */

  const pricing = useMemo(() => {
    const distanceKm =
      Number(form.distance) || 0;

    const baseFare =
      distanceKm *
      FARE_PER_KM;

    const driverAllowance =
      duration.days *
      DRIVER_ALLOWANCE_PER_DAY;

    const tollParking = 800;
    const statePermit = 500;

    const subtotal =
      baseFare +
      driverAllowance +
      tollParking +
      statePermit;

    const gst =
      subtotal *
      (GST_PERCENT / 100);

    const commission =
      subtotal *
      (HOTEL_COMMISSION_PERCENT / 100);

    const grandTotal =
      subtotal +
      gst -
      commission;

    return {
      farePerKm: FARE_PER_KM,
      distanceKm,
      baseFare,
      driverAllowancePerDay:
        DRIVER_ALLOWANCE_PER_DAY,
      driverAllowance,
      tollParking,
      statePermit,
      subtotal,
      gst,
      commission,
      grandTotal
    };
  }, [
    form.distance,
    duration.days
  ]);

  /* ===================================================
     UPDATE FIELD
  =================================================== */

  const updateField =
    (field, value) => {
      setForm(previous => ({
        ...previous,
        [field]: value
      }));
    };

  /* ===================================================
     CLEAR ROUTE
  =================================================== */

  const clearRoute = () => {
    setForm(previous => ({
      ...previous,
      distance: "",
      routeDuration: ""
    }));

    setRouteError("");
  };

  /* ===================================================
     START DATE
  =================================================== */

  const handleStartDateChange =
    value => {
      setForm(previous => ({
        ...previous,
        startDate: value,
        pickupDate: value
      }));
    };

  /* ===================================================
     END DATE
  =================================================== */

  const handleEndDateChange =
    value => {
      setForm(previous => ({
        ...previous,
        endDate: value,
        returnDate: value
      }));
    };

  /* ===================================================
     PICKUP TIME
  =================================================== */

  const handlePickupTimeChange =
    value => {
      setForm(previous => ({
        ...previous,
        pickupTime: value
      }));
    };

  /* ===================================================
     RETURN TIME
  =================================================== */

  const handleReturnTimeChange =
    value => {
      setForm(previous => ({
        ...previous,
        returnTime: value
      }));
    };

  /* ===================================================
     FROM LOCATION SELECT
  =================================================== */

  const handleFromLocation =
    place => {
      const latitude =
        Number(place.lat);

      const longitude =
        Number(place.lon);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        setRouteError(
          "Selected From address does not have valid coordinates."
        );

        return;
      }

      setForm(previous => ({
        ...previous,

        fromCity:
          place.display_name,

        fromLat:
          latitude,

        fromLng:
          longitude,

        distance: "",
        routeDuration: ""
      }));

      setRouteError("");
    };

  /* ===================================================
     FROM LOCATION EDIT
  =================================================== */

  const handleFromInputChange =
    () => {
      setForm(previous => ({
        ...previous,

        fromLat: "",
        fromLng: "",

        distance: "",
        routeDuration: ""
      }));

      setRouteError("");
    };

  /* ===================================================
     DESTINATION SELECT
  =================================================== */

  const handleDestinationLocation =
    place => {
      const latitude =
        Number(place.lat);

      const longitude =
        Number(place.lon);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        setRouteError(
          "Selected destination does not have valid coordinates."
        );

        return;
      }

      setForm(previous => ({
        ...previous,

        destination:
          place.display_name,

        destinationLat:
          latitude,

        destinationLng:
          longitude,

        distance: "",
        routeDuration: ""
      }));

      setRouteError("");
    };

  /* ===================================================
     DESTINATION EDIT
  =================================================== */

  const handleDestinationInputChange =
    () => {
      setForm(previous => ({
        ...previous,

        destinationLat: "",
        destinationLng: "",

        distance: "",
        routeDuration: ""
      }));

      setRouteError("");
    };

  /* ===================================================
     OSRM ROUTING
  =================================================== */

  useEffect(() => {
    const fromLat =
      Number(form.fromLat);

    const fromLng =
      Number(form.fromLng);

    const destinationLat =
      Number(form.destinationLat);

    const destinationLng =
      Number(form.destinationLng);

    /*
     * Do not route until both
     * locations have coordinates.
     */
    if (
      !Number.isFinite(fromLat) ||
      !Number.isFinite(fromLng) ||
      !Number.isFinite(destinationLat) ||
      !Number.isFinite(destinationLng)
    ) {
      setRouteLoading(false);
      return;
    }

    /*
     * Same location.
     */
    if (
      fromLat === destinationLat &&
      fromLng === destinationLng
    ) {
      setForm(previous => ({
        ...previous,
        distance: "0",
        routeDuration: "0 min"
      }));

      setRouteLoading(false);
      setRouteError("");

      return;
    }

    const controller =
      new AbortController();

    const calculateRoute =
      async () => {
        setRouteLoading(true);
        setRouteError("");

        try {
          const coordinates =
            `${fromLng},${fromLat};` +
            `${destinationLng},${destinationLat}`;

          const params =
            new URLSearchParams({
              overview: "false",
              steps: "false",
              alternatives: "false"
            });

          const response =
            await fetch(
              `${OSRM_URL}/${coordinates}?${params.toString()}`,
              {
                signal:
                  controller.signal
              }
            );

          if (!response.ok) {
            throw new Error(
              "Unable to calculate driving route."
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
              "No driving route found between these addresses."
            );
          }

          const route =
            data.routes[0];

          const distanceKm =
            route.distance / 1000;

          const durationMinutes =
            route.duration / 60;

          if (
            controller.signal.aborted
          ) {
            return;
          }

          setForm(previous => ({
            ...previous,

            distance:
              distanceKm.toFixed(1),

            routeDuration:
              formatRouteDuration(
                durationMinutes
              )
          }));

          setRouteError("");
        } catch (error) {
          if (
            error.name ===
            "AbortError"
          ) {
            return;
          }

          setForm(previous => ({
            ...previous,
            distance: "",
            routeDuration: ""
          }));

          setRouteError(
            error.message ||
            "Unable to calculate route."
          );
        } finally {
          if (
            !controller.signal.aborted
          ) {
            setRouteLoading(false);
          }
        }
      };

    calculateRoute();

    return () => {
      controller.abort();
    };
  }, [
    form.fromLat,
    form.fromLng,
    form.destinationLat,
    form.destinationLng
  ]);

  /* ===================================================
     CONTINUE
  =================================================== */

  const handleContinue =
    () => {
      if (
        !duration.valid
      ) {
        alert(
          "Please select a valid pickup and return date/time."
        );

        return;
      }

      if (
        !Number.isFinite(
          Number(form.fromLat)
        ) ||
        !Number.isFinite(
          Number(form.fromLng)
        )
      ) {
        alert(
          "Please select a valid From address from the suggestions."
        );

        return;
      }

      if (
        !Number.isFinite(
          Number(form.destinationLat)
        ) ||
        !Number.isFinite(
          Number(form.destinationLng)
        )
      ) {
        alert(
          "Please select a valid destination from the suggestions."
        );

        return;
      }

      if (routeLoading) {
        alert(
          "Please wait while the road distance is calculated."
        );

        return;
      }

      if (
        !form.distance ||
        Number(form.distance) <= 0
      ) {
        alert(
          "Unable to calculate route distance. Please select both addresses again."
        );

        return;
      }

      setActiveStep(previous =>
        Math.min(
          previous + 1,
          5
        )
      );
    };

  /* ===================================================
     SAVE DRAFT
  =================================================== */

  const handleSaveDraft =
    () => {
      localStorage.setItem(
        "zestgo_multi_day_tour_draft",
        JSON.stringify(form)
      );

      alert(
        "Booking saved as draft."
      );
    };

  /* ===================================================
     FORMAT DATE
  =================================================== */

  const formatDate =
    dateString => {
      if (!dateString) {
        return "-";
      }

      const date =
        new Date(
          `${dateString}T00:00:00`
        );

      if (
        Number.isNaN(
          date.getTime()
        )
      ) {
        return dateString;
      }

      return date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      );
    };

  /* ===================================================
     FORMAT TIME
  =================================================== */

  const formatTime =
    timeString => {
      if (!timeString) {
        return "-";
      }

      const [
        hours,
        minutes
      ] =
        timeString.split(":");

      const date =
        new Date();

      date.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
      );

      return date.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }
      );
    };

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div className="zestgo-page">
      <main className="zestgo-main">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="page-hero">
          <div className="hero-overlay" />

          <div className="breadcrumb">
            <span>
              New Booking
            </span>

            <FaChevronRight />

            <strong>
              Multi Day Tour
            </strong>
          </div>

          <h1>
            Multi Day Tour
          </h1>
        </section>

        {/* =================================================
            BOOKING AREA
        ================================================= */}

        <section className="booking-wrapper">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="booking-left">

            {/* =================================================
                STEPPER
            ================================================= */}

            <div className="stepper">

              <Step
                number="1"
                title="Trip Details"
                active={
                  activeStep === 1
                }
                completed={
                  activeStep > 1
                }
              />

              <div className="step-line" />

              <Step
                number="2"
                title="Vehicle Selection"
                active={
                  activeStep === 2
                }
                completed={
                  activeStep > 2
                }
              />

              <div className="step-line" />

              <Step
                number="3"
                title="Guest Details"
                active={
                  activeStep === 3
                }
                completed={
                  activeStep > 3
                }
              />

              <div className="step-line" />

              <Step
                number="4"
                title="Fare & Payment"
                active={
                  activeStep === 4
                }
                completed={
                  activeStep > 4
                }
              />

              <div className="step-line" />

              <Step
                number="5"
                title="Confirmation"
                active={
                  activeStep === 5
                }
                completed={false}
              />

            </div>

            {/* =================================================
                FORM CARD
            ================================================= */}

            <div className="form-card">

              <SectionHeading
                icon={
                  <FaRoute />
                }
                title="Trip Information"
              />

              {/* =================================================
                  DATES
              ================================================= */}

              <div className="trip-top-row">

                <div className="field-group date-range-field">

                  <label>
                    Multi Day Tour Dates
                  </label>

                  <div className="date-range-box">

                    <FaCalendarAlt />

                    <input
                      type="date"
                      value={
                        form.startDate
                      }
                      onChange={
                        event =>
                          handleStartDateChange(
                            event.target.value
                          )
                      }
                    />

                    <span>
                      To
                    </span>

                    <input
                      type="date"
                      min={
                        form.startDate
                      }
                      value={
                        form.endDate
                      }
                      onChange={
                        event =>
                          handleEndDateChange(
                            event.target.value
                          )
                      }
                    />

                  </div>
                </div>

                <div
                  className={
                    duration.valid
                      ? "duration-label"
                      : "duration-label invalid"
                  }
                >
                  <FaClock />

                  <span>
                    {duration.label}
                  </span>
                </div>

              </div>

              {/* =================================================
                  LOCATION
              ================================================= */}

              <div className="form-grid two-column">

                <LocationAutocomplete
                  label="From City / Address"
                  icon={
                    <FaMapMarkerAlt />
                  }
                  value={
                    form.fromCity
                  }
                  selectedLat={
                    form.fromLat
                  }
                  selectedLng={
                    form.fromLng
                  }
                  onSelect={
                    handleFromLocation
                  }
                  onInputChange={
                    handleFromInputChange
                  }
                  showCurrentLocation={
                    true
                  }
                />

                <LocationAutocomplete
                  label="To City / Destination"
                  icon={
                    <FaMapMarkerAlt />
                  }
                  value={
                    form.destination
                  }
                  selectedLat={
                    form.destinationLat
                  }
                  selectedLng={
                    form.destinationLng
                  }
                  onSelect={
                    handleDestinationLocation
                  }
                  onInputChange={
                    handleDestinationInputChange
                  }
                />

              </div>

              {/* =================================================
                  ROUTE
              ================================================= */}

              <div className="form-grid route-grid">

                <InputField
                  label="Via / Enroute (Optional)"
                  icon={
                    <FaMapMarkerAlt />
                  }
                  value={
                    form.via
                  }
                  onChange={
                    value =>
                      updateField(
                        "via",
                        value
                      )
                  }
                />

                <div className="field-group">

                  <label>
                    Total Distance
                  </label>

                  <div className="input-wrapper">

                    <input
                      type="text"
                      value={
                        routeLoading
                          ? "Calculating route..."
                          : form.distance
                            ? `${form.distance} KM`
                            : ""
                      }
                      placeholder="Select From and To"
                      readOnly
                    />

                    <span className="input-icon">
                      {routeLoading ? (
                        <FaSpinner
                          className="route-spinner"
                        />
                      ) : (
                        <FaRoute />
                      )}
                    </span>

                  </div>

                </div>

                <div className="field-group">

                  <label>
                    Route Duration
                  </label>

                  <div className="input-wrapper">

                    <input
                      type="text"
                      value={
                        form.routeDuration ||
                        "-"
                      }
                      readOnly
                    />

                    <span className="input-icon">
                      <FaClock />
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  ROUTE ERROR
              ================================================= */}

              {routeError && (
                <div className="route-error">
                  <FaExclamationTriangle />

                  <span>
                    {routeError}
                  </span>
                </div>
              )}

              {/* =================================================
                  ROUTE SUCCESS
              ================================================= */}

              {!routeLoading &&
                !routeError &&
                form.distance && (
                  <div className="route-success">

                    <FaCheckCircle />

                    <span>
                      Driving route calculated:
                      {" "}

                      <strong>
                        {form.distance} KM
                      </strong>

                      {" "}•

                      <strong>
                        {form.routeDuration}
                      </strong>

                      {" "}•

                      ₹{FARE_PER_KM}/KM
                    </span>

                  </div>
                )}

              {/* =================================================
                  PICKUP / RETURN
              ================================================= */}

              <div className="form-grid four-column">

                <div className="field-group">

                  <label>
                    Pickup Date
                  </label>

                  <div className="input-wrapper">

                    <input
                      type="date"
                      value={
                        form.pickupDate
                      }
                      readOnly
                    />

                    <span className="input-icon">
                      <FaCalendarAlt />
                    </span>

                  </div>

                </div>

                <div className="field-group">

                  <label>
                    Pickup Time
                  </label>

                  <div className="input-wrapper">

                    <input
                      type="time"
                      value={
                        form.pickupTime
                      }
                      onChange={
                        event =>
                          handlePickupTimeChange(
                            event.target.value
                          )
                      }
                    />

                    <span className="input-icon">
                      <FaClock />
                    </span>

                  </div>

                </div>

                <div className="field-group">

                  <label>
                    Return Date
                  </label>

                  <div className="input-wrapper">

                    <input
                      type="date"
                      value={
                        form.returnDate
                      }
                      min={
                        form.startDate
                      }
                      readOnly
                    />

                    <span className="input-icon">
                      <FaCalendarAlt />
                    </span>

                  </div>

                </div>

                <div className="field-group">

                  <label>
                    Return Time
                  </label>

                  <div className="input-wrapper">

                    <input
                      type="time"
                      value={
                        form.returnTime
                      }
                      onChange={
                        event =>
                          handleReturnTimeChange(
                            event.target.value
                          )
                      }
                    />

                    <span className="input-icon">
                      <FaClock />
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  HIDDEN DURATION
              ================================================= */}

              {duration.valid && (
                <div
                  className="trip-time-info"
                  hidden
                >
                  <FaClock />

                  <span>
                    Actual Trip Duration:
                    {" "}

                    <strong>
                      {formatHours(
                        duration.totalHours
                      )}
                    </strong>
                  </span>
                </div>
              )}

              {duration.valid && (
                <div
                  className="duration-rule-info"
                  hidden
                >
                  <FaCheckCircle />

                  <span>
                    Billing Duration:
                    {" "}

                    <strong>
                      {duration.label}
                    </strong>

                    {" "}•

                    Driver allowance:
                    {" "}

                    <strong>
                      ₹
                      {formatMoney(
                        pricing.driverAllowance
                      )}
                    </strong>
                  </span>
                </div>
              )}

              <div className="section-divider" />

              {/* =================================================
                  TRIP PREFERENCES
              ================================================= */}

              <SectionHeading
                icon={
                  <FaConciergeBell />
                }
                title="Trip Preferences"
              />

              <div className="form-grid four-column">

                <SelectField
                  label="Night Halt"
                  value={
                    form.nightHalt
                  }
                  options={[
                    "Yes, Driver Stay Required",
                    "No Driver Stay Required"
                  ]}
                  onChange={
                    value =>
                      updateField(
                        "nightHalt",
                        value
                      )
                  }
                />

                <div className="field-group">

                  <label>
                    Driver Allowance
                  </label>

                  <div className="input-wrapper">

                    <input
                      type="text"
                      value="₹ 1,000 / Day"
                      readOnly
                    />

                  </div>

                </div>

                <SelectField
                  label="Toll & Parking"
                  value={
                    form.tollParking
                  }
                  options={[
                    "To be paid by Hotel",
                    "Included in Fare",
                    "Pay Directly by Guest"
                  ]}
                  onChange={
                    value =>
                      updateField(
                        "tollParking",
                        value
                      )
                  }
                />

                <SelectField
                  label="State Permit"
                  value={
                    form.statePermit
                  }
                  options={[
                    "Required",
                    "Not Required"
                  ]}
                  onChange={
                    value =>
                      updateField(
                        "statePermit",
                        value
                      )
                  }
                />

              </div>

              {/* =================================================
                  SPECIAL INSTRUCTIONS
              ================================================= */}

              <div className="field-group special-field">

                <label>
                  Special Instructions (Optional)
                </label>

                <textarea
                  maxLength="250"
                  placeholder="Any special requests for this trip..."
                  value={
                    form.specialInstructions
                  }
                  onChange={
                    event =>
                      updateField(
                        "specialInstructions",
                        event.target.value
                      )
                  }
                />

                <span className="character-count">
                  {
                    form.specialInstructions
                      .length
                  }
                  /250
                </span>

              </div>

            </div>
          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside className="booking-summary">

            <h2>
              Booking Summary
            </h2>

            <SummaryRow
              label="Service Type"
              value="Multi Day Tour"
            />

            <SummaryRow
              label="From"
              value={
                form.fromCity
              }
            />

            <SummaryRow
              label="To"
              value={
                form.destination
              }
            />

            <SummaryRow
              label="Tour Dates"
              value={
                `${formatDate(
                  form.startDate
                )} to ${formatDate(
                  form.endDate
                )}`
              }
            />

            <SummaryRow
              label="Pickup"
              value={
                `${formatDate(
                  form.startDate
                )} • ${formatTime(
                  form.pickupTime
                )}`
              }
            />

            <SummaryRow
              label="Return"
              value={
                `${formatDate(
                  form.endDate
                )} • ${formatTime(
                  form.returnTime
                )}`
              }
            />

            <SummaryRow
              label="Billing Duration"
              value={
                duration.label
              }
            />

            <SummaryRow
              label="Actual Duration"
              value={
                duration.valid
                  ? formatHours(
                      duration.totalHours
                    )
                  : "-"
              }
            />

            <SummaryRow
              label="Road Distance"
              value={
                form.distance
                  ? `${form.distance} KM`
                  : "-"
              }
            />

            <SummaryRow
              label="Route Duration"
              value={
                form.routeDuration ||
                "-"
              }
            />

            <SummaryRow
              label="Fare Per KM"
              value={
                `₹${FARE_PER_KM}/KM`
              }
            />

            <SummaryRow
              label="Passengers"
              value={
                `${passengers.adults} Adults, ${passengers.children} Child`
              }
            />

            {/* =================================================
                FARE BREAKDOWN
            ================================================= */}

            <div className="fare-box">

              <h3>
                Fare Breakdown (Estimated)
              </h3>

              <FareRow
                label={
                  `${pricing.distanceKm || 0} KM × ₹${FARE_PER_KM}/KM`
                }
                value={
                  pricing.baseFare
                }
              />

              <FareRow
                label={
                  `Driver Allowance (${duration.days} Days × ₹${DRIVER_ALLOWANCE_PER_DAY})`
                }
                value={
                  pricing.driverAllowance
                }
              />

              <FareRow
                label="Toll & Parking (Estimated)"
                value={
                  pricing.tollParking
                }
              />

              <FareRow
                label="State Permit"
                value={
                  pricing.statePermit
                }
              />

              <FareRow
                label="GST (5%)"
                value={
                  pricing.gst
                }
              />

              <div className="fare-divider" />

              <FareRow
                label="Subtotal"
                value={
                  pricing.subtotal
                }
              />

              <FareRow
                label="Hotel Commission (10%)"
                value={
                  -pricing.commission
                }
                commission
              />

              <div className="grand-total">

                <span>
                  Grand Total
                </span>

                <strong>
                  ₹
                  {formatMoney(
                    pricing.grandTotal
                  )}
                </strong>

              </div>

            </div>

            {/* =================================================
                COMMISSION
            ================================================= */}

            <div className="commission-box">

              <div className="commission-title">

                <div className="commission-icon">
                  <FaGift />
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
                  ₹
                  {formatMoney(
                    pricing.commission
                  )}
                </strong>{" "}
                on this booking.
              </p>

            </div>

            {/* =================================================
                CONTINUE
            ================================================= */}

            <button
              type="button"
              className="continue-button"
              onClick={
                handleContinue
              }
              disabled={
                routeLoading
              }
            >
              {routeLoading
                ? "Calculating Route..."
                : "Continue to Vehicle Selection"}

              {routeLoading ? (
                <FaSpinner
                  className="route-spinner"
                />
              ) : (
                <FaArrowRight />
              )}
            </button>

            {/* =================================================
                SAVE
            ================================================= */}

            <button
              type="button"
              className="draft-button"
              onClick={
                handleSaveDraft
              }
            >
              <FaSave />

              Save as Draft
            </button>

            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="secure-note">

              <FaShieldAlt />

              <span>
                Your booking details are safe and secure
              </span>

            </div>

          </aside>
        </section>

        {/* =================================================
            SUPPORT
        ================================================= */}

        <section className="support-bar">

          <div className="support-main">

            <div className="support-headset">
              <FaHeadset />
            </div>

            <div>
              <strong>
                Need Help?
              </strong>

              <span>
                Our travel experts are available 24/7 for you.
              </span>
            </div>

          </div>

          <div className="support-option">

            <div className="support-icon">
              <FaPhoneAlt />
            </div>

            <div>
              <strong>
                +91 98765 43210
              </strong>

              <span>
                Call Support
              </span>
            </div>

          </div>

          <div className="support-option">

            <div className="support-icon">
              <FaComments />
            </div>

            <div>
              <strong>
                Live Chat
              </strong>

              <span>
                Chat with us
              </span>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

/* =====================================================
   LOCATION AUTOCOMPLETE
===================================================== */

function LocationAutocomplete({
  label,
  value,
  icon,
  selectedLat,
  selectedLng,
  onSelect,
  onInputChange,
  showCurrentLocation = false
}) {
  const [inputValue, setInputValue] =
    useState(value || "");

  const [suggestions, setSuggestions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    showSuggestions,
    setShowSuggestions
  ] = useState(false);

  const [
    selectedAddress,
    setSelectedAddress
  ] = useState(
    Number.isFinite(
      Number(selectedLat)
    ) &&
    Number.isFinite(
      Number(selectedLng)
    )
  );

  const debounceRef =
    useRef(null);

  const abortControllerRef =
    useRef(null);

  const containerRef =
    useRef(null);

  /* ===================================================
     SYNC VALUE
  =================================================== */

  useEffect(() => {
    setInputValue(
      value || ""
    );

    setSelectedAddress(
      Number.isFinite(
        Number(selectedLat)
      ) &&
      Number.isFinite(
        Number(selectedLng)
      )
    );
  }, [
    value,
    selectedLat,
    selectedLng
  ]);

  /* ===================================================
     CLEANUP
  =================================================== */

  useEffect(() => {
    return () => {
      if (
        debounceRef.current
      ) {
        clearTimeout(
          debounceRef.current
        );
      }

      if (
        abortControllerRef.current
      ) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  /* ===================================================
     OUTSIDE CLICK
  =================================================== */

  useEffect(() => {
    const handleOutsideClick =
      event => {
        if (
          containerRef.current &&
          !containerRef.current.contains(
            event.target
          )
        ) {
          setShowSuggestions(
            false
          );
        }
      };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* ===================================================
     SEARCH ADDRESS
  =================================================== */

  const searchLocations =
    query => {
      const cleanQuery =
        query.trim();

      if (
        cleanQuery.length < 3
      ) {
        setSuggestions([]);
        setShowSuggestions(
          false
        );

        return;
      }

      if (
        debounceRef.current
      ) {
        clearTimeout(
          debounceRef.current
        );
      }

      debounceRef.current =
        setTimeout(
          async () => {
            if (
              abortControllerRef.current
            ) {
              abortControllerRef.current.abort();
            }

            const controller =
              new AbortController();

            abortControllerRef.current =
              controller;

            setLoading(true);
            setError("");

            try {
              const params =
                new URLSearchParams({
                  q:
                    cleanQuery,

                  format:
                    "jsonv2",

                  addressdetails:
                    "1",

                  limit:
                    "8",

                  countrycodes:
                    "in",

                  "accept-language":
                    "en",

                  dedupe:
                    "1"
                });

              const response =
                await fetch(
                  `${NOMINATIM_URL}?${params.toString()}`,
                  {
                    signal:
                      controller.signal,

                    headers: {
                      Accept:
                        "application/json"
                    }
                  }
                );

              if (
                !response.ok
              ) {
                throw new Error(
                  "Address search failed."
                );
              }

              const data =
                await response.json();

              if (
                controller.signal.aborted
              ) {
                return;
              }

              const results =
                Array.isArray(data)
                  ? data
                  : [];

              setSuggestions(
                results
              );

              setShowSuggestions(
                true
              );
            } catch (
              searchError
            ) {
              if (
                searchError.name ===
                "AbortError"
              ) {
                return;
              }

              setSuggestions([]);
              setShowSuggestions(
                false
              );

              setError(
                "Unable to load address suggestions."
              );
            } finally {
              if (
                !controller.signal.aborted
              ) {
                setLoading(
                  false
                );
              }
            }
          },
          400
        );
    };

  /* ===================================================
     INPUT CHANGE
  =================================================== */

  const handleInputChange =
    event => {
      const newValue =
        event.target.value;

      setInputValue(
        newValue
      );

      /*
       * IMPORTANT:
       * Once the user changes the text,
       * the previously selected coordinates
       * are no longer trusted.
       */
      setSelectedAddress(
        false
      );

      setSuggestions([]);
      setError("");

      if (onInputChange) {
        onInputChange(
          newValue
        );
      }

      searchLocations(
        newValue
      );
    };

  /* ===================================================
     SELECT ADDRESS
  =================================================== */

  const handleSelect =
    place => {
      const latitude =
        Number(place.lat);

      const longitude =
        Number(place.lon);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        setError(
          "This address does not have valid coordinates."
        );

        return;
      }

      const selectedPlace = {
        ...place,

        lat:
          latitude,

        lon:
          longitude
      };

      setInputValue(
        place.display_name
      );

      setSuggestions([]);

      setShowSuggestions(
        false
      );

      setError("");

      setSelectedAddress(
        true
      );

      onSelect(
        selectedPlace
      );
    };

  /* ===================================================
     CURRENT LOCATION
  =================================================== */

  const useCurrentLocation =
    () => {
      if (
        !navigator.geolocation
      ) {
        setError(
          "Current location is not supported by this browser."
        );

        return;
      }

      setLoading(true);
      setError("");
      setShowSuggestions(
        false
      );

      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            const latitude =
              position.coords.latitude;

            const longitude =
              position.coords.longitude;

            const params =
              new URLSearchParams({
                lat:
                  latitude,

                lon:
                  longitude,

                format:
                  "jsonv2",

                addressdetails:
                  "1",

                zoom:
                  "18",

                "accept-language":
                  "en"
              });

            const response =
              await fetch(
                `${NOMINATIM_REVERSE_URL}?${params.toString()}`,
                {
                  headers: {
                    Accept:
                      "application/json"
                  }
                }
              );

            if (
              !response.ok
            ) {
              throw new Error(
                "Unable to find your current address."
              );
            }

            const place =
              await response.json();

            if (
              !place.display_name
            ) {
              throw new Error(
                "Current address could not be identified."
              );
            }

            const currentPlace = {
              ...place,

              lat:
                latitude,

              lon:
                longitude
            };

            setInputValue(
              place.display_name
            );

            setSuggestions([]);

            setShowSuggestions(
              false
            );

            setSelectedAddress(
              true
            );

            onSelect(
              currentPlace
            );
          } catch (
            locationError
          ) {
            setError(
              locationError.message ||
              "Unable to get current location."
            );
          } finally {
            setLoading(
              false
            );
          }
        },

        locationError => {
          setLoading(
            false
          );

          if (
            locationError.code ===
            locationError.PERMISSION_DENIED
          ) {
            setError(
              "Location permission was denied. Please allow location access."
            );
          } else if (
            locationError.code ===
            locationError.POSITION_UNAVAILABLE
          ) {
            setError(
              "Your current location is unavailable."
            );
          } else if (
            locationError.code ===
            locationError.TIMEOUT
          ) {
            setError(
              "Location request timed out. Please try again."
            );
          } else {
            setError(
              "Unable to get current location."
            );
          }
        },

        {
          enableHighAccuracy:
            true,

          timeout:
            15000,

          maximumAge:
            30000
        }
      );
    };

  /* ===================================================
     KEYBOARD
  =================================================== */

  const handleKeyDown =
    event => {
      if (
        event.key ===
        "Escape"
      ) {
        setShowSuggestions(
          false
        );
      }

      if (
        event.key ===
        "Enter"
      ) {
        event.preventDefault();

        if (
          suggestions.length > 0
        ) {
          handleSelect(
            suggestions[0]
          );
        }
      }
    };

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div
      className="field-group location-autocomplete"
      ref={containerRef}
    >

      <label>
        {label}
      </label>

      <div
        className={
          `input-wrapper ${
            selectedAddress
              ? "address-selected"
              : ""
          }`
        }
      >

        {icon && (
          <span className="input-icon">
            {icon}
          </span>
        )}

        <input
          type="text"
          value={
            inputValue
          }
          onChange={
            handleInputChange
          }
          onFocus={() => {
            if (
              inputValue.trim()
                .length >= 3
            ) {
              searchLocations(
                inputValue
              );

              setShowSuggestions(
                true
              );
            }
          }}
          onKeyDown={
            handleKeyDown
          }
          placeholder={
            `Enter ${label.toLowerCase()}`
          }
          autoComplete="off"
          spellCheck="false"
        />

        <div className="location-actions">

          {loading ? (
            <span className="location-loading-icon">
              <FaSpinner
                className="route-spinner"
              />
            </span>
          ) : (
            <>
              {showCurrentLocation && (
                <button
                  type="button"
                  className="current-location-button"
                  onClick={
                    useCurrentLocation
                  }
                  title="Use current location"
                  aria-label="Use current location"
                >
                  <FaMapMarkerAlt />
                </button>
              )}

              <span className="location-search-icon">
                <FaSearch />
              </span>
            </>
          )}

        </div>
      </div>

      {/* =================================================
          SELECTED ADDRESS
      ================================================= */}

      {selectedAddress && (
        <div className="selected-address">
        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="location-error">

          <FaExclamationTriangle />

          <span>
            {error}
          </span>

        </div>
      )}

      {/* =================================================
          SUGGESTIONS
      ================================================= */}

      {showSuggestions &&
        suggestions.length > 0 && (
          <div className="location-suggestions">

            {suggestions.map(
              (
                place,
                index
              ) => (
                <button
                  type="button"
                  className="location-suggestion"
                  key={
                    place.place_id ||
                    `${place.lat}-${place.lon}-${index}`
                  }
                  onMouseDown={
                    event =>
                      event.preventDefault()
                  }
                  onClick={() =>
                    handleSelect(
                      place
                    )
                  }
                >

                  <div className="suggestion-icon">
                    <FaMapMarkerAlt />
                  </div>

                  <div className="suggestion-content">

                    <strong>
                      {getPrimaryLocationName(
                        place
                      )}
                    </strong>

                    <span>
                      {getSecondaryLocationName(
                        place
                      )}
                    </span>

                    <small>
                      {place.display_name}
                    </small>

                  </div>

                </button>
              )
            )}

          </div>
        )}

      {/* =================================================
          NO RESULTS
      ================================================= */}

      {showSuggestions &&
        !loading &&
        inputValue.trim().length >= 3 &&
        suggestions.length === 0 &&
        !error && (
          <div className="location-no-results">
            No addresses found
          </div>
        )}

    </div>
  );
}

/* =====================================================
   PRIMARY LOCATION NAME
===================================================== */

function getPrimaryLocationName(
  place
) {
  const address =
    place.address || {};

  return (
    address.road ||
    address.neighbourhood ||
    address.suburb ||
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county ||
    place.name ||
    place.display_name
  );
}

/* =====================================================
   SECONDARY LOCATION NAME
===================================================== */

function getSecondaryLocationName(
  place
) {
  const address =
    place.address || {};

  const parts = [
    address.suburb,
    address.city,
    address.town,
    address.state_district,
    address.state,
    address.country
  ].filter(Boolean);

  return [
    ...new Set(parts)
  ].join(", ");
}

/* =====================================================
   STEP
===================================================== */

function Step({
  number,
  title,
  active,
  completed
}) {
  return (
    <div
      className={
        `booking-step ${
          active
            ? "active"
            : ""
        } ${
          completed
            ? "completed"
            : ""
        }`
      }
    >

      <div className="step-circle">

        {completed ? (
          <FaCheckCircle />
        ) : (
          number
        )}

      </div>

      <span>
        {title}
      </span>

    </div>
  );
}

/* =====================================================
   SECTION HEADING
===================================================== */

function SectionHeading({
  icon,
  title
}) {
  return (
    <div className="section-heading">

      <div className="section-heading-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

    </div>
  );
}

/* =====================================================
   INPUT
===================================================== */

function InputField({
  label,
  value,
  onChange,
  icon
}) {
  return (
    <div className="field-group">

      <label>
        {label}
      </label>

      <div className="input-wrapper">

        <input
          type="text"
          value={value}
          onChange={
            event =>
              onChange(
                event.target.value
              )
          }
        />

        {icon && (
          <span className="input-icon">
            {icon}
          </span>
        )}

      </div>

    </div>
  );
}

/* =====================================================
   SELECT
===================================================== */

function SelectField({
  label,
  value,
  options,
  onChange
}) {
  return (
    <div className="field-group">

      <label>
        {label}
      </label>

      <div className="select-wrapper">

        <select
          value={value}
          onChange={
            event =>
              onChange(
                event.target.value
              )
          }
        >

          {options.map(
            option => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}

        </select>

        <FaChevronDown />

      </div>

    </div>
  );
}

/* =====================================================
   SUMMARY ROW
===================================================== */

function SummaryRow({
  label,
  value
}) {
  return (
    <div className="summary-row">

      <span className="summary-label">
        {label}
      </span>

      <strong className="summary-value">
        {value}
      </strong>

    </div>
  );
}

/* =====================================================
   FARE ROW
===================================================== */

function FareRow({
  label,
  value,
  commission = false
}) {
  return (
    <div
      className={
        commission
          ? "fare-row commission-row"
          : "fare-row"
      }
    >

      <span>
        {label}
      </span>

      <strong>
        {value < 0
          ? "- "
          : ""}

        ₹{" "}

        {formatMoney(
          Math.abs(value)
        )}
      </strong>

    </div>
  );
}

/* =====================================================
   MONEY FORMAT
===================================================== */

function formatMoney(
  number
) {
  return Number(
    number
  ).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits:
        2,

      maximumFractionDigits:
        2
    }
  );
}

/* =====================================================
   HOURS FORMAT
===================================================== */

function formatHours(
  totalHours
) {
  if (
    !Number.isFinite(
      totalHours
    )
  ) {
    return "-";
  }

  const hours =
    Math.floor(
      totalHours
    );

  const minutes =
    Math.round(
      (
        totalHours -
        hours
      ) * 60
    );

  if (
    minutes === 0
  ) {
    return `${hours} hours`;
  }

  return (
    `${hours} hours ${minutes} minutes`
  );
}

/* =====================================================
   ROUTE DURATION FORMAT
===================================================== */

function formatRouteDuration(
  totalMinutes
) {
  if (
    !Number.isFinite(
      totalMinutes
    )
  ) {
    return "-";
  }

  const roundedMinutes =
    Math.round(
      totalMinutes
    );

  const hours =
    Math.floor(
      roundedMinutes / 60
    );

  const minutes =
    roundedMinutes % 60;

  if (
    hours === 0
  ) {
    return `${minutes} min`;
  }

  if (
    minutes === 0
  ) {
    return `${hours} hr`;
  }

  return (
    `${hours} hr ${minutes} min`
  );
}

/* =====================================================
   EXPORT
===================================================== */

export default MultiDayTour;