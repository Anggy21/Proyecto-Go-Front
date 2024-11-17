import { useState } from "react";
import { Link } from "react-router-dom";
import '../SideBar/SideBar.scss';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Cambia el estado de apertura/cierre del menú
  };

  return (
    <div className={`sidebar-container ${ isOpen ? 'open' : '' }`}>
      {/* Icono de hamburguesa */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Menú lateral */}
      <aside className={`sidebar ${ isOpen ? 'show' : '' }`}>
        <Link to="/add-service" className="sidebar-item">
          <span className="icon">🏠</span> Agregar nuevo servicio
        </Link>
        <Link to="/payment-history" className="sidebar-item">
          <span className="icon">⏳</span> Historial de Pagos
        </Link>
        <Link to="/view-invoices" className="sidebar-item">
          <span className="icon">💵</span> Ver Facturas
        </Link>
        <Link to="/reminders" className="sidebar-item">
          <span className="icon">📊</span> Dashboard
        </Link>
        <Link to="/logout" className="sidebar-item">
          <span className="icon">🔄</span> Cerrar Sesión
        </Link>
      </aside>
    </div>
  );
}

export default SideBar;
