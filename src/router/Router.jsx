import AddService from '../views/AddService/AddService'
import ConfirmEmail from '../views/ConfirmEmail/ConfirmEmail'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../views/Login/Login'
import PaymentHistory from '../views/PaymentHistory/PaymentHistory'

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path='/add-service' element={<AddService />}></Route>
                    <Route path='/confirm-email' element={<ConfirmEmail />}></Route>
                    <Route path='/view-invoices' element={<PaymentHistory />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router