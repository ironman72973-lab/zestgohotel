import React,{useState} from "react";
import "./dashboard.css";
import dashboard from "../../data/dashboard.json";
import menu from "../../data/menu.json";
import bookings from "../../data/bookings.json";
import notifications from "../../data/notifications.json";
import services from "../../data/services.json";
import reports from "../../data/reports.json";
import wallet from "../../data/wallet.json";
import charts from "../../data/charts.json";
import dashboardBg from "../../images/hotel.png";
import{
    FaBars,
    FaBell,
    FaSearch,
    FaUserCircle,
    FaHome,
    FaPlane,
    FaTrain,
    FaCar,
    FaMapMarkedAlt,
    FaBus,
    FaGlassCheers,
    FaWallet,
    FaChartBar,
    FaHeadset,
    FaCog,
    FaCalendarCheck,
    FaCheckCircle,
    FaChevronRight,
    FaSignOutAlt
}from"react-icons/fa";
import{
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
}from"recharts";
function Dashboard(){
    const[sidebarOpen,setSidebarOpen]=useState(true);
    const toggleSidebar=()=>{
        setSidebarOpen(!sidebarOpen);
    };
    const iconMap={
        home:<FaHome/>,
        airport:<FaPlane/>,
        railway:<FaTrain/>,
        rental:<FaCar/>,
        sightseeing:<FaMapMarkedAlt/>,
        outstation:<FaBus/>,
        transport:<FaBus/>,
        events:<FaGlassCheers/>,
        bookings:<FaCalendarCheck/>,
        wallet:<FaWallet/>,
        reports:<FaChartBar/>,
        support:<FaHeadset/>,
        settings:<FaCog/>,
        completed:<FaCheckCircle/>
    };
    return(
        <div
    className="dashboard"
    style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
    }}
>
            <aside className={sidebarOpen?"sidebar":"sidebar collapsed"}><div className="sidebar-header">
    <div className="logo-area">
        <img
            src="/logo.png"
            alt="ZestGo"
            className="logo"
        />
        {sidebarOpen && (
            <div className="logo-text">
                <h3>ZestGo</h3>
                <span>Hotel Partner</span>
            </div>
        )}
    </div>
</div>
<div className="hotel-profile">
    <img
        src="https://i.pravatar.cc/80"
        alt="Hotel"
        className="hotel-avatar"
    />
    {sidebarOpen && (
        <>
            <h5>{dashboard.hotel.name}</h5>
            <p>{dashboard.hotel.location}</p>
        </>
    )}
</div>
<nav className="sidebar-menu">
    {menu.map((item,index)=>(
        <div
            className="menu-item"
            key={index}
        >
            <div className="menu-left">
                <span className="menu-icon">
                    {iconMap[item.icon]}
                </span>
                {sidebarOpen&&(
                    <span className="menu-title">
                        {item.title}
                    </span>
                )}
            </div>
            {sidebarOpen&&(
                <FaChevronRight className="menu-arrow"/>
            )}
        </div>
    ))}
</nav>
<div className="sidebar-footer">
    <div className="menu-item logout">
        <div className="menu-left">
            <span className="menu-icon">
                <FaSignOutAlt/>
            </span>
            {sidebarOpen&&(
                <span className="menu-title">
                    Logout
                </span>
            )}
        </div>
    </div>
</div>
</aside>
<div
    className="main-content"
    style={{
        backgroundImage: `url(${dashboardBg})`
    }}
>
    <header className="top-header">
    <div className="header-left">
        <button
            className="menu-btn"
            onClick={toggleSidebar}
        >
            <FaBars/>
        </button>
        <div className="header-title">
            <h2>
                Dashboard
            </h2>
            <span>
                {dashboard.hotel.welcome},
                {dashboard.hotel.name}
            </span>
        </div>
    </div>
    <div className="header-right">
        <div className="search-box">
            <FaSearch className="search-icon"/>
            <input
                type="text"
                placeholder="Search booking, guest, driver..."
            />
        </div>
        <button className="icon-btn">
            <FaBell/>
            <span className="notification-count">
                {notifications.length}
            </span>
        </button>
        <div className="profile-box">
            <FaUserCircle className="profile-icon"/>
            <div className="profile-info">
                <h6>
                    Hotel Admin
                </h6>
                <span>
                    Partner Portal
                </span>
            </div>
        </div>
    </div>
