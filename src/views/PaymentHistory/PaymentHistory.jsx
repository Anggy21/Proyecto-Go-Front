import "./PaymentHistory.scss";
import { useState, useEffect } from "react";
import {getPayments} from "../../services/paymentsService";
import { formatCurrency,paymentFrequency,paymentStatus} from "../../utils/CurrencyUtils";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/sideBar";

const PaymentHistory = () => {

  const token = window.localStorage.getItem("token");
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPayments(token).then((data) => {
      setPayments(data);
    });
  }, [token]);

  return (
    <>
      <Header />
      <SideBar />
      <div className="historial-pagos">
        <h2>Historial de pagos</h2>
        {payments === undefined || payments === null || payments.length === 0
          ? <p>¡Aún no has hecho ningún pago!</p>
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
                  </tr>
                </thead>
                <tbody>
                  {payments.map((item, index) => (
                    <tr key={index}>
                      <td>{item.service}</td>
                      <td>{item.date}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{item.category}</td>
                      <td>{paymentFrequency[item.paymentFrequency]}</td>
                      <td>{paymentStatus[item.status]}</td>
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
