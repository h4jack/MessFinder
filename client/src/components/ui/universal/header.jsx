function Navigation({ isLoggedin }) {
    return (
        <header className="bg-white text-gray-800 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <div className="bg-[url('/assets/Logo.png')] h-10 w-32 bg-center bg-no-repeat bg-contain"></div>
                </a>

                {/* Navigation Items - Moved to the left */}
                <nav className="hidden md:flex items-center gap-6 ml-auto mr-6">
                    <a href="/about" className="text-gray-600 hover:text-gray-800 transition">About</a>
                    <a href="/contact" className="text-gray-600 hover:text-gray-800 transition">Contact Us</a>
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    {!isLoggedin ? (
                        <>
                            <a href="/login" className="hidden sm:block">
                                <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-blue-700 transition">
                                    Login
                                </button>
                            </a>
                            <a href="/submit-pg">
                                <button className="bg-gray-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-gray-900 transition">
                                    Submit PG
                                </button>
                            </a>
                        </>
                    ) : (
                        <a href="/profile">
                            <button className="bg-gray-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-gray-900 transition">
                                Profile
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Navigation };
