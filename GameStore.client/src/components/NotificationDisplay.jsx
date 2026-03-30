import { useState, useEffect } from "react";
import { useNotification } from "../context/NotificationContext";

function NotificationItem({ notification, onRemove, duration = 4000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(handleDismiss, duration);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onRemove, 150);
  };

  return (
    <div
      className={`alert alert-${
        notification.type === "success" ? "success" : "danger"
      } alert-dismissible fade mb-2 ${visible ? "show" : ""}`}
      role="alert"
      style={{ minWidth: "300px", transition: "opacity 0.15s linear" }}
    >
      <strong>{notification.type === "success" ? "Success!" : "Error"}</strong>
      <span> {notification.message}</span>
      <button
        type="button"
        className="btn-close"
        onClick={handleDismiss}
        aria-label="Close"
      ></button>
    </div>
  );
}

export default function NotificationDisplay() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div
      className="notification-container position-fixed top-0 start-50 translate-middle-x mt-3 p-3"
      style={{ zIndex: 9999 }}
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}
