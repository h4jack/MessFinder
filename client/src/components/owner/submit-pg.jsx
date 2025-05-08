import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

// Reusable InputField Component
const InputField = ({ label, type = "text", placeholder, required, ...props }) => (
    <div>
        <label className="block font-medium mb-1">{label}</label>
        <input
            type={type}
            className="w-full border rounded-md p-2"
            placeholder={placeholder}
            required={required}
            {...props}
        />
    </div>
);

// Reusable Dropdown Component
const Dropdown = ({ label, options, required, ...props }) => (
    <div className="w-full">
        <label className="block font-medium mb-1">{label}</label>
        <select className="w-full border rounded-md p-2" required={required} {...props}>
            <option value="">Select</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

// Reusable Button Component
const Button = ({ type = "button", label, className, ...props }) => (
    <button type={type} className={`px-4 py-2 rounded-md ${className}`} {...props}>
        {label}
    </button>
);

const SubmitPG = () => {
    const [shared, setShared] = useState(false);
    const [messType, setMessType] = useState("Home");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Submit a New PG</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Name" placeholder="Enter PG/Room Name" required />
                <InputField label="Location" placeholder="Address" required />
                <div className="flex gap-2">
                    <Dropdown
                        label="State"
                        options={[
                            { value: "state1", label: "State 1" },
                            { value: "state2", label: "State 2" },
                        ]}
                        required
                    />
                    <Dropdown
                        label="District"
                        options={[
                            { value: "district1", label: "District 1" },
                            { value: "district2", label: "District 2" },
                        ]}
                        required
                    />
                </div>
                <InputField label="Pincode" placeholder="Pincode" required />
                <Dropdown
                    label="Accommodation For"
                    options={[
                        { value: "both", label: "Both" },
                        { value: "boys", label: "Boys" },
                        { value: "girls", label: "Girls" },
                    ]}
                    required
                />
                <Dropdown
                    label="Suitable For"
                    options={[
                        { value: "students", label: "Students" },
                        { value: "working", label: "Working Professionals" },
                    ]}
                    required
                />
                <InputField
                    label="Price (₹/month)"
                    type="number"
                    placeholder="Enter price"
                    required
                />
                <div>
                    <label className="block font-medium mb-1">Shared</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="shared"
                            value="yes"
                            onChange={() => setShared(true)}
                            required
                        />
                        <span>Yes</span>
                        <input
                            type="radio"
                            name="shared"
                            value="no"
                            onChange={() => setShared(false)}
                            required
                        />
                        <span>No</span>
                    </div>
                    {shared && (
                        <InputField
                            type="number"
                            placeholder="Number of people per room"
                            required
                        />
                    )}
                </div>
                <Dropdown
                    label="Mess Type"
                    options={[
                        { value: "pg_hostel", label: "PG/Hostel" },
                        { value: "home", label: "Home" },
                    ]}
                    onChange={(e) => setMessType(e.target.value)}
                    required
                />
                {messType === "pg_hostel" && (
                    <div className="space-y-4">
                        <InputField
                            label="Total Rooms"
                            type="number"
                            placeholder="Enter total rooms"
                            required
                        />
                        <InputField
                            label="Total Beds"
                            type="number"
                            placeholder="Enter total beds"
                            required
                        />
                        <InputField
                            label="Total Common Rooms"
                            type="number"
                            placeholder="Enter total common rooms"
                            required
                        />
                        <InputField
                            label="Total Bathrooms"
                            type="number"
                            placeholder="Enter total bathrooms"
                            required
                        />
                        <Dropdown
                            label="Canteen Availability"
                            options={[
                                { value: "self", label: "Self" },
                                { value: "near", label: "Near" },
                                { value: "far", label: "Far" },
                                { value: "dd", label: "Door Delivery" },
                            ]}
                            required
                        />
                        <InputField
                            label="Number of Floors"
                            type="number"
                            placeholder="Enter number of floors"
                            required
                        />
                    </div>
                )}
                <InputField
                    label="Facilities"
                    placeholder="List facilities (one per line)"
                    as="textarea"
                    rows="3"
                />
                <InputField
                    label="Services"
                    placeholder="List services (one per line)"
                    as="textarea"
                    rows="3"
                />
                <InputField
                    label="Rules"
                    placeholder="List rules (one per line)"
                    as="textarea"
                    rows="3"
                />
                <InputField
                    label="Description"
                    placeholder="Enter description"
                    as="textarea"
                    rows="4"
                />
                <div>
                    <label className="block font-medium mb-1">Upload Images</label>
                    <div className="flex items-center gap-2">
                        <Button
                            label={
                                <>
                                    <FaUpload />
                                    Upload Images
                                </>
                            }
                            className="flex items-center gap-2 border rounded-md p-2 bg-gray-100"
                        />
                        <span className="text-sm text-gray-500">
                            Max 5 images (Thumbnail, Rooms, Bathroom, Outside, Other)
                        </span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Button
                        label="Cancel"
                        className="bg-gray-300 text-gray-700"
                        type="button"
                    />
                    <Button
                        label="Draft"
                        className="bg-yellow-500 text-white"
                        type="button"
                    />
                    <Button
                        label="Submit"
                        className="bg-blue-500 text-white"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default SubmitPG;
export { SubmitPG };
