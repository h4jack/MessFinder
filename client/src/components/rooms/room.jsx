import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaMapMarkerAlt } from "react-icons/fa";

// Example data object
const roomData = {
    title: "Luxury Room Near YMCA University",
    price: "₹ 10,000 / month",
    location: "Faridabad, Haryana",
    suitableFor: "Students, Working Professionals",
    accommodationFor: "Male",
    vacantCapacity: 2,
    facilities: ["WiFi", "AC", "Meals", "Laundry"],
    services: ["Housekeeping", "24/7 Security", "Power Backup"],
    rules: ["No Smoking", "No Pets", "Visitors Allowed Till 8 PM"],
    description: "This luxury room is located near YMCA University in Faridabad. It is suitable for students and working professionals. The room is well-furnished and equipped with modern amenities.",
    images: ["/assets/room1.png", "/assets/room2.png", "/assets/room3.png"],
};

// ImageCarousel Component
const ImageCarousel = ({ images }) => {
    return (
        <Carousel
            showStatus={false}
            showThumbs={true}
            infiniteLoop
            autoPlay
            showArrows
            className="rounded-lg overflow-hidden"
        >
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Room Image ${index + 1}`} className="aspect-video object-cover" />
                </div>
            ))}
        </Carousel>
    )
};

// RoomDetailsCard Component

const RoomDetailsCard = ( {
    title,
    price,
    location,
    suitableFor,
    accommodationFor,
    vacantCapacity,
    facilities,
    services,
    rules,
    description,
}) => {
    const [showFacilities, setShowFacilities] = React.useState(false);
    const [showServices, setShowServices] = React.useState(false);
    const [showRules, setShowRules] = React.useState(false);

    return (
        <div className="bg-white shadow-md rounded-lg p-6">

            {/* Title */}
            <h1 className="text-2xl font-bold mb-2">{title}</h1>

            {/* Location */}
            <p className="flex items-center text-gray-700 mb-4">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                <span className="font-semibold">{location}</span>
            </p>

            {/* Price */}
            <p className="text-xl text-gray-600 mb-4">{price}</p>

            {/* Basic Details */}
            <h2 className="text-lg font-semibold mb-2">Basic Details</h2>
            <table className="w-full text-gray-700 mb-4">
                <tbody>
                    <tr>
                        <td className="font-semibold">Accommodation For:</td>
                        <td>{accommodationFor}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Suitable For:</td>
                        <td>{suitableFor}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Vacant Capacity:</td>
                        <td>
                            {vacantCapacity} {vacantCapacity > 1 ? "(Shared)" : ""}
                        </td>
                    </tr>
                </tbody>
            </table>

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
                        {facilities.map((facility, index) => (
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
                        {services.map((service, index) => (
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
                        {rules.map((rule, index) => (
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
            <p className="text-gray-700">{description}</p>
            {/* Owner Details */}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-6 shadow-md">
                {/* Left Section: Owner Info */}
                <div className="flex items-center">
                    <img
                        src="/assets/john-doe.png" // Replace with actual profile photo URL
                        alt="Owner Profile"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">John Doe</h3> {/* Replace with actual owner name */}
                        <p className="text-sm text-gray-600">Owner</p>
                    </div>
                </div>

                {/* Right Section: Posting Time */}
                <div className="text-right">
                    <p className="text-sm text-gray-600">Posted on</p>
                    <p className="text-sm font-semibold text-gray-800">March 15, 2023</p> {/* Replace with actual posting time */}
                </div>
            </div>
        </div>
    );
};

// ContactButtons Component
const ContactButtons = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Options</h2>
            <div className="flex flex-col gap-4">
                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    <FaPhoneAlt />
                    Call Owner
                </button>
                <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    <FaWhatsapp />
                    WhatsApp Owner
                </button>
            </div>
        </div>
    );
}

// ContactForm Component
const ContactForm = () => {
    return (
        <div className="sticky top-[64px] bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Contact Owner</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your mobile number"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Message</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your message"
                    ></textarea>
                </div>
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
    return (
        <div className="bg-gray-100 w-full p-6 flex justify-center items-start">
            <div className="max-w-[1080px] flex flex-col sm:flex-row gap-6">
                {/* Left Section: Room Details */}
                <div className="flex-1 sm:flex-4 lg:flex-6">
                    {/* Image Carousel */}
                    <div className="mb-6">
                        <ImageCarousel images={roomData.images} />
                    </div>

                    {/* Room Details */}
                    <RoomDetailsCard
                        title={roomData.title}
                        price={roomData.price}
                        location={roomData.location}
                        suitableFor={roomData.suitableFor}
                        facilities={roomData.facilities}
                        services={roomData.services}
                        rules={roomData.rules}
                        accommodationFor={roomData.accommodationFor}
                        vacantCapacity={roomData.vacantCapacity}
                        description={roomData.description}
                    />
                </div>

                {/* Right Section: Contact Details */}
                <div className="flex-1 sm:flex-2">
                    {/* Contact Buttons */}
                    <ContactButtons />

                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export { RoomDetails };