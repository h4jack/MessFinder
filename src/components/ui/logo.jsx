import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <Link to="/" className="flex items-center">
            <div className="bg-[url('/logo.svg')] h-10 w-10 bg-center bg-no-repeat bg-contain focus:outline-0"></div>
            <span className="drop-shadow-xs drop-shadow-blue-900 sm:text-2xl ml-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 text-xl font-bold">
                MessFinder
            </span>
        </Link>
    )
}

export default Logo;