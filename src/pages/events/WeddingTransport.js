
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CarFront,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Headset,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Users,
  ClipboardList,
  Gift,
  Plus,
  X,
  BusFront,
  Heart,
  Flower2,
  CheckCircle2,
  Save,
  Sparkles
} from "lucide-react";

import "./wed.css";

const initialPickupPoints = [
  "Bride's Residence",
  "Groom's Residence",
  "Wedding Guest Hotel"
];

const initialDropPoints = [
  "Wedding Venue",
  "Reception Venue",
  "Guest Hotel"
];

const stepNames = [
  "Wedding Details",
  "Vehicle & Schedule",
  "Guest & Contact",
  "Fare & Payment",
  "Confirmation"
];

function Field({ label, icon: Icon, children, className = "" }) {
  return (
    <label className={`field ${className}`}>
      <span className="field-label">{label}</span>

      <span className="field-control">
        {Icon && <Icon size={16} className="field-icon" />}
        {children}
      </span>
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <span className="field-control">
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </Field>
  );
}

function SectionTitle({ icon: Icon, children, optional = false }) {
  return (
    <div className="section-title">
      <span className="section-icon">
        <Icon size={19} strokeWidth={2.5} />
      </span>

      <h2>
        {children}
        {optional && <small> (Optional)</small>}
      </h2>
    </div>
  );
}

