import React, { useState } from 'react';
import loginRequest from "../../request/login"
import { useNavigate } from 'react-router-dom';



const SignUp = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); 

  const navigatorHandler = (url) =>{
    navigate(url)
  }

  const handleRegister = (e) => {
    e.preventDefault();
    signUp()
    console.log('Nuevo usuario:', email);
  };

  const signUp = () => {
    const user = {
      email,
      name, 
      //phone,
      password
    }

    loginRequest(user, "http://192.168.1.41:8080/signup").then(data =>{
      if(data.ok) {
        navigatorHandler('/ConfirmEmail')
        console.log(data.json())
      }
        
    })
    
    console.log(user);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Regístrate</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="phone"
            placeholder="Número de teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            require
          />
          <button type="submit" className="login-button" >Registrar</button>
        </form>
        <p className="register-prompt">
          ¿Ya tienes cuenta? <span onClick={onToggle}>Inicia sesión aquí</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
