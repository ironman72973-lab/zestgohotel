import React, { useState } from "react";
import airportBg from "../../images/airport.png";
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
    chevron: <path d="m8 10 4 4 4-4" />,
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
    check: <path d="m5 12 4 4L19 7" />,
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
}) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
        {required && <b>*</b>}
      </span>
      <div className="field-box">
        {icon && (
          <span className="field-icon">
            <Icon name={icon} size={19} />
          </span>
        )}
        <input
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
        />
        {dropdown && (
          <span className="field-chevron">
            <Icon name="chevron" size={18} />
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
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
/* =========================================================
   FARE ROW
========================================================= */
function FareRow({ label, value, negative = false }) {
  let formatted = value;
  if (typeof value === "number") {
    formatted =
      "₹ " +
      Math.abs(value).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  }
  return (
    <div className={`fare-row ${negative ? "negative" : ""}`}>
      <span>{label}</span>
      <strong>
        {negative ? "- " : ""}
        {formatted}
      </strong>
    </div>
  );
}
/* =========================================================
   TRUST ITEM
========================================================= */
function Trust({ icon, title, sub }) {
  return (
    <div className="trust-item">
      <Icon name={icon} size={25} />
      <span>{title}</span>
      <small>{sub}</small>
    </div>
  );
}
/* =========================================================
   MAIN APP
========================================================= */
export default function App() {
  const [airport, setAirport] = useState(
    "Visakhapatnam Airport (VTZ)"
  );
  const [flight, setFlight] = useState("6E 5248");
  const [date, setDate] = useState("25 May 2025");
  const [time, setTime] = useState("06:45 PM");
  const [passengers, setPassengers] =
    useState("2 Adults, 1 Child");
  const [luggage, setLuggage] =
    useState("2 Large, 1 Small");
  const [meet, setMeet] = useState(true);
  const [wait, setWait] =
    useState("60 Minutes (Free)");
  const [room, setRoom] = useState("205");
  const [instructions, setInstructions] =
    useState("");
  const [ac, setAc] = useState(true);
  const [baby, setBaby] = useState(false);
  const [extra, setExtra] = useState(false);
  const [female, setFemale] = useState(false);
  /* =====================================================
     FARE CALCULATION
  ===================================================== */
  const babyFee = baby ? 100 : 0;
  const extraFee = extra ? 100 : 0;
  const femaleFee = female ? 150 : 0;
  const meetFee = meet ? 200 : 0;
  const additionalCharges =
    babyFee +
    extraFee +
    femaleFee;
  const baseFare = 649;
  const airportParking = 60;
  const driverAllowance = 50;
  const subtotalBeforeGST =
    baseFare +
    airportParking +
    meetFee +
    driverAllowance +
    additionalCharges;
  const gst = subtotalBeforeGST * 0.05;
  const subtotal =
    subtotalBeforeGST + gst;
  const commission =
    subtotal * 0.10;
  const grandTotal =
    subtotal - commission;
  const money = (amount) =>
    "₹ " +
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  /* =====================================================
     APP
  ===================================================== */
  return (
    <div
  className="app"
  style={{
    backgroundImage: `
      linear-gradient(
        135deg,
        rgba(0,0,0,0.80),
        rgba(0,0,0,0.75)
      ),
      url(${airportBg})
    `,
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
        {/* LOGO */}
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
        {/* PAGE TITLE */}
        <div className="hero-title">
          <h1>
            New Booking - Airport Pickup
          </h1>
          <span></span>
        </div>
        {/* HEADER ACTIONS */}
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
            LEFT BOOKING CARD
        ================================================= */}
        <section className="booking-card">
          {/* STEPS */}
          <nav className="steps">
            {[
              "Service & Trip Details",
              "Vehicle Selection",
              "Guest Details",
              "Fare & Payment",
              "Confirmation",
            ].map((step, index) => (
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
            ))}
          </nav>
          {/* CONTENT */}
          <div className="booking-content">
            {/* SERVICE TITLE */}
            <div className="service-heading">
              <div className="plane-tile">
                <Icon
                  name="plane"
                  size={33}
                  stroke={1.7}
                />
              </div>
              <div>
                <h2>
                  Airport Pickup
                </h2>
                <p>
                  Pickup your guest from airport
                  and drop them to the hotel.
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
              <div className="grid four">
                <Field
                  label="Pickup Airport"
                  required
                  icon="plane"
                  value={airport}
                  dropdown
                  onChange={setAirport}
                />
                <Field
                  label="Flight Number"
                  required
                  icon="plane"
                  value={flight}
                  onChange={setFlight}
                />
                <Field
                  label="Arrival Date"
                  required
                  icon="calendar"
                  value={date}
                  onChange={setDate}
                />
                <Field
                  label="Arrival Time"
                  required
                  icon="clock"
                  value={time}
                  onChange={setTime}
                />
              </div>
              {/* FLIGHT STATUS */}
              <div className="flight-status">
                <div>
                  <span>
                    Flight Status
                  </span>
                  <b>
                    On Time
                  </b>
                </div>
                <div>
                  <span>
                    Airline
                  </span>
                  <strong>
                    IndiGo
                  </strong>
                </div>
                <div>
                  <span>
                    Terminal
                  </span>
                  <strong>
                    T1 - Terminal 1
                  </strong>
                </div>
                <button>
                  <Icon
                    name="refresh"
                    size={21}
                  />
                  Refresh Status
                </button>
              </div>
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
                  onChange={setPassengers}
                />
                <Field
                  label="Luggage"
                  icon="bag"
                  value={luggage}
                  onChange={setLuggage}
                />
                <Field
                  label="Meet & Greet Service"
                  icon="user"
                  value={
                    meet
                      ? "Yes (+ ₹200)"
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
                DROP LOCATION
            ================================================= */}
            <div className="panel">
              <h3>
                Drop Location
              </h3>
              <div className="grid drop-grid">
                <Field
                  label="Hotel / Drop Location"
                  required
                  icon="pin"
                  value="Oceanview Palace Hotel, Rushikonda"
                />
                <Field
                  label="Room Number (Optional)"
                  icon="bag"
                  value={room}
                  onChange={setRoom}
                />
                <Field
                  label="Special Instructions (Optional)"
                  value={instructions}
                  onChange={setInstructions}
                  placeholder="Any special instructions for driver..."
                />
              </div>
            </div>
            {/* =================================================
                ADDITIONAL PREFERENCES
            ================================================= */}
            <div className="panel preferences">
              <h3>
                Additional Preferences
              </h3>
              <div className="preference-row">
                {/* AC */}
                <button
                  className={`pref ${
                    ac ? "selected" : ""
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
                {/* BABY */}
                <button
                  className={`pref ${
                    baby ? "selected" : ""
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
                {/* EXTRA LUGGAGE */}
                <button
                  className={`pref ${
                    extra ? "selected" : ""
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
                    Extra Luggage Space
                  </span>
                  <small>
                    + ₹100
                  </small>
                </button>
                {/* FEMALE DRIVER */}
                <button
                  className={`pref ${
                    female ? "selected" : ""
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
                    Female Driver (If Available)
                  </span>
                  <small>
                    + ₹150
                  </small>
                </button>
              </div>
            </div>
            {/* CONTINUE */}
            <button className="continue">
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
              value="Visakhapatnam Airport (VTZ)"
            />
            <SummaryRow
              label="To"
              value="Oceanview Palace Hotel"
            />
            <SummaryRow
              label="Date & Time"
              value="25 May 2025, 06:45 PM"
            />
            <SummaryRow
              label="Passengers"
              value="2 Adults, 1 Child"
            />
            <SummaryRow
              label="Luggage"
              value="2 Large, 1 Small"
            />
            <SummaryRow
              label="Meet & Greet"
              value={meet ? "Yes" : "No"}
            />
            <SummaryRow
              label="Wait Time"
              value="60 Minutes (Free)"
            />
            {/* FARE */}
            <div className="fare-box">
              <h4>
                Fare Breakdown
              </h4>
              <FareRow
                label="Base Fare"
                value={649}
              />
              <FareRow
                label="Airport Parking"
                value={60}
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
                label="Waiting Charges (After 60 min)"
                value="₹ 2.00/min"
              />
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
                  {money(grandTotal)}
                </strong>
              </div>
            </div>
            {/* EARNINGS */}
            <div className="earn">
              <div className="earn-top">
                <span>
                  ● &nbsp;You Earn
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
                  {money(commission)}
                </i>
              </strong>
              <p>
                You will earn on this booking
              </p>
            </div>
            {/* TRUST */}
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
      {/* =================================================
          CSS
      ================================================= */}
      <style>{`
        @import url(
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        );
        * {
          box-sizing: border-box;
        }
        html,
        body,
        #root {
          margin: 0;
          min-height: 100%;
          font-family: Inter, Arial, sans-serif;
          color: #081735;
        }
        body {
          background: #f7f9fb;
        }
        button,
        input {
          font-family: inherit;
        }
        button {
          cursor: pointer;
        }
        /* =================================================
           APP
        ================================================= */
        .app {
          min-height: 1024px;
          background:
            linear-gradient(
              #ffffff 0,
              #ffffff 198px,
              #f7f9fb 198px
            );
        }
        /* =================================================
           HERO
        ================================================= */
        .hero {
          height: 205px;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              110deg,
              #f8fafc 0%,
              #e9eef3 42%,
              #6d8490 65%,
              #263d4a 100%
            );
        }
        /* Airport visual */
        .airport-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.55),
              rgba(255,196,111,.08) 50%,
              rgba(15,39,51,.15)
            );
        }
        .airport-building {
          position: absolute;
          right: -30px;
          top: -25px;
          width: 58%;
          height: 210px;
          transform:
            skewX(-17deg);
          background:
            linear-gradient(
              110deg,
              rgba(255,255,255,.18),
              rgba(20,50,65,.85)
            );
          border-left:
            2px solid rgba(255,255,255,.4);
          box-shadow:
            inset 0 -25px 40px
            rgba(255,190,80,.45);
        }
        .airport-glass {
          position: absolute;
          inset: 20px 0 30px;
          opacity: .65;
          background:
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,.55) 0,
              rgba(255,255,255,.55) 2px,
              transparent 2px,
              transparent 55px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,.35) 0,
              rgba(255,255,255,.35) 2px,
              transparent 2px,
              transparent 35px
            );
        }
        .airport-light {
          position: absolute;
          bottom: 20px;
          width: 120px;
          height: 7px;
          background: #ffc75c;
          box-shadow:
            0 0 18px #ffc75c;
        }
        .light1 {
          left: 15%;
        }
        .light2 {
          left: 35%;
        }
        .light3 {
          left: 55%;
        }
        .light4 {
          left: 75%;
        }
        .airplane {
          position: absolute;
          left: 42%;
          top: 63px;
          color: #334b58;
          font-size: 45px;
          transform:
            rotate(-7deg);
        }
        .sun {
          position: absolute;
          left: 12%;
          bottom: -50px;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(255,194,94,.65),
              rgba(255,194,94,0)
            );
        }
        /* =================================================
           BRAND
        ================================================= */
        .brand {
          position: absolute;
          left: 30px;
          top: 26px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logo-mark {
          width: 64px;
          height: 58px;
          display: grid;
          place-items: center;
          font-size: 42px;
          font-weight: 800;
          font-style: italic;
          color: #087d35;
          text-shadow:
            7px 3px 0 #ff9b00;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        .logo-text div {
          font-size: 29px;
          line-height: 30px;
          font-weight: 700;
          letter-spacing: -1.5px;
        }
        .logo-text strong {
          color: #078238;
        }
        .logo-text b {
          color: #f28b00;
        }
        .logo-text small {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #1b2736;
          margin-top: 3px;
        }
        /* =================================================
           HERO TITLE
        ================================================= */
        .hero-title {
          position: absolute;
          left: 302px;
          top: 27px;
          z-index: 3;
        }
        .hero-title h1 {
          margin: 0;
          font-size: 20px;
          line-height: 27px;
          font-weight: 700;
          letter-spacing: -.35px;
        }
        .hero-title span {
          display: block;
          width: 34px;
          height: 4px;
          border-radius: 4px;
          background: #007d38;
          margin-top: 8px;
        }
        /* =================================================
           HEADER ACTIONS
        ================================================= */
        .header-actions {
          position: absolute;
          z-index: 5;
          right: 27px;
          top: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .help-btn {
          height: 45px;
          border:
            1px solid rgba(0,0,0,.55);
          background:
            rgba(12,27,47,.45);
          color: #fff;
          border-radius: 17px;
          padding: 0 17px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }
        .bell {
          border: 0;
          background: transparent;
          color: #fff;
          position: relative;
          padding: 8px;
        }
        .bell em {
          position: absolute;
          top: -2px;
          right: -1px;
          font-size: 10px;
          font-style: normal;
          background: #f44316;
          border-radius: 50%;
          min-width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          font-weight: 700;
          border: 2px solid #fff;
        }
        .profile {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #fff;
        }
        .profile-avatar {
          width: 43px;
          height: 43px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background:
            linear-gradient(
              145deg,
              #263c51,
              #e0a36c
            );
          border: 2px solid #fff;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }
        .profile div:nth-child(2) {
          display: flex;
          flex-direction: column;
          min-width: 128px;
        }
        .profile strong {
          font-size: 13px;
        }
        .profile small {
          font-size: 11px;
          margin-top: 2px;
          opacity: .9;
        }
        /* =================================================
           MAIN PAGE
        ================================================= */
        .page {
          width:
            calc(100% - 76px);
          margin:
            -59px auto 20px;
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns:
            minmax(0,1fr)
            350px;
          gap: 10px;
          align-items: start;
        }
        /* =================================================
           BOOKING CARD
        ================================================= */
        .booking-card {
          background: #fff;
          border:
            1px solid #e4e8ed;
          border-radius: 12px;
          box-shadow:
            0 5px 20px
            rgba(23,44,63,.08);
          overflow: hidden;
        }
        /* =================================================
           STEPS
        ================================================= */
        .steps {
          height: 58px;
          display: flex;
          align-items: center;
          padding: 0 118px;
          border-bottom:
            1px solid #e9edf0;
        }
        .step {
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
          font-size: 13px;
          color: #1e2941;
        }
        .step > span {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #eef1f4;
          display: grid;
          place-items: center;
          font-weight: 600;
        }
        .step.active > span {
          background: #00762f;
          color: #fff;
        }
        .step.active label {
          font-weight: 600;
        }
        .step-line {
          height: 1px;
          background: #d9dfe4;
          flex: 1;
          min-width: 30px;
          margin: 0 16px;
        }
        /* =================================================
           BOOKING CONTENT
        ================================================= */
        .booking-content {
          padding:
            25px 13px 14px;
        }
        .service-heading {
          display: flex;
          align-items: center;
          gap: 22px;
          margin:
            0 15px 19px;
        }
        .plane-tile {
          width: 59px;
          height: 59px;
          border-radius: 17px;
          background:
            linear-gradient(
              145deg,
              #2e9258,
              #176b37
            );
          color: #fff;
          display: grid;
          place-items: center;
          box-shadow:
            inset 0 0 0 1px
            rgba(255,255,255,.12);
        }
        .service-heading h2 {
          font-size: 22px;
          margin:
            0 0 5px;
          letter-spacing: -.5px;
        }
        .service-heading p {
          margin: 0;
          font-size: 13px;
          color: #33405d;
        }
        /* =================================================
           PANEL
        ================================================= */
        .panel {
          border:
            1px solid #e7ebef;
          border-radius: 11px;
          padding:
            19px 21px 18px;
          margin-bottom: 10px;
          background: #fff;
        }
        .panel h3 {
          margin:
            0 0 15px;
          font-size: 17px;
          letter-spacing: -.25px;
        }
        .grid {
          display: grid;
          gap: 20px;
        }
        .grid.four {
          grid-template-columns:
            1.2fr
            1fr
            1fr
            1fr;
        }
        .drop-grid {
          grid-template-columns:
            1.25fr
            .75fr
            1.25fr;
          gap: 25px;
        }
        /* =================================================
           FIELD
        ================================================= */
        .field {
          display: block;
          min-width: 0;
        }
        .field-label {
          display: block;
          font-size: 12px;
          color: #263451;
          margin:
            0 0 7px;
        }
        .field-label b {
          color: #ee3d31;
          margin-left: 4px;
        }
        .field-box {
          height: 44px;
          border:
            1px solid #dfe5eb;
          border-radius: 7px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 13px;
          background: #fff;
        }
        .field-box:focus-within {
          border-color: #6aab84;
          box-shadow:
            0 0 0 2px
            rgba(0,118,47,.08);
        }
        .field-box input {
          min-width: 0;
          flex: 1;
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #12203c;
          font-size: 13px;
        }
        .field-box input::placeholder {
          color: #9aa3ae;
        }
        .field-icon {
          color: #23324f;
          display: flex;
        }
        .field-chevron {
          margin-left: auto;
          color: #13203b;
          display: flex;
        }
        /* =================================================
           FLIGHT STATUS
        ================================================= */
        .flight-status {
          height: 66px;
          border:
            1px solid #cfe4d6;
          border-radius: 8px;
          background:
            linear-gradient(
              90deg,
              #fbfdfb,
              #f8fbf9
            );
          margin-top: 19px;
          display: grid;
          grid-template-columns:
            1fr
            1fr
            1fr
            1.05fr;
          align-items: center;
        }
        .flight-status > div {
          padding: 0 25px;
          border-right:
            1px solid #dfe7e1;
          height: 42px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 7px;
        }
        .flight-status span {
          font-size: 12px;
          color: #006b2e;
        }
        .flight-status b {
          width: max-content;
          padding:
            4px 12px;
          border-radius: 15px;
          background: #dff2e3;
          color: #087436;
          font-size: 11px;
          font-weight: 500;
        }
        .flight-status strong {
          font-size: 13px;
          font-weight: 500;
        }
        .flight-status button {
          border: 0;
          background: transparent;
          color: #006d2f;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          font-size: 12px;
        }
        /* =================================================
           PREFERENCES
        ================================================= */
        .preferences {
          padding-bottom: 15px;
        }
        .preference-row {
          display: grid;
          grid-template-columns:
            1fr
            1fr
            1.08fr
            1.08fr;
          gap: 16px;
        }
        .pref {
          height: 39px;
          border:
            1px solid #e1e7ec;
          background: #fff;
          border-radius: 7px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 10px;
          color: #17304b;
          font-size: 11px;
          text-align: left;
        }
        .pref.selected {
          background: #f4fbf6;
          border-color: #a8d7b5;
          color: #076c30;
        }
        .check-box {
          width: 17px;
          height: 17px;
          border:
            1px solid #d9e0e6;
          border-radius: 4px;
          display: grid;
          place-items: center;
          color: #fff;
          background: #fff;
        }
        .pref.selected .check-box {
          background: #07803a;
          border-color: #07803a;
        }
        .pref small {
          margin-left: auto;
          background: #f5f7f9;
          border-radius: 12px;
          padding:
            3px 7px;
          color: #263451;
          font-size: 10px;
        }
        /* =================================================
           CONTINUE
        ================================================= */
        .continue {
          width: 100%;
          height: 45px;
          border: 0;
          border-radius: 8px;
          background: #006e2e;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 700;
          font-size: 14px;
          box-shadow:
            0 3px 7px
            rgba(0,104,45,.18);
          transition: .2s;
        }
        .continue:hover {
          background: #005d27;
          transform: translateY(-1px);
        }
        /* =================================================
           SUMMARY
        ================================================= */
        .summary {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow:
            0 5px 20px
            rgba(23,44,63,.08);
          border:
            1px solid #e3e8ec;
        }
        .summary-title {
          height: 51px;
          background: #00732f;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          padding: 0 17px;
        }
        .summary-body {
          padding:
            16px 17px 14px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 15px;
          font-size: 12px;
          color: #263451;
          line-height: 16px;
        }
        .summary-row strong {
          font-weight: 500;
          text-align: right;
          color: #14213b;
          max-width: 190px;
        }
        /* =================================================
           FARE
        ================================================= */
        .fare-box {
          margin-top: 5px;
          border:
            1px solid #e3eae5;
          border-radius: 8px;
          padding:
            13px 11px 10px;
          background:
            linear-gradient(
              180deg,
              #fbfdfb,
              #fff
            );
        }
        .fare-box h4 {
          color: #2b7042;
          margin:
            0 0 10px;
          font-size: 13px;
        }
        .fare-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #263451;
          margin-bottom: 9px;
        }
        .fare-row strong {
          font-weight: 500;
        }
        .fare-row.negative strong {
          color: #57390c;
        }
        .fare-divider {
          border-top:
            1px dashed #d9dfe1;
          margin:
            8px 0 11px;
        }
        .grand {
          border-top:
            1px solid #dfe4e4;
          padding-top: 12px;
          margin-top: 3px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
        }
        .grand span {
          font-size: 14px;
        }
        .grand strong {
          color: #087e35;
          font-size: 18px;
        }
        /* =================================================
           EARN
        ================================================= */
        .earn {
          border:
            1px solid #f1d99c;
          background:
            linear-gradient(
              110deg,
              #fffdf4,
              #fff6df
            );
          border-radius: 8px;
          padding:
            11px 12px 10px;
          margin-top: 15px;
        }
        .earn-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #17223b;
          font-size: 11px;
          margin-bottom: 10px;
        }
        .earn-top b {
          background: #ffefc6;
          padding:
            5px 8px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 500;
        }
        .earn > strong {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .earn > strong i {
          color: #087d36;
          font-style: normal;
          font-size: 14px;
        }
        .earn p {
          margin:
            5px 0 0;
          font-size: 10px;
          color: #263451;
        }
        /* =================================================
           TRUST
        ================================================= */
        .trust {
          margin-top: 17px;
          border:
            1px solid #e8ecef;
          border-radius: 8px;
          min-height: 97px;
          display: grid;
          grid-template-columns:
            repeat(4,1fr);
        }
        .trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border-right:
            1px solid #e5e8ea;
          color: #087a36;
          text-align: center;
          padding:
            8px 2px;
        }
        .trust-item:last-child {
          border-right: 0;
        }
        .trust-item span {
          color: #15223c;
          font-size: 10px;
          line-height: 12px;
        }
        .trust-item small {
          color: #15223c;
          font-size: 10px;
          line-height: 12px;
        }
        /* =================================================
           RESPONSIVE
        ================================================= */
        @media (max-width: 1250px) {
          .page {
            width:
              calc(100% - 32px);
            grid-template-columns:
              minmax(0,1fr)
              315px;
          }
          .steps {
            padding:
              0 30px;
          }
          .grid.four {
            grid-template-columns:
              1fr 1fr;
          }
          .drop-grid {
            grid-template-columns:
              1fr 1fr;
          }
          .preference-row {
            grid-template-columns:
              1fr 1fr;
          }
        }
        @media (max-width: 900px) {
          .app {
            min-height: 100vh;
          }
          .hero {
            height: 150px;
          }
          .hero-title {
            left: 25px;
            top: 95px;
          }
          .brand {
            left: 20px;
            top: 18px;
          }
          .header-actions {
            display: none;
          }
          .page {
            margin:
              -25px 12px 20px;
            grid-template-columns:
              1fr;
          }
          .summary {
            order: 2;
          }
          .steps {
            overflow-x: auto;
            padding:
              0 15px;
          }
          .step-line {
            min-width: 15px;
            margin:
              0 8px;
          }
        }
        @media (max-width: 560px) {
          .booking-content {
            padding:
              18px 8px 10px;
          }
          .service-heading {
            margin-left: 7px;
          }
          .panel {
            padding:
              16px 12px;
          }
          .grid.four,
          .drop-grid,
          .preference-row {
            grid-template-columns:
              1fr;
          }
          .flight-status {
            grid-template-columns:
              1fr;
            height: auto;
          }
          .flight-status > div {
            border-right: 0;
            border-bottom:
              1px solid #dfe7e1;
            height: 50px;
          }
          .flight-status button {
            height: 48px;
          }
          .step label {
            display: none;
          }
          .steps {
            justify-content: center;
          }
          .summary-row strong {
            max-width: 160px;
          }
        }
      `}</style>
    </div>
  );
}