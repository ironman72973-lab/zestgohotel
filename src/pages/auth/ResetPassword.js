import React, { useState } from "react";
import "./login.css";

import logo from "../../assets/images/logo.png";
import bg from "../../assets/images/login-bg.jpg";

import {
    FaLock,
    FaKey,
    FaEye,
    FaEyeSlash,
    FaArrowLeft,
    FaCheckCircle,
    FaShieldAlt,
    FaHeadset
} from "react-icons/fa";

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        otp: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
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
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/*=========================
                            LEFT SECTION
                    =========================*/}
                    <div className="col-lg-7 left-content">
                        <div className="left-wrapper">
                            <img
                                src={logo}
                                className="logo"
                                alt="ZestGo"
                            />
                            <h1>
                                Create Your
                                <br />
                                <span>New Password</span>
                            </h1>
                            <p>
                                Your identity has been verified.
                                Create a strong password to keep
                                your Hotel Partner account safe.
                            </p>
                            <div className="feature-row">
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaKey />
                                    </div>
                                    <h5>
                                        OTP Verified
                                    </h5>
                                    <p>
                                        Your account has been
                                        securely verified.
                                    </p>
                                </div>
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaLock />
                                    </div>
                                    <h5>
                                        Strong Password
                                    </h5>
                                    <p>
                                        Create a password that
                                        protects your account.
                                    </p>
                                </div>
                                <div className="feature-box">
                                    <div className="feature-icon">
                                        <FaShieldAlt />
                                    </div>
                                    <h5>
                                        Encrypted Security
                                    </h5>
                                    <p>
                                        Passwords are securely
                                        encrypted.
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
                                        Assistance whenever
                                        you need it.
                                    </p>
                                </div>
                            </div>
                            <div className="support-box">
                                <div className="support-icon">
                                    <FaCheckCircle />
                                </div>
                                <div>
                                    <h4>
                                        Almost Done
                                    </h4>
                                    <p>
                                        Create a strong password
                                        and you'll be able to log
                                        in immediately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=========================
                            RIGHT CARD
                    =========================*/}
                    <div className="col-lg-5 d-flex justify-content-center align-items-center">
                        <div className="login-card">
                            <h2>
                                Reset Password
                            </h2>
                            <p className="sub-title">
                                Enter the OTP and create your
                                new password.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    OTP Verification Code
                                </label>
                                <div className="input-group custom-input">
                                    <span className="input-group-text">
                                        <FaKey />
                                    </span>
                                    <input
                                        type="text"
                                        name="otp"
                                        className="form-control"
                                        placeholder="Enter 6 Digit OTP"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        maxLength="6"
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <label>
                                    New Password
                                </label>
                                <div className="input-group custom-input">
                                    <span className="input-group-text">
                                        <FaLock />
                                    </span>
                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        className="form-control"
                                        placeholder="Create New Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <span
                                        className="input-group-text eye"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {

                                            showPassword
                                            ?
                                            <FaEyeSlash />
                                            :
                                            <FaEye />
                                        }
                                    </span>
                                </div>
                                <label>
                                    Confirm Password
                                </label>
                                <div className="input-group custom-input">
                                    <span className="input-group-text">
                                        <FaLock />
                                    </span>
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm New Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <span
                                        className="input-group-text eye"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {

                                            showConfirmPassword
                                            ?
                                            <FaEyeSlash />
                                            :
                                            <FaEye />
                                        }
                                    </span>
                                </div>
                                <div className="security-box">
                                    <FaShieldAlt
                                        className="security-icon"
                                    />
                                    <div>
                                        <h6>
                                            Password Security
                                        </h6>
                                        <p>
                                            Use at least 8 characters
                                            with uppercase, lowercase,
                                            numbers and special
                                            characters for maximum
                                            protection.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn login-btn"
                                >
                                    Reset Password
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
                                            If you're unable to reset
                                            your password, contact the
                                            ZestGo Support Team for
                                            secure account verification.
                                        </p>
                                    </div>
                                </div>
                                <div className="copyright">
                                    © 2026 ZestGo Hotel Partner Portal
                                </div>
                                <div className="login-footer">
                                    <div className="footer-item">
                                        <strong>
                                            Secure
                                        </strong>
                                        <span>
                                            Reset
                                        </span>
                                    </div>
                                    <div className="footer-divider"></div>
                                    <div className="footer-item">
                                        <strong>
                                            OTP
                                        </strong>
                                        <span>
                                            Verified
                                        </span>
                                    </div>
                                    <div className="footer-divider"></div>
                                    <div className="footer-item">
                                        <strong>
                                            Protected
                                        </strong>
                                        <span>
                                            Account
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

export default ResetPassword;