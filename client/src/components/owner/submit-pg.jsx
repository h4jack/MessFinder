import { useState } from "react";
import { InputField } from "../ui/input";
import { Dropdown } from "../ui/option";

import { statesAndDistricts } from '/src/module/js/district-pin';
import { useFirebase } from "../../context/firebase"
import { roomsRTB } from "./../../context/firebase-rtb"

import ImageUpload from './form/ImageUpload';
import AccommodationDetails from './form/AccommodationDetails';
import MessDetails from './form/MessDetails';
import FormButtons from './form/FormButtons';

const DescriptiveDetails = ({ ...props }) => {
    return (
        <>
            <InputField
                label="Facilities"
                name="facilities"
                placeholder="List facilities (one per line)"
                type="textarea"
                rows="4"
                {...props}
            />
            <InputField
                label="Services"
                name="services"
                placeholder="List services (one per line)"
                type="textarea"
                rows="4"
                {...props}
            />
            <InputField
                label="Rules"
                name="rules"
                placeholder="List rules (one per line)"
                type="textarea"
                rows="4"
                {...props}
            />
            <InputField
                label="Description"
                name="description"
                placeholder="Enter description"
                type="textarea"
                rows="6"
                {...props}
            />
        </>
    )
}

const SubmitPG = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        state: '',
        district: '',
        pincode: '',
        accommodationFor: 'Boys',
        suitableFor: "Students",
        price: 0,
        shared: 1,
        messInfo: {
            messType: "Home",
            totalRooms: 1,
            totalBeds: 1,
            totalCRooms: 0,
            totalBathrooms: 1,
            CanteenAvailability: "Door Delivery",
            totalFloors: 1,
        },
        facilities: "",
        services: "",
        rules: "",
        description: "",
        images: [],
        status: "draft",
    });

    const firebase = useFirebase();

    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handlers to update accommodation related fields
    const setAccommodationFor = (value) => {
        setFormData(prev => ({ ...prev, accommodationFor: value }));
    };
    const setSuitableFor = (value) => {
        setFormData(prev => ({ ...prev, suitableFor: value }));
    };
    const setPrice = (value) => {
        const num = Number(value);
        setFormData(prev => ({ ...prev, price: isNaN(num) ? 0 : num }));
    };
    const setShared = (value) => {
        // value can be number or 0 for none shared
        const num = Number(value);
        setFormData(prev => ({ ...prev, shared: isNaN(num) ? 0 : num }));
    };


    const setMessType = (value) => {
        setFormData(prev => ({
            ...prev,
            messInfo: {
                ...prev.messInfo,
                messType: value
            }
        }));
    };

    const setTotalRooms = (value) => {
        setFormData(prev => ({
            ...prev,
            messInfo: {
                ...prev.messInfo,
                totalRooms: value
            }
        }));
    };

    const setTotalBeds = (value) => {
        setFormData(prev => ({
            ...prev,
            messInfo: {
                ...prev.messInfo,
                totalBeds: value
            }
        }));
    };

    const setTotalCRooms = (value) => {
        setFormData(prev => ({
            ...prev,
            messInfo: {
                ...prev.messInfo,
                totalCRooms: value
            }
        }));
    };

    const setTotalBathrooms = (value) => {
        setFormData(prev => ({
            ...prev,
            messInfo: {
                ...prev.messInfo,
                totalBathrooms: value
            }
        }));
    };

    const setCanteenAvailability = (value) => {
        setFormData(prev => ({
            ...prev,
            messInfo: {
                ...prev.messInfo,
                canteenAvailability: value
            }
        }));
    };

    const setTotalFloors = (value) => {
        setFormData(prev => ({
            ...prev,
            messInfo: {
                ...prev.messInfo,
                totalFloors: value
            }
        }));
    };

    const handleImageChange = (newImages) => {
        setFormData((prev) => ({ ...prev, images: newImages }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const imageUrls = await uploadImages(formData.images);
    //         const dataToSubmit = { ...formData, images: imageUrls };

    //         // Submit dataToSubmit to your backend or Firestore
    //         console.log('Form data:', dataToSubmit);
    //     } catch (error) {
    //         console.error('Form submission error:', error);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { saveRoom } = roomsRTB(firebase);

            const result = await saveRoom(formData);

            console.log("Room saved:", result);

            alert("Room saved successfully!");

            // Optional: redirect to room detail or dashboard
            // navigate(`/rooms/${result.roomId}`);

        } catch (error) {
            console.error("Failed to save room:", error);
            alert("Error saving room. Please try again.");
        }
    };

    console.log(formData.images);

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Submit a New PG</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Name"
                    placeholder="Enter PG/Room Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Location"
                    placeholder="Address, Landmark, Area or Locality, Any?"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                    <Dropdown
                        label="State"
                        name="state"
                        value={formData.state}
                        options={stateOptions}
                        onChange={(e) => {
                            const value = e.target.value;
                            handleChange(e);
                            setSelectedState(value);
                            setFormData(prev => ({
                                ...prev,
                                district: '', // reset district
                            }));
                            setPincodeError('');
                        }}
                        required
                    />
                    <Dropdown
                        label="District"
                        name="district"
                        value={formData.district}
                        options={districtOptions}
                        onChange={(e) => {
                            const value = e.target.value;
                            handleChange(e);
                            setSelectedDistrict(value);
                            setPincodeError('');
                        }}
                        required
                    />
                </div>
                <InputField
                    label="Pincode"
                    placeholder="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={(e) => {
                        validatePincode(e.target.value);
                        handleChange(e);
                    }}
                    errorMessage={pincodeError}
                    required
                />
                <AccommodationDetails
                    accommodationFor={formData.accommodationFor}
                    suitableFor={formData.suitableFor}
                    price={formData.price}
                    shared={formData.shared}
                    setAccommodationFor={setAccommodationFor}
                    setSuitableFor={setSuitableFor}
                    setPrice={setPrice}
                    setShared={setShared}
                />
                <MessDetails
                    messType={formData.messInfo.messType}
                    setMessType={setMessType}
                    totalRooms={formData.messInfo.totalRooms}
                    setTotalRooms={setTotalRooms}
                    totalBeds={formData.messInfo.totalBeds}
                    setTotalBeds={setTotalBeds}
                    totalCRooms={formData.messInfo.totalCRooms}
                    setTotalCRooms={setTotalCRooms}
                    totalBathrooms={formData.messInfo.totalBathrooms}
                    setTotalBathrooms={setTotalBathrooms}
                    canteenAvailability={formData.messInfo.canteenAvailability}
                    setCanteenAvailability={setCanteenAvailability}
                    totalFloors={formData.messInfo.totalFloors}
                    setTotalFloors={setTotalFloors}
                />

                < DescriptiveDetails onChange={handleChange} />
                <ImageUpload images={formData.images} setImages={handleImageChange} />
                <FormButtons />
            </form>
        </div>
    );
};

export default SubmitPG;
export { SubmitPG };
