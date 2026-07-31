import React from "react";
import "../assets/css/modal.css";

function Modal({
    show,
    title = "Modal",
    children,
    onClose,
    size = "md",
    footer = null,
    closeOnOverlay = true
}) {
    if (!show) return null;

    const handleOverlayClick = (e) => {
        if (closeOnOverlay && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="zg-modal-overlay" onClick={handleOverlayClick}>
            <div className={`zg-modal zg-modal-${size}`}>

                <div className="zg-modal-header">
                    <h5>{title}</h5>

                    <button
                        className="zg-modal-close"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <div className="zg-modal-body">
                    {children}
                </div>

                {footer && (
                    <div className="zg-modal-footer">
                        {footer}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Modal;