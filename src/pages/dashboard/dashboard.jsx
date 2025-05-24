import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { ErrorPage } from "../../components/error";
import { userRTB } from "../../context/firebase-rtb";
import { Loader } from "../../components/ui";
import { NAV_ITEMS } from "../../module/js/navItems";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const firebase = useFirebase();
    const [messageCount, setMessageCount] = useState(2);
    const [role, setRole] = useState(null); // null = loading
    const { getData } = userRTB(firebase);

    useEffect(() => {

        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate("/auth/login", { state: { from: location } });
            } else {
                getData(user.uid)
                    .then((res) => {
                        if (res?.role) {
                            console.log(res)
                            setRole(res.role);
                        } else {
                            console.warn("User role is not set. Contact admin.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });
            }
        });

        return () => unsubscribe();
    }, [firebase, navigate, location]);


    // When role is determined, check if current base path matches
    useEffect(() => {
        if (!role) return;

        const pathParts = location.pathname.split("/").filter(Boolean); // removes empty strings

        // If path is only `/user` or `/owner`, redirect to `/user/profile`
        if (pathParts.length === 1 && pathParts[0] === role) {
            navigate(`/${role}/profile`, { replace: true });
            return;
        }

        // If role doesn't match current base path, redirect
        const currentBasePath = pathParts[0];
        if (currentBasePath !== role) {
            const restOfPath = pathParts.slice(1).join("/");
            navigate(`/${role}/${restOfPath}`, { replace: true });
        }
    }, [role, location.pathname, navigate]);


    const basePath = `/${role || ""}`;
    const navItems = role ? NAV_ITEMS[role] : [];

    const isActive = (path) => location.pathname === `${basePath}/${path}`;

    if (role === null) {
        return (
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-white">
                <div className="container flex flex-row rounded-md p-10 overflow-hidden">
                    <Loader text="Loading Dashboard, Please Wait..." />
                </div>
            </main>
        );
    }

    if (!NAV_ITEMS[role]) {
        return <ErrorPage />;
    }

    return (
        <main className="flex items-start justify-center min-h-[calc(100vh-80px)] h-full m-6 mx-6">
            <div className="container flex flex-row bg-white max-w-[1080px] w-full min-h-[calc(100vh-120px)] rounded-md shadow-md overflow-hidden">
                <div className="hidden sm:flex flex-col justify-start min-w-1/4 bg-gray-900 p-4 rounded-l-md">
                    <h1 className="text-white text-lg mb-4 font-bold text-center">MENU</h1>
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
    );
};

export default Dashboard;
