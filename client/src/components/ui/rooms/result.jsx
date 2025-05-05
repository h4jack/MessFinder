import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { UNSAFE_useFogOFWarDiscovery } from "react-router-dom";

const  SearchBar =  ({ onSearch }) => {
    const [filters, setFilters] = useState({
        keyword: "",
        gender: "all",
        suitableFor: "",
        maxPrice: "",
        shared: 0,
        sortBy: 0,
    });
    const [showFilters, setShowFilters] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="p-4   w-ful">
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center items-center gap-4 w-full sm:w-10/12">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Enter address e.g. street, city and state or zip.."
                        value={filters.keyword}
                        onChange={handleInputChange}
                        className="flex-1 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="p-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
                    >
                        <FiSearch /> Search
                    </button>
                    <button
                        onClick={toggleFilters}
                        className="p-2 bg-gray-200 rounded-md flex items-center gap-2"
                    >
                        <FaFilter /> Filters
                    </button>
                </div>
                <div className="">
                    {showFilters && (
                        <div className="flex flex-wrap gap-2 justify-center">
                            <div className="mb-2 w-32">
                                <label className="block text-sm">Gender</label>
                                <select
                                    name="gender"
                                    value={filters.gender}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="all">All</option>
                                    <option value="boy">Boy</option>
                                    <option value="girl">Girl</option>
                                </select>
                            </div>
                            <div className="mb-2 w-32">
                                <label className="block text-sm">Suitable For</label>
                                <select
                                    name="suitableFor"
                                    value={filters.suitableFor}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Select</option>
                                    <option value="student">Student</option>
                                    <option value="workingProfessional">Working Professional</option>
                                </select>
                            </div>
                            <div className="mb-2 w-32">
                                <label className="block text-sm">Shared</label>
                                <select
                                    name="shared"
                                    value={filters.shared}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div className="mb-2 w-32">
                                <label className="block text-sm">Sort By</label>
                                <select
                                    name="sortBy"
                                    value={filters.sortBy}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="0">Rent (0 - 9)</option>
                                    <option value="1">Rent (9 - 0)</option>
                                </select>
                            </div>
                            <div className="mb-2 w-32">
                                <label className="block text-sm">Max Price</label>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

const SearchResultCard = ({ result }) => {
    return (
        <a href={result.href}>
            <div className="bg-white rounded-lg shadow-md flex flex-col w-72 h-max overflow-hidden transition-transform transform hover:scale-105 focus:scale-105 hover:shadow-lg focus:shadow-lg">
                <div className="relative">
                    <img
                        src={result.thumbnail}
                        alt={result.name}
                        className="w-full h-40 object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
                        ₹{result.price}/month
                    </span>
                </div>
                <div className="flex flex-col justify-between flex-grow p-4">
                    <div>
                        <h3 className="text-lg font-bold mb-1 text-nowrap overflow-hidden">{result.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <GoLocation className="h-4 w-4 mr-1 text-gray-500 text-nowrap overflow-hidden" />
                            {result.location}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-md">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr>
                                    <td className="font-semibold pr-2">For:</td>
                                    <td className="text-gray-700">{result.gender}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold pr-2">Suitable For:</td>
                                    <td className="text-gray-700">{result.suitableFor}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold pr-2">Shared:</td>
                                    <td className="text-gray-700">{result.shared ? "Yes" : "No"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 flex justify-between items-center gap-2">
                        <span className="font-medium text-gray-700 text-nowrap overflow-hidden">{result.owner}</span>
                        <span className="text-nowrap overflow-hidden">{result.postTime}</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

const SearchResult =() => {
    const [results, setResults] = useState([]);

    const handleSearch = (filters) => {
        // Mock search results with real images and realistic data
        const mockResults = [
            {
                thumbnail: "/assets/room1.png",
                href: "/room/owner/id",
                name: "Sunrise Hostel",
                location: "Mumbai, Maharashtra",
                gender: "Girls",
                suitableFor: "Students",
                shared: 1,
                price: 5000,
                owner: "John Doe",
                postTime: "2 hours ago",
            },
            {
                thumbnail: "/assets/room2.png",
                href: "/room/owner/id",
                name: "Green Valley PG",
                location: "Pune, Maharashtra",
                gender: "Both",
                suitableFor: "Working Professionals",
                shared: 1,
                price: 7000,
                owner: "Jane Smith",
                postTime: "1 day ago",
            },
            {
                thumbnail: "/assets/room3.png",
                href: "/room/owner/id",
                name: "Blue Horizon PG",
                location: "Bangalore, Karnataka",
                gender: "Boys",
                suitableFor: "Students",
                shared: 1,
                price: 6000,
                owner: "Alice Johnson",
                postTime: "3 days ago",
            },
            {
                thumbnail: "/assets/room1.png",
                href: "/room/owner/id",
                name: "Cozy Nest Hostel",
                location: "Delhi, Delhi",
                gender: "Girls",
                suitableFor: "Working Professionals",
                shared: 1,
                price: 8000,
                owner: "Michael Brown",
                postTime: "5 hours ago",
            },
            {
                thumbnail: "/assets/room2.png",
                href: "/room/owner/id",
                name: "Comfort Stay PG",
                location: "Hyderabad, Telangana",
                gender: "Both",
                suitableFor: "Students",
                shared: 1,
                price: 5500,
                owner: "Emily Davis",
                postTime: "2 days ago",
            },
            {
                thumbnail: "/assets/room3.png",
                href: "/room/owner/id",
                name: "Urban Living Hostel",
                location: "Chennai, Tamil Nadu",
                gender: "Boys",
                suitableFor: "Working Professionals",
                shared: 1,
                price: 7500,
                owner: "Chris Wilson",
                postTime: "1 week ago",
            },
        ];
        setResults(mockResults);
    };

    useEffect(() => {
        handleSearch({}); // Call with empty filters to load all results initially
    }, []);

    return (
        <main className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-100 px-4">
            <SearchBar onSearch={handleSearch} />
            <div className="pt-6 pb-6 flex flex-wrap gap-4 items-center justify-center">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <SearchResultCard key={index} result={result} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-2xl">No results found.</p>
                )}
            </div>
        </main>
    );
};

export { SearchResult, SearchResultCard };