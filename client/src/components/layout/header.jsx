import { Link } from "react-router-dom";
import { useFirebase } from "../../context/firebase"; // Assuming you have a custom hook for Firebase
import { useEffect, useState } from "react"; // Importing useState for managing state
import { Logo } from "../ui/logo"

const Header = () => {
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
                <Logo />

                {/* Header Items - Moved to the left */}
                <nav className="hidden md:flex items-center gap-6 ml-auto mr-6">
                    <Link to="/info/about" className="text-gray-600 hover:text-gray-800 transition">About</Link>
                    <Link to="/info/contact" className="text-gray-600 hover:text-gray-800 transition">Contact Us</Link>
                </nav>

                {/* Action Buttons */}
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
                                    if (dropdown.style.display === "none" || !dropdown.style.display) {
                                        dropdown.style.display = "block";
                                    } else {
                                        dropdown.style.display = "none";
                                    }
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.currentTarget.style.display = "none";
                                }
                                }
                            >
                                <Link
                                    to="/owner/messages"
                                    className="block px-4 py-2 text-gray-600 hover:bg-blue-200 hover:text-gray-800 transition"
                                >
                                    Messages
                                </Link>
                                <Link
                                    to="/owner/pgs"
                                    className="block px-4 py-2 text-gray-600 hover:bg-blue-200 hover:text-gray-800 transition"
                                >
                                    My PGs
                                </Link>
                                <Link
                                    to="/owner/submit-pg"
                                    className="block px-4 py-2 text-gray-600 hover:bg-blue-200 hover:text-gray-800 transition"
                                >
                                    Submit PG
                                </Link>
                                <Link
                                    to="/owner/profile"
                                    className="block px-4 py-2 text-gray-600 hover:bg-blue-200 hover:text-gray-800 transition"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/owner/settings"
                                    className="block px-4 py-2 text-gray-600 hover:bg-blue-200 hover:text-gray-800 transition"
                                >
                                    Settings
                                </Link>
                                <Link
                                    to="/owner/logout"
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
}

export { Header };