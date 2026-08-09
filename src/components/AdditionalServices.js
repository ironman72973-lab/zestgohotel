import React from "react";
import {
    FaHandshake,
    FaBaby,
    FaWheelchair,
    FaSuitcaseRolling,
    FaPersonDress,
    FaDog,
    FaBottleWater,
    FaClipboard
} from "react-icons/fa6";

const services = [

    {
        id: "meetGreet",
        title: "Meet & Greet",
        icon: <FaHandshake />,
        description: "Driver waits with guest name board.",
        price: 300
    },

    {
        id: "babySeat",
        title: "Baby Seat",
        icon: <FaBaby />,
        description: "Child safety seat.",
        price: 150
    },

    {
        id: "wheelchair",
        title: "Wheelchair",
        icon: <FaWheelchair />,
        description: "Wheelchair assistance.",
        price: 200
    },

    {
        id: "extraLuggage",
        title: "Extra Luggage",
        icon: <FaSuitcaseRolling />,
        description: "Additional luggage handling.",
        price: 200
    },

    {
        id: "femaleDriver",
        title: "Female Driver",
        icon: <FaPersonDress />,
        description: "Subject to availability.",
        price: 400
    },

    {
        id: "petFriendly",
        title: "Pet Friendly",
        icon: <FaDog />,
        description: "Suitable for pets.",
        price: 250
    },

    {
        id: "waterBottle",
        title: "Water Bottle",
        icon: <FaBottleWater />,
        description: "Complimentary mineral water.",
        price: 50
    }

];

function AdditionalServices({

    booking,

    updateBooking

}) {

    return (

        <div className="booking-card mt-4">

            <div className="card-header-custom">

                <h4>

                    Additional Services

                </h4>

                <span className="badge bg-warning text-dark">

                    Optional

                </span>

            </div>

            <div className="card-body">

                <div className="row">

                    {

                        services.map(service => (

                            <div
                                className="col-lg-6 mb-4"
                                key={service.id}
                            >

                                <div
                                    className={
                                        booking[service.id]
                                        ?
                                        "service-card active"
                                        :
                                        "service-card"
                                    }
                                >

                                    <div className="service-top">

                                        <div className="service-icon">

                                            {service.icon}

                                        </div>

                                        <div className="form-check form-switch">

                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={
                                                    booking[service.id] || false
                                                }
                                                onChange={(e)=>
                                                    updateBooking(
                                                        service.id,
                                                        e.target.checked
                                                    )
                                                }
                                            />

                                        </div>

                                    </div>

                                    <h5>

                                        {service.title}

                                    </h5>

                                    <p>

                                        {service.description}

                                    </p>

                                    <h6>

                                        ₹ {service.price}

                                    </h6>

                                </div>

                            </div>

                        ))

                    }

                </div>

                <hr />

                <label className="form-label">

                    Special Instructions

                </label>

                <div className="input-group">

                    <span className="input-group-text">

                        <FaClipboard />

                    </span>

                    <textarea

                        rows="5"

                        className="form-control"

                        placeholder="Guest requests, pickup instructions, VIP information..."

                        value={booking.remarks}

                        onChange={(e)=>

                            updateBooking(

                                "remarks",

                                e.target.value

                            )

                        }

                    ></textarea>

                </div>

            </div>

        </div>

    );

}

export default AdditionalServices;