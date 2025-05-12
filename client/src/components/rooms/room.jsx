import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Add this

import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ownerRTB, roomsRTB } from "../../context/firebase-rtb";
import { useLocation, useParams } from "react-router-dom";
import { useFirebase } from "../../context/firebase";

import { InputField } from "../ui/input"
import { Alert } from "../ui/alert";
import { Loader } from "../ui/loader";
import { formatRelativeTime } from "../../module/js/getTime";

// ImageCarousel Component
const ImageCarousel = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <Carousel
                showStatus={false}
                showThumbs={true}
                infiniteLoop
                autoPlay
                showArrows
                className="rounded-lg overflow-hidden"
            >
                {images.map((image, index) => (
                    <div key={index} onClick={() => setSelectedImage(image.preview)} className="cursor-pointer">
                        <img src={image.preview} alt={`Room Image ${index + 1}`} className="aspect-video object-cover" />
                    </div>
                ))}
            </Carousel>

            {/* Modal for full view */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Full View"
                        className="max-w-full max-h-full object-contain p-4"
                    />
                </div>
            )}
        </>
    );
};


// RoomDetailsCard Component
const RoomDetailsCard = ({
    roomInfo = {
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
        status: "",
        ownerId: "",
        updatedAt: "",
    },
    ownerInfo = {
        name: "",
        photoURL: "",
        username: "",
    },
    ...props
}) => {
    const [showFacilities, setShowFacilities] = useState(false);
    const [showServices, setShowServices] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const parseMultilineString = (text) => text.split("\\n").map(line => line.trim()).filter(Boolean);


    const [moreDetails, setMoreDetails] = useState({
        facilities: parseMultilineString(roomInfo.facilities),
        services: parseMultilineString(roomInfo.services),
        rules: parseMultilineString(roomInfo.rules)
    })

    const firebase = useFirebase();
    const { getData } = ownerRTB(firebase);

    return (
        <div className="bg-white shadow-md rounded-lg p-6">

            {/* Title */}
            <h1 className="text-2xl font-bold mb-2">{roomInfo.name}</h1>

            {/* Location */}
            <p className="flex items-center text-gray-700 mb-4">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                <span className="font-semibold">{roomInfo.location}</span>
            </p>

            {/* Price */}
            <p className="text-xl text-gray-600 mb-4">₹{roomInfo.price}<span className="text-lg">/month</span> </p>

            {/* Basic Details */}
            <h2 className="text-lg font-semibold mb-2">Basic Details</h2>
            <table className="w-full text-gray-700 mb-4 ml-4">
                <tbody>
                    <tr>
                        <td className="font-semibold">Accommodation For:</td>
                        <td>{roomInfo.accommodationFor}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Suitable For:</td>
                        <td>{roomInfo.suitableFor}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Vacant Capacity:</td>
                        <td>
                            {roomInfo.shared > 0 ? `With ${roomInfo.shared} Roommate` : "Single"}
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* Mess Info */}
            <h2 className="text-lg font-semibold mb-2">Mess Info</h2>
            <div className="ml-4 text-gray-700 mb-4">
                <p className="font-semibold">Mess Type: <span className="font-normal">{roomInfo.messInfo.messType === "home" ? "Home" : "PG/Hostel"}</span></p>
                {roomInfo.messInfo.messType !== "home" && (
                    <table className="w-full text-gray-700 mt-2">
                        <tbody>
                            <tr>
                                <td className="font-semibold">Total Rooms:</td>
                                <td>{roomInfo.messInfo.totalRooms}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Total Beds:</td>
                                <td>{roomInfo.messInfo.totalBeds}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Common Rooms:</td>
                                <td>{roomInfo.messInfo.totalCRooms}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Bathrooms:</td>
                                <td>{roomInfo.messInfo.totalBathrooms}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Canteen:</td>
                                <td>{roomInfo.messInfo.CanteenAvailability}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Floors:</td>
                                <td>{roomInfo.messInfo.totalFloors}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

            {/* Facilities */}
            <div className="mb-4">
                <button
                    onClick={() => setShowFacilities(!showFacilities)}
                    className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-md mb-2"
                >
                    Facilities {showFacilities ? "▲" : "▼"}
                </button>
                {showFacilities && (
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                        {moreDetails.facilities.map((facility, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 px-2 py-1 rounded-md text-center"
                            >
                                {facility}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Services */}
            <div className="mb-4">
                <button
                    onClick={() => setShowServices(!showServices)}
                    className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-md mb-2"
                >
                    Services {showServices ? "▲" : "▼"}
                </button>
                {showServices && (
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                        {moreDetails.services.map((service, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 px-2 py-1 rounded-md text-center"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Rules */}
            <div className="mb-4">
                <button
                    onClick={() => setShowRules(!showRules)}
                    className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md mb-2"
                >
                    Rules {showRules ? "▲" : "▼"}
                </button>
                {showRules && (
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                        {moreDetails.rules.map((rule, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 px-2 py-1 rounded-md text-center"
                            >
                                {rule}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Description */}
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 mb-2 p-2 bg-gray-100 rounded-sm border-1 border-gray-300">
                {roomInfo.description.replace(/\\n/g, '\n').split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </p>
            {/* Owner Details */}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-6 shadow-md">
                {/* Left Section: Owner Info */}
                <Link to={`/owner/profile/${ownerInfo.username}`}>
                    <div className="flex items-center">
                        <img
                            src={ownerInfo.photoURL || "/assets/john-doe.png"} // Replace with actual profile photo URL
                            alt="Owner Profile"
                            className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{ownerInfo.name}</h3> {/* Replace with actual owner name */}
                            <p className="text-sm text-gray-600">Owner</p>
                        </div>
                    </div>
                </Link>

                {/* Right Section: Posting Time */}
                <div className="text-right">
                    <p className="text-sm text-gray-600">Posted on</p>
                    <p className="text-sm font-semibold text-gray-800">{formatRelativeTime(roomInfo.updatedAt)}</p> {/* Replace with actual posting time */}
                </div>
            </div>
        </div>
    );
};

// ContactButtons Component
const ContactButtons = ({ ownerInfo }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Options</h2>
            <div className="flex flex-col gap-4">
                <a className="flex" href={"tel:" + ownerInfo.phoneNumber}>
                    <button className="flex items-center w-full gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        <FaPhoneAlt />
                        Call Owner
                    </button>
                </a>
                <a className="flex"
                    href={`https://wa.me/${ownerInfo.phoneNumber}?text=${encodeURIComponent("Hi, I'm interested in your room listing.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="flex items-center w-full gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        <FaWhatsapp />
                        WhatsApp
                    </button>
                </a>
            </div>
        </div>
    );
}

// ContactForm Component
const ContactForm = ({ ownerInfo }) => {
    return (
        <div className="sticky top-[64px] bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Contact Owner</h2>
            <form className="space-y-4">
                <InputField label="Full Name" placeholder="Enter your full name" />
                <InputField label="Mobile Number" placeholder="Enter your mobile number" />
                <InputField type="textarea" label="Message" placeholder="Enter your message" rows={5} />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

// Main RoomDetails Component
const RoomDetails = () => {
    const [roomInfo, setRoomInfo] = useState({
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
        status: "",
    });
    const [ownerInfo, setOwnerInfo] = useState({
        name: "",
        photoURL: "",
        username: "",
        phoneNumber: "",
    })

    const params = useParams();

    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const firebase = useFirebase();
    const { getRoom } = roomsRTB(firebase);
    const { getData } = ownerRTB(firebase);

    useEffect(() => {
        const roomId = params?.roomId;
        if (!roomId) {
            setErrorMessage("Invalid room ID.");
            return;
        }

        setLoading(true);
        getRoom(roomId)
            .then((res) => {
                const currentUser = firebase.auth.currentUser;
                if (res.status === "draft") {
                    if (!currentUser || res.ownerId !== currentUser.uid) {
                        setErrorMessage("The Room is in draft mode, and you are not authorised to view this.");
                        return;
                    }
                }
                setRoomInfo(res);
            })
            .catch(() => {
                setErrorMessage("Error while fetching Room Details from server.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [firebase, params.roomId]);

    useEffect(() => {
        if (roomInfo.ownerId) {
            getData(roomInfo.ownerId)
                .then((owner) => {
                    setOwnerInfo({
                        name: owner.displayName,
                        username: owner.username,
                        photoURL: owner.photoURL,
                        phoneNumber: owner.phoneNumber,
                        email: owner.email,
                    });
                });
        }
    }, [roomInfo.ownerId]);

    return (
        <div className="bg-gray-100 w-full min-h-[calc(100vh-80px)] mx-auto h-full p-6 flex justify-center items-center">
            {errorMessage ? (
                <Alert type="error" message={errorMessage} />
            ) : loading ? (
                <Loader />
            ) : (
                <div className="max-w-[1080px] flex flex-col sm:flex-row gap-6">
                    {/* Left Section: Room Details */}
                    <div className="flex-1 sm:flex-4 lg:flex-6">
                        {/* Image Carousel */}
                        <div className="mb-6">
                            <ImageCarousel images={roomInfo.images} />
                        </div>

                        {/* Room Details */}
                        <RoomDetailsCard roomInfo={roomInfo} ownerInfo={ownerInfo} />
                    </div>

                    {/* Right Section: Contact Details */}
                    <div className="flex-1 sm:flex-2">
                        <ContactButtons ownerInfo={ownerInfo} />
                        <ContactForm ownerInfo={ownerInfo} />
                    </div>
                </div>
            )}
        </div>
    );
};

export { RoomDetails };