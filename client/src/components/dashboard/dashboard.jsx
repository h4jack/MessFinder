import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { ErrorPage } from "../error/error";
import { userRTB } from "../../context/firebase-rtb";
import Loader from "../ui/loader";
import { NAV_ITEMS } from "../../module/js/navItems"

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const firebase = useFirebase();
    const [messageCount, setMessageCount] = useState(2);
    const [role, setRole] = useState(null); // null to indicate "not loaded yet"

    const basePath = `/${role || ""}`;
    const navItems = role ? NAV_ITEMS[role] : [];

    useEffect(() => {
        const { getData } = userRTB(firebase);
        const unsubscribe = firebase.auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate("/auth/login", { state: { from: location } });
            } else {
                try {
                    const res = await getData(user.uid);
                    if (res?.role) {
                        setRole(res.role);
                    } else {
                        console.log("User role is not set, please contact admin, or login again.");
                    }
                } catch (error) {
                    console.log("Error while fetching user data..", error);
                }
            }
        });

        return () => unsubscribe();
    }, [firebase.auth]);

    const isActive = (path) => location.pathname === `${basePath}/${path}`;

    useEffect(() => {
        if (role) {
            const currentBase = location.pathname.split("/")[1]; // 'user' or 'owner'
            if (currentBase && currentBase !== role) {
                // Get subpath after incorrect role (e.g. 'profile')
                const subPath = location.pathname.split("/").slice(2).join("/");
                navigate(`/${role}/${subPath}`, { replace: true });
            }
        }
    }, [role, location.pathname, navigate]);


    // Show loading while role is being determined
    if (role === null) {
        return (
            <main className="flex items-center justify-center">
                <div className="container flex flex-row rounded-md bg-white p-10 shadow-md overflow-hidden">
                    <Loader text="Loading Dashboard, Please Wait..." />
                </div>
            </main>
        );
    }

    // Optional: guard against unknown roles
    if (!NAV_ITEMS[role]) {
        return <ErrorPage />;
    }

    return (
        <>
            {(location.pathname === "/owner" || location.pathname === "/owner/") ? (
                <ErrorPage />
            ) : (
                <main className="flex items-start justify-center min-h-[calc(100vh-80px)] h-full m-6 mx-6">
                    <div className="container flex flex-row bg-white max-w-[1080px] w-full min-h-[calc(100vh-120px)] rounded-md shadow-md overflow-hidden">
                        <div className="hidden sm:flex flex-col justify-start min-w-1/4 bg-gray-900 p-4 rounded-l-md">
                            <h1 className="text-white text-lg mb-4 bold text-center">MENU</h1>
                            <nav className="flex flex-col space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={`${basePath}/${item.path}`}
                                        className={`p-2 rounded-md transition-colors flex items-center ${isActive(item.path)
                                            ? "bg-gray-700 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                        {item.showBadge && messageCount > 0 && (
                                            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {messageCount}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <Outlet />
                    </div>
                </main>
            )}
        </>
    );
};

export default Dashboard;
