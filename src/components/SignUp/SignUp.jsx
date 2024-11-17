import { useState } from 'react';
import { authenticationRequest } from "../../services/authenticationRequest"
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignUp = ({ onToggle }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [showPasswordDontMatch, setShowPasswordDontMatch] = useState(false);

  const navigate = useNavigate();

  const navigatorHandler = (url) => {
    navigate(url)
  };

  const validatePasswordSecurity = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowPasswordDontMatch(true);
      return;
    }
    if (!validatePasswordSecurity(password)) {
      setShowPasswordRequirements(true);
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

    authenticationRequest(user, backendUrl + "/signup").then(async data => {
      let newUserResponse = await data.json();

      if (data.ok) {
        window.localStorage.userEmail = email
        navigatorHandler('/ConfirmEmail')
      } else {
        alert(newUserResponse.message)
      }

    })
  };

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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {showPasswordDontMatch && <label className="password-dont-match">Las contraseñas no coinciden</label>}
          {showPasswordRequirements && (
            <label className="password-requirements">
              <ul>
                <li>Longitud minimo de 8</li>
                <li>Al menos una minúscula</li>
                <li>Al menos una mayúscula</li>
                <li>Debe contener números</li>
                <li>Debe contener caracteres especiales como.,!*/@#</li>
              </ul>
            </label>)}
          <button type="submit" className="login-button">Registrar</button>
        </form>
        <p className="register-prompt">
          ¿Ya tienes cuenta? <span onClick={onToggle}>Inicia sesión aquí</span>
        </p>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  onToggle: PropTypes.func.isRequired
};

export default SignUp;