import { useEffect, useState } from "react";
import "../Header/Header.scss";
import { getNotifications } from "../../services/notificationService";

function Header() {

  const token = window.localStorage.token;
  const [notifications, setNotifications] = useState(null);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notificationWasOpened, setNotificationWasOpened] = useState(false);
  const notificationOpenedLocalStorage = window.localStorage.getItem("notificationOpened");
  const notificationCount = window.localStorage.getItem("notificationCount");
  const [newNotifications, setNewNotifications] = useState(0);

  useEffect(() => {
    if (notificationOpenedLocalStorage === "true") {
      setNotificationWasOpened(true);
    }

    getNotifications(token).then((data) => {
      setNotifications(data);
      checkNotifications(data);

    });
  }, [token]);

  const checkNotifications = (data) => {
    if(data.length > notificationCount){
      window.localStorage.setItem("notificationOpened", "false");
      setNewNotifications(data.length - notificationCount);
    }
  }

  const toggleNotifications = () => {
    if (notificationWasOpened === false) {
      window.localStorage.setItem("notificationOpened", "true");
    }
    setNotificationWasOpened(true);
    setNotificationsVisible(!notificationsVisible);
  };

  return (
    <header className="header">
      <div className="header-title">
        <h1>FACTURIFY</h1>
        <button className="notification" onClick={toggleNotifications} aria-label="Notificaciones">
          <span role="img" aria-label="bell">🔔</span>
          {notifications !== null && !notificationWasOpened &&
            <span className="notification-count">{newNotifications}</span>
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