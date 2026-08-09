import React from "react";
import {
    FaUsers,
    FaSuitcase,
    FaSnowflake,
    FaCheckCircle
} from "react-icons/fa6";

const vehicles = [

    {
        id: 1,
        type: "Sedan",
        image: "/images/vehicles/sedan.png",
        seats: 4,
        luggage: 2,
        ac: "AC",
        fare: 1800,
        features: [
            "Air Conditioned",
            "Professional Driver",
            "GPS Tracking"
        ]
    },

    {
        id: 2,
        type: "SUV",
        image: "/images/vehicles/suv.png",
        seats: 6,
        luggage: 4,
        ac: "AC",
        fare: 2500,
        features: [
            "Large Boot",
            "Premium Interior",
            "GPS Tracking"
        ]
    },

    {
        id: 3,
        type: "Traveller",
        image: "/images/vehicles/traveller.png",
        seats: 12,
        luggage: 10,
        ac: "AC",
        fare: 4200,
        features: [
            "Group Travel",
            "Push Back Seats",
            "Music System"
        ]
    },

    {
        id: 4,
        type: "Luxury",
        image: "/images/vehicles/luxury.png",
        seats: 4,
        luggage: 3,
        ac: "Premium",
        fare: 6500,
        features: [
            "Luxury Interior",
            "Chauffeur",
            "VIP Experience"
        ]
    }

];

function VehicleSelection({ booking, updateBooking }) {

    return (

        <div className="booking-card mt-4">

            <div className="card-header-custom">

                <h4>

                    Vehicle Selection

                </h4>

                <span className="badge bg-success">

                    Choose One

                </span>

            </div>

            <div className="card-body">

                <div className="row">

                    {

                        vehicles.map(vehicle => (

                            <div
                                className="col-lg-6 mb-4"
                                key={vehicle.id}
                            >

                                <div
                                    className={
                                        booking.vehicle === vehicle.type
                                        ?
                                        "vehicle-box active"
                                        :
                                        "vehicle-box"
                                    }

                                    onClick={() =>
                                        updateBooking(
                                            "vehicle",
                                            vehicle.type
                                        )
                                    }

                                >

                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.type}
                                        className="vehicle-image"
                                    />

                                    <div className="vehicle-content">

                                        <h5>

                                            {vehicle.type}

                                        </h5>

                                        <h3>

                                            ₹{vehicle.fare}

                                        </h3>

                                        <div className="vehicle-info">

                                            <span>

                                                <FaUsers />

                                                {vehicle.seats} Seats

                                            </span>

                                            <span>

                                                <FaSuitcase />

                                                {vehicle.luggage} Bags

                                            </span>

                                            <span>

                                                <FaSnowflake />

                                                {vehicle.ac}

                                            </span>

                                        </div>

                                        <ul className="vehicle-features">

                                            {

                                                vehicle.features.map(
                                                    feature => (

                                                        <li
                                                            key={feature}
                                                        >

                                                            <FaCheckCircle />

                                                            {feature}

                                                        </li>

                                                    )
                                                )

                                            }

                                        </ul>

                                    </div>

                                    {

                                        booking.vehicle === vehicle.type && (

                                            <div className="selected-badge">

                                                Selected

                                            </div>

                                        )

                                    }

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default VehicleSelection;