import React, { useState } from "react";
import "./login.css";

import logo from "../../images/logo.png";
import bg from "../../images/hotel1.png";

import {
    FaEnvelope,
    FaMobileAlt,
    FaArrowRight,
    FaArrowLeft,
    FaShieldAlt,
    FaHeadset,
    FaCheckCircle
} from "react-icons/fa";

function ForgotPassword() {
    const [identifier, setIdentifier] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(identifier);
    };
    return (
        <div
            className="login-page"
            style={{
                backgroundImage: `url(${bg})`
            }}
        >
            <div className="overlay"></div>
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* LEFT SECTION */}
                    <div className="col-lg-7 left-content">
                        <div className="left-wrapper">
                            <img
                                src={logo}
                                alt="ZestGo"
                                className="logo"
                            />
                            <h1>
                                Forgot Your
                                <br />
                                <span>Password?</span>
                            </h1>
                            <p>
                                Recover your account securely using
                                your registered Email Address or
                                Mobile Number.
                            </p>
                            <div className="feature-row">
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaCheckCircle />
                                    </div>
                                    <h5>
                                        Secure Reset
                                    </h5>
                                    <p>
                                        OTP based password recovery.
                                    </p>
                                </div>
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaEnvelope />
                                    </div>
                                    <h5>
                                        Email Verification
                                    </h5>
                                    <p>
                                        Receive reset instructions instantly.
                                    </p>
                                </div>
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaMobileAlt />
                                    </div>
                                    <h5>
                                        Mobile OTP
                                    </h5>
                                    <p>
                                        Verify using your registered mobile.
                                    </p>
                                </div>
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaHeadset />
                                    </div>
                                    <h5>
                                        24×7 Support
                                    </h5>
                                    <p>
                                        Our team is always available.
                                    </p>
                                </div>
                            </div>
                            <div className="support-box">
                                <div className="support-icon">
                                    <FaShieldAlt />
                                </div>
                                <div>
                                    <h4>
                                        Secure Password Recovery
                                    </h4>
                                    <p>
                                        Your account is protected using
                                        encrypted verification and OTP
                                        authentication.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT SECTION */}
                    <div className="col-lg-5 d-flex justify-content-center align-items-center">
                        <div className="login-card">
                            <h2>
                                Forgot Password
                            </h2>
                            <p className="sub-title">
                                Enter your registered Email Address or
                                Mobile Number.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Email Address / Mobile Number
                                </label>
                                <div className="input-group custom-input">
                                    <span className="input-group-text">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="text"
                                        name="identifier"
                                        className="form-control"
                                        placeholder="Enter Email Address or Mobile Number"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="security-box">
                                    <FaShieldAlt className="security-icon" />
                                    <div>
                                        <h6>
                                            Secure Verification
                                        </h6>
                                        <p>
                                            A One-Time Password (OTP)
                                            will be sent to your
                                            registered Email Address
                                            or Mobile Number for
                                            verification.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn login-btn"
                                >
                                    Send OTP
                                    <FaArrowRight className="ms-2" />
                                </button>
                                <div className="divider">
                                    <span>
                                        OR
                                    </span>
                                </div>
                                <a
                                    href="/"
                                    className="btn google-btn"
                                >
                                    <FaArrowLeft className="me-2" />
                                    Back to Login
                                </a>
                                <div className="help-box">
                                    <div className="help-icon">
                                        <FaHeadset />
                                    </div>
                                    <div className="help-content">
                                        <h5>
                                            Need Help?
                                        </h5>
                                        <p>
                                            Contact the ZestGo Support
                                            Team if you cannot access
                                            your registered Email or
                                            Mobile Number.
                                        </p>
                                    </div>
                                </div>
                              <div className="copyright">
                                    © 2026 ZestGo Hotel Partner Portal
                                </div>
                                <div className="login-footer">
                                    <div className="footer-item">
                                        <strong>
                                            24×7
                                        </strong>
                                        <span>
                                            Support
                                        </span>
                                    </div>
                                    <div className="footer-divider"></div>
                                    <div className="footer-item">
                                        <strong>
                                            Secure
                                        </strong>
                                        <span>
                                            OTP
                                        </span>
                                    </div>
                                    <div className="footer-divider"></div>
                                    <div className="footer-item">
                                        <strong>
                                            Fast
                                        </strong>
                                        <span>
                                            Recovery
                                        </span>
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

export default ForgotPassword;