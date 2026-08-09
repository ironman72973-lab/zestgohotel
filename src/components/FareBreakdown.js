import React from "react";
import {
    FaIndianRupeeSign,
    FaReceipt,
    FaPercent,
    FaMoneyBillWave,
    FaWallet
} from "react-icons/fa6";

function FareBreakdown({

    fare = 0,

    airportParking = 0,

    toll = 0,

    meetGreet = 0,

    waiting = 0,

    nightCharge = 0,

    extraCharge = 0,

    discount = 0,

    gstRate = 5,

    commissionRate = 10

}) {

    const subTotal =
        fare +
        airportParking +
        toll +
        meetGreet +
        waiting +
        nightCharge +
        extraCharge;

    const gst =
        Math.round(subTotal * gstRate / 100);

    const commission =
        Math.round(subTotal * commissionRate / 100);

    const grandTotal =
        subTotal +
        gst -
        discount;

    return (

        <div className="fare-breakdown">

            <div className="fare-header">

                <FaReceipt />

                <h5>

                    Fare Breakdown

                </h5>

            </div>

            <div className="fare-row">

                <span>

                    Base Fare

                </span>

                <strong>

                    ₹{fare}

                </strong>

            </div>

            <div className="fare-row">

                <span>

                    Airport Parking

                </span>

                <strong>

                    ₹{airportParking}

                </strong>

            </div>

            <div className="fare-row">

                <span>

                    Toll Charges

                </span>

                <strong>

                    ₹{toll}

                </strong>

            </div>

            <div className="fare-row">

                <span>

                    Meet & Greet

                </span>

                <strong>

                    ₹{meetGreet}

                </strong>

            </div>

            <div className="fare-row">

                <span>

                    Waiting Charges

                </span>

                <strong>

                    ₹{waiting}

                </strong>

            </div>

            <div className="fare-row">

                <span>

                    Night Charges

                </span>

                <strong>

                    ₹{nightCharge}

                </strong>

            </div>

            <div className="fare-row">

                <span>

                    Additional Charges

                </span>

                <strong>

                    ₹{extraCharge}

                </strong>

            </div>

            <div className="fare-row">

                <span>

                    Discount

                </span>

                <strong className="text-danger">

                    - ₹{discount}

                </strong>

            </div>

            <hr />

            <div className="fare-row">

                <span>

                    <FaPercent />

                    GST ({gstRate}%)

                </span>

                <strong>

                    ₹{gst}

                </strong>

            </div>

            <div className="fare-row">

                <span>

                    <FaWallet />

                    Hotel Commission

                </span>

                <strong className="text-success">

                    ₹{commission}

                </strong>

            </div>

            <hr />

            <div className="fare-total">

                <div>

                    <FaIndianRupeeSign />

                    Grand Total

                </div>

                <h2>

                    ₹{grandTotal}

                </h2>

            </div>

            <div className="commission-box">

                <FaMoneyBillWave />

                <div>

                    <h6>

                        Estimated Hotel Earnings

                    </h6>

                    <h4>

                        ₹{commission}

                    </h4>

                    <small>

                        {commissionRate}% Commission

                    </small>

                </div>

            </div>

        </div>

    );

}

export default FareBreakdown;