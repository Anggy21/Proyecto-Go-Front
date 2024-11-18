import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        navigate('/');
    }, []);

    return (
        <></>
    );
}

export default logout;