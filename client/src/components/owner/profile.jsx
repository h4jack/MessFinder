import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useFirebase } from "../../context/firebase";
import { useEffect } from "react";
import { sendEmailVerification, updateEmail, updateProfile } from "firebase/auth";

const Profile = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: null,
        emailVerified: false
    });
    const [alertMessage, setAlertMessage] = React.useState(null);

    const firebase = useFirebase();

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setFormData({
                    displayName: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified
                });
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [firebase.auth]);

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const user = firebase.auth.currentUser;

            // Check if any field has changed before updating
            const updates = {};
            if (formData.displayName && formData.displayName !== user.displayName) {
                updates.displayName = formData.displayName;
            }
            if (formData.email && formData.email !== user.email) {
                updates.email = formData.email;
            }
            if (formData.phoneNumber && formData.phoneNumber !== user.phoneNumber) {
                updates.phoneNumber = formData.phoneNumber;
            }

            // Update profile if there are changes
            if (Object.keys(updates).length > 0) {
                if (updates.displayName || updates.photoURL) {
                    await updateProfile(user, {
                        displayName: updates.displayName,
                        photoURL: formData.photoURL,
                    });
                }
                if (updates.email) {
                    updateEmail(firebase.auth.currentUser, updates.email)
                        .then(() => {

                        })
                        .catch(() => {
                            showAlert("Failed to update profile. Please try again. or login again", "error");
                        })
                }
            } else {
                showAlert("No changes to update.", "info");
            }
            setIsEditing(false);
        } catch (error) {
            showAlert("Failed to update profile. Please try again. or login again", "error");
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
        }, 3000); // Hide alert after 3 seconds
    };

    return (
        <div className="w-full mx-auto shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center justify-center bg-gray-100 p-4 relative">
                <img
                    className="w-24 h-24 rounded-full border-2 border-blue-500"
                    src={formData.photoURL}
                    alt={formData.displayName}
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
                            {formData.emailVerified ? (
                                <FaCheckCircle className="text-green-500" title="Verified" />
                            ) : (
                                <FaTimesCircle className="text-red-500" title="Not Verified" />
                            )}
                        </span>
                        {!formData.emailVerified && (
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
                        <span className="text-gray-600 font-medium">Description:</span>
                        <textarea
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`ml-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                                } rounded px-2 py-1 text-gray-800 w-full`}
                        />
                    </div>
                </div>
                {isEditing && (
                    <div className="mt-6 flex justify-center gap-6">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Profile };
export default Profile;