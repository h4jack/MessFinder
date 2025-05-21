import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ErrorPage } from "../../components/error/error";
import { useFirebase } from "../../context/firebase";
import { useEffect } from "react";

const AuthPage = () => {
    const location = useLocation();

    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                if (!(location.pathname === "/auth/reset-password/"
                    || location.pathname === "/auth/reset-password")) {
                    navigate("/user/profile", { state: { from: location } })
                }
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [firebase.auth, navigate, location]);

    return (
        <>
            {location.pathname === "/auth" || location.pathname === "/auth/" ? <ErrorPage /> : <Outlet />}
        </>
    )
}

export default AuthPage;
export { AuthPage }