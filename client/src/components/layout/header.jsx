import { Link } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { useEffect, useState } from "react";
import { userRTB } from "../../context/firebase-rtb";
import { NAV_ITEMS } from "../../module/js/navItems"
import { Logo } from '../ui';

const Header = () => {
    const firebase = useFirebase();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const { getData } = userRTB(firebase);

        const unsubscribe = firebase.auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    image: user.photoURL || null,
                });

                try {
                    const res = await getData(user.uid);
                    if (res?.role) {
                        setRole(res.role);
                    } else {
                        console.log("Role not found.");
                    }
                } catch (error) {
                    console.log("Error fetching user role:", error);
                }
            } else {
                setUser(null);
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, [firebase]);

    const dropdownItems = role && NAV_ITEMS[role] ? NAV_ITEMS[role] : [];

    return (
        <header className="bg-white/50 backdrop-blur-sm text-gray-800 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Logo />
                <nav className="hidden md:flex items-center gap-6 ml-auto mr-6">
                    <Link to="/info/about" className="text-gray-600 hover:text-gray-800 transition">About</Link>
                    <Link to="/info/contact" className="text-gray-600 hover:text-gray-800 transition">Contact Us</Link>
                </nav>

                <div className="flex items-center gap-4 relative">
                    {!user ? (
                        <>
                            <Link to="/auth/login" className="hidden sm:block">
                                <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-blue-700 transition">
                                    Login
                                </button>
                            </Link>
                            <Link to="/owner/submit-pg">
                                <button className="bg-gray-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-gray-900 transition">
                                    Submit PG
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="relative">
                            <div
                                className="h-10 w-10 rounded-full border border-blue-100 bg-blue-100 shadow-md overflow-hidden cursor-pointer flex items-center justify-center"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const dropdown = e.currentTarget.nextElementSibling;
                                    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
                                }}
                            >
                                <img
                                    src={user.image || "/assets/avatar-default.svg"}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div
                                className="absolute right-0 mt-2 w-48 overflow-hidden bg-blue-100 shadow-lg rounded-md z-50"
                                style={{ display: "none" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {dropdownItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={`/${role}/${item.path}`}
                                        className="block px-4 py-2 text-gray-600 hover:bg-blue-200 hover:text-gray-800 transition"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Link
                                    to="/auth/logout"
                                    className="block px-4 py-2 text-gray-600 hover:bg-blue-200 hover:text-gray-800 transition"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
