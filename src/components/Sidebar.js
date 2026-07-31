import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlaneArrival,
  FaTrain,
  FaCar,
  FaMapMarkedAlt,
  FaRoad,
  FaBus,
  FaCalendarAlt,
  FaClipboardList,
  FaWallet,
  FaChartBar,
  FaBell,
  FaHeadset,
  FaUser,
  FaCog
} from "react-icons/fa";

import "../assets/css/sidebar.css";

function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Airport", icon: <FaPlaneArrival />, path: "/airport" },
    { name: "Railway", icon: <FaTrain />, path: "/railway" },
    { name: "Rental", icon: <FaCar />, path: "/rental" },
    { name: "Sightseeing", icon: <FaMapMarkedAlt />, path: "/sightseeing" },
    { name: "Outstation", icon: <FaRoad />, path: "/outstation" },
    { name: "Transport", icon: <FaBus />, path: "/transport" },
    { name: "Events", icon: <FaCalendarAlt />, path: "/events" },
    { name: "Bookings", icon: <FaClipboardList />, path: "/bookings" },
    { name: "Wallet", icon: <FaWallet />, path: "/wallet" },
    { name: "Reports", icon: <FaChartBar />, path: "/reports" },
    { name: "Notifications", icon: <FaBell />, path: "/notifications" },
    { name: "Support", icon: <FaHeadset />, path: "/support" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h4>ZestGo</h4>
        <span>Hotel Partner</span>
      </div>

      <ul className="sidebar-menu">
        {menu.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;