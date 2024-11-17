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
                    <Route path='/AddService' element={<AddService />}></Route>
                    <Route path='/ConfirmEmail' element={<ConfirmEmail />}></Route>
                    <Route path='/PaymentHistory' element={<PaymentHistory />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router