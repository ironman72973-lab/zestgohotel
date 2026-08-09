import React from "react";
import {
    FaPlaneArrival,
    FaPlane,
    FaCalendarDays,
    FaClock,
    FaLocationDot,
    FaRotate
} from "react-icons/fa6";

function FlightInformation({ booking, updateBooking }) {

    return (

        <div className="booking-card">

            <div className="card-header-custom">

                <h4>

                    <FaPlaneArrival className="me-2 text-success" />

                    Flight Information

                </h4>

                <button
                    className="btn btn-outline-success btn-sm"
                    type="button"
                >

                    <FaRotate className="me-2" />

                    Refresh

                </button>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Airport

                        </label>

                        <select
                            className="form-select"
                            value={booking.airport}
                            onChange={(e)=>
                                updateBooking("airport",e.target.value)
                            }
                        >

                            <option value="">

                                Select Airport

                            </option>

                            <option>

                                Visakhapatnam Airport

                            </option>

                            <option>

                                Rajahmundry Airport

                            </option>

                            <option>

                                Vijayawada Airport

                            </option>

                            <option>

                                Hyderabad Airport

                            </option>

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Airline

                        </label>

                        <select
                            className="form-select"
                            value={booking.airline}
                            onChange={(e)=>
                                updateBooking("airline",e.target.value)
                            }
                        >

                            <option value="">

                                Select Airline

                            </option>

                            <option>

                                IndiGo

                            </option>

                            <option>

                                Air India

                            </option>

                            <option>

                                SpiceJet

                            </option>

                            <option>

                                Akasa Air

                            </option>

                            <option>

                                Vistara

                            </option>

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Flight Number

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaPlane />

                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="6E 2458"
                                value={booking.flightNumber}
                                onChange={(e)=>
                                    updateBooking(
                                        "flightNumber",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Terminal

                        </label>

                        <select
                            className="form-select"
                            value={booking.terminal}
                            onChange={(e)=>
                                updateBooking("terminal",e.target.value)
                            }
                        >

                            <option value="">

                                Select Terminal

                            </option>

                            <option>

                                Terminal 1

                            </option>

                            <option>

                                Terminal 2

                            </option>

                            <option>

                                Domestic

                            </option>

                            <option>

                                International

                            </option>

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Arrival Date

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaCalendarDays />

                            </span>

                            <input
                                type="date"
                                className="form-control"
                                value={booking.arrivalDate}
                                onChange={(e)=>
                                    updateBooking(
                                        "arrivalDate",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Arrival Time

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaClock />

                            </span>

                            <input
                                type="time"
                                className="form-control"
                                value={booking.arrivalTime}
                                onChange={(e)=>
                                    updateBooking(
                                        "arrivalTime",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                </div>

                <div className="flight-status-card">

                    <div className="flight-status-left">

                        <div className="status-icon">

                            <FaLocationDot />

                        </div>

                        <div>

                            <h5>

                                Flight Status

                            </h5>

                            <p>

                                Live status will appear here after
                                entering a valid flight number.

                            </p>

                        </div>

                    </div>

                    <span className="badge bg-success">

                        On Time

                    </span>

                </div>

            </div>

        </div>

    );

}

export default FlightInformation;