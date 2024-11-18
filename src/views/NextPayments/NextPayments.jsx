import "./NextPayments.scss";
import { useState, useEffect } from "react";
import {getNextPayments,updatePayment} from "../../services/paymentsService";
import { formatCurrency,paymentStatus,paymentFrequency} from "../../utils/CurrencyUtils";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/sideBar";

const NextPayments = () => {

  const token = window.localStorage.getItem("token");
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getNextPayments(token).then((data) => {
        console.log(data);
      setPayments(data);
    });
  }, [token]);

  const successPayment = (id) => {
    updatePayment(token, id,"SUCCESS").then((data) => {

        if (data!=null) {

            alert("Pago actualizado");
            window.location.reload();
        }
    });

  }

  return (
    <>
      <Header />
      <SideBar />
      <div className="historial-pagos">
        <h2>Facturas pendientes</h2>
        {payments === undefined || payments === null || payments.length === 0
          ? <p>¡No tienes facturas pendientes!</p>
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
                        {console.log(item.id)}
                      <td>{item.service}</td>
                      <td>{item.date}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{item.category}</td>
                      <td>{paymentFrequency[item.paymentFrequency]}</td>
                      <td>{paymentStatus[item.status]}</td>
                      <td>
                        <button className="btn-pagar" onClick={()=>{successPayment(item.id)}}>Confirmar pago</button>
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

export default NextPayments;
