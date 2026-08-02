import React, { useState } from "react";
import "./login.css";

import logo from "../../images/logo.png";
import bg from "../../images/hotel1.png";

import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaGoogle,
    FaArrowRight,
    FaCalendarAlt,
    FaChartLine,
    FaWallet,
    FaHeadset,
    FaShieldAlt
} from "react-icons/fa";

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: ""

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(formData);

    };

    return (

        <div
            className="login-page"
            style={{
                backgroundImage: `url(${bg})`
            }}
        >
            <div className="overlay"></div>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <div className="col-lg-7 left-content">
                        <div className="left-wrapper">
                            <img
                                src={logo}
                                alt="Logo"
                                className="logo"
                            />
                            <h1>
                                Smart Transport Solutions
                                <br />
                                <span>
                                    for Hotel Partners
                                </span>
                            </h1>
                            <p>
                                Manage bookings, airport transfers,
                                rentals, outstation trips, event transport
                                and business travel with one powerful
                                dashboard.
                            </p>
                            <div className="feature-row">
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaCalendarAlt />
                                    </div>
                                    <h5>
                                        Easy Booking
                                    </h5>
                                    <p>
                                        Book rides within seconds
                                        for your hotel guests.

                                    </p>
                                </div>
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaChartLine />
                                    </div>
                                    <h5>
                                        Live Tracking
                                    </h5>
                                    <p>
                                        Track every booking
                                        in real time.
                                    </p>
                                </div>
                                    <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaWallet />
                                    </div>
                                    <h5>
                                        Secure Payments
                                    </h5>
                                    <p>
                                        Safe wallet, hotel commission
                                        and transaction management.
                                    </p>
                                </div>
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaHeadset />
                                    </div>
                                    <h5>
                                        24/7 Support
                                    </h5>
                                    <p>
                                        Dedicated support whenever
                                        your hotel needs assistance.
                                    </p>
                                </div>
                            </div>
                            <div className="support-box">
                                <div className="support-icon">
                                    <FaShieldAlt />
                                </div>
                                <div>
                                    <h4>
                                        Trusted by Hotel Partners
                                    </h4>
                                    <p>
                                        Fast booking • Live Driver Tracking •
                                        Secure Payments • Professional Support
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*======================================
                            RIGHT LOGIN CARD
                    ======================================*/}
                    <div className="col-lg-5 d-flex align-items-center justify-content-center">
                        <div className="login-card">
                            <h2>
                                Welcome Back!
                            </h2>
                            <p className="sub-title">
                                Login to your Hotel Partner Account
                            </p>
                            <form onSubmit={handleLogin}>
                                <label>
                                    Email / Mobile Number
                                </label>
                                <div className="input-group custom-input">
                                    <span className="input-group-text">
                                        <FaUser />
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter Email or Mobile Number"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <label>
                                    Password
                                </label>
                                <div className="input-group custom-input">
                                    <span className="input-group-text">
                                        <FaLock />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                                                        <span
                                        className="input-group-text eye"
                                        onClick={togglePassword}
                                    >
                                        {
                                            showPassword ?
                                            <FaEyeSlash />
                                            :
                                            <FaEye />
                                        }
                                    </span>
                                </div>
                                <div className="forgot-password">
                                    <a href="/forgot-password">
                                        Forgot Password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="btn login-btn"
                                >
                                    Login
                                    <FaArrowRight className="ms-2" />
                                </button>
                                <div className="divider">
                                    <span>
                                        OR
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="btn google-btn"
                                >
                                    <FaGoogle className="me-2" />
                                    Continue with Google
                                </button>
                                <div className="register">
                                    Don't have an account?
                                    <a href="/register">
                                        Register Now
                                    </a>
                                </div>
                                <div className="security-box">
                                    <FaShieldAlt className="security-icon" />
                                    <div>
                                        <h6>
                                            Secure Login
                                        </h6>
                                        <p>
                                            Your credentials are encrypted
                                            and protected using secure
                                            authentication.
                                        </p>
                                    </div>
                                </div>
                                <div className="copyright">
                                    © 2026 ZestGo Hotel Partner Portal
                                </div>
                                <div className="login-footer">
                                    <div className="footer-item">
                                        <strong>24/7</strong>
                                        <span>Support</span>
                                    </div>
                                    <div className="footer-divider"></div>
                                    <div className="footer-item">
                                        <strong>100%</strong>
                                        <span>Secure</span>
                                    </div>
                                    <div className="footer-divider"></div>
                                    <div className="footer-item">
                                        <strong>Fast</strong>
                                        <span>Booking</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;