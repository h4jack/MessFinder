import React, { useEffect } from "react";
import { useFirebase } from "../../context/firebase";
import { useNavigate, useLocation } from "react-router-dom";

const Logout = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        firebase.auth.signOut().then(() => {
            navigate("/auth/login", { state: { from: location } });
        }).catch((error) => {
            console.error("Error logging out: ", error);
            console.log("if you are seeing this, connect the admin of this webpage with the error..");
        });
    };
    useEffect(() => {
        handleLogout();
    }, []);
}

export default Logout;
export { Logout };