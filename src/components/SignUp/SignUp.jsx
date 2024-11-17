import React, { useState } from 'react';
import {authenticationRequest} from "../../request/login"
import { useNavigate } from 'react-router-dom';



const SignUp = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const navigate = useNavigate(); 

  const navigatorHandler = (url) =>{
    navigate(url)
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    signUp()
  };

  const handlePhoneInput = (e) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setPhone(onlyNumbers);
  };

  const signUp = () => {
    const user = {
      email,
      name, 
      //phone,
      password
    }

    authenticationRequest(user, "http://localhost:8080/signup").then(async data =>{
      let newUserResponse = await data.json();

      if(data.ok) {
        window.localStorage.userEmail = email
        navigatorHandler('/ConfirmEmail')
      }else{
        alert(newUserResponse.message)
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
            onChange={handlePhoneInput}
            required
          />
 
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="password-requirements">
                <ul>
                  <li>Longitud minimo de 8</li>
                  <li>Al menos una minúscula</li>
                  <li>Al menos una mayúscula</li>
                  <li>Debe contener números</li>
                  <li>Debe contener caracteres especiales como.,!*/@#</li>
                </ul>
              </label>
            
       
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Registrar</button>
        </form>
        <p className="register-prompt">
          ¿Ya tienes cuenta? <span onClick={onToggle}>Inicia sesión aquí</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
