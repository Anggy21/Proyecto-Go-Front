import React from 'react'
import { useState } from 'react'
import loginRequest from '../../request/login'
import {useNavigate} from 'react-router-dom';

const ConfirmEmail = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate()

    const navigatorHandler = (url) =>{
        navigate(url)
      }

    const confirmEmail = () =>{
        const confirmation = {
            email,
            code
        }
        loginRequest(confirmation, 'http://192.168.1.41:8080/confirmEmail').then(data=>{
            if(data.ok){
               navigatorHandler("/AddInvoice")
            }
        })
    }

    return(
        <>
          
                <label htmlFor="">Correo</label>
                <input type='email' onChange={(e)=> {setEmail(e.target.value)}}/>
                <label htmlFor="">Código</label>
                <input type="text"  onChange={(e)=> {setCode(e.target.value)}}/>

                <button onClick={confirmEmail}>Confirmar</button>

        
        
        </>
    )
}

export default ConfirmEmail

