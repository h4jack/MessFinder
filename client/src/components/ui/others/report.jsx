import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { InputField } from "../universal/input";

const ReportOwner = () => {
    const [formData, setFormData] = useState({
        roomId: "",
        ownerName: "",
        reason: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Report Submitted:", formData);
        alert("Your report has been submitted successfully!");
        setFormData({
            roomId: "",
            ownerName: "",
            reason: "",
            description: "",
        });
    };

    return (
        <main className="min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)] bg-[url('/assets/rooms-cover.png')] bg-cover bg-center bg-no-repeat bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <div className="flex items-center mb-4">
                    <FaExclamationTriangle className="text-red-500 text-2xl mr-2" />
                    <h1 className="text-2xl font-bold text-gray-800">Report a Room/Owner</h1>
                </div>
                <p className="text-gray-600 mb-6">
                    If you find any issues with a room or owner, please fill out the form below to report it.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Room ID (if applicable)"
                        type="text"
                        value={formData.roomId}
                        onChange={(e) => handleChange({ target: { name: "roomId", value: e.target.value } })}
                        placeholder="Enter Room ID"
                    />
                    <InputField
                        label="Owner Name"
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => handleChange({ target: { name: "ownerName", value: e.target.value } })}
                        placeholder="Enter Owner's Name"
                    />
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                            Reason for Reporting
                        </label>
                        <select
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        >
                            <option value="">Select a reason</option>
                            <option value="fraud">Fraud</option>
                            <option value="misinformation">Misinformation</option>
                            <option value="harassment">Harassment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide a detailed description of the issue"
                            rows="4"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Submit Report
                    </button>
                </form>
            </div>
        </main>
    );
};

export { ReportOwner };
