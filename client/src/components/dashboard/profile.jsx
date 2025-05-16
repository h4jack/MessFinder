import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useFirebase } from "../../context/firebase";
import { userRTB } from "../../context/firebase-rtb";
import { userStorage } from "./../../context/firebase-storage";
import { sendEmailVerification, updateEmail, updateProfile } from "firebase/auth";
import Loader from "../ui/loader"

const Profile = () => {
    const [uid, setUID] = useState("")
    const [formData, setFormData] = useState({});
    const [emailVerified, setEmailVerified] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [uName, setUname] = useState("")
    const [uploadProgress, setUploadProgress] = useState(0);
    const [file, setFile] = useState(null);
    const { uploadProfileImage, deleteProfileImage } = userStorage();
    const firebase = useFirebase();
    const [loading, setLoading] = useState(true); // not false

    useEffect(() => {
        if (uploadProgress) {
            showAlert("Uploading Profile Image. in progress: " + (Math.round(uploadProgress * 100) / 100).toFixed(2) + "%");
        }
    }, [uploadProgress])

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
        const { getData } = userRTB(firebase);
        const loadUserData = async () => {
            if (!uid) return; // <- Add this check
            try {
                const user = await getData(uid);
                try {
                    setUname(user.username);
                } catch (error) {
                    setUname("");
                }
                setFormData((prev) => ({ ...prev, ...user }));
                setLoading(false);
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

    const handleImageFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadProgress(0); // Reset progress
            showAlert("Image Selected, Click Save to save the details..", "success")
        }
    };

    const updateAuthInfo = async (formData, user) => {
        try {
            const authUpdates = {};

            if (formData.displayName && formData.displayName !== user.displayName) {
                authUpdates.displayName = formData.displayName;
            }

            if (Object.keys(authUpdates).length > 0) {
                await updateProfile(user, authUpdates);
            }

            if (formData.email && formData.email !== user.email) {
                await updateEmail(user, formData.email);
            }
        } catch (error) {
            throw new Error("User might already exists.");
        }
    };

    const handleImageUpload = async () => {
        const { uploadPhoto } = userRTB(firebase);
        if (!file) {
            showAlert("No image selected for upload.", "error");
            return;
        }
        try {

            showAlert("Uploading: " + (Math.round(uploadProgress * 100) / 100).toFixed(2) + "%");
            const url = await uploadProfileImage(uid, file, setUploadProgress);
            showAlert("Uploading complete.");

            // Save to Auth
            const user = firebase.auth.currentUser;
            await updateProfile(user, { photoURL: url });

            // Save to Realtime Database
            await uploadPhoto(uid, url);

            console.log(formData);
            // Update UI immediately
            // ✅ Patch formData here so saveData uses updated info
            formData.photoURL = url;
            setFormData((prev) => ({ ...prev, photoURL: url }));
            console.log(formData);

            // Clear file and reload
            setFile(null);
        } catch (err) {
            console.error("Image upload failed:", err);
            showAlert(err.message, "error");
        }
    };

    const handleImageDelete = async () => {
        try {
            // Delete from storage and RTDB
            const message = await deleteProfileImage(uid);

            // Clear from Auth
            const user = firebase.auth.currentUser;
            await updateProfile(user, { photoURL: "" });

            // Clear locally
            setFormData((prev) => ({ ...prev, photoURL: "" }));
            showAlert(message, "success");
        } catch (err) {
            console.error("Image delete failed:", err);
            showAlert(err.message, "error");
        }
    };
    const handleSave = async () => {
        const { saveData, userExists } = userRTB(firebase);
        const user = firebase.auth.currentUser;

        if (file) {
            await handleImageUpload();
        }

        try {
            if (formData.username && formData.username !== uName) {
                const { valid, available, reason } = await userExists(formData.username);
                if (!valid || !available) {
                    showAlert(reason || "Invalid or unavailable username.", "error");
                    return;
                }
            }

            if (user) {
                await updateAuthInfo(formData, user);
            }

            await saveData(uid, formData);
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            showAlert("Failed to update profile. If email change fails, try logging in again, OR " + error, "error");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleVerifyEmail = () => {
        const user = firebase.auth.currentUser;
        sendEmailVerification(user)
            .then(() => {
                showAlert("Verification email sent!, please refresh after verifying, to see the effect.", "success");
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

    if (loading) {
        return (
            <Loader text="Loading profile data.." />
        );
    }


    return (
        <div className="w-full mx-auto shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center justify-center bg-gray-100 p-4 relative">
                <img
                    className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover"
                    src={formData.photoURL || "/assets/avatar-default.svg"}
                    alt={formData.displayName || "Profile picture"}
                />
                {isEditing && (
                    <div className="absolute top-2 right-2 flex gap-2">
                        <div
                            className="bg-blue-300 text-white p-2 rounded-full h-[40px] w-[40px] cursor-pointer hover:bg-blue-400"
                            title="Delete Profile Image"
                            onClick={handleImageDelete}
                        >
                            ❌
                        </div>
                        <label
                            htmlFor="profileImageUpload"
                            className="bg-blue-300 text-white p-2 rounded-full h-[40px] w-[40px] cursor-pointer hover:bg-blue-400"
                            title="Edit Profile Image"
                        >
                            ✏️
                            <input
                                type="file"
                                id="profileImageUpload"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageFileChange}
                            />
                        </label>
                    </div>
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
