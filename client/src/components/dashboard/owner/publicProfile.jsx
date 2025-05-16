import React from "react";
import { FaPhoneAlt, FaWhatsapp, FaFlag } from "react-icons/fa";

const OwnerPublicProfile = ({ owner = {
    photoURL: "",
    name: "John Doe",
    username: "johndoe123",
    email: "john@example.com",
    phoneNumber: "+911234567890",
    description: "Owner of multiple rental properties around the city. Always available for tenants and strives to provide the best stay experience."
}}) => {
    return (
        <div className="bg-gray-50 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img
                        src={owner.photoURL || "/assets/avatar-default.svg"}
                        alt="Owner Profile"
                        className="w-28 h-28 rounded-full object-cover border"
                    />
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-semibold text-gray-800">{owner.name}</h1>
                        <p className="text-gray-600">@{owner.username}</p>
                        <p className="text-gray-500">{owner.email}</p>
                        <p className="text-gray-500">{owner.phoneNumber}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">About</h2>
                    <p className="text-gray-600 whitespace-pre-line">
                        {owner.description || "No description provided."}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                    <a href={`tel:${owner.phoneNumber}`} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            <FaPhoneAlt /> Call
                        </button>
                    </a>

                    <a
                        href={`https://wa.me/${owner.phoneNumber}?text=${encodeURIComponent("Hi, I found your profile and I'm interested in a room.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                    >
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                            <FaWhatsapp /> WhatsApp
                        </button>
                    </a>

                    <button
                        onClick={() => alert("Report sent!")}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                    >
                        <FaFlag /> Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerPublicProfile;
