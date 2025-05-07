import React, { useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { ErrorPage } from "../error/error";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const firebase = useFirebase();

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate("/auth/login", { state: { from: location } });
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [firebase.auth]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            { // Show Error Page if the path is /owner/
                location.pathname === "/owner" || location.pathname === "/owner/" ? <ErrorPage /> : (
                    <main className="flex items-start justify-center min-h-[calc(100vh-80px)] h-full m-6 mx-6">
                        <div className="container flex flex-row bg-white max-w-[1080px] w-full min-h-[calc(100vh-120px)] rounded-md shadow-md overflow-hidden">
                            <div className="hidden sm:flex flex-col justify-start min-w-1/4 bg-gray-900 p-4 rounded-l-md">
                                <h1 className="text-white text-lg mb-4 bold text-center">MENU</h1>
                                <nav className="flex flex-col space-y-4">
                                    <Link 
                                        to="/owner/pgs" 
                                        className={`p-2 rounded-md transition-colors ${
                                            isActive("/owner/pgs") ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                    >
                                        My PGs
                                    </Link>
                                    <Link 
                                        to="/owner/submit-pg" 
                                        className={`p-2 rounded-md transition-colors ${
                                            isActive("/owner/submit-pg") ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                    >
                                        Submit PG
                                    </Link>
                                    <Link 
                                        to="/owner/profile" 
                                        className={`p-2 rounded-md transition-colors ${
                                            isActive("/owner/profile") ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                    >
                                        Profile
                                    </Link>
                                    <Link 
                                        to="/owner/settings" 
                                        className={`p-2 rounded-md transition-colors ${
                                            isActive("/owner/settings") ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                    >
                                        Settings
                                    </Link>
                                </nav>
                            </div>
                            <Outlet />
                        </div>
                    </main>
                )
            }
        </>
    );
};

export default Dashboard;