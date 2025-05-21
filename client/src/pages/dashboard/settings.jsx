import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Settings = () => {
    const [alert, setAlert] = useState("");
    const [isDobPublic, setIsDobPublic] = useState(true);
    const [isPhonePublic, setIsPhonePublic] = useState(true);
    const [isEmailPublic, setIsEmailPublic] = useState(true);

    const handleDeleteAccount = () => {
        setAlert("Account deletion is not Allowed. Please contact the admin.");
        setTimeout(() => {
            setAlert(""); // Clear the alert after 3 seconds
        }, 3000);
    };

    return (
        <div className="p-6 bg-gray-100 w-full">
            {alert && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded flex items-center">
                    <FaExclamationTriangle className="mr-2" />
                    <span>{alert}</span>
                </div>
            )}
            <h2 className="text-3xl font-bold mb-4">Settings</h2>
            <div className="bg-white p-6 rounded shadow-md">
                <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
                {/* <div className="mb-4">
                    <label className="flex items-center justify-between">
                        <span className="mr-2">Date of Birth:</span>
                        <button
                            className={`px-4 py-2 rounded ${
                                isDobPublic ? "bg-green-500 text-white" : "bg-gray-300"
                            }`}
                            onClick={() => setIsDobPublic(!isDobPublic)}
                        >
                            {isDobPublic ? "Public" : "Private"}
                        </button>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center justify-between">
                        <span className="mr-2">Email:</span>
                        <button
                            className={`px-4 py-2 rounded ${
                                isEmailPublic ? "bg-green-500 text-white" : "bg-gray-300"
                            }`}
                            onClick={() => setIsEmailPublic(!isEmailPublic)}
                        >
                            {isEmailPublic ? "Public" : "Private"}
                        </button>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center justify-between">
                        <span className="mr-2">Phone:</span>
                        <button
                            className={`px-4 py-2 rounded ${
                                isPhonePublic ? "bg-green-500 text-white" : "bg-gray-300"
                            }`}
                            onClick={() => setIsPhonePublic(!isPhonePublic)}
                        >
                            {isPhonePublic ? "Public" : "Private"}
                        </button>
                    </label>
                </div> */}
                <div className="mt-6">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
export { Settings };