import React, { useState } from 'react';
import loginRequest from "../../request/login"


const SignUp = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica para registrar al usuario
    console.log('Nuevo usuario:', email);
  };

  const login = () => {
    const user = {
      email,
      name, 
      phone,
      password,
      confirmPassword
    }

    /*loginRequest(user, "/signUp").then(data =>{
      if(data.ok) alert("Registro exitoso!")
    })*/
    
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
            required
          />
          <button type="submit" className="login-button" onClick={login}>Registrar</button>
        </form>
        <p className="register-prompt">
          ¿Ya tienes cuenta? <span onClick={onToggle}>Inicia sesión aquí</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
