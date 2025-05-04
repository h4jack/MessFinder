import { useState } from "react";
import { statesAndDistricts } from '/src/module/js/district-pin'; // Import the JSON data
import { Link } from "react-router-dom";

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

function Dropdown({ label, options, onChange }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={onChange}
            >
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
    const [query, setQuery] = useState("");
    const [isAdvancedFilter, setIsAdvancedFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("ALL");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [pincode, setPincode] = useState("");
    const [pincodeError, setPincodeError] = useState("");

    const stateOptions = Object.keys(statesAndDistricts).map(state => ({
        value: state,
        label: state
    }));

    const districtOptions = selectedState ?
        Object.keys(statesAndDistricts[selectedState].districts).map(district => ({
            value: district,
            label: district
        })) : [];

    const validatePincode = (pincode) => {
        if (!selectedState || !selectedDistrict) {
            setPincodeError("Please select a state and district first.");
            return false;
        }

        const districtData = statesAndDistricts[selectedState].districts[selectedDistrict];
        if (!districtData || !districtData.pincode_range) {
            setPincodeError("Invalid district data.");
            return false;
        }

        const [start, end] = districtData.pincode_range.split("-").map(Number);
        const pincodeNumber = Number(pincode);

        if (pincodeNumber >= start && pincodeNumber <= end) {
            setPincodeError(""); // Valid pincode
            return true;
        } else {
            setPincodeError("Invalid pincode.");
            return false;
        }
    };

    return (
        <main className="flex flex-row items-center justify-center min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)] px-6 py-8">
            <div className="bg-white/70 backdrop-blur-2xl shadow-xl rounded-lg p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Find Your {" "}
                    <span className="bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                        Perfect Space
                    </span>
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                    Use our search options to find the best match for your needs.
                </p>
                <div className="space-y-6">
                    {!isAdvancedFilter ? (
                        <input
                            autoFocus={true}
                            type="text"
                            placeholder="Enter address (e.g., street, city, state, or zip)"
                            className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    placeholder="Enter address or name."
                                    className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <Dropdown
                                label="State/UT"
                                options={stateOptions}
                                onChange={(e) => {
                                    setSelectedState(e.target.value);
                                    setSelectedDistrict(""); // Reset district when state changes
                                    setPincodeError(""); // Reset pincode error
                                }}
                            />
                            <Dropdown
                                label="District"
                                options={districtOptions}
                                onChange={(e) => {
                                    setSelectedDistrict(e.target.value);
                                    setPincodeError(""); // Reset pincode error
                                }}
                            />
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    onBlur={() => validatePincode(pincode)}
                                    className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${pincodeError
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-400 focus:ring-blue-500"
                                        }`}
                                />
                                {pincodeError && (
                                    <span className="text-red-500 text-sm mt-1">{pincodeError}</span>
                                )}
                            </div>
                        </div>
                    )}

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

                    <div className="flex justify-center">
                        <Link
                            to={`/search/${query}?${selectedState ? `state=${selectedState}&` : ""}${selectedDistrict ? `dist=${selectedDistrict}&` : ""}${pincode ? `pin=${pincode}` : ""}`}
                        >
                            <button
                                className="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Search
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export { HomeSearch };
