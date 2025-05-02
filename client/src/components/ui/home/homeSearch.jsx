import { useState } from "react";

function FilterButton({ label, isActive, onClick }) {
    return (
        <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-300"
                }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

function Dropdown({ label, options }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">{`Select ${label}`}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function HomeSearch() {
    const [isAdvancedFilter, setIsAdvancedFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("ALL");

    return (
        <main className="flex flex-row items-center justify-center min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)] px-6 py-8">
            <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-lg p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Find Your Perfect Space
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                    Use our search options to find the best match for your needs.
                </p>
                <div className="space-y-6">
                    {/* Search Input or Advanced Filters */}
                    {!isAdvancedFilter ? (
                        <input
                            autoFocus={true}
                            type="text"
                            placeholder="Enter address (e.g., street, city, state, or zip)"
                            className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Dropdown
                                label="State/UT"
                                options={[
                                    { value: "state1", label: "State 1" },
                                    { value: "state2", label: "State 2" },
                                ]}
                            />
                            <Dropdown
                                label="District"
                                options={[
                                    { value: "district1", label: "District 1" },
                                    { value: "district2", label: "District 2" },
                                ]}
                            />
                            <Dropdown
                                label="City"
                                options={[
                                    { value: "city1", label: "City 1" },
                                    { value: "city2", label: "City 2" },
                                ]}
                            />
                            <Dropdown
                                label="Area"
                                options={[
                                    { value: "area1", label: "Area 1" },
                                    { value: "area2", label: "Area 2" },
                                ]}
                            />
                        </div>
                    )}

                    {/* Filter Options */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {["ALL", "BOY", "GIRL"].map((filter) => (
                            <FilterButton
                                key={filter}
                                label={filter}
                                isActive={selectedFilter === filter}
                                onClick={() => setSelectedFilter(filter)}
                            />
                        ))}
                        <FilterButton
                            label={isAdvancedFilter ? "NORMAL SEARCH" : "ADVANCED SEARCH"}
                            isActive={false}
                            onClick={() => setIsAdvancedFilter(!isAdvancedFilter)}
                        />
                    </div>

                    {/* Search Button */}
                    <div className="flex justify-center">
                        <button
                            className="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export { HomeSearch };
