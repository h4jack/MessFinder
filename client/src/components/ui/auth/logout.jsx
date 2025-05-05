import React, { useEffect } from "react";
import { useFirebase } from "../../../context/firebase";
import { useNavigate, useLocation } from "react-router-dom";

const Logout = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        firebase.auth.signOut().then(() => {
            navigate("/login", { state: { from: location } });
        }).catch((error) => {
            console.error("Error logging out: ", error);
        });
    };
    useEffect(() => {
        handleLogout();
    }, []);
}

export default Logout;
export { Logout };