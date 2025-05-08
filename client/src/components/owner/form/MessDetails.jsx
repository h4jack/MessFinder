import React from 'react';
import { InputField } from "../../ui/input";
import { Dropdown } from "../../ui/option";

const MessDetails = ({ messType, setMessType }) => {
    return (
        <div>
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
                type="textarea"
                rows="3"
            />
            <InputField
                label="Services"
                placeholder="List services (one per line)"
                type="textarea"
                rows="3"
            />
            <InputField
                label="Rules"
                placeholder="List rules (one per line)"
                type="textarea"
                rows="3"
            />
            <InputField
                label="Description"
                placeholder="Enter description"
                type="textarea"
                rows="4"
            />
        </div>
    );
};

export default MessDetails;
