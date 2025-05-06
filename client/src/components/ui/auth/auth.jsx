import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ErrorPage } from "../error";

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