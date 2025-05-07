import { Outlet, useLocation } from "react-router-dom"
import { ErrorPage } from "../error/error";

const AuthPage = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname === "/auth" || location.pathname === "/auth/" ? <ErrorPage /> : <Outlet />}
        </>
    )
}

export default AuthPage;
export { AuthPage }