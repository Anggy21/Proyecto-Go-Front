import "./PaymentHistory.scss";
import { useState, useEffect } from "react";
import getNextPayments from "../../services/paymentsService";
import { formatCurrency } from "../../utils/CurrencyUtils";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/sideBar";

const PaymentHistory = () => {

  const token = window.localStorage.getItem("token");
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getNextPayments(token).then((data) => {
      setPayments(data);
    });
  }, [token]);

  return (
    <>
      <Header />
      <SideBar />
      <div className="historial-pagos">
        <h2>Facturas pendientes</h2>
        {payments === undefined || payments === null || payments.length === 0
          ? <p>¡No tienes facturas por pagar!</p>
          : (
            <div className="tabla-container">
              <table className="tabla-pagos">
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>Fecha pago</th>
                    <th>Monto</th>
                    <th>Categoría</th>
                    <th>Frecuencia de pago</th>
                    <th>Estado</th>
                    <th>Registrar Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((item, index) => (
                    <tr key={index}>
                      <td>{item.service}</td>
                      <td>{item.date}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{item.category}</td>
                      <td>{item.paymentFrequency}</td>
                      <td>{item.status}</td>
                      <td>
                        <button className="btn-pagar">Confirmar pago</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </>
  );
};

export default PaymentHistory;
