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
import { roomStorage } from "../../context/firebase-storage";

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
            CanteenAvailability: "Near",
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
    const [roomId, setRoomId] = useState("");

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

    const { uploadRoomImages } = roomStorage();

    const submitFormData = async () => {
        try {
            const { saveRoom } = roomsRTB(firebase);

            const result = await saveRoom(formData, roomId);

            setRoomId(result.roomId);

            const downloadUrls = await uploadRoomImages(result.roomId, formData.images, (index, progress) => {
                console.log(`File ${index + 1} upload progress: ${progress.toFixed(2)}%`);
            });

            console.log("Uploaded URLs:", downloadUrls);

            await saveRoom({ ...formData, images: downloadUrls.map((url) => ({ preview: url })) }, result.roomId);

            alert("Room saved successfully!");

        } catch (error) {
            console.error("Failed to save room:", error);
            alert("Error saving room. Please try again.");
        }
    };

    const handleSubmit = () => {
        setFormData((prev) => ({ ...prev, status: "public" }))
        submitFormData();
    };

    const handleDraft = () => {
        setFormData((prev) => ({ ...prev, status: "draft" }))
        submitFormData();
    }

    console.log(formData.status)

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Submit a New PG</h2>
            <div className="space-y-4">
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
                <FormButtons onDraft={handleDraft} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default SubmitPG;
export { SubmitPG };
