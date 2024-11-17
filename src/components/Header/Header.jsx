import { useEffect, useState } from "react";
import "../Header/Header.scss";
import { getNotifications } from "../../services/notificationService";

function Header() {

  const token = window.localStorage.token;
  const [notifications, setNotifications] = useState(null);
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  useEffect(() => {
    getNotifications(token).then((data) => {
      setNotifications(data);
    });
  }, [token]);

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  return (
    <header className="header">
      <div className="header-title">
        <h1>FACTURIFY</h1>
        <button className="notification" onClick={toggleNotifications} aria-label="Notificaciones">
          <span role="img" aria-label="bell">🔔</span>
          {notifications !== null &&
            <span className="notification-count">{notifications.length}</span>
          }
        </button>
      </div>

      {
        notificationsVisible && (
          <div className="notifications-dropdown">
            <button onClick={toggleNotifications} >❌</button>
            {notifications === undefined || notifications === null || notifications.length === 0
              ? <p>No tienes nuevas notificaciones.</p>
              : notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <p>{notification.message}</p>
                </div>
              ))}
          </div>
        )
      }
    </header >
  );
}

export default Header;