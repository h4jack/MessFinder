import { Link } from "react-router-dom";

function Navigation({ isLoggedin }) {
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
                <div className="flex items-center gap-4">
                    {!isLoggedin ? (
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
                        <Link to="/profile">
                            <button className="bg-gray-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-gray-900 transition">
                                Profile
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Navigation };
