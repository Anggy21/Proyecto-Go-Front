import AddInvoice from '../views/AddInvoice/AddInvoice' 
import ConfirmEmail from '../views/ConfirmEmail/ConfirmEmail'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../views/Login/Login'

const Router = () =>{
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path='/AddInvoice' element={<AddInvoice/>}></Route>
                    <Route path='/ConfirmEmail' element={<ConfirmEmail/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router