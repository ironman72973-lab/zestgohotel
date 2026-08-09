import React from "react";
import {
    FaCalendarDays,
    FaClock,
    FaLocationDot,
    FaUsers,
    FaSuitcaseRolling,
    FaClipboardList
} from "react-icons/fa6";

function PickupDetails({ booking, updateBooking }) {

    return (

        <div className="booking-card mt-4">

            <div className="card-header-custom">

                <h4>

                    <FaLocationDot className="me-2 text-success" />

                    Pickup Details

                </h4>

            </div>

            <div className="card-body">

                <div className="row">

                    {/* Pickup Date */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Pickup Date

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaCalendarDays />

                            </span>

                            <input
                                type="date"
                                className="form-control"
                                value={booking.pickupDate}
                                onChange={(e)=>
                                    updateBooking(
                                        "pickupDate",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Pickup Time */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Pickup Time

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaClock />

                            </span>

                            <input
                                type="time"
                                className="form-control"
                                value={booking.pickupTime}
                                onChange={(e)=>
                                    updateBooking(
                                        "pickupTime",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Arrival Gate */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Arrival Gate

                        </label>

                        <select
                            className="form-select"
                            value={booking.arrivalGate}
                            onChange={(e)=>
                                updateBooking(
                                    "arrivalGate",
                                    e.target.value
                                )
                            }
                        >

                            <option value="">

                                Select Gate

                            </option>

                            <option>Gate A</option>

                            <option>Gate B</option>

                            <option>Gate C</option>

                            <option>Gate D</option>

                        </select>

                    </div>

                    {/* Waiting Time */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Free Waiting Time

                        </label>

                        <select
                            className="form-select"
                            value={booking.waitingTime}
                            onChange={(e)=>
                                updateBooking(
                                    "waitingTime",
                                    e.target.value
                                )
                            }
                        >

                            <option>30 Minutes</option>

                            <option>60 Minutes</option>

                            <option>90 Minutes</option>

                            <option>120 Minutes</option>

                        </select>

                    </div>

                    {/* Adults */}

                    <div className="col-md-3 mb-3">

                        <label className="form-label">

                            Adults

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaUsers />

                            </span>

                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                value={booking.adults}
                                onChange={(e)=>
                                    updateBooking(
                                        "adults",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* Children */}

                    <div className="col-md-3 mb-3">

                        <label className="form-label">

                            Children

                        </label>

                        <input
                            type="number"
                            min="0"
                            className="form-control"
                            value={booking.children}
                            onChange={(e)=>
                                updateBooking(
                                    "children",
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* Luggage */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Luggage

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaSuitcaseRolling />

                            </span>

                            <select
                                className="form-select"
                                value={booking.luggage}
                                onChange={(e)=>
                                    updateBooking(
                                        "luggage",
                                        e.target.value
                                    )
                                }
                            >

                                <option>1 Bag</option>

                                <option>2 Bags</option>

                                <option>3 Bags</option>

                                <option>4 Bags</option>

                                <option>5+ Bags</option>

                            </select>

                        </div>

                    </div>

                    {/* Instructions */}

                    <div className="col-12">

                        <label className="form-label">

                            Pickup Instructions

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaClipboardList />

                            </span>

                            <textarea
                                rows="4"
                                className="form-control"
                                placeholder="Driver instructions, guest notes, meeting point..."
                                value={booking.pickupInstructions}
                                onChange={(e)=>
                                    updateBooking(
                                        "pickupInstructions",
                                        e.target.value
                                    )
                                }
                            ></textarea>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PickupDetails;