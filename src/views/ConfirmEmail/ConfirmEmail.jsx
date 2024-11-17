import React from 'react'
import { useState } from 'react'
import loginRequest from '../../request/login'
import {useNavigate} from 'react-router-dom';

const ConfirmEmail = () => {

    const [code, setCode] = useState('');
    const navigate = useNavigate()

    const navigatorHandler = (url) =>{
        navigate(url)
      }

    const confirmEmail = () =>{
        const confirmation = {
            email:window.localStorage.userEmail,
            code
        }

        window.localStorage.removeItem("userEmail")

        loginRequest(confirmation, 'http://localhost:8080/confirmEmail').then(data=>{
            if(data.ok){
               navigatorHandler("/AddService")
            }
        })
    }

    return(
        <>
                <label htmlFor="">Código</label>
                <input type="text"  onChange={(e)=> {setCode(e.target.value)}}/>

                <button onClick={confirmEmail}>Confirmar</button>
        </>
    )
}


export default ConfirmEmail

