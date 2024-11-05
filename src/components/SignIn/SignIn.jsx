import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import loginRequest from "../../request/login"


const SignIn = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica para autenticar al usuario con email y contraseña
    console.log('Usuario:', email, 'Contraseña:', password);
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google Login Success:', response);
    // Lógica para manejar la autenticación de Google
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Error:', error);
  };

  const login = ()=>{
    const user = {
      email,
      password
    }

    /*loginRequest(user,"/login").then(data => {
      
      if (data.ok) alert("Inicio de sesión exitoso")
    })*/

    console.log(user);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button" onClick={login}>Ingresar</button>
        </form>
        <div className="divider">o</div>
        <GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            theme="outline"
          />
        </GoogleOAuthProvider>
        <p className="register-prompt">
          ¿No tienes cuenta? <span onClick={onToggle}>Regístrate aquí</span>
        </p>
      </div>
    </div>

  );
};

export default SignIn;
