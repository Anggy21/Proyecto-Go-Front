import React from "react";
import "./PaymentHistory.scss";

const PaymentHistory = () => {


  return (
    <div className="historial-pagos">
      <h2>Historial de pagos</h2>
      <div className="filtros">
        <button className="filtro-boton">Elegir fecha</button>
        <button className="filtro-boton">Elegir Categoría</button>
      </div>
      <div className="tabla-container">
        <h3>HOGAR</h3>
        <table className="tabla-pagos">
          <thead>
            <tr>
              <th>Fecha corte</th>
              <th>Factura</th>
              <th>Fecha pago</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr key={index}>
                <td>{item.fechaCorte}</td>
                <td>{item.factura}</td>
                <td>{item.fechaPago}</td>
                <td>{item.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
