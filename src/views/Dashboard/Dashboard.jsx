import { getPayments } from "../../services/paymentsService";
import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";
import dayjs from "dayjs";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import "./Dashboard.scss";

// Registrar componentes de Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale
);

const Dashboard = () => {
  const token = window.localStorage.token;
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    getPayments(token).then((data) => {
      setPayments(data);
    });
  }, [token]);

  const getChartData = () => {
    if (!payments) return null;

    const categories = [...new Set(payments.map((p) => p.category))];
    const frequencies = [...new Set(payments.map((p) => p.paymentFrequency))];
    const statuses = [...new Set(payments.map((p) => p.status))];
    
    const paymentsByCategory = categories.map((category) =>
      payments.filter((p) => p.category === category).reduce((sum, p) => sum + p.amount, 0)
    );

    const paymentsByFrequency = frequencies.map((freq) =>
      payments.filter((p) => p.paymentFrequency === freq).length
    );

    const paymentsByStatus = statuses.map((status) =>
      payments.filter((p) => p.status === status).length
    );

    // Pagos por mes
    const paymentsByMonth = payments.filter(payment=>payment.status === 'SUCCESS').reduce((acc, payment) => {
      const month = dayjs(payment.date).format("YYYY-MM");
      acc[month] = (acc[month] || 0) + payment.amount;
      return acc;
    }, {});

    const months = Object.keys(paymentsByMonth).sort();
    const paymentsPerMonth = months.map((month) => paymentsByMonth[month]);

    return {
      barData: {
        labels: categories,
        datasets: [
          {
            label: "Pagos por Categoría",
            data: paymentsByCategory,
            backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
          },
        ],
      },
      pieDataFrequency: {
        labels: frequencies,
        datasets: [
          {
            label: "Pagos por Frecuencia",
            data: paymentsByFrequency,
            backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
          },
        ],
      },
      pieDataStatus: {
        labels: statuses,
        datasets: [
          {
            label: "Estado de Pagos",
            data: paymentsByStatus,
            backgroundColor: ["#2196f3", "#f44336", "#ff9800"],
          },
        ],
      },
      lineData: {
        labels: months,
        datasets: [
          {
            label: "Pagos Totales por Mes",
            data: paymentsPerMonth,
            borderColor: "#4caf50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            tension: 0.4,
          },
        ],
      },
    };
  };

  const chartData = getChartData();

  return (
    <>
      <Header />
      <SideBar />
      <div className="dashboard">
        <h2 className="dashboard__title">Dashboard de Pagos</h2>
        {!payments ? (
          <p className="dashboard__loading">Cargando pagos...</p>
        ) : (
          <div className="dashboard__charts">
            <div className="chart chart--small">
              <h3 className="chart__title">Pagos por Categoría</h3>
              <div className="chart__canvas">
                <Bar 
                  data={chartData.barData} 
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                  }} 
                />
              </div>
            </div>
            <div className="chart chart--small">
              <h3 className="chart__title">Pagos por Frecuencia</h3>
              <div className="chart__canvas">
                <Pie 
                  data={chartData.pieDataFrequency} 
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                  }} 
                />
              </div>
            </div>
            <div className="chart chart--small">
              <h3 className="chart__title">Estado de Pagos</h3>
              <div className="chart__canvas">
                <Pie 
                  data={chartData.pieDataStatus} 
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                  }} 
                />
              </div>
            </div>
            <div className="chart chart--small">
              <h3 className="chart__title">Tendencia de Pagos por Mes</h3>
              <div className="chart__canvas">
                <Line 
                  data={chartData.lineData} 
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                  }} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
  
  
  
};

export default Dashboard;
