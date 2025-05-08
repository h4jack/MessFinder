import React from 'react';
import { InputField } from "../../ui/input";
import { Dropdown } from "../../ui/option";

const AccommodationDetails = ({ shared, setShared }) => {
    return (
        <div>
            <div className="flex flex-col gap-2 sm:flex-row">
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
            </div>
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
        </div>
    );
};

export default AccommodationDetails;
