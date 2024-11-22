import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AddService from '../views/AddService/AddService';
import ConfirmEmail from '../views/ConfirmEmail/ConfirmEmail';
import Login from '../views/Login/Login';
import PaymentHistory from '../views/PaymentHistory/PaymentHistory';
import NextPayments from '../views/NextPayments/NextPayments';
import Logout from '../views/Logout/Logout';
import Dashboard from '../views/Dashboard/Dashboard';

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        

        if (!token) {

            switch(element.props.element.type.name){
                case "ConfirmEmail":
                    navigate('/confirm-email');
                    break;
                case "Logout":
                    navigate('/logout');
                    break;
                default:
                    navigate('/');
            }
        }
    }, [token, navigate]);

    return element;
};

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/add-service"
                    element={<ProtectedRoute element={<AddService />} />}
                />
                <Route path="/confirm-email" element={<ProtectedRoute element={<ConfirmEmail />} />}/>
                <Route
                    path="/payment-history"
                    element={<ProtectedRoute element={<PaymentHistory />} />}
                />
                <Route
                    path="/view-invoices"
                    element={<ProtectedRoute element={<NextPayments />} />}
                />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute element={<Dashboard />} />}
                />
                <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
