import { useNotification } from "../context/NotificationContext";

export default function NotificationDisplay() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div
      className="notification-container position-fixed top-0 start-50 translate-middle-x mt-3 p-3"
      style={{ zIndex: 9999 }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`alert alert-${
            notification.type === "success" ? "success" : "danger"
          } alert-dismissible fade show mb-2`}
          role="alert"
          style={{ minWidth: "300px" }}
        >
          <strong>
            {notification.type === "success" ? "Success!" : "Error"}
          </strong>
          <span> {notification.message}</span>
          <button
            type="button"
            className="btn-close"
            onClick={() => removeNotification(notification.id)}
            aria-label="Close"
          ></button>
        </div>
      ))}
    </div>
  );
}
