import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { InputField } from "../../components/ui";
import { useLocation, useSearchParams } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import { infoRTB } from "../../context/firebase-rtb";

const ReportOwner = () => {
    const [formData, setFormData] = useState({
        uid: "",
        roomId: "",
        ownerUname: "",
        ownerId: "",
        reason: "",
        description: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const firebase = useFirebase();
    const [searchParams] = useSearchParams();


    const location = useLocation();

    // Populate roomId and ownerUname from URL
    useEffect(() => {
        const roomId = location.state?.roomId || "";
        const ownerUname = location.state?.username || "";
        const ownerId = location.state?.userId || "";

        // Set room info immediately
        setFormData((prev) => ({
            ...prev,
            roomId,
            ownerUname,
            ownerId,
        }));

        // Watch for auth state
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setFormData((prev) => ({
                    ...prev,
                    uid: user.uid,
                }));
                setErrorMessage(""); // clear error if user is present
            } else {
                setErrorMessage("Please log in to submit a report.");
            }
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, [firebase.auth, searchParams]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { uid, roomId, ownerUname, ownerId, reason, description } = formData;
        if (!uid) {
            setErrorMessage("You must be logged in to submit a report.");
            return;
        }

        if (!reason || !description) {
            setErrorMessage("Please provide both a reason and a description.");
            return;
        }

        try {
            const { reportRoom } = infoRTB(firebase);
            await reportRoom({
                uid: uid,
                roomId: roomId,
                ownerUname: ownerUname,
                ownerId: ownerId,
                reason: reason,
                description: description,
            });

            setSuccessMessage("Your report has been submitted successfully!");
            setFormData({
                uid: uid,
                roomId: roomId,
                ownerUname: ownerUname,
                ownerId: ownerId,
                reason: "",
                description: "",
            });
            setErrorMessage("");
        } catch (err) {
            console.error(err);
            setErrorMessage("An error occurred while submitting your report.");
        }
    };

    return (
        <main className="min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <div className="flex items-center mb-4">
                    <FaExclamationTriangle className="text-red-500 text-2xl mr-2" />
                    <h1 className="text-2xl font-bold text-gray-800">Report a Room/Owner/User</h1>
                </div>
                {errorMessage ? (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                ) : successMessage ? (
                    <p className="text-green-500 text-center mb-4">{successMessage}</p>
                ) : null}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Room ID (Optional)"
                        type="text"
                        value={formData.roomId}
                        disabled
                    />
                    <InputField
                        label="Username"
                        type="text"
                        value={formData.ownerUname}
                        disabled
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
                            className="mt-1 block w-full rounded-md border border-gray-400 focus:ring-indigo-500 focus:outline-0 focus:ring-1 focus:border-indigo-500 sm:text-sm p-2"
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
                            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-indigo-500 focus:outline-0 focus:ring-1 focus:border-indigo-500 sm:text-sm p-2"
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
