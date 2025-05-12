import { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';

import { InputField } from "../ui/input";
import { Dropdown } from "../ui/option";


import { Alert } from "../ui/alert"
import { statesAndDistricts } from '/src/module/js/district-pin';
import { useFirebase } from "../../context/firebase"
import { ownerRTB, roomsRTB } from "./../../context/firebase-rtb"

import ImageUpload from './form/ImageUpload';
import AccommodationDetails from './form/AccommodationDetails';
import MessDetails from './form/MessDetails';
import FormButtons from './form/FormButtons';
import { roomStorage } from "../../context/firebase-storage";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../ui/loader";
import { isAgeAboveLimit, validateIndianPhoneNumber, validateUsername } from "../../module/js/string";

const DescriptiveDetails = ({ ...props }) => {
    return (
        <>
            <InputField
                label="Facilities"
                name="facilities"
                placeholder="List facilities (one per line)"
                type="textarea"
                rows="4"
                value={props.facilities?.replace(/\\n/g, "\n")}
                {...props}
            />
            <InputField
                label="Services"
                name="services"
                placeholder="List services (one per line)"
                type="textarea"
                rows="4"
                value={props.services?.replace(/\\n/g, "\n")}
                {...props}
            />
            <InputField
                label="Rules"
                name="rules"
                placeholder="List rules (one per line)"
                type="textarea"
                rows="4"
                value={props.rules?.replace(/\\n/g, "\n")}
                {...props}
            />
            <InputField
                label="Description"
                name="description"
                placeholder="Enter description"
                type="textarea"
                rows="6"
                value={props.description?.replace(/\\n/g, "\n")}
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
            canteenAvailability: "Near",
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
    const location = useLocation();

    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [pincodeError, setPincodeError] = useState("");
    const [uid, setUID] = useState("");
    const [roomId, setRoomId] = useState("");
    const [authReady, setAuthReady] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateDone, setUpdateDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        const id = params?.roomId || "";
        setRoomId(id);
        if (!id) {
            setFormData({
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
                    canteenAvailability: "Near",
                    totalFloors: 1,
                },
                facilities: "",
                services: "",
                rules: "",
                description: "",
                images: [],
                status: "draft",
            })
        }
        setErrorMessage(false)
        setUpdateDone(false)
    }, [params?.roomId, location.pathname]);

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(firebase.auth, user => {
            const { getData } = ownerRTB(firebase);
            if (user) {
                setUID(user.uid);
                getData(user.uid)
                    .then((res) => {
                        if (validateIndianPhoneNumber(res.phoneNumber)) {
                            if (user.emailVerified) {
                                if (validateUsername(res.username)) {
                                    if (isAgeAboveLimit(res.dob)) {
                                        setAuthReady(true);
                                    } else {
                                        setErrorMessage("Your Age is not above 18, please user aged less than 18 are not allowed to submit rooms.");
                                    }
                                } else {
                                    setErrorMessage("Invalid username, or username not set, please set your username first.");
                                }
                            } else {
                                setErrorMessage("Email is not varified of user, please verify your email address.");
                            }
                        } else {
                            setErrorMessage("Phone Number not set, or not a valid phone number, please enter a valid indian phone number..");
                        }
                    }).catch(() => {
                        setErrorMessage("Error while fetching owner details from server.");
                    })
            } else {
                setErrorMessage("User not logged in, please login first, please inform admin, if anything going wrong.");
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

        const fetchRoomDetails = async () => {
            try {
                const user = firebase.auth.currentUser;
                if (!user) return;

                const { getRoom } = roomsRTB(firebase);
                await getRoom(roomId)
                    .then((roomDetails) => {
                        if (roomDetails.ownerId == user.uid) {
                            setFormData(roomDetails);
                        } else {
                            setErrorMessage("You can't edit, someone else's data. please be real, and don't involve in bad movement..")
                        }
                    }).catch(() => {
                        setErrorMessage("Invalid Room Id, plesae check your room id..")
                    })
            } catch (error) {
                console.log("Error fetching room:", error);
                setErrorMessage("Error fetching room.. Please report this to admin.");

            }
            setLoading(false);
        };

        fetchRoomDetails();
    }, [authReady, roomId, firebase]);

    useEffect(() => {
        if (formData.state) {
            setSelectedState(formData.state);
        }
        if (formData.district) {
            setSelectedDistrict(formData.district);
        }
    }, [formData.state, formData.district]);


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



    const verifyInputs = (formData) => {
        // Check top-level string fields
        const requiredFields = [
            'name', 'location', 'state', 'district', 'pincode',
            'accommodationFor', 'suitableFor', 'facilities',
            'services', 'rules', 'description', 'status'
        ];

        for (let field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === '') {
                return { status: false, message: "Not all input fields are filled, please fill all input fields.." };
            }
        }

        // Check price and shared (must be non-zero positive numbers)
        if (formData.price <= 0 || formData.shared <= 0) {
            return { status: false, message: "Price and shared must be non-zero positive numbers.." };
        }

        // Validate messInfo object
        const messInfoFields = [
            'messType', 'totalRooms', 'totalBeds',
            'totalCRooms', 'totalBathrooms', 'canteenAvailability', 'totalFloors'
        ];

        for (let field of messInfoFields) {
            const value = formData.messInfo?.[field];
            if (value === undefined || value === null || value === '' || (typeof value === 'number' && value < 0)) {
                return { status: false, message: "Not all fields of messInfo are provided.. for pg.." };
            }
        }

        // Validate images array (must have at least one image)
        if (!Array.isArray(formData.images) || formData.images.length === 0) {
            return { status: false, message: "Please upload at least 1, image of your room posting.." };
        }

        return { status: true, message: "All inputs are valid" };
    };

    const { uploadRoomImages } = roomStorage();

    const submitFormData = async () => {
        setLoading(true);
        const validateInputs = verifyInputs(formData);
        if (validateInputs.status) {
            try {
                setUploading(true);
                const { saveRoom } = roomsRTB(firebase);

                let downloadUrls;
                let currentRoomId = roomId;

                // If no roomId exists, create a new room and get its ID
                if (!currentRoomId) {
                    const result = await saveRoom(formData, null);
                    currentRoomId = result.roomId;
                    setRoomId(currentRoomId); // update state for UI or future calls
                }

                // Now currentRoomId is always valid
                downloadUrls = await uploadRoomImages(currentRoomId, formData.images, (index, progress) => {
                    // console.log(`File ${index + 1} upload progress: ${progress.toFixed(2)} %`);
                });

                const updatedImages = downloadUrls.map((url) => ({ preview: url }));
                const updatedFormData = { ...formData, images: updatedImages };

                setFormData(updatedFormData);

                // Save updated formData with image URLs
                await saveRoom(updatedFormData, currentRoomId);

                setUpdateDone("You can see your room list, on mypgs..");
                setUploading(false);
            } catch (error) {
                console.error("Failed to save room:", error);
                setErrorMessage("Error saving room. Please try again.");
            }
        } else {
            setErrorMessage(validateInputs.message)
            setTimeout(() => {
                setErrorMessage("")
            }, 3000);
        }
        setLoading(false);
    };

    const handleSubmit = () => {
        formData.status = "public";
        setFormData((prev) => ({ ...prev, status: "public" }))
        submitFormData();
    };

    const handleDraft = () => {
        formData.status = "draft";
        setFormData((prev) => ({ ...prev, status: "draft" }))
        submitFormData();
    }


    const { deleteRoomImages } = roomStorage();

    const handleDelete = () => {
        const { deleteRoom } = roomsRTB(firebase);
        deleteRoom(roomId, uid)
            .then((res) => {
                if (res.status) {
                    deleteRoomImages(roomId)
                        .then(() => {
                            setUpdateDone("Deleted room successfully, enjoy..")
                        }).catch(() => {
                            setErrorMessage("Error: while deleting room images from storage, please contact admin..")
                        })
                } else {
                    setUpdateDone(res.message)
                }
            }).catch((error) => {
                console.log(error);
                setErrorMessage("Error: while deleting your room, please retry.")
            });
    }

    if (loading) {
        return <Loader text="Loading, Please wait." />
    }

    if (updateDone) {
        return <Alert type="success" header="Updating Room Successfully." message={updateDone} />;
    }
    if (errorMessage) {
        return <Alert type="error" header="Error Occured, Read below." message={errorMessage} />;
    }

    return (
        <div className="w-full mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">{roomId ? `Edit Your Room` : "Submit a New PG"}</h2>
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

                <DescriptiveDetails onChange={handleChange} facilities={formData.facilities} services={formData.services} rules={formData.rules} description={formData.description} />
                <ImageUpload images={formData.images} setImages={handleImageChange} />
                <FormButtons onDelete={roomId ? handleDelete : false} onDraft={handleDraft} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default SubmitPG;
export { SubmitPG };