</header>
<section className="hero-banner"
    style={{
        backgroundImage: `url(${dashboardBg})`
    }}>
    <div className="hero-overlay">
        <div className="hero-content">
            <span className="hero-badge">
                Premium Hotel Partner
            </span>
            <h1>
                Welcome Back,
                {dashboard.hotel.name}
            </h1>
            <p>
                Manage airport transfers, rentals,
                outstation trips, transport and
                event bookings from one dashboard.
            </p>
            <div className="hero-buttons">
                <button className="btn btn-success">
                    New Booking
                </button>
                <button className="btn btn-light">
                    View Reports
                </button>
            </div>
        </div>
    </div>
</section>
<section className="stats-section">
    <div className="row g-4">
        {dashboard.statistics.map((item,index)=>(
    <div
        className="col-xl-3 col-lg-6 col-md-6"
        key={index}
    >
        <div className={`stats-card ${item.color}`}>
            <div className="stats-top">
                <div className="stats-icon">
                    {iconMap[item.icon]}
                </div>
                <div className="stats-growth">
                    <span className="growth-up">
                        +12.5%
                    </span>
                </div>
            </div>
            <div className="stats-body">
                <h3>
                    {item.value}
                </h3>
                <p>
                    {item.title}
                </p>
            </div>
            <div className="stats-footer">
                <small>
                    Compared to yesterday
                </small>
            </div>
        </div>
    </div>
))}
</div>
</section>
<section className="overview-section">
    <div className="row g-4">
        <div className="col-xl-8">
            <div className="dashboard-card">
                <div className="card-header">
                    <div>
                        <h4>
                            Booking Overview
                        </h4>
                        <span>
                            Last 7 Days Performance
                        </span>
                    </div>
                    <button className="btn btn-success btn-sm">
                        View Details
                    </button>
                </div>
                <div className="card-body">
                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >
                        <BarChart
                            data={charts.bookingOverview}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="day"
                            />
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar
                                dataKey="bookings"
                                radius={[8,8,0,0]}
                                fill="#198754"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        <div className="col-xl-4">
            <div className="dashboard-card">
                <div className="card-header">
                    <h4>
                        Quick Summary
                    </h4>
                </div>
                <div className="card-body">
                    <div className="summary-item">
                        <span>
                            Total Bookings
                        </span>
                        <strong>
                            {reports.totalBookings}
                        </strong>
                    </div>
                    <div className="summary-item">
                        <span>
                            Completed
                        </span>
                        <strong>
                            {reports.completedTrips}
                        </strong>
                    </div>
                    <div className="summary-item">
                        <span>
                            Cancelled
                        </span>
                        <strong>
                            {reports.cancelledTrips}
                        </strong>
                    </div>
                    <div className="summary-item">
                        <span>
                            Wallet Balance
                        </span>
                        <strong>
                            ₹{wallet.balance}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section className="recent-bookings">
    <div className="row g-4">
        <div className="col-xl-8">
            <div className="dashboard-card">
                <div className="card-header">
                    <div>
                        <h4>
                            Recent Bookings
                        </h4>
                        <span>
                            Latest bookings received today
                        </span>
                    </div>
                    <button className="btn btn-success btn-sm">
                        View All
                    </button>
                </div>
                <div className="card-body p-0">
                    <table className="table booking-table mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Guest</th>
                                <th>Service</th>
                                <th>Vehicle</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking,index)=>(
                                <tr key={index}>
                                    <td>
                                        {booking.id}
                                    </td>
                                    <td>
                                        {booking.guest}
                                    </td>
                                    <td>
                                        {booking.service}
                                    </td>
                                    <td>
                                        {booking.vehicle}
                                    </td>
                                    <td>
                                        ₹{booking.amount}
                                    </td>
                                    <td>
                                        <span
                                            className={`status-badge ${booking.status.toLowerCase()}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="col-xl-4">
            <div className="dashboard-card">
                <div className="card-header">
                    <h4>
                        Top Services
                    </h4>
                </div>
                <div className="card-body">
                    {services.map((service,index)=>(
                        <div
                            className="service-item"
                            key={index}
                        >
                            <div>
                                <h6>
                                    {service.name}
                                </h6>
                                <span>
                                    {service.bookings} Bookings
                                </span>
                            </div>
                            <div
                                className="service-progress"
                            >
                                <div
                                    className="progress"
                                >
                                    <div
                                        className="progress-bar bg-success"
                                        style={{
                                            width:`${service.percentage}%`
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</section>
<section className="revenue-section">
    <div className="row g-4">
        <div className="col-xl-6">
            <div className="dashboard-card">
                <div className="card-header">
                    <h4>
                        Monthly Revenue
                    </h4>
                </div>
                <div className="card-body">
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <LineChart
                            data={charts.revenue}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="month"
                            />
                            <YAxis/>
                            <Tooltip/>
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#198754"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        <div className="col-xl-6">
            <div className="dashboard-card">
                <div className="card-header">
                    <h4>
                        Booking Distribution
                    </h4>
                </div>
                <div className="card-body">
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <PieChart>
                            <Pie
                                data={charts.services}
                                dataKey="value"
                                outerRadius={100}
                            >
                                {charts.services.map((entry,index)=>(
                                    <Cell
                                        key={index}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
</section>
<section className="wallet-section">
    <div className="row g-4">
        <div className="col-xl-4">
            <div className="dashboard-card">
                <div className="card-header">
                    <h4>
                        Wallet Overview
                    </h4>
                </div>
                <div className="card-body">
                    <div className="wallet-card">
                        <FaWallet className="wallet-icon"/>
                        <h2>
                            ₹{wallet.balance}
                        </h2>
                        <span>
                            Available Balance
                        </span>
                    </div>
                    <div className="wallet-list">
                        <div className="wallet-item">
                            <span>
                                Today's Earnings
                            </span>
                            <strong>
                                ₹{wallet.today}
                            </strong>
                        </div>
                        <div className="wallet-item">
                            <span>
                                Monthly Earnings
                            </span>
                            <strong>
                                ₹{wallet.month}
                            </strong>
                        </div>
                        <div className="wallet-item">
                            <span>
                                Pending Settlement
                            </span>
                            <strong>
                                ₹{wallet.pending}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-xl-4">
            <div className="dashboard-card">
                <div className="card-header">
                    <h4>
                        Commission
                    </h4>
                </div>
                <div className="card-body">
                    <ResponsiveContainer
                        width="100%"
                        height={250}
                    >
                        <BarChart
                            data={charts.commission}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="month"
                            />
                            <YAxis/>
                            <Tooltip/>
                            <Bar
                                dataKey="amount"
                                fill="#ff9800"
                                radius={[8,8,0,0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        <div className="col-xl-4">
            <div className="dashboard-card">
                <div className="card-header">
                    <h4>
                        Notifications
                    </h4>
                </div>
                <div className="card-body">
                    {notifications.map((item,index)=>(
                        <div
                            className="notification-item"
                            key={index}
                        >
                            <div className="notification-icon">
                                <FaBell/>
                            </div>
                            <div className="notification-content">
                                <h6>
                                    {item.title}
                                </h6>
                                <span>
                                    {item.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</section>
<footer className="dashboard-footer">
    <p>
        © 2026 ZestGo Hotel Partner Portal.
        All Rights Reserved.
    </p>
</footer>
</div>
</div>
);
}
export default Dashboard;