function PointTags({ points, onRemove, onAdd, addLabel }) {
  return (
    <div className="point-control">
      <div className="tag-list">
        {points.map((point, index) => (
          <span className="point-tag" key={`${point}-${index}`}>
            {point}

            <button
              type="button"
              aria-label={`Remove ${point}`}
              onClick={() => onRemove(index)}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <button
        type="button"
        className="add-point"
        onClick={onAdd}
      >
        <Plus size={13} />
        {addLabel}
      </button>
    </div>
  );
}

const currency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

export default function WeddingTransportBooking() {
  const [form, setForm] = useState({
    weddingType: "Wedding Ceremony",
    weddingName: "Wedding Celebration",
    weddingCategory: "Traditional Wedding",
    weddingDate: "2026-12-15",
    startTime: "08:00",
    endTime: "23:00",
    guests: 250,
    venue: "Beach Convention Centre",
    address: "Beach Road, Visakhapatnam, Andhra Pradesh",
    serviceType: "Wedding Day Package",
    tripType: "Multiple Pickup Points",
    vehicles: 8,
    vehicleCategory: "Mixed Fleet",
    bridalCar: "Premium Sedan",
    bridalDecoration: "Floral Decoration",
    baraatTransport: "Required",
    guestShuttle: "Required",
    dropLocation: "Wedding Reception Venue",
    returnTrip: "yes",
    road: "All Good Roads",
    luggage: "Medium",
    parking: "Yes",
    ac: "AC Required",
    coordinator: "",
    phone: "",
    notes:
      "Please ensure vehicles arrive 30 minutes before the scheduled pickup. Bridal car decoration must be completed before arrival."
  });

  const [pickups, setPickups] = useState(initialPickupPoints);
  const [drops, setDrops] = useState(initialDropPoints);
  const [activeStep, setActiveStep] = useState(1);
  const [notice, setNotice] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const update = (key) => (event) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value
    }));
  };

  const totalVehicles = Math.min(
    100,
    Math.max(1, Number(form.vehicles) || 1)
  );

  const fare = useMemo(() => {
    const base = totalVehicles * 3500;
    const extraHours = 3500;
    const driverAllowance = totalVehicles * 300;
    const tollParking = totalVehicles * 200;

    const decoration =
      form.bridalDecoration === "Floral Decoration"
        ? 2500
        : form.bridalDecoration === "Premium Decoration"
        ? 5000
        : 0;

    const subtotalBeforeTax =
      base +
      extraHours +
      driverAllowance +
      tollParking +
      decoration;

    const tax = subtotalBeforeTax * 0.05;
    const subtotal = subtotalBeforeTax + tax;

    // Illustrative hotel commission; confirm your commercial agreement.
    const commission = subtotalBeforeTax * 0.10;

    return {
      base,
      extraHours,
      driverAllowance,
      tollParking,
      decoration,
      tax,
      subtotal,
      commission,
      total: subtotal - commission
    };
  }, [totalVehicles, form.bridalDecoration]);

  const addPoint = (type) => {
    const label =
      type === "pickup" ? "pickup location" : "drop location";

    const point = window.prompt(`Enter ${label}:`);

    if (!point || !point.trim()) return;

    const setter =
      type === "pickup" ? setPickups : setDrops;

    setter((items) => [...items, point.trim()]);
  };

  const removePoint = (type, index) => {
    const setter =
      type === "pickup" ? setPickups : setDrops;

    setter((items) =>
      items.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const dateLabel = (value) => {
    if (!value) return "Select date";

    return new Date(`${value}T12:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  const timeLabel = (value) => {
    if (!value) return "--:--";

    const [hours, minutes] = value.split(":").map(Number);
    const suffix = hours >= 12 ? "PM" : "AM";

    return `${String(hours % 12 || 12).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")} ${suffix}`;
  };

  const continueBooking = () => {
    if (activeStep < 5) {
      const nextStep = activeStep + 1;

      setActiveStep(nextStep);

      setNotice(
        `${stepNames[nextStep - 1]} selected. Connect this step to your wedding booking workflow.`
      );
    } else {
      setNotice(
        "Wedding transport details are ready for confirmation."
      );
    }
  };

  const saveDraft = () => {
    setNotice(
      "Draft status updated for this session. Backend saving is not connected."
    );
  };

  return (
    <div className="zestgo-page wedding-page">
      {/* Wedding hero and header */}
      <header className="hero wedding-hero">
        <div className="hero-shade" />

        <div className="topbar">
          <a
            className="brand"
            href="#top"
            aria-label="ZestGo Lakway Fleet home"
          >
            <span className="brand-symbol" aria-hidden="true">
              <span className="logo-speed speed-one"></span>
              <span className="logo-speed speed-two"></span>
              <span className="logo-speed speed-three"></span>
              <span className="logo-z">Z</span>
              <span className="logo-flash"></span>
            </span>

            <span className="brand-copy">
              <span className="brand-name">
                <span className="brand-zest">Zest</span>
                <span className="brand-go">Go</span>
              </span>

              <span className="brand-tagline">
                LAKWAY FLEET
              </span>
            </span>
          </a>

          <div className="top-actions">
            <button
              type="button"
              className="help-button"
              onClick={() => setShowHelp((value) => !value)}
            >
              <CircleHelp size={18} />
              Help Center
            </button>

            <button
              type="button"
              className="notification-button"
              aria-label="Notifications"
            >
              <Bell size={23} />
              <b>12</b>
            </button>

            <button type="button" className="profile-button">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80"
                alt="Reception manager"
              />

              <span>
                <strong>Rohit Sharma</strong>
                <small>Reception Manager</small>
              </span>

              <ChevronDown size={17} />
            </button>
          </div>
        </div>

        <div className="hero-heading">
          <div className="breadcrumbs">
            <span>New Booking</span>
            <ChevronRight size={15} />
            <span>Weddings</span>
            <ChevronRight size={15} />
            <strong>Wedding Transport</strong>
          </div>

          <h1>
            Wedding Transport <Heart size={24} />
          </h1>

          <p>
            Elegant, reliable transport for your special day.
          </p>
        </div>

        {showHelp && (
          <div className="help-popover">
            <strong>Need help with wedding transport?</strong>
            <span>
              Call +91 98765 43210 or use Live Chat below.
            </span>
          </div>
        )}
      </header>

      {/* Main booking layout */}
      <main className="booking-layout" id="top">
        <div className="main-column">
          {/* Booking progress */}
          <nav className="stepper" aria-label="Wedding booking steps">
            {stepNames.map((name, index) => {
              const number = index + 1;
              const isDone = number < activeStep;
              const isActive = number === activeStep;

              return (
                <React.Fragment key={name}>
                  <button
                    type="button"
                    className={`step ${
                      isActive ? "active" : ""
                    } ${isDone ? "done" : ""}`}
                    onClick={() => setActiveStep(number)}
                  >
                    <span className="step-number">
                      {isDone ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        number
                      )}
                    </span>

                    <span className="step-name">{name}</span>
                  </button>

                  {index < stepNames.length - 1 && (
                    <span className="step-line" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <form
            className="booking-form"
            onSubmit={(event) => {
              event.preventDefault();
              continueBooking();
            }}
          >
            {/* Wedding information */}
            <section className="form-section">
              <SectionTitle icon={Heart}>
                Wedding Information
              </SectionTitle>

              <div className="fields-grid event-grid">
                <SelectField
                  label="Wedding Event Type"
                  value={form.weddingType}
                  onChange={update("weddingType")}
                  options={[
                    "Wedding Ceremony",
                    "Engagement",
                    "Mehendi Ceremony",
                    "Haldi Ceremony",
                    "Sangeet",
                    "Baraat",
                    "Wedding Reception",
                    "Anniversary Celebration"
                  ]}
                />

                <Field label="Wedding Name / Purpose">
                  <input
                    value={form.weddingName}
                    onChange={update("weddingName")}
                  />
                </Field>

                <SelectField
                  label="Wedding Category"
                  value={form.weddingCategory}
                  onChange={update("weddingCategory")}
                  options={[
                    "Traditional Wedding",
                    "Destination Wedding",
                    "Luxury Wedding",
                    "Intimate Wedding",
                    "Reception Only",
                    "Other"
                  ]}
                />
              </div>

              <div className="fields-grid date-grid">
                <Field label="Wedding Date" icon={CalendarDays}>
                  <input
                    type="date"
                    value={form.weddingDate}
                    onChange={update("weddingDate")}
                  />
                </Field>

                <Field label="Start Time" icon={Clock3}>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={update("startTime")}
                  />
                </Field>

                <Field label="End Time (Approx.)" icon={Clock3}>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={update("endTime")}
                  />
                </Field>

                <Field label="Expected Guests" icon={Users}>
                  <input
                    type="number"
                    min="1"
                    value={form.guests}
                    onChange={update("guests")}
                  />
                </Field>
              </div>

              <div className="fields-grid venue-grid">
                <Field label="Wedding Venue" icon={MapPin}>
                  <input
                    value={form.venue}
                    onChange={update("venue")}
                  />
                </Field>

                <Field label="Venue Address" icon={MapPin}>
                  <input
                    value={form.address}
                    onChange={update("address")}
                  />
                </Field>
              </div>
            </section>

            {/* Vehicle and schedule requirements */}
            <section className="form-section transport-section">
              <SectionTitle icon={CarFront}>
                Transportation Details
              </SectionTitle>

              <div className="fields-grid transport-grid">
                <SelectField
                  label="Service Type"
                  value={form.serviceType}
                  onChange={update("serviceType")}
                  options={[
                    "Wedding Day Package",
                    "Hourly Rental",
                    "Full Day Rental",
                    "Pickup & Drop",
                    "Guest Shuttle",
                    "Multi-Day Wedding Package"
                  ]}
                />

                <SelectField
                  label="Trip Type"
                  value={form.tripType}
                  onChange={update("tripType")}
                  options={[
                    "Multiple Pickup Points",
                    "Single Pickup Point",
                    "Point to Point",
                    "Round Trip",
                    "Continuous Shuttle"
                  ]}
                />

                <Field label="Total Vehicles Required" icon={BusFront}>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={form.vehicles}
                    onChange={update("vehicles")}
                  />
                </Field>
              </div>

              <div className="fields-grid transport-grid">
                <SelectField
                  label="Vehicle Category"
                  value={form.vehicleCategory}
                  onChange={update("vehicleCategory")}
                  options={[
                    "Mixed Fleet",
                    "Hatchback",
                    "Sedan",
                    "SUV",
                    "Premium Sedan",
                    "Luxury Car",
                    "Tempo Traveller",
                    "Mini Bus",
                    "Luxury Coach"
                  ]}
                />

                <SelectField
                  label="Bridal / Groom Car"
                  value={form.bridalCar}
                  onChange={update("bridalCar")}
                  options={[
                    "Premium Sedan",
                    "Luxury Sedan",
                    "Premium SUV",
                    "Luxury SUV",
                    "Vintage Car",
                    "No Special Car"
                  ]}
                />

                <SelectField
                  label="Bridal Car Decoration"
                  value={form.bridalDecoration}
                  onChange={update("bridalDecoration")}
                  options={[
                    "No Decoration",
                    "Simple Decoration",
                    "Floral Decoration",
                    "Premium Decoration"
                  ]}
                />
              </div>

              <div className="fields-grid transport-grid">
                <SelectField
                  label="Baraat Transport"
                  value={form.baraatTransport}
                  onChange={update("baraatTransport")}
                  options={[
                    "Required",
                    "Not Required",
                    "Need Recommendation"
                  ]}
                />

                <SelectField
                  label="Guest Shuttle Service"
                  value={form.guestShuttle}
                  onChange={update("guestShuttle")}
                  options={[
                    "Required",
                    "Not Required",
                    "Need Recommendation"
                  ]}
                />

                <Field label="Main Drop Location" icon={MapPin}>
                  <input
                    value={form.dropLocation}
                    onChange={update("dropLocation")}
                  />
                </Field>
              </div>

              <div className="fields-grid points-grid">
                <Field label="Pickup Points">
                  <PointTags
                    points={pickups}
                    onRemove={(index) =>
                      removePoint("pickup", index)
                    }
                    onAdd={() => addPoint("pickup")}
                    addLabel="Add Pickup Point"
                  />
                </Field>

                <Field label="Drop Points">
                  <PointTags
                    points={drops}
                    onRemove={(index) =>
                      removePoint("drop", index)
                    }
                    onAdd={() => addPoint("drop")}
                    addLabel="Add Drop Point"
                  />
                </Field>
              </div>

              <div className="fields-grid return-grid">
                <Field label="Return / Drop Back">
                  <div className="radio-box">
                    <label>
                      <input
                        type="radio"
                        name="returnTrip"
                        value="yes"
                        checked={form.returnTrip === "yes"}
                        onChange={update("returnTrip")}
                      />
                      <span>Yes, return after ceremony</span>
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="returnTrip"
                        value="no"
                        checked={form.returnTrip === "no"}
                        onChange={update("returnTrip")}
                      />
                      <span>One-way drop</span>
                    </label>
                  </div>
                </Field>

                <Field label="Wedding Coordinator" icon={Users}>
                  <input
                    placeholder="Coordinator name"
                    value={form.coordinator}
                    onChange={update("coordinator")}
                  />
                </Field>
              </div>

              <div className="fields-grid venue-grid">
                <Field label="Coordinator Contact Number" icon={PhoneCall}>
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </Field>
              </div>
            </section>

            {/* Special requirements */}
            <section className="form-section special-section">
              <SectionTitle icon={Sparkles} optional>
                Special Requirements
              </SectionTitle>

              <div className="fields-grid special-grid">
                <SelectField
                  label="Type of Road"
                  value={form.road}
                  onChange={update("road")}
                  options={[
                    "All Good Roads",
                    "Mixed Roads",
                    "Hilly / Ghat Roads",
                    "Rough Roads"
                  ]}
                />

                <SelectField
                  label="Luggage Space"
                  value={form.luggage}
                  onChange={update("luggage")}
                  options={[
                    "Small",
                    "Medium",
                    "Large",
                    "Extra Large"
                  ]}
                />

                <SelectField
                  label="Parking Availability"
                  value={form.parking}
                  onChange={update("parking")}
                  options={["Yes", "No", "Limited"]}
                />

                <SelectField
                  label="AC Preference"
                  value={form.ac}
                  onChange={update("ac")}
                  options={[
                    "AC Required",
                    "Non-AC",
                    "No Preference"
                  ]}
                />
              </div>

              <Field label="Additional Wedding Instructions">
                <textarea
                  maxLength={500}
                  value={form.notes}
                  onChange={update("notes")}
                  rows={3}
                />

                <span className="character-count">
                  {form.notes.length}/500
                </span>
              </Field>
            </section>

            {notice && (
              <div className="inline-notice" role="status">
                {notice}
              </div>
            )}

            <div className="mobile-actions">
              <button className="primary-button" type="submit">
                Continue to{" "}
                {stepNames[Math.min(activeStep, 4)]}
                <ArrowRight size={18} />
              </button>

              <button
                className="secondary-button"
                type="button"
                onClick={saveDraft}
              >
                <Save size={16} />
                Save as Draft
              </button>
            </div>
          </form>
        </div>

        {/* Booking summary sidebar */}
        <aside className="summary-card">
          <div className="summary-heading">
            <span className="summary-icon">
              <Heart size={19} />
            </span>

            <h2>Wedding Booking Summary</h2>
          </div>

          <dl className="summary-list">
            <div>
              <dt>Wedding Type</dt>
              <dd>{form.weddingType}</dd>
            </div>

            <div>
              <dt>Wedding Name</dt>
              <dd>{form.weddingName || "—"}</dd>
            </div>

            <div>
              <dt>Wedding Date</dt>
              <dd>{dateLabel(form.weddingDate)}</dd>
            </div>

            <div>
              <dt>Event Time</dt>
              <dd>
                {timeLabel(form.startTime)} -{" "}
                {timeLabel(form.endTime)}
              </dd>
            </div>

            <div>
              <dt>Expected Guests</dt>
              <dd>
                {Number(form.guests || 0).toLocaleString("en-IN")}
              </dd>
            </div>

            <div>
              <dt>Total Vehicles</dt>
              <dd>{totalVehicles}</dd>
            </div>

            <div>
              <dt>Vehicle Category</dt>
              <dd>{form.vehicleCategory}</dd>
            </div>

            <div>
              <dt>Bridal Car</dt>
              <dd>{form.bridalCar}</dd>
            </div>

            <div>
              <dt>Trip Type</dt>
              <dd>{form.tripType}</dd>
            </div>
          </dl>

          {/* Estimated fare breakdown */}
          <div className="fare-card">
            <h3>
              Fare Breakdown <span>(Estimated)</span>
            </h3>

            <div>
              <span>Vehicle Fare ({totalVehicles} Vehicles)</span>
              <strong>{currency(fare.base)}</strong>
            </div>

            <div>
              <span>Extra Hours Charges</span>
              <strong>{currency(fare.extraHours)}</strong>
            </div>

            <div>
              <span>Driver Allowance</span>
              <strong>{currency(fare.driverAllowance)}</strong>
            </div>

            <div>
              <span>Toll & Parking</span>
              <strong>{currency(fare.tollParking)}</strong>
            </div>

            <div>
              <span>Bridal Car Decoration</span>
              <strong>{currency(fare.decoration)}</strong>
            </div>

            <div>
              <span>Taxes (Illustrative 5%)</span>
              <strong>{currency(fare.tax)}</strong>
            </div>

            <hr />

            <div>
              <span>Subtotal</span>
              <strong>{currency(fare.subtotal)}</strong>
            </div>

            <div className="commission">
              <span>Hotel Commission (10%)</span>
              <strong>- {currency(fare.commission)}</strong>
            </div>

            <hr />

            <div className="grand-total">
              <span>Grand Total</span>
              <strong>{currency(fare.total)}</strong>
            </div>
          </div>

          {/* Hotel commission card */}
          <div className="earnings-card">
            <div className="earnings-title">
              <Gift size={22} />
              <strong>Your Earnings (Estimated)</strong>
              <span>10% Commission</span>
            </div>

            <p>
              Estimated hotel commission:{" "}
              <strong>{currency(fare.commission)}</strong>
            </p>
          </div>

          <button
            className="primary-button summary-continue"
            type="button"
            onClick={continueBooking}
          >
            Continue to Vehicle & Schedule
            <ArrowRight size={19} />
          </button>

          <button
            className="secondary-button summary-save"
            type="button"
            onClick={saveDraft}
          >
            <Save size={16} />
            Save as Draft
          </button>

          <div className="secure-note">
            <ShieldCheck size={18} />
            Your booking details are safe and secure
          </div>
        </aside>
      </main>

      {/* Support footer */}
      <footer className="support-bar">
        <div className="support-intro">
          <span className="support-icon">
            <Headset size={32} />
          </span>

          <div>
            <strong>Need Help?</strong>
            <span>
              Our travel experts are available 24/7 for you.
            </span>
          </div>
        </div>

        <a className="support-item" href="tel:+919876543210">
          <span className="support-icon small">
            <PhoneCall size={21} />
          </span>

          <span>
            <strong>+91 98765 43210</strong>
            <small>Call Support</small>
          </span>
        </a>

        <button
          type="button"
          className="support-item chat-item"
          onClick={() =>
            setNotice(
              "Live chat can be connected to your customer-support service."
            )
          }
        >
          <span className="support-icon small">
            <MessageCircle size={21} />
          </span>

          <span>
            <strong>Live Chat</strong>
            <small>Chat with us</small>
          </span>
        </button>
      </footer>
    </div>
  );
}
