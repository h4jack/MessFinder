import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from 'react-router-dom';

import { FaFilter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

import { useFirebase } from "../../context/firebase";
import { userRTB, roomsRTB } from "../../context/firebase-rtb";
import { formatRelativeTime } from "../../module/js/getTime";
import { capitalize } from "../../module/js/string";
import Loader from "../ui/loader";

const SearchBar = ({ onSearch, filters, setFilters }) => {
    const [showFilters, setShowFilters] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["sortBy", "shared", "maxPrice"].includes(name)
            ? value === "" ? "" : parseInt(value, 10)
            : value;
        setFilters(prev => ({ ...prev, [name]: parsedValue }));
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    const toggleFilters = () => {
        setShowFilters(true);
    };

    return (
        <div className="px-4 pt-4 pb-2 w-full flex justify-center bg-white shadow-sm rounded-md relative z-10">
            <div className="w-full max-w-[720px]">
                {/* Search Input & Button */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center items-center gap-4 w-full">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                name="keyword"
                                placeholder="Enter address e.g. street, city, state or zip..."
                                value={filters.keyword}
                                onChange={handleInputChange}
                                className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FiSearch onClick={handleSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <button
                            onClick={toggleFilters}
                            className="p-2 bg-gray-200 text-gray-700 rounded-md flex items-center justify-center gap-2 hover:bg-gray-300 transition text-sm"
                        >
                            <FaFilter className="text-gray-600" />
                            <span className="hidden sm:inline">Filters</span>
                        </button>
                    </div>
                </div>

                {/* Filters Dropdown */}
                {showFilters && (
                    <div className="flex justify-end relative z-50" ref={dropdownRef}>
                        <div className="absolute right-0 mt-2 w-72 sm:w-[420px] bg-white border border-gray-200 shadow-lg rounded-md p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Gender</label>
                                <select
                                    name="accommodationFor"
                                    value={filters.accommodationFor}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Any</option>
                                    <option value="boys">Boys</option>
                                    <option value="girls">Girls</option>
                                </select>
                            </div>

                            {/* Suitable For */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Suitable For</label>
                                <select
                                    name="suitableFor"
                                    value={filters.suitableFor}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Any</option>
                                    <option value="Students">Students</option>
                                    <option value="working">Working Professionals</option>
                                </select>
                            </div>

                            {/* Shared */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Shared</label>
                                <select
                                    name="shared"
                                    value={filters.shared}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>

                            {/* Sort By */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Sort By</label>
                                <select
                                    name="sortBy"
                                    value={filters.sortBy}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="0">Rent (Low to High)</option>
                                    <option value="1">Rent (High to Low)</option>
                                </select>
                            </div>

                            {/* Max Price */}
                            <div className="col-span-1 sm:col-span-2">
                                <label className="block text-sm font-medium mb-1">Max Price</label>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
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
                                    <td className="text-gray-700">{capitalize(result.accommodationFor)}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold pr-2">Suitable For:</td>
                                    <td className="text-gray-700">{result.suitableFor.toLowerCase() === "both" ? "Students, Working Professionals" : capitalize(result.suitableFor)}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold pr-2">Shared:</td>
                                    <td className="text-gray-700">{result.shared ? `With ${result.shared} roommate` : "No"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 flex justify-between items-center gap-2">
                        <span className="font-medium text-gray-700 text-nowrap overflow-hidden">{result.owner}</span>
                        <span className="text-nowrap overflow-hidden">{result.createdAt}</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

const filterRoomsByCriteria = (rooms, filters, locationFilter) => {
    let filtered = [...rooms];

    // Location filter
    if (locationFilter.state.trim() !== "") {
        filtered = filtered.filter(room =>
            room.state?.toLowerCase() === locationFilter.state.toLowerCase()
        );

        if (locationFilter.dist.trim() !== "") {
            filtered = filtered.filter(room =>
                room.district?.toLowerCase() === locationFilter.dist.toLowerCase()
            );

            if (locationFilter.pin.trim() !== "") {
                filtered = filtered.filter(room =>
                    room.pincode?.toString().toLowerCase() === locationFilter.pin.toLowerCase()
                );
            }
        }
    }

    // Keyword (search in name and location)
    if (filters.keyword.trim() !== "") {
        const keyword = filters.keyword.toLowerCase();
        filtered = filtered.filter(room =>
        (room.name.toLowerCase().includes(keyword) ||
            room.location.toLowerCase().includes(keyword))
        );
    }

    // Accommodation For
    if (filters.accommodationFor && filters.accommodationFor.trim() !== "") {
        filtered = filtered.filter(room =>
        (room.accommodationFor.toLowerCase() === "both" ||
            room.accommodationFor.toLowerCase() === filters.accommodationFor.toLowerCase())
        );
    }

    // Suitable For
    if (filters.suitableFor && filters.suitableFor.trim() !== "") {
        filtered = filtered.filter(room =>
        (room.suitableFor.toLowerCase() === "both" ||
            room.suitableFor.toLowerCase() === filters.suitableFor.toLowerCase())
        );
    }

    // Max Price
    if (filters.maxPrice) {
        const max = parseInt(filters.maxPrice, 10);
        if (!isNaN(max)) {
            filtered = filtered.filter(room => room.price <= max);
        }
    }

    // Shared
    if (filters.shared !== "") {
        const shared = parseInt(filters.shared, 10);
        filtered = filtered.filter(room =>
            Boolean(parseInt(room.shared)) === Boolean(shared)
        );
    }

    // Sort By Price
    const sortBy = parseInt(filters.sortBy, 10);
    if (sortBy === 1) {
        filtered.sort((a, b) => b.price - a.price); // Descending
    } else {
        filtered.sort((a, b) => a.price - b.price); // Ascending
    }

    return filtered;
};



const SearchResult = () => {
    const [filters, setFilters] = useState({
        keyword: "",
        accommodationFor: "",
        suitableFor: "",
        maxPrice: "",
        shared: 1,
        sortBy: 0,
    });

    const [locationFilter, setLocationFilter] = useState({
        state: "",
        dist: "",
        pin: ""
    });

    const [results, setResults] = useState([]);
    const [allRooms, setAllRooms] = useState([]); // ✅ all room data fetched once
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const location = useLocation();
    const queryFilter = new URLSearchParams(location.search);

    const firebase = useFirebase();
    const { getAllRooms } = roomsRTB(firebase);
    const { getData } = userRTB(firebase);

    // ✅ Fetch room data only ONCE on URL change
    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            setFilters(prev => ({ ...prev, keyword: params.query || "" }));
            setLocationFilter({
                state: queryFilter.get("state") || "",
                dist: queryFilter.get("dist") || "",
                pin: queryFilter.get("pin") || "",
            });
            setFilters((prev) => ({ ...prev, accommodationFor: queryFilter.get("accommodationFor") }));

            try {
                const res = await getAllRooms();
                if (!res) throw new Error("No data found");

                const roomEntries = Object.entries(res);
                const fetchedRooms = await Promise.all(
                    roomEntries.map(async ([roomId, room]) => {
                        try {
                            const owner = await getData(room.ownerId);
                            return {
                                roomId,
                                thumbnail: room.images?.[0]?.preview || "",
                                href: `/room/${roomId}`,
                                name: room.name,
                                location: room.location,
                                accommodationFor: room.accommodationFor,
                                suitableFor: room.suitableFor,
                                shared: room.shared,
                                price: room.price,
                                owner: owner?.displayName || "Owner",
                                createdAt: formatRelativeTime(room.createdAt),
                                state: room.state || "",
                                district: room.district || "",
                                pincode: room.pincode || ""
                            };
                        } catch (err) {
                            console.error("Owner fetch error:", err);
                            return null;
                        }
                    })
                );

                const validRooms = fetchedRooms.filter(r => r !== null);
                setAllRooms(validRooms); // ✅ store unfiltered data
            } catch (err) {
                console.error("Room fetch error:", err);
                setAllRooms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [params.query, location.search]); // ✅ triggers on page load / URL change


    // ✅ Filter only when filters change or rooms are loaded
    useEffect(() => {
        const filteredResults = filterRoomsByCriteria(allRooms, filters, locationFilter);
        setResults(filteredResults);
    }, [filters, locationFilter, allRooms]);

    const handleSearch = () => {
        const filteredResults = filterRoomsByCriteria(allRooms, filters, locationFilter);
        setResults(filteredResults);
    };

    if (loading) {
        return (
            <>
                <main className="flex flex-col min-h-[calc(100vh-72px)] bg-gray-100 px-4">
                    <SearchBar onSearch={handleSearch} filters={filters} setFilters={setFilters} />
                    <div className="pt-6 pb-6 flex flex-wrap gap-4 items-center justify-center">
                        <Loader text="Searching your query to the database.. please wait.." />
                    </div>
                </main>
            </>
        )
    }

    return (
        <main className="flex flex-col min-h-[calc(100vh-72px)] bg-gray-100 px-4">
            <SearchBar
                onSearch={handleSearch}
                filters={filters}
                setFilters={setFilters}
            />
            <div className="pt-6 pb-6 flex flex-wrap gap-4 items-center justify-center">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <SearchResultCard key={index} result={result} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-2xl">No results found.</p>
                )}
            </div>
            {results.length > 0 && results.length % 10 === 0 && (
                <button
                    onClick={() => {
                        setLoading(true);
                        handleSearch({ ...filters, page: (filters.page || 1) + 1 });
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Load More
                </button>
            )}
        </main>
    );
};

export { SearchResult, SearchResultCard };