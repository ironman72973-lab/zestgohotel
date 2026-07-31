import React from "react";
import "./EmptyState.css";

const EmptyState = ({
    title = "No Data Found",
    message = "There is nothing to display at the moment.",
    buttonText,
    onButtonClick,
}) => {
    return (
        <div className="empty-state">
            <div className="empty-icon">
                📂
            </div>

            <h3>{title}</h3>

            <p>{message}</p>

            {buttonText && (
                <button
                    className="empty-btn"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default EmptyState;