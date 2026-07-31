import React, { useEffect } from "react";
import "./Notification.css";

export default function Notification({
  show,
  type = "success",
  message = "",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className={`notification ${type}`}>
      <span className="notification-icon">
        {type === "success" && "✓"}
        {type === "error" && "✕"}
        {type === "warning" && "⚠"}
        {type === "info" && "ℹ"}
      </span>

      <span className="notification-message">
        {message}
      </span>

      <button
        className="notification-close"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}