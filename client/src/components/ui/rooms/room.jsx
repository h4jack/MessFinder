import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const RoomDetails = () => {
    return (
        <div className="max-w-[1440px] mx-auto p-4">
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Left Section: Room Details */}
                <div className="flex-1 sm:flex-4 lg:flex-6">
                    {/* Image Carousel */}
                    <div className="mb-6">
                        <Carousel
                            showStatus={false}
                            showThumbs={true}
                            infiniteLoop
                            autoPlay
                            showArrows
                            className="rounded-lg overflow-hidden"
                        >
                            <div>
                                <img
                                    src="/assets/room.png"
                                    alt="Room Image 1"
                                    className="aspect-video object-cover"
                                />
                            </div>
                            <div>
                                <img
                                    src="/assets/room.png"
                                    alt="Room Image 2"
                                    className="aspect-video object-cover"
                                />
                            </div>
                            <div>
                                <img
                                    src="/assets/room.png"
                                    alt="Room Image 3"
                                    className="aspect-video object-cover"
                                />
                            </div>
                        </Carousel>
                    </div>

                    {/* Room Details */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-2">Luxury Room Near YMCA University</h1>
                        <p className="text-lg text-gray-600 mb-4">₹ 10,000 / month</p>
                        <p className="text-gray-700 mb-4">
                            Location: <span className="font-semibold">Faridabad, Haryana</span>
                        </p>
                        <p className="text-gray-700 mb-4">
                            Suitable for: <span className="font-semibold">Students, Working Professionals</span>
                        </p>
                        <p className="text-gray-700 mb-4">
                            Facilities: <span className="font-semibold">WiFi, AC, Meals, Laundry</span>
                        </p>
                    </div>
                </div>

                {/* Right Section: Contact Details */}
                <div className="flex-1 sm:flex-2">
                    {/* Contact Buttons */}
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

                    {/* Contact Form */}
                    <div className="bg-gray-100 p-6 rounded-lg">
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
                </div>
            </div>
        </div>
    );
};

export { RoomDetails };