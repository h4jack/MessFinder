import { Outlet, useLocation } from "react-router-dom"
import { ErrorPage } from "../../components/error";

import About from "./about";
import Contact from "./contact";
import Faqs from "./faqs";
import ReportOwner from "./report";
import TermsAndConditions from "./terms";

const Info = () => {
    const location = useLocation();
    return (location.pathname === "/info" || location.pathname === "/info/") ? <ErrorPage /> : <Outlet />;
}

export { Info, About, Contact, Faqs, ReportOwner, TermsAndConditions };