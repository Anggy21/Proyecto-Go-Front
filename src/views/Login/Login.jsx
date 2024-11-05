import React, { useState } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import './Login.scss';
import logo from '../../images/campana.png';
import logoFactura from '../../images/factura-mensual.png'

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <div className="login">

      <div className='login left'>
        <div className="logo">
          <img src={logo} alt="Campana Logo" />
          <h1>FACTURIFY</h1>
        </div>

        <div className="logoFactura">
          <img src={logoFactura} alt="Factura Logo" />
        </div>
      </div>

      <div className='login right'>
        {isRegister ? <SignUp onToggle={toggleForm} /> : <SignIn onToggle={toggleForm} />}
      </div>
      
    </div>
  );
};

export default Login;
