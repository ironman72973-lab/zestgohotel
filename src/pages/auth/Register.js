
import React, { useState } from "react";
import "./register.css";

import logo from "../../images/logo.png";
import bg from "../../images/hotel1.png";

import {
    FaHotel,
    FaUser,
    FaUserTie,
    FaPhone,
    FaWhatsapp,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaMapMarkerAlt,
    FaMapPin,
    FaCrosshairs,
    FaIdCard,
    FaArrowRight,
    FaShieldAlt,
    FaStar,
    FaCity,
    FaGlobeAsia,
    FaClock,
    FaSatelliteDish,
    FaFileInvoice
} from "react-icons/fa";


function Registration() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [locationLoading, setLocationLoading] = useState(false);
    const [locationMessage, setLocationMessage] = useState("");

    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerMessage, setRegisterMessage] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);


    const [formData, setFormData] = useState({

        /* =====================================================
           HOTEL DETAILS
           ===================================================== */

        hotel_registration_id: "ZGHTLE000001",

        hotel_name: "",
        hotel_type: "",
        star_category: "",


        /* =====================================================
           CONTACT PERSON
           ===================================================== */

        contact_person_name: "",
        designation: "",
        mobile: "",
        whatsapp: "",
        email: "",


        /* =====================================================
           LOGIN DETAILS
           ===================================================== */

        username: "",
        password: "",
        confirm_password: "",


        /* =====================================================
           HOTEL LOCATION
           ===================================================== */

        address_line1: "",
        address_line2: "",
        area_locality: "",
        city: "",
        district: "",
        state: "",
        pincode: "",


        /* =====================================================
           GPS GEO TAGGING
           ===================================================== */

        latitude: "",
        longitude: "",
        gps_accuracy: "",
        location_captured_at: "",
        location_source: "",


        /* =====================================================
           BUSINESS / TAX DETAILS
           ===================================================== */

        gst_number: "",
        pan_number: "",


        /* =====================================================
           TERMS
           ===================================================== */

        terms: false

    });


    /* =========================================================
       HANDLE INPUT CHANGE
       ========================================================= */

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));
    };


    /* =========================================================
       PASSWORD TOGGLE
       ========================================================= */

    const togglePassword = () => {

        setShowPassword(
            (prev) => !prev
        );

    };


    const toggleConfirmPassword = () => {

        setShowConfirmPassword(
            (prev) => !prev
        );

    };


    /* =========================================================
       CURRENT LOCATION
       ========================================================= */

    const getCurrentLocation = () => {

        if (!navigator.geolocation) {

            setLocationMessage(
                "Geolocation is not supported by this browser."
            );

            return;
        }


        setLocationLoading(true);
        setLocationMessage("");


        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                const accuracy =
                    position.coords.accuracy;


                const capturedAt =
                    new Date()
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " ");


                /* -----------------------------------------
                   SAVE GPS DATA
                   ----------------------------------------- */

                setFormData((prev) => ({

                    ...prev,

                    latitude:
                        latitude.toFixed(7),

                    longitude:
                        longitude.toFixed(7),

                    gps_accuracy:
                        accuracy.toFixed(2),

                    location_captured_at:
                        capturedAt,

                    location_source:
                        "GPS"

                }));


                /* -----------------------------------------
                   REVERSE GEOCODING
                   ----------------------------------------- */

                try {

                    const response =
                        await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Reverse geocoding failed"
                        );

                    }


                    const data =
                        await response.json();


                    if (
                        data &&
                        data.address
                    ) {

                        const address =
                            data.address;


                        setFormData((prev) => ({

                            ...prev,

                            address_line1:
                                data.display_name ||
                                prev.address_line1,

                            area_locality:
                                address.suburb ||
                                address.neighbourhood ||
                                address.city_district ||
                                prev.area_locality,

                            city:
                                address.city ||
                                address.town ||
                                address.village ||
                                prev.city,

                            district:
                                address.state_district ||
                                address.county ||
                                prev.district,

                            state:
                                address.state ||
                                prev.state,

                            pincode:
                                address.postcode ||
                                prev.pincode,

                            latitude:
                                latitude.toFixed(7),

                            longitude:
                                longitude.toFixed(7),

                            gps_accuracy:
                                accuracy.toFixed(2),

                            location_captured_at:
                                capturedAt,

                            location_source:
                                "GPS"

                        }));

                    }


                    setLocationMessage(
                        "Hotel location captured successfully."
                    );


                } catch (error) {

                    setLocationMessage(
                        "GPS captured, but address could not be detected. Please enter the address manually."
                    );

                }


                setLocationLoading(false);

            },


            (error) => {

                let message =
                    "Unable to get your location.";


                if (error.code === 1) {

                    message =
                        "Location permission was denied. Please allow location access.";

                }


                if (error.code === 2) {

                    message =
                        "Your location could not be determined.";

                }


                if (error.code === 3) {

                    message =
                        "Location request timed out. Please try again.";

                }


                setLocationMessage(message);

                setLocationLoading(false);

            },


            {

                enableHighAccuracy: true,

                timeout: 15000,

                maximumAge: 0

            }

        );

    };


    /* =========================================================
       VALIDATE FORM
       ========================================================= */

    const validateForm = () => {

        if (!formData.hotel_name.trim()) {

            alert(
                "Please enter the hotel name."
            );

            return false;

        }


        if (!formData.hotel_type) {

            alert(
                "Please select hotel type."
            );

            return false;

        }


        if (!formData.star_category) {

            alert(
                "Please select star category."
            );

            return false;

        }


        if (
            !formData.contact_person_name.trim()
        ) {

            alert(
                "Please enter contact person name."
            );

            return false;

        }


        if (!formData.designation.trim()) {

            alert(
                "Please enter designation."
            );

            return false;

        }


        if (
            !/^[0-9]{10}$/.test(
                formData.mobile
            )
        ) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return false;

        }


        if (
            formData.whatsapp &&
            !/^[0-9]{10}$/.test(
                formData.whatsapp
            )
        ) {

            alert(
                "Please enter a valid 10-digit WhatsApp number."
            );

            return false;

        }


        if (!formData.email.trim()) {

            alert(
                "Please enter email address."
            );

            return false;

        }


        if (!formData.username.trim()) {

            alert(
                "Please create a username."
            );

            return false;

        }


        if (
            formData.password.length < 6
        ) {

            alert(
                "Password must contain at least 6 characters."
            );

            return false;

        }


        if (
            formData.password !==
            formData.confirm_password
        ) {

            alert(
                "Password and Confirm Password do not match."
            );

            return false;

        }


        if (
            !formData.address_line1.trim()
        ) {

            alert(
                "Please enter hotel address."
            );

            return false;

        }


        if (
            !formData.area_locality.trim()
        ) {

            alert(
                "Please enter area / locality."
            );

            return false;

        }


        if (!formData.city.trim()) {

            alert(
                "Please enter city."
            );

            return false;

        }


        if (!formData.district.trim()) {

            alert(
                "Please enter district."
            );

            return false;

        }


        if (!formData.state) {

            alert(
                "Please select state."
            );

            return false;

        }


        if (
            !/^[0-9]{6}$/.test(
                formData.pincode
            )
        ) {

            alert(
                "Please enter a valid 6-digit pincode."
            );

            return false;

        }


        if (
            !formData.latitude ||
            !formData.longitude
        ) {

            alert(
                "Please capture the hotel location before registration."
            );

            return false;

        }


        if (!formData.terms) {

            alert(
                "Please accept the Terms & Conditions."
            );

            return false;

        }


        return true;

    };


    /* =========================================================
       REGISTER HOTEL
       ========================================================= */

    const handleRegister = async (e) => {

        e.preventDefault();


        setRegisterMessage("");
        setRegistrationSuccess(false);


        if (!validateForm()) {

            return;

        }


        setRegisterLoading(true);


        try {

            /* =================================================
               SEND DATA TO PHP
               ================================================= */

            const response = await fetch(
                "http://localhost/api/hotel_register.php",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        ...formData,

                        /*
                         * The Property ID must NOT be trusted
                         * from React.
                         *
                         * PHP + MySQL will generate the
                         * permanent ID:
                         *
                         * ZGHTLE000001
                         * ZGHTLE000002
                         * ZGHTLE000003
                         *
                         * etc.
                         */

                        hotel_registration_id: null

                    })

                }
            );


            if (!response.ok) {

                throw new Error(
                    "Server returned an error."
                );

            }


            const result =
                await response.json();


            /* =================================================
               REGISTRATION SUCCESS
               ================================================= */

            if (result.success) {

                const generatedId =
                    result.hotel_registration_id ||
                    result.registration_id;


                if (generatedId) {

                    setFormData((prev) => ({

                        ...prev,

                        hotel_registration_id:
                            generatedId

                    }));

                }


                setRegistrationSuccess(true);


                setRegisterMessage(

                    result.message ||
                    "Hotel Partner registration completed successfully."

                );


                alert(

                    generatedId

                        ? `Registration successful.\n\nHotel Registration ID: ${generatedId}`

                        : "Registration successful."

                );


            } else {

                setRegisterMessage(

                    result.message ||
                    "Registration failed. Please try again."

                );

            }


        } catch (error) {

            console.error(
                "Registration Error:",
                error
            );


            setRegisterMessage(

                "Unable to connect to the registration server. Please check your PHP API."

            );


        } finally {

            setRegisterLoading(false);

        }

    };


    return (

        <div
            className="registration-page"
            style={{
                backgroundImage:
                    `url(${bg})`
            }}
        >

            <div className="overlay"></div>


            <div className="registration-wrapper">


                {/* =================================================
                    HEADER
                   ================================================= */}

                <div className="registration-header">

                    <img
                        src={logo}
                        alt="ZestGo Logo"
                        className="registration-logo"
                    />


                    <h1>
                        Hotel Partner Registration
                    </h1>


                    <p>
                        Create your ZestGo Hotel Partner Account
                    </p>

                </div>


                {/* =================================================
                    REGISTRATION FORM
                   ================================================= */}

                <form
                    className="registration-card"
                    onSubmit={handleRegister}
                >


                    {/* =================================================
                        HOTEL DETAILS
                       ================================================= */}

                    <div className="form-section">

                        <div className="form-section-title">

                            <FaHotel />

                            <span>
                                Hotel Details
                            </span>

                        </div>


                        <div className="form-row">


                            {/* PROPERTY ID */}

                            <div className="form-col">

                                <label>
                                    Hotel Registration / Property ID
                                </label>


                                <div className="icon-input">

                                    <FaIdCard
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="hotel_registration_id"
                                        value={
                                            formData.hotel_registration_id
                                        }
                                        className="form-control"
                                        readOnly
                                    />

                                </div>

                            </div>


                            {/* HOTEL NAME */}

                            <div className="form-col">

                                <label>
                                    Hotel Name
                                </label>


                                <div className="icon-input">

                                    <FaHotel
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="hotel_name"
                                        value={
                                            formData.hotel_name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter hotel name"
                                        required
                                    />

                                </div>

                            </div>


                            {/* HOTEL TYPE */}

                            <div className="form-col">

                                <label>
                                    Hotel Type
                                </label>


                                <div className="icon-input">

                                    <FaHotel
                                        className="field-icon"
                                    />


                                    <select
                                        name="hotel_type"
                                        value={
                                            formData.hotel_type
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        required
                                    >

                                        <option value="">
                                            Select hotel type
                                        </option>

                                        <option value="Hotel">
                                            Hotel
                                        </option>

                                        <option value="Resort">
                                            Resort
                                        </option>

                                        <option value="Guest House">
                                            Guest House
                                        </option>

                                        <option value="Lodge">
                                            Lodge
                                        </option>

                                        <option value="Homestay">
                                            Homestay
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* STAR CATEGORY */}

                            <div className="form-col">

                                <label>
                                    Star Category
                                </label>


                                <div className="icon-input">

                                    <FaStar
                                        className="field-icon"
                                    />


                                    <select
                                        name="star_category"
                                        value={
                                            formData.star_category
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        required
                                    >

                                        <option value="">
                                            Select star category
                                        </option>

                                        <option value="1 Star">
                                            1 Star
                                        </option>

                                        <option value="2 Star">
                                            2 Star
                                        </option>

                                        <option value="3 Star">
                                            3 Star
                                        </option>

                                        <option value="4 Star">
                                            4 Star
                                        </option>

                                        <option value="5 Star">
                                            5 Star
                                        </option>

                                        <option value="Unrated">
                                            Unrated
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        CONTACT PERSON
                       ================================================= */}

                    <div className="form-section">

                        <div className="form-section-title">

                            <FaUser />

                            <span>
                                Contact Person
                            </span>

                        </div>


                        <div className="form-row">


                            <div className="form-col">

                                <label>
                                    Contact Person Name
                                </label>


                                <div className="icon-input">

                                    <FaUser
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="contact_person_name"
                                        value={
                                            formData.contact_person_name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter contact person name"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    Designation
                                </label>


                                <div className="icon-input">

                                    <FaUserTie
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="designation"
                                        value={
                                            formData.designation
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Manager / Owner / Reception"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    Mobile Number
                                </label>


                                <div className="icon-input">

                                    <FaPhone
                                        className="field-icon"
                                    />


                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={
                                            formData.mobile
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter mobile number"
                                        maxLength="10"
                                        inputMode="numeric"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>

                                    WhatsApp Number

                                    <span className="optional">
                                        Optional
                                    </span>

                                </label>


                                <div className="icon-input">

                                    <FaWhatsapp
                                        className="field-icon whatsapp-icon"
                                    />


                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        value={
                                            formData.whatsapp
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter WhatsApp number"
                                        maxLength="10"
                                        inputMode="numeric"
                                    />

                                </div>

                            </div>


                            <div className="form-col-full">

                                <label>
                                    Email Address
                                </label>


                                <div className="icon-input">

                                    <FaEnvelope
                                        className="field-icon"
                                    />


                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter hotel email address"
                                        required
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        LOGIN DETAILS
                       ================================================= */}

                    <div className="form-section">

                        <div className="form-section-title">

                            <FaLock />

                            <span>
                                Login Details
                            </span>

                        </div>


                        <div className="form-row">


                            <div className="form-col">

                                <label>
                                    Username
                                </label>


                                <div className="icon-input">

                                    <FaUser
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="username"
                                        value={
                                            formData.username
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Create username"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    Password
                                </label>


                                <div className="icon-input">

                                    <FaLock
                                        className="field-icon"
                                    />


                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={
                                            formData.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Create password"
                                        required
                                    />


                                    <button
                                        type="button"
                                        className="password-eye"
                                        onClick={
                                            togglePassword
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {
                                            showPassword
                                                ? <FaEyeSlash />
                                                : <FaEye />
                                        }

                                    </button>

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    Confirm Password
                                </label>


                                <div className="icon-input">

                                    <FaLock
                                        className="field-icon"
                                    />


                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirm_password"
                                        value={
                                            formData.confirm_password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Confirm password"
                                        required
                                    />


                                    <button
                                        type="button"
                                        className="password-eye"
                                        onClick={
                                            toggleConfirmPassword
                                        }
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {
                                            showConfirmPassword
                                                ? <FaEyeSlash />
                                                : <FaEye />
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        HOTEL LOCATION
                       ================================================= */}

                    <div className="form-section">

                        <div className="form-section-title">

                            <FaMapMarkerAlt />

                            <span>
                                Hotel Location
                            </span>

                        </div>


                        <div className="form-row">


                            <div className="form-col-full">

                                <label>
                                    Address Line 1
                                </label>


                                <div className="icon-input">

                                    <FaMapMarkerAlt
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="address_line1"
                                        value={
                                            formData.address_line1
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Building / Street / Main Road"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-col-full">

                                <label>

                                    Address Line 2

                                    <span className="optional">
                                        Optional
                                    </span>

                                </label>


                                <div className="icon-input">

                                    <FaMapMarkerAlt
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="address_line2"
                                        value={
                                            formData.address_line2
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Landmark / Additional address"
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    Area / Locality
                                </label>


                                <div className="icon-input">

                                    <FaMapMarkerAlt
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="area_locality"
                                        value={
                                            formData.area_locality
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter area / locality"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    City
                                </label>


                                <div className="icon-input">

                                    <FaCity
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="city"
                                        value={
                                            formData.city
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter city"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    District
                                </label>


                                <div className="icon-input">

                                    <FaMapPin
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="district"
                                        value={
                                            formData.district
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter district"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    State
                                </label>


                                <div className="icon-input">

                                    <FaMapMarkerAlt
                                        className="field-icon"
                                    />


                                    <select
                                        name="state"
                                        value={
                                            formData.state
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        required
                                    >

                                        <option value="">
                                            Select state
                                        </option>

                                        <option value="Andhra Pradesh">
                                            Andhra Pradesh
                                        </option>

                                        <option value="Telangana">
                                            Telangana
                                        </option>

                                        <option value="Tamil Nadu">
                                            Tamil Nadu
                                        </option>

                                        <option value="Karnataka">
                                            Karnataka
                                        </option>

                                        <option value="Kerala">
                                            Kerala
                                        </option>

                                        <option value="Odisha">
                                            Odisha
                                        </option>

                                        <option value="Maharashtra">
                                            Maharashtra
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div className="form-col">

                                <label>
                                    Pincode
                                </label>


                                <div className="icon-input">

                                    <FaMapPin
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="pincode"
                                        value={
                                            formData.pincode
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter pincode"
                                        maxLength="6"
                                        inputMode="numeric"
                                        required
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        GPS GEO TAGGING
                       ================================================= */}

                    <div className="form-section">

                        <div className="form-section-title">

                            <FaCrosshairs />

                            <span>
                                GPS Geo Tagging
                            </span>

                        </div>


                        <div className="location-action">

                            <div className="location-info">

                                <FaCrosshairs />

                                <div>

                                    <strong>
                                        Capture Hotel Location
                                    </strong>

                                    <span>
                                        Use your current GPS location to automatically verify the property.
                                    </span>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="location-btn"
                                onClick={
                                    getCurrentLocation
                                }
                                disabled={
                                    locationLoading
                                }
                            >

                                <FaCrosshairs />

                                {
                                    locationLoading
                                        ? "Capturing..."
                                        : "Use My Current Location"
                                }

                            </button>

                        </div>


                        {
                            locationMessage && (

                                <div className="location-message">

                                    {locationMessage}

                                </div>

                            )
                        }


                        <div className="gps-fields">

                            <div className="form-row">


                                <div className="form-col">

                                    <label>
                                        Latitude
                                    </label>


                                    <div className="icon-input">

                                        <FaGlobeAsia
                                            className="field-icon"
                                        />


                                        <input
                                            type="text"
                                            name="latitude"
                                            value={
                                                formData.latitude
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="form-control"
                                            placeholder="GPS latitude"
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="form-col">

                                    <label>
                                        Longitude
                                    </label>


                                    <div className="icon-input">

                                        <FaGlobeAsia
                                            className="field-icon"
                                        />


                                        <input
                                            type="text"
                                            name="longitude"
                                            value={
                                                formData.longitude
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="form-control"
                                            placeholder="GPS longitude"
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="form-col">

                                    <label>
                                        GPS Accuracy
                                    </label>


                                    <div className="icon-input">

                                        <FaCrosshairs
                                            className="field-icon"
                                        />


                                        <input
                                            type="text"
                                            name="gps_accuracy"
                                            value={
                                                formData.gps_accuracy
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="form-control"
                                            placeholder="Accuracy in metres"
                                        />

                                    </div>

                                </div>


                                <div className="form-col">

                                    <label>
                                        Location Source
                                    </label>


                                    <div className="icon-input">

                                        <FaSatelliteDish
                                            className="field-icon"
                                        />


                                        <input
                                            type="text"
                                            name="location_source"
                                            value={
                                                formData.location_source
                                            }
                                            className="form-control"
                                            readOnly
                                            placeholder="GPS / Manual"
                                        />

                                    </div>

                                </div>


                                <div className="form-col-full">

                                    <label>
                                        Location Captured At
                                    </label>


                                    <div className="icon-input">

                                        <FaClock
                                            className="field-icon"
                                        />


                                        <input
                                            type="text"
                                            name="location_captured_at"
                                            value={
                                                formData.location_captured_at
                                            }
                                            className="form-control"
                                            readOnly
                                            placeholder="Automatically recorded"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        BUSINESS / TAX DETAILS
                       ================================================= */}

                    <div className="form-section">

                        <div className="form-section-title">

                            <FaFileInvoice />

                            <span>
                                Business / Tax Details
                            </span>

                        </div>


                        <div className="form-row">


                            <div className="form-col">

                                <label>

                                    GST Number

                                    <span className="optional">
                                        Optional
                                    </span>

                                </label>


                                <div className="icon-input">

                                    <FaFileInvoice
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="gst_number"
                                        value={
                                            formData.gst_number
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter GST number"
                                    />

                                </div>

                            </div>


                            <div className="form-col">

                                <label>

                                    PAN Number

                                    <span className="optional">
                                        Optional
                                    </span>

                                </label>


                                <div className="icon-input">

                                    <FaIdCard
                                        className="field-icon"
                                    />


                                    <input
                                        type="text"
                                        name="pan_number"
                                        value={
                                            formData.pan_number
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="form-control"
                                        placeholder="Enter PAN number"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        REGISTRATION MESSAGE
                       ================================================= */}

                    {
                        registerMessage && (

                            <div
                                className={
                                    registrationSuccess
                                        ? "registration-message success"
                                        : "registration-message error"
                                }
                            >

                                {
                                    registrationSuccess
                                        ? "✓ "
                                        : "⚠ "
                                }

                                {registerMessage}


                                {
                                    registrationSuccess &&
                                    formData.hotel_registration_id && (

                                        <strong>
                                            {" "}
                                            {formData.hotel_registration_id}
                                        </strong>

                                    )
                                }

                            </div>

                        )
                    }


                    {/* =================================================
                        TERMS
                       ================================================= */}

                    <div className="terms-box">

                        <input
                            type="checkbox"
                            name="terms"
                            checked={
                                formData.terms
                            }
                            onChange={
                                handleChange
                            }
                            id="terms"
                        />


                        <label htmlFor="terms">

                            I agree to the ZestGo

                            <strong>
                                {" "}Terms & Conditions
                            </strong>

                            {" "}and confirm that the information
                            provided is accurate and complete.

                        </label>

                    </div>


                    {/* =================================================
                        REGISTER BUTTON
                       ================================================= */}

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={
                            registerLoading
                        }
                    >

                        {
                            registerLoading
                                ? "Creating Account..."
                                : "Create Hotel Partner Account"
                        }


                        {
                            !registerLoading && (
                                <FaArrowRight />
                            )
                        }

                    </button>


                    {/* =================================================
                        SECURITY
                       ================================================= */}

                    <div className="security-box">

                        <FaShieldAlt />

                        <span>
                            Your registration information is securely protected.
                        </span>

                    </div>


                    {/* =================================================
                        LOGIN LINK
                       ================================================= */}

                    <div className="login-link">

                        Already have a Hotel Partner account?

                        <a href="/login">
                            {" "}Login
                        </a>

                    </div>

                </form>


                {/* =================================================
                    COPYRIGHT
                   ================================================= */}

                <div className="copyright">

                    © {new Date().getFullYear()}
                    {" "}ZestGo. All rights reserved.

                </div>

            </div>

        </div>

    );

}


export default Registration;
