import { Outlet, useLocation } from "react-router-dom"
import { ErrorPage } from "../error/error";

const Info = () => {
    const location = useLocation();
    return (location.pathname === "/info" || location.pathname === "/info/") ? <ErrorPage /> : <Outlet />;
}

export default Info;
export { Info };