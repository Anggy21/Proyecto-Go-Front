import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { authenticationRequest } from "../../request/login"
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignIn = ({ onToggle }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const navigatorHandler = (url) => {
    navigate(url)
  };

  const handleLogin = (e) => {
    login()
    e.preventDefault();
    console.log('Usuario:', email, 'Contraseña:', password);
  };

  const handleGoogleSuccess = (response) => {

    console.log("response: ", response)

    const credential = {
      token: response.credential
    }

    console.log(response);
    

    authenticationRequest(credential, "http://localhost:8080/socialLogin").then(async data =>{
      let credentialResponse = await data.json();

      if (data.ok) {
        window.localStorage.user = JSON.stringify(credentialResponse.Data.user);
        window.localStorage.token = credentialResponse.Data.token;
        navigatorHandler('/AddService')
      } else {
        alert(credentialResponse.message)
      }
    })
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Error:', error);
  };

  const login = () => {
    const user = {
      email,
      password
    };

    authenticationRequest(user, "http://localhost:8080/login").then(async data => {

      let serverResponse = await data.json();
      if (data.ok) {

        window.localStorage.user = JSON.stringify(serverResponse.Data.user);
        window.localStorage.token = serverResponse.Data.token;

        navigatorHandler('/AddService')
      }
      else {
        alert(serverResponse.message)
      }
    })
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
          <button type="submit" className="login-button">Ingresar</button>
        </form>
        <div className="divider">o</div>
        <GoogleOAuthProvider clientId="545261536035-qjhp65jsu1g0r05ckl5uok25ticcvuh6.apps.googleusercontent.com">
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

SignIn.propTypes = {
  onToggle: PropTypes.func
};

export default SignIn;