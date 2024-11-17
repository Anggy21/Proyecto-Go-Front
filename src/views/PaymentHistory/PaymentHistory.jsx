import "./PaymentHistory.scss";
import React from "react";
import { useState,useEffect } from "react";
import getNextPayments from "../../services/paymentsService";


const PaymentHistory = () => {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPayments();
  }, []);


  const getPayments = async () => {

    if (window.localStorage.getItem("token") === null) {
      return;
    }

    const token = window.localStorage.getItem("token");

    console.log(token);
    
  
    const response = await getNextPayments(token);

    console.log(response);
    

    if (response.ok) {
      setPayments(response.Data.payments);
    } else {
      alert(response.message);
    }

  };

  const datos = [
    {
      fechaCorte: "01/01/2021",
      factura: "123456",
      fechaPago: "01/01/2021",
      monto: "$100.00",
    },
    {
      fechaCorte: "01/02/2021",
      factura: "123457",
      fechaPago: "01/02/2021",
      monto: "$200.00",
    },
    {
      fechaCorte: "01/03/2021",
      factura: "123458",
      fechaPago: "01/03/2021",
      monto: "$300.00",
    },
    {
      fechaCorte: "01/04/2021",
      factura: "123459",
      fechaPago: "01/04/2021",
      monto: "$400.00",
    },
    {
      fechaCorte: "01/05/2021",
      factura: "123460",
      fechaPago: "01/05/2021",
      monto: "$500.00",
    },
  ];

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
