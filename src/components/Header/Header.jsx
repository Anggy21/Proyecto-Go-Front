import { useState } from "react";
import "../Header/Header.scss";

function Header() {
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  return (
    <header className="header">
      <div className="header-title">
        <h1>FACTURIFY</h1>
        <button className="notification" onClick={toggleNotifications} aria-label="Notificaciones">
          <span role="img" aria-label="bell">🔔</span>
        </button>
      </div>

      {notificationsVisible && (
        <div className="notifications-dropdown">
          {/* Add close button here */}
          <button className="close-button" onClick={toggleNotifications} />
          <span role="img" aria-label="close">❌</span>
          <p>Tienes nuevas notificaciones.</p>
          {/* Aquí puedes agregar una lista de notificaciones si lo deseas */}
        </div>
      )}
    </header>
  );
}

export default Header;
