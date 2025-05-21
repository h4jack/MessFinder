import { useEffect } from "react";
import { useFirebase } from "../../context/firebase";

const Logout = () => {
    const firebase = useFirebase();
    const handleLogout = () => {
        firebase.auth.signOut();
    };
    useEffect(() => {
        handleLogout();
    }, []);
}

export default Logout;