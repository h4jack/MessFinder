import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Importing a default profile icon
import { useFirebase } from "../../../context/firebase"; // Assuming you have a custom hook for Firebase
import { useEffect, useState } from "react"; // Importing useState for managing state

const Navigation = () => {
    const firebase = useFirebase(); 
    const [user, setUser] = useState(null); // State to manage user information
    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    image: user.photoURL || null, // Use photoURL if available
                });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [firebase.auth]);
    return (
        <header className="bg-white/50 backdrop-blur-sm text-gray-800 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <div className="bg-[url('/assets/Logo.png')] h-10 w-32 bg-center bg-no-repeat bg-contain"></div>
                </Link>

                {/* Navigation Items - Moved to the left */}
                <nav className="hidden md:flex items-center gap-6 ml-auto mr-6">
                    <Link to="/about" className="text-gray-600 hover:text-gray-800 transition">About</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-gray-800 transition">Contact Us</Link>
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 relative">
                    {!user ? (
                        <>
                            <Link to="/login" className="hidden sm:block">
                                <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-blue-700 transition">
                                    Login
                                </button>
                            </Link>
                            <Link to="/submit-pg">
                                <button className="bg-gray-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-gray-900 transition">
                                    Submit PG
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="relative">
                            <div
                                className="h-10 w-10 rounded-full bg-gray-300 shadow-md overflow-hidden cursor-pointer flex items-center justify-center"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const dropdown = e.currentTarget.nextElementSibling;
                                    if (dropdown.style.display === "none" || !dropdown.style.display) {
                                        dropdown.style.display = "block";
                                    } else {
                                        dropdown.style.display = "none";
                                    }
                                }}
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="h-full w-full text-gray-500" />
                                )}
                            </div>
                            <div
                                className="absolute right-0 mt-2 w-48 overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg rounded-md z-50"
                                style={{ display: "none" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.currentTarget.style.display = "none";
                                    }
                                }
                            >
                                <Link
                                    to="/dashboard/"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/dashboard/submit-pg"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition"
                                >
                                    Submit PG
                                </Link>
                                <Link
                                    to="/dashboard/pgs"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition"
                                >
                                    My PGs
                                </Link>
                                <Link
                                    to="/dashboard/profile"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/dashboard/settings"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition"
                                >
                                    Settings
                                </Link>
                                <Link
                                    to="/dashboard/logout"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition"
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
}

export { Navigation };