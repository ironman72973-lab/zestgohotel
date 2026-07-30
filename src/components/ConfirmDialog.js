import React from "react";
import "../assets/css/confirmdialog.css";

function ConfirmDialog({
    show,
    title = "Confirmation",
    message = "Are you sure?",
    confirmText = "Yes",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false,
}) {
    if (!show) return null;

    return (
        <div className="confirm-overlay">
            <div className="confirm-dialog">

                <div className="confirm-header">
                    <h4>{title}</h4>
                </div>

                <div className="confirm-body">
                    <p>{message}</p>
                </div>

                <div className="confirm-footer">
                    <button
                        className="btn-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="btn-confirm"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Please Wait..." : confirmText}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmDialog;