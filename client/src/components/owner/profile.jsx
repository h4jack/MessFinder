import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useFirebase } from "../../context/firebase";
import { ownerRTB } from "../../context/firebase-rtb";
import { sendEmailVerification, updateEmail, updateProfile } from "firebase/auth";
import Loader from "../ui/loader"

const Profile = () => {
    const [uid, setUID] = useState("")
    const [formData, setFormData] = useState(null);
    const [emailVerified, setEmailVerified] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [uName, setUame] = useState("")

    const firebase = useFirebase();

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setUID(user.uid);
                setEmailVerified(user.emailVerified);
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [firebase.auth]);

    useEffect(() => {
        const { getData } = ownerRTB(firebase)
        const loadUserData = async () => {
            try {
                const user = await getData(uid);
                setUame(user.username);
                setFormData(user);
            } catch (error) {
                console.error("Failed to load user data:", error);
            }
        };

        loadUserData();
    }, [uid, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        const { saveData, userExists } = ownerRTB(firebase);
        const user = firebase.auth.currentUser;

        try {
            if (formData.username && formData.username != uName) {
                const { valid, available, reason } = await userExists(formData.username);
                if (!valid || !available) {
                    showAlert(reason || "Invalid or unavailable username.", "error");
                    return;
                }
            }

            // Continue with auth update and saving data
            if (user) {
                const authUpdates = {};
                if (formData.displayName && formData.displayName !== user.displayName) {
                    authUpdates.displayName = formData.displayName;
                }
                if (formData.photoURL && formData.photoURL !== user.photoURL) {
                    authUpdates.photoURL = formData.photoURL;
                }
                if (Object.keys(authUpdates).length > 0) {
                    await updateProfile(user, authUpdates);
                }
                if (formData.email && formData.email !== user.email) {
                    await updateEmail(user, formData.email);
                }
            }

            await saveData(uid, formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save user data:", error);
            showAlert("Failed to update profile. If email change fails, try logging in again.", "error");
        }
    };


    const handleCancel = () => {
        setFormData({
            displayName: formData.displayName || "",
            email: formData.email || "",
            phoneNumber: formData.phoneNumber || "",
        });
        setIsEditing(false);
    };

    const handleVerifyEmail = () => {
        const user = firebase.auth.currentUser;
        sendEmailVerification(user)
            .then(() => {
                showAlert("Verification email sent!", "success");
            })
            .catch(() => {
                showAlert("Failed to send verification email. if error persist. re-login and try again.", "error");
            });
    };

    const showAlert = (message, type) => {
        setAlertMessage({ message, type });
        setTimeout(() => {
            setAlertMessage(null);
        }, 5000); // Hide alert after 3 seconds
    };

    if (!formData) {
        return (
            <Loader text="Loading profile data.." />
        );
    }


    return (
        <div className="w-full mx-auto shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center justify-center bg-gray-100 p-4 relative">
                <img
                    className="w-24 h-24 rounded-full border-2 border-blue-500"
                    src={formData.photoURL || "/assets/avatar-default.svg"}
                    alt={formData.displayName || "Profile picture"}
                />
                {isEditing && (
                    <label
                        htmlFor="profileImageUpload"
                        className="absolute top-2 right-2 bg-blue-300 text-white p-2 rounded-full h-[40px] w-[40px] cursor-pointer hover:bg-blue-400"
                        title="Edit Profile Image"
                    >
                        ✏️
                        <input
                            type="file"
                            id="profileImageUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            photoURL: reader.result,
                                        }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                )}
            </div>
            {alertMessage && (
                <div
                    className={`p-4 text-center text-white ${alertMessage.type === "success"
                        ? "bg-green-500"
                        : alertMessage.type === "error"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                >
                    {alertMessage.message}
                </div>
            )}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
                    <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={handleToggleEdit}
                    >
                        {isEditing ? "Cancel Edit" : "Edit Profile"}
                    </button>
                </div>
                <div className="mt-4">
                    <div className="flex items-center mb-2">
                        <span className="text-gray-600 font-medium">Name:</span>
                        <input
                            type="text"
                            name="displayName"
                            value={formData.displayName || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`ml-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                                } rounded px-2 py-1 text-gray-800 w-full`}
                        />
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="text-gray-600 font-medium">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={formData.username || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`ml-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                                } rounded px-2 py-1 text-gray-800 w-full`}
                        />
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="text-gray-600 font-medium">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`ml-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                                } rounded px-2 py-1 text-gray-800 w-full`}
                        />
                        <span className="ml-2 text-sm flex items-center">
                            {emailVerified ? (
                                <FaCheckCircle className="text-green-500" title="Verified" />
                            ) : (
                                <FaTimesCircle className="text-red-500" title="Not Verified" />
                            )}
                        </span>
                        {!emailVerified && (
                            <button
                                className="ml-2 text-blue-500 hover:text-blue-700"
                                onClick={handleVerifyEmail}
                            >
                                Verify Email
                            </button>
                        )}
                    </div>
                    <div className="flex items-center mb-2 gap-2">
                        <span className="text-gray-600 font-medium">Password:</span>
                        <span className="ml-2 flex items-center">
                            {!isEditing ? (
                                <span>********</span>
                            ) : (
                                <Link
                                    to="/auth/reset-password"
                                    className="text-orange-600 font-medium hover:underline"
                                >
                                    Reset Password?
                                </Link>
                            )}
                        </span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="text-gray-600 font-medium">Phone:</span>
                        <input
                            type="number"
                            name="phoneNumber"
                            value={formData.phoneNumber || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`ml-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                                } rounded px-2 py-1 text-gray-800 w-full`}
                        />
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="text-gray-600 text-nowrap font-medium">DOB:</span>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`ml-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                                } rounded px-2 py-1 text-gray-800 w-full`}
                        />
                    </div>
                    <div className="flex flex-col items-start mb-2">
                        <span className="text-gray-600 font-medium">About:</span>
                        {isEditing ? (
                            <textarea
                                name="about"
                                value={formData.about || "No About Set."}
                                onChange={handleChange}
                                className={`ml-2 border border-gray-300 rounded px-2 py-1 text-gray-800 w-full`}
                            />
                        ) : (
                            <span
                                className="ml-2 bg-blue-50 border border-blue-200
                                    rounded px-2 py-1 text-gray-800 w-full">
                                {formData.about || "No About Set."}
                            </span>
                        )}
                    </div>
                </div>
                {isEditing && (
                    <div className="mt-6 flex justify-center gap-6">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
