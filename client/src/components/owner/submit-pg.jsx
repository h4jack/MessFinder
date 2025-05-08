import React, { useState } from "react";
import { InputField } from "../ui/input";
import { Dropdown } from "../ui/option";
import { statesAndDistricts } from '/src/module/js/district-pin';
import ImageUpload from './form/ImageUpload';
import AccommodationDetails from './form/AccommodationDetails';
import MessDetails from './form/MessDetails';
import FormButtons from './form/FormButtons';

const SubmitPG = () => {
    const [shared, setShared] = useState(false);
    const [messType, setMessType] = useState("Home");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [pincode, setPincode] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [images, setImages] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        // You can implement further form submission logic here
    };

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Submit a New PG</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Name" placeholder="Enter PG/Room Name" required />
                <InputField label="Location" placeholder="Address" required />
                <div className="flex flex-col gap-2 sm:flex-row">
                    <Dropdown
                        label="State"
                        options={stateOptions}
                        onChange={(e) => {
                            setSelectedState(e.target.value);
                            setSelectedDistrict(""); // Reset district when state changes
                            setPincodeError(""); // Reset pincode error
                        }}
                        required
                    />
                    <Dropdown
                        label="District"
                        options={districtOptions}
                        onChange={(e) => {
                            setSelectedDistrict(e.target.value);
                            setPincodeError(""); // Reset pincode error
                        }}
                        required
                    />
                </div>
                <InputField
                    label="Pincode"
                    placeholder="Pincode"
                    onChange={(e) => {
                        validatePincode(e.target.value);
                        setPincode(e.target.value);
                    }}
                    errorMessage={pincodeError}
                    required
                />
                <AccommodationDetails shared={shared} setShared={setShared} />
                <MessDetails messType={messType} setMessType={setMessType} />
                <ImageUpload images={images} setImages={setImages} />
                <FormButtons />
            </form>
        </div>
    );
};

export default SubmitPG;
export { SubmitPG };
