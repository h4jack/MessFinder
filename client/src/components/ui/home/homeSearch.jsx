import { useState } from "react";

function HomeSearch() {
    const [isAdvancedFilter, setIsAdvancedFilter] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("ALL");

    return (
        <main className="flex flex-col items-center min-h-screen justify-center bg-[url('/assets/rooms-cover.png')] bg-cover bg-center h-screen px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center sm:text-left">Search</h2>
                <p className="text-gray-600 mb-4 text-center sm:text-left">
                    Find what you're looking for with our advanced search options.
                </p>
                <div className="flex flex-col space-y-4">
                    {/* Conditional Rendering for Search Input or Advanced Filters */}
                    {!isAdvancedFilter ? (
                        <input
                            type="text"
                            placeholder="Enter address e.g. street, city and state or zip"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select State/UT</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                            </select>
                            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select District</option>
                                <option value="district1">District 1</option>
                                <option value="district2">District 2</option>
                            </select>
                            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select City</option>
                                <option value="city1">City 1</option>
                                <option value="city2">City 2</option>
                            </select>
                            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select Area</option>
                                <option value="area1">Area 1</option>
                                <option value="area2">Area 2</option>
                            </select>
                        </div>
                    )}
                    {/* Filter Options */}
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <button
                            className={`px-3 py-1 text-sm rounded-lg ${
                                selectedFilter === "ALL"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                            onClick={() => setSelectedFilter("ALL")}
                        >
                            ALL
                        </button>
                        <button
                            className={`px-3 py-1 text-sm rounded-lg ${
                                selectedFilter === "BOY"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                            onClick={() => setSelectedFilter("BOY")}
                        >
                            BOY
                        </button>
                        <button
                            className={`px-3 py-1 text-sm rounded-lg ${
                                selectedFilter === "GIRL"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                            onClick={() => setSelectedFilter("GIRL")}
                        >
                            GIRL
                        </button>
                        <button
                            className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 cursor-pointer"
                            onClick={() => setIsAdvancedFilter(!isAdvancedFilter)}
                        >
                            {!isAdvancedFilter ? 
                                "ADVANCE SEARCH"
                             : (
                                "NORMAL SEARCH"   
                             )
                            }
                        </button>
                    </div>
                    {/* Search Button */}
                    <div className="flex justify-center mt-4">
                        <button
                            className="px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export {
    HomeSearch
};
