import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h5>ZestGo Hotel Partner</h5>
          <p>
            Smart hotel transportation booking platform for Airport, Railway,
            Rental, Outstation, Events and Transport services.
          </p>
        </div>

        <div className="footer-center">
          <h6>Quick Links</h6>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/bookings">Bookings</a></li>
            <li><a href="/wallet">Wallet</a></li>
            <li><a href="/reports">Reports</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h6>Support</h6>
          <p>Email: support@zestgo.in</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {year} ZestGo Hotel Partner. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;