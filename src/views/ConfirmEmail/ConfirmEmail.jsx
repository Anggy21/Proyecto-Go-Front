import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationRequest } from "../../services/authenticationRequest"
import './ConfirmEmail.scss';
import logo from "../../../src/assets/images/factura-mensual.png";
const ConfirmEmail = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const navigatorHandler = (url) => {
        navigate(url);
    };

    const confirmEmail = () => {
        if (!code) {
            setError('Por favor, ingresa el código.');
            return;
        }

        const confirmation = {
            email: window.localStorage.userEmail,
            code,
        };

        window.localStorage.removeItem('userEmail');

        authenticationRequest(confirmation, backendUrl + '/confirmEmail')
            .then((data) => {
                if (data.ok) {
                    navigatorHandler('/');
                } else {
                    setError('Código inválido. Por favor, inténtalo de nuevo.');
                }
            })
            .catch(() => {
                setError('Hubo un error. Por favor, inténtalo más tarde.');
            });
    };

    return (
        <div className={'confirm-email-container'}>
            <h1 className={'confirm-email-title'}>Confirma tu correo electrónico</h1>
            <img src={logo} alt="Logo" className={'confirm-email-logo'} />
            <p className={'confirm-email-description'}>
                Por favor, introduce el código de verificación que hemos enviado a tu correo electrónico. Esto ayudará a verificar tu identidad y a continuar con el proceso.
            </p>
            <input
                type="text"
                className={'confirm-email-input'}
                placeholder="Introduce el código aquí"
                onChange={(e) => {
                    setCode(e.target.value);
                    setError(''); // Limpia el mensaje de error al escribir
                }}
            />
            <button className={'confirm-email-button'} onClick={confirmEmail}>
                Confirmar
            </button>
            {error && <p className={'error-message'}>{error}</p>}
        </div>
    );
};

export default ConfirmEmail;