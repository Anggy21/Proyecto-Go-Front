import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.localStorage.clear();
        navigate('/');
    }, []);

    return (
        <></>
    );
}

export default logout;