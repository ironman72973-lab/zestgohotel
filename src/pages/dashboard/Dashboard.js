import React, { useState } from "react";
import {
  Menu,
  CalendarDays,
  Bell,
  ChevronDown,
  ChevronRight,
  Home,
  ClipboardList,
  Users,
  Car,
  Wallet,
  FileBarChart,
  LifeBuoy,
  Hotel,
  UserRound,
  Settings,
  LogOut,
  BriefcaseBusiness,
  Plane,
  MapPin,
  Train,
  Plus,
  Headphones,
  Crown,
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./dashboard.css";

const bookingData = [
  { day: "18 May", bookings: 16, completed: 6 },
  { day: "19 May", bookings: 31, completed: 13 },
  { day: "20 May", bookings: 33, completed: 9 },
  { day: "21 May", bookings: 26, completed: 12 },
  { day: "22 May", bookings: 33, completed: 12 },
  { day: "23 May", bookings: 42, completed: 19 },
  { day: "24 May", bookings: 40, completed: 14 },
];

const commissionData = [
  {
    name: "Airport Pickup",
    value: 24680,
    color: "#31a84c",
  },
  {
    name: "Outstation",
    value: 18750,
    color: "#ff7419",
  },
  {
    name: "Local Rental",
    value: 15600,
    color: "#2878e8",
  },
  {
    name: "Holiday Packages",
    value: 12420,
    color: "#9144d9",
  },
  {
    name: "Others",
    value: 6000,
    color: "#a7adb5",
  },
];

const recentBookings = [
  {
    icon: <Plane size={20} />,
    type: "Airport Pickup",
    guest: "John Mathew",
    number: "IN1234",
    time: "Today, 07:30 PM",
    status: "Confirmed",
    color: "green",
  },
  {
    icon: <Car size={20} />,
    type: "Local Sightseeing",
    guest: "Priya Sharma",
    number: "LH5678",
    time: "Today, 10:00 AM",
    status: "Ongoing",
    color: "orange",
  },
  {
    icon: <MapPin size={20} />,
    type: "Outstation Trip",
    guest: "Amit Verma",
    number: "OS9101",
    time: "Today, 06:00 AM",
    status: "Completed",
    color: "blue",
  },
  {
    icon: <Train size={20} />,
    type: "Railway Pickup",
    guest: "Neha Kapoor",
    number: "RP1122",
    time: "Today, 09:15 PM",
    status: "Confirmed",
    color: "purple",
  },
];

const topServices = [
  {
    name: "Airport Pickup & Drop",
    percentage: 40,
    icon: <Plane size={20} />,
    color: "#35ad4d",
  },
  {
    name: "Local Sightseeing",
    percentage: 25,
    icon: <Car size={20} />,
    color: "#ff811d",
  },
  {
    name: "Outstation Trips",
    percentage: 20,
    icon: <MapPin size={20} />,
    color: "#3182e8",
  },
  {
    name: "Hourly Rentals",
    percentage: 15,
    icon: <BriefcaseBusiness size={20} />,
    color: "#9147d9",
  },
];

function HotelDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        <div className="sidebar-logo">
          <div className="logo-symbol">
            <span>Z</span>
          </div>

          <div className="logo-text">
            <strong>
              Zest<span>Go</span>
            </strong>

            <small>LAKWAY FLEET</small>
          </div>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Hotel */}

        <div className="hotel-profile">

          <div className="hotel-image">
            <Hotel size={27} />
          </div>

          <div className="hotel-info">
            <strong>Oceanview Palace</strong>

            <div className="hotel-type">
              <span>Hotel Partner</span>
              <b>Premium</b>
            </div>
          </div>

          <ChevronDown size={17} />
        </div>

        {/* Navigation */}

        <nav className="sidebar-nav">

          <SidebarItem
            icon={<Home />}
            label="Dashboard"
            active
          />

          <SidebarItem
            icon={<ClipboardList />}
            label="Bookings"
            arrow
            open={openMenu === "bookings"}
            onClick={() => toggleMenu("bookings")}
          />

          {openMenu === "bookings" && (
            <div className="submenu">
              <span>All Bookings</span>
              <span>New Bookings</span>
              <span>Completed</span>
            </div>
          )}

          <SidebarItem
            icon={<Users />}
            label="Guests"
          />

          <SidebarItem
            icon={<Car />}
            label="Services"
            arrow
            open={openMenu === "services"}
            onClick={() => toggleMenu("services")}
          />

          {openMenu === "services" && (
            <div className="submenu">
              <span>All Services</span>
              <span>Airport Transfers</span>
              <span>Local Rentals</span>
              <span>Outstation</span>
            </div>
          )}

          <SidebarItem
            icon={<Wallet />}
            label="Wallet & Earnings"
          />

          <SidebarItem
            icon={<FileBarChart />}
            label="Reports"
            arrow
          />

          <SidebarItem
            icon={<Bell />}
            label="Notifications"
            notification="12"
          />

          <SidebarItem
            icon={<LifeBuoy />}
            label="Support"
            arrow
          />

          <SidebarItem
            icon={<Hotel />}
            label="Hotel Profile"
          />

          <SidebarItem
            icon={<UserRound />}
            label="Staff Management"
          />

          <SidebarItem
            icon={<Settings />}
            label="Settings"
          />

          <div className="logout">
            <LogOut size={21} />
            <span>Logout</span>
          </div>

        </nav>

        {/* Grow Business */}

        <div className="grow-card">

          <h3>Grow Your Business</h3>

          <p>
            Book more, <span>earn more</span>
          </p>

          <p>
            Check our latest offers
          </p>

          <button>
            View Offers
          </button>

          <div className="gift">
            🎁
          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="main">

        {/* Top Header */}

        <header className="topbar">

          <button
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>

          <div className="date-pill">
            <CalendarDays size={16} />
            <span>24 May 2025, Saturday</span>
          </div>

          <div className="topbar-right">

            <div className="notification-icon">
              <Bell size={24} />
              <span>12</span>
            </div>

            <div className="user-profile">

              <div className="avatar">
                RS
              </div>

              <div>
                <strong>Rohit Sharma</strong>
                <small>Reception Manager</small>
              </div>

              <ChevronDown size={19} />

            </div>

          </div>

        </header>

        {/* Hero */}

        <section className="hero">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <h1>
              Good Evening, Oceanview Palace! <span>👋</span>
            </h1>

            <p>
              Here's what's happening with your bookings today.
            </p>

          </div>

        </section>

        {/* Dashboard Content */}

        <div className="dashboard-content">

          {/* ================= STAT CARDS ================= */}

          <section className="stats-grid">

            <StatCard
              icon={<BriefcaseBusiness />}
              title="Today's Bookings"
              value="28"
              change="+12% from yesterday"
              type="green"
            />

            <StatCard
              icon={<Car />}
              title="Ongoing Trips"
              value="15"
              change="+8% from yesterday"
              type="purple"
            />

            <StatCard
              icon={<CircleDollarSign />}
              title="Today's Earnings"
              value="₹ 24,680"
              change="+18% from yesterday"
              type="blue"
            />

            <StatCard
              icon={<Wallet />}
              title="Wallet Balance"
              value="₹ 48,750"
              subtitle="Available Balance"
              type="orange"
              arrow
            />

          </section>

          {/* ================= BOOKING + RECENT ================= */}

          <section className="middle-grid">

            {/* Booking Overview */}

            <div className="panel booking-panel">

              <PanelHeader
                title="Booking Overview"
                select="This Week"
              />

              <div className="chart-legend">

                <span>
                  <i className="legend-green"></i>
                  Total Bookings
                </span>

                <span>
                  <i className="legend-orange"></i>
                  Completed
                </span>

              </div>

              <div className="chart-container">

                <ResponsiveContainer width="100%" height="100%">

                  <AreaChart data={bookingData}>

                    <defs>

                      <linearGradient
                        id="bookingGreen"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#35a94a"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="100%"
                          stopColor="#35a94a"
                          stopOpacity={0}
                        />
                      </linearGradient>

                      <linearGradient
                        id="bookingOrange"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ff7419"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="100%"
                          stopColor="#ff7419"
                          stopOpacity={0}
                        />
                      </linearGradient>

                    </defs>

                    <CartesianGrid
                      strokeDasharray="0"
                      vertical={false}
                      stroke="#e7e7e7"
                    />

                    <XAxis
                      dataKey="day"
                      tick={{
                        fontSize: 12,
                        fill: "#657080",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      domain={[0, 50]}
                      ticks={[0, 10, 20, 30, 40, 50]}
                      tick={{
                        fontSize: 12,
                        fill: "#657080",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="bookings"
                      stroke="#2fa845"
                      strokeWidth={2.5}
                      fill="url(#bookingGreen)"
                    />

                    <Area
                      type="monotone"
                      dataKey="completed"
                      stroke="#ff7419"
                      strokeWidth={2.5}
                      fill="url(#bookingOrange)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* Recent Bookings */}

            <div className="panel recent-panel">

              <div className="panel-title-row">

                <h2>Recent Bookings</h2>

                <button className="view-all">
                  View All
                </button>

              </div>

              <div className="recent-list">

                {recentBookings.map((booking, index) => (

                  <div
                    className="booking-item"
                    key={index}
                  >

                    <div
                      className={`booking-icon ${booking.color}`}
                    >
                      {booking.icon}
                    </div>

                    <div className="booking-main">

                      <strong>{booking.type}</strong>

                      <span>{booking.guest}</span>

                    </div>

                    <div className="booking-code">

                      <strong>
                        {booking.number}
                      </strong>

                      <span>
                        {booking.time}
                      </span>

                    </div>

                    <div
                      className={`status ${booking.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {booking.status}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </section>

          {/* ================= BOTTOM GRID ================= */}

          <section className="bottom-grid">

            {/* Top Services */}

            <div className="panel top-services">

              <PanelHeader
                title="Top Services"
                select="This Month"
              />

              <div className="services-list">

                {topServices.map((service, index) => (

                  <div
                    className="service-row"
                    key={index}
                  >

                    <div
                      className="service-icon"
                      style={{
                        color: service.color,
                      }}
                    >
                      {service.icon}
                    </div>

                    <div className="service-name">
                      {service.name}
                    </div>

                    <div className="service-percent">
                      {service.percentage}%
                    </div>

                    <div className="service-progress">

                      <span
                        style={{
                          width: `${service.percentage}%`,
                          background: service.color,
                        }}
                      ></span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Commission */}

            <div className="panel commission-panel">

              <PanelHeader
                title="Commission Overview"
                select="This Month"
              />

              <div className="commission-content">

                <div className="donut-wrapper">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={commissionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={0}
                        startAngle={90}
                        endAngle={-270}
                      >

                        {commissionData.map(
                          (entry, index) => (
                            <Cell
                              key={index}
                              fill={entry.color}
                            />
                          )
                        )}

                      </Pie>

                    </PieChart>

                  </ResponsiveContainer>

                  <div className="donut-center">

                    <strong>
                      ₹ 78,450
                    </strong>

                    <span>
                      Total Commission
                    </span>

                  </div>

                </div>

                <div className="commission-list">

                  {commissionData.map(
                    (item, index) => (

                      <div
                        className="commission-item"
                        key={index}
                      >

                        <span
                          className="commission-dot"
                          style={{
                            background:
                              item.color,
                          }}
                        ></span>

                        <span className="commission-name">
                          {item.name}
                        </span>

                        <strong>
                          ₹{" "}
                          {item.value.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* Quick Actions */}

            <div className="panel quick-panel">

              <h2>Quick Actions</h2>

              <div className="quick-grid">

                <QuickAction
                  icon={<Plus />}
                  label="New Booking"
                  color="green"
                />

                <QuickAction
                  icon={<Users />}
                  label="Guest List"
                  color="orange"
                />

                <QuickAction
                  icon={<BarChart3 />}
                  label="Reports"
                  color="blue"
                />

                <QuickAction
                  icon={<Wallet />}
                  label="Wallet"
                  color="purple"
                />

                <QuickAction
                  icon={<Headphones />}
                  label="Support"
                  color="green"
                />

                <QuickAction
                  icon={<Bell />}
                  label="Notifications"
                  color="blue"
                  badge="12"
                />

              </div>

            </div>

          </section>

          {/* ================= PREMIUM BANNER ================= */}

          <section className="premium-banner">

            <div className="premium-left">

              <div className="crown">
                <Crown size={32} />
              </div>

              <div>

                <h3>
                  You are a Premium Partner
                </h3>

                <p>
                  Enjoy priority support and
                  higher visibility.
                </p>

              </div>

            </div>

            <button className="benefits-button">

              View Benefits

              <ArrowRight size={18} />

            </button>

          </section>

        </div>

      </main>

      {/* Mobile overlay */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

    </div>
  );
}


/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  icon,
  label,
  active,
  arrow,
  open,
  notification,
  onClick,
}) {

  return (

    <div
      className={`sidebar-item ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >

      <div className="sidebar-item-left">

        {icon}

        <span>{label}</span>

      </div>

      {notification && (
        <b className="sidebar-notification">
          {notification}
        </b>
      )}

      {arrow && (
        <ChevronDown
          size={17}
          className={open ? "rotate" : ""}
        />
      )}

    </div>

  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  title,
  value,
  change,
  subtitle,
  type,
  arrow,
}) {

  return (

    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div className="stat-info">

        <span className="stat-title">
          {title}
        </span>

        <strong className="stat-value">
          {value}
        </strong>

        {change && (
          <span className="stat-change">
            {change}
          </span>
        )}

        {subtitle && (
          <span className="stat-subtitle">
            {subtitle}
          </span>
        )}

      </div>

      {arrow && (
        <ChevronRight
          className="stat-arrow"
          size={23}
        />
      )}

      {change && (
        <div className={`mini-chart ${type}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

    </div>

  );
}


/* =========================================================
   PANEL HEADER
========================================================= */

function PanelHeader({
  title,
  select,
}) {

  return (

    <div className="panel-title-row">

      <h2>{title}</h2>

      {select && (
        <button className="period-select">
          {select}
          <ChevronDown size={15} />
        </button>
      )}

    </div>

  );
}


/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  label,
  color,
  badge,
}) {

  return (

    <button className="quick-action">

      <div
        className={`quick-icon ${color}`}
      >
        {icon}

        {badge && (
          <span className="quick-badge">
            {badge}
          </span>
        )}

      </div>

      <span>{label}</span>

    </button>

  );
}


export default HotelDashboard;