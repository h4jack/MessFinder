import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useFirebase } from "../../context/firebase";
import { useEffect } from "react";
import { updateProfile } from "firebase/auth";

const Profile = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: null,
        emailVerified: false
    });

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
                })
            } else {

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

    const handleSave = () => {
        // Logic to save updated profile data
        console.log("Saving profile data:", formData);
        setIsEditing(false);
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
        firebase.auth.currentUser.sendEmailVerification().then(() => {
            alert("Verification email sent!");
        });
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
                        className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
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
                            value={formData.displayName}
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
                            value={formData.email}
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
                    <div className="flex items-center mb-2">
                        <span className="text-gray-600 font-medium">Phone:</span>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber || "Not Set Yet"}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`ml-2 border ${isEditing ? "border-gray-300" : "border-transparent"
                                } rounded px-2 py-1 text-gray-800 w-full`}
                        />
                    </div>
                    <div className="flex items-center mb-2">
                        <Link
                            to="/auth/reset-password"
                            className="text-orange-600 font-medium hover:underline"
                        >
                            Reset Password?
                        </Link>
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