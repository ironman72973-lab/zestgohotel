import React from "react";
import {
    FaHotel,
    FaUser,
    FaPhone,
    FaDoorOpen,
    FaLocationDot,
    FaEnvelope,
    FaClipboardList
} from "react-icons/fa6";

function HotelDetails({ booking, updateBooking }) {

    return (

        <div className="booking-card mt-4">

            <div className="card-header-custom">

                <h4>

                    <FaHotel className="me-2 text-success" />

                    Hotel & Guest Details

                </h4>

            </div>

            <div className="card-body">

                <div className="row">

                    {/* Hotel */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Hotel

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaHotel />

                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Hotel Name"
                                value={booking.hotel}
                                onChange={(e)=>
                                    updateBooking("hotel",e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* Room */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Room Number

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaDoorOpen />

                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Room No"
                                value={booking.room}
                                onChange={(e)=>
                                    updateBooking("room",e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* Guest */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Guest Name

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaUser />

                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Guest Name"
                                value={booking.guestName}
                                onChange={(e)=>
                                    updateBooking("guestName",e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* Mobile */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Guest Mobile

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaPhone />

                            </span>

                            <input
                                type="tel"
                                className="form-control"
                                placeholder="+91 9876543210"
                                value={booking.mobile}
                                onChange={(e)=>
                                    updateBooking("mobile",e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* Reception */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Reception Contact

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaPhone />

                            </span>

                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Reception Number"
                                value={booking.reception}
                                onChange={(e)=>
                                    updateBooking("reception",e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* Email */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Guest Email

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaEnvelope />

                            </span>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="guest@email.com"
                                value={booking.email}
                                onChange={(e)=>
                                    updateBooking("email",e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* Address */}

                    <div className="col-12 mb-3">

                        <label className="form-label">

                            Hotel Address

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaLocationDot />

                            </span>

                            <textarea
                                rows="3"
                                className="form-control"
                                placeholder="Hotel Address"
                                value={booking.hotelAddress}
                                onChange={(e)=>
                                    updateBooking("hotelAddress",e.target.value)
                                }
                            ></textarea>

                        </div>

                    </div>

                    {/* Map */}

                    <div className="col-12 mb-3">

                        <label className="form-label">

                            Hotel Location

                        </label>

                        <div className="hotel-map">

                            OpenStreetMap Location Picker

                        </div>

                    </div>

                    {/* Notes */}

                    <div className="col-12">

                        <label className="form-label">

                            Hotel Notes

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaClipboardList />

                            </span>

                            <textarea
                                rows="4"
                                className="form-control"
                                placeholder="Reception instructions, VIP guest notes..."
                                value={booking.hotelNotes}
                                onChange={(e)=>
                                    updateBooking("hotelNotes",e.target.value)
                                }
                            ></textarea>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default HotelDetails;