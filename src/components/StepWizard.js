import React from "react";
import {
    FaPlaneDeparture,
    FaCar,
    FaUserGroup,
    FaIndianRupeeSign,
    FaCircleCheck
} from "react-icons/fa6";

function StepWizard({ currentStep = 1 }) {

    const steps = [

        {
            id: 1,
            title: "Service",
            icon: <FaPlaneDeparture />
        },

        {
            id: 2,
            title: "Vehicle",
            icon: <FaCar />
        },

        {
            id: 3,
            title: "Guest",
            icon: <FaUserGroup />
        },

        {
            id: 4,
            title: "Fare",
            icon: <FaIndianRupeeSign />
        },

        {
            id: 5,
            title: "Confirm",
            icon: <FaCircleCheck />
        }

    ];

    return (

        <div className="step-wizard">

            {steps.map((step, index) => (

                <React.Fragment key={step.id}>

                    <div
                        className={
                            currentStep >= step.id
                                ? "step-item active"
                                : "step-item"
                        }
                    >

                        <div className="step-icon">

                            {step.icon}

                        </div>

                        <div className="step-title">

                            {step.title}

                        </div>

                    </div>

                    {index !== steps.length - 1 && (

                        <div
                            className={
                                currentStep > step.id
                                    ? "step-line active"
                                    : "step-line"
                            }
                        ></div>

                    )}

                </React.Fragment>

            ))}

        </div>

    );

}

export default StepWizard;