import React from "react";
import {
    FaPlaneArrival,
    FaCloudSun,
    FaClock,
    FaLocationDot,
    FaArrowRight
} from "react-icons/fa6";

function HeroBanner({

    title = "Airport Pickup",

    subtitle = "Airport Transfer Booking"

}) {

    const today = new Date().toLocaleDateString("en-IN", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });

    const time = new Date().toLocaleTimeString("en-IN", {

        hour: "2-digit",

        minute: "2-digit"

    });

    return (

        <section className="hero-banner">

            <div className="hero-overlay"></div>

            <div className="container-fluid">

                <div className="row align-items-center">

                    {/* Left */}

                    <div className="col-lg-8">

                        <div className="hero-left">

                            <span className="hero-tag">

                                <FaPlaneArrival />

                                Airport Transfer

                            </span>

                            <h1>

                                {title}

                            </h1>

                            <p>

                                {subtitle}

                            </p>

                            <div className="hero-breadcrumb">

                                Dashboard

                                <FaArrowRight />

                                Airport

                                <FaArrowRight />

                                Pickup Booking

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="col-lg-4">

                        <div className="hero-info">

                            <div className="info-card">

                                <FaCloudSun />

                                <div>

                                    <h6>

                                        Weather

                                    </h6>

                                    <span>

                                        30°C • Sunny

                                    </span>

                                </div>

                            </div>

                            <div className="info-card">

                                <FaClock />

                                <div>

                                    <h6>

                                        Current Time

                                    </h6>

                                    <span>

                                        {time}

                                    </span>

                                </div>

                            </div>

                            <div className="info-card">

                                <FaLocationDot />

                                <div>

                                    <h6>

                                        Date

                                    </h6>

                                    <span>

                                        {today}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default HeroBanner;