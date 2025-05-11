import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { InputField } from "../ui/input";
import { Dropdown } from "../ui/option";


import { Alert } from "../ui/alert"
import { statesAndDistricts } from '/src/module/js/district-pin';
import { useFirebase } from "../../context/firebase"
import { roomsRTB } from "./../../context/firebase-rtb"

import ImageUpload from './form/ImageUpload';
import AccommodationDetails from './form/AccommodationDetails';
import MessDetails from './form/MessDetails';
import FormButtons from './form/FormButtons';
import { roomStorage } from "../../context/firebase-storage";
import { onAuthStateChanged } from "firebase/auth";
import { refFromURL } from "firebase/database";
import Loader from "../ui/loader";

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

    const params = useParams();

    const firebase = useFirebase();


    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [pincodeError, setPincodeError] = useState("");
    const [roomId, setRoomId] = useState(params.roomId || "");
    const [authReady, setAuthReady] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateDone, setUpdateDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(firebase.auth, user => {
            if (user) {
                setAuthReady(true);
            } else {
                console.log("User not logged in");
            }
        });

        return () => unregisterAuthObserver(); // cleanup
    }, [firebase.auth]);

    useEffect(() => {
        if (!authReady || !roomId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        if (uploading) {
            return;
        }
        console.log("fetching data");
        const fetchRoomDetails = async () => {
            try {
                const user = firebase.auth.currentUser;
                if (!user) return;

                const { getRoom } = roomsRTB(firebase);
                await getRoom(roomId)
                    .then((roomDetails) => {
                        console.log(roomDetails);
                        if (roomDetails.ownerId == user.uid) {
                            setFormData(roomDetails);
                        } else {
                            console.log("Unauthorized access");
                        }
                    }).catch(() => {
                        console.log("Room doesn't exists..");
                    })
            } catch (error) {
                console.log("Error fetching room:", error);
                errorMessage("Error fetching room:");

            }
            setLoading(false);
        };

        fetchRoomDetails();
    }, [authReady, roomId, firebase]);

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
        const { name, value, type } = e.target;
        let processedValue = value;

        if (type === "textarea") {
            // Replace real newlines with the string "\n"
            processedValue = value.replace(/\n/g, "\\n");
            console.log(processedValue);
        }

        setFormData(prev => ({
            ...prev,
            [name]: processedValue
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
        setLoading(true);
        try {
            setUploading(true);
            const { saveRoom } = roomsRTB(firebase);

            let downloadUrls;
            if (roomId) {
                downloadUrls = await uploadRoomImages(roomId, formData.images, (index, progress) => {
                    console.log(`File ${index + 1} upload progress: ${progress.toFixed(2)}%`);
                });
            } else {
                const result = await saveRoom(formData, result.roomId);
                downloadUrls = await uploadRoomImages(result.roomId, formData.images, (index, progress) => {
                    console.log(`File ${index + 1} upload progress: ${progress.toFixed(2)}%`);
                });
                setRoomId(result.roomId);
            }
            console.log(formData);
            formData.images = downloadUrls.map((url) => ({ preview: url }));
            setFormData({ ...formData, images: downloadUrls.map((url) => ({ preview: url })) })
            await saveRoom(formData, roomId);

            console.log("Uploaded URLs:", downloadUrls);
            console.log(formData);

            setUpdateDone(true);
            setUploading(false);
        } catch (error) {
            console.error("Failed to save room:", error);
            errorMessage("Error saving room. Please try again.");
        }
        setLoading(false);
    };

    const handleSubmit = () => {
        setFormData((prev) => ({ ...prev, status: "public" }))
        submitFormData();
    };

    const handleDraft = () => {
        setFormData((prev) => ({ ...prev, status: "draft" }))
        submitFormData();
    }

    if (loading) {
        return <Loader text="Loading, Please wait." />
    }

    if (updateDone) {
        return <Alert type="success" header="Uploading Room Successfully." message="You can see your room list, on mypgs.." />;
    }
    if (errorMessage) {
        return <Alert type="error" header="Error Occured, Read below." message="You can't edit, someone else's data. please be real, and don't involve in bad movement.." />;
    }

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

                <DescriptiveDetails onChange={handleChange} />
                <ImageUpload images={formData.images} setImages={handleImageChange} />
                <FormButtons onDraft={handleDraft} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default SubmitPG;
export { SubmitPG };